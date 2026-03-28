const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const crypto = require('crypto');

// Configuration
const PROJECT_ID = 'kcvm5a8w';
const DATASET = 'production';
const TOKEN = process.env.SANITY_API_TOKEN;
const SOURCE_URL = 'https://iazzu.com/g/galerie-gleis-4?ma=310';
const CACHE_FILE = 'gleis_inventory.json';
const IMAGE_DIR = 'public/images/gleis';

if (!TOKEN) {
  console.error('Error: SANITY_API_TOKEN is not set.');
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  useCdn: false,
  apiVersion: '2024-03-19',
});

// Ensure directories exist
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

function getHash(data) {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
}

async function uploadImage(imageUrl, artworkId) {
  try {
    console.log(`  Downloading image: ${imageUrl}`);
    const response = await axios({ url: imageUrl, responseType: 'stream', timeout: 30000 });
    
    const urlPath = new URL(imageUrl).pathname;
    const extension = path.extname(urlPath) || '.jpg';
    const filename = `${artworkId}${extension}`;
    const filePath = path.join(IMAGE_DIR, filename);
    
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log(`  Uploading to Sanity: ${filePath}`);
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: filename,
      contentType: response.headers['content-type']
    });
    
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  } catch (err) {
    console.error(`  Failed to upload image: ${imageUrl}`, err.message);
    return null;
  }
}

async function scrape() {
  console.log(`Starting scrape from ${SOURCE_URL}...`);
  
  let previousInventory = {};
  if (fs.existsSync(CACHE_FILE)) {
    previousInventory = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  }

  const { data: html } = await axios.get(SOURCE_URL);
  const $ = cheerio.load(html);
  
  const scriptContent = $('script').map((i, el) => $(el).html()).get().find(s => s.includes('window.pathPropsInitEncoded'));
  if (!scriptContent) throw new Error('Could not find window.pathPropsInitEncoded');

  const jsonMatch = scriptContent.match(/window\.pathPropsInitEncoded\s*=\s*(\{.*?\});/s);
  if (!jsonMatch) throw new Error('Could not parse window.pathPropsInitEncoded JSON');
  
  const pageData = JSON.parse(jsonMatch[1]);
  const artworks = pageData.pathData.relatedArtworks || [];

  console.log(`Found ${artworks.length} artworks.`);

  const currentInventory = {};

  for (const item of artworks) {
    // Generate a stable ID for Sanity using a hash of the title and artist if item.id is -1
    const stableId = item.id !== -1 ? item.id : crypto.createHash('md5').update(item.title + item.artistName).digest('hex').substring(0, 8);
    
    // Find best image URL
    let imageUrl = null;
    if (item.featuredImage && item.featuredImage.sizes) {
      const sizes = item.featuredImage.sizes;
      imageUrl = sizes['1500']?.url || sizes['1000']?.url || sizes['500']?.url || sizes['fb-share']?.url;
    }

    const itemData = {
      id: stableId,
      title: item.title,
      artist: item.artistName || 'Unknown',
      slug: item.slug || item.slugByTitle || stableId,
      dimensions: item.dimensionsReadable || item.languageVariants?.en?.dimensionsReadable || '',
      medium: `${item.techniquesReadable || item.languageVariants?.en?.techniquesReadable || ''}${item.materialsReadable || item.languageVariants?.en?.materialsReadable ? ' on ' + (item.materialsReadable || item.languageVariants?.en?.materialsReadable) : ''}`,
      price: item.price ? `${item.price} ${item.priceCurrency || 'CHF'}` : 'Price Upon Request',
      status: item.availabilityStatus === 'sold' ? 'Sold' : 'Available',
      imageUrl: imageUrl,
    };

    const dataHash = getHash(itemData);
    currentInventory[stableId] = dataHash;

    if (previousInventory[stableId] === dataHash) {
      console.log(`- Skipping ${item.title} (no changes)`);
      continue;
    }

    console.log(`- Processing ${item.title}...`);

    const artistName = itemData.artist;
    const artistId = `gleis-artist-${artistName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    
    await client.createOrReplace({
      _id: artistId,
      _type: 'artist',
      name: artistName,
      slug: { _type: 'slug', current: artistName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
    });

    let imageAsset = null;
    if (itemData.imageUrl) {
      imageAsset = await uploadImage(itemData.imageUrl, stableId);
    }

    const artworkDoc = {
      _id: `gleis-artwork-${stableId}`,
      _type: 'artwork',
      title: itemData.title,
      slug: { _type: 'slug', current: itemData.slug },
      artist: { _type: 'reference', _ref: artistId },
      images: imageAsset ? [imageAsset] : [],
      dimensions: itemData.dimensions,
      medium: itemData.medium,
      estimate: itemData.price,
      status: itemData.status,
    };

    await client.createOrReplace(artworkDoc);
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(currentInventory, null, 2));
  console.log('Scrape and sync complete.');
}

scrape().catch(err => {
  console.error('Scrape failed:', err);
  process.exit(1);
});
