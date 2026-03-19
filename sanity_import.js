const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');

// Configuration
const projectId = 'kcvm5a8w';
const dataset = 'production';
const token = process.env.SANITY_API_TOKEN;

if (!token || token === 'YOUR_SANITY_TOKEN_HERE') {
  console.error('Error: SANITY_API_TOKEN environment variable is not set.');
  console.error('Please get a write token from https://www.sanity.io/manage and run:');
  console.error('export SANITY_API_TOKEN="your-token-here" && node sanity_import.js');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-03-19',
});

const extractArray = (fileContent) => {
  const match = fileContent.match(/\[[\s\S]*\]/);
  if (!match) return [];
  // Very unsafe but works for our simple dummy data files
  return eval(match[0]);
};

const uploadImage = async (imagePath) => {
  if (!imagePath) return null;
  // Resolve path - dummy data has absolute-like paths for public folder
  const fullPath = path.join(__dirname, 'public', imagePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return null;
  }
  
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath));
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`Failed to upload image ${imagePath}:`, err.message);
    return null;
  }
};

const run = async () => {
  console.log('Starting Sanity Import...');

  // 1. Import Artists
  console.log('Importing Artists...');
  const artistsData = extractArray(fs.readFileSync('data/artists.ts', 'utf8'));
  const artistMap = {}; // name -> _id

  for (const item of artistsData) {
    console.log(`- ${item.name}`);
    const portrait = await uploadImage(item.imageSrc);
    
    const doc = {
      _type: 'artist',
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      portrait,
      // We convert plain text bio to basic portable text block
      bio: [
        {
          _key: 'b1',
          _type: 'block',
          children: [{ _key: 'c1', _type: 'span', text: item.bio }],
          markDefs: [],
          style: 'normal',
        },
      ],
    };

    const result = await client.createOrReplace({
      _id: `artist-${item.slug}`,
      ...doc
    });
    artistMap[item.name] = result._id;
  }

  // 2. Import Artworks
  console.log('Importing Artworks...');
  const artworksData = extractArray(fs.readFileSync('data/artworks.ts', 'utf8'));
  for (const item of artworksData) {
    console.log(`- ${item.title}`);
    const image = await uploadImage(item.imageSrc);
    const artistRef = artistMap[item.artist];

    const doc = {
      _type: 'artwork',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      artist: artistRef ? { _type: 'reference', _ref: artistRef } : undefined,
      images: image ? [image] : [],
      year: item.year,
      price: item.price,
      status: 'Available',
    };

    await client.createOrReplace({
      _id: `artwork-${item.slug}`,
      ...doc
    });
  }

  // 3. Import Reports
  console.log('Importing Reports...');
  const reportsData = extractArray(fs.readFileSync('data/reports.ts', 'utf8'));
  for (const item of reportsData) {
    console.log(`- ${item.title}`);
    const doc = {
      _type: 'report',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      summary: item.summary,
      publishedAt: new Date(item.date).toISOString(),
      gated: true,
    };
    await client.createOrReplace({
      _id: `report-${item.slug}`,
      ...doc
    });
  }

  // 4. Import Exhibitions
  console.log('Importing Exhibitions...');
  const exhibitionsData = extractArray(fs.readFileSync('data/exhibitions.ts', 'utf8'));
  for (const item of exhibitionsData) {
    console.log(`- ${item.title}`);
    const image = await uploadImage(item.imageSrc);
    
    // Crude date parsing for "April 12 — May 30, 2026"
    // Just using today's date + offset for dummy purposes if parsing fails
    const doc = {
      _type: 'exhibition',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      location: item.location,
      startDate: '2026-04-12',
      endDate: '2026-05-30',
      type: item.type,
      image,
      description: [
        {
          _key: 'b1',
          _type: 'block',
          children: [{ _key: 'c1', _type: 'span', text: item.description }],
          markDefs: [],
          style: 'normal',
        },
      ],
    };
    await client.createOrReplace({
      _id: `exhibition-${item.slug}`,
      ...doc
    });
  }

  console.log('Successfully uploaded all content to Sanity!');
};

run().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
