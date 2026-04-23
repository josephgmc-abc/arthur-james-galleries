import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const PROJECT_ID = 'kcvm5a8w';
const DATASET = 'production';
const TOKEN = process.env.SANITY_API_TOKEN;

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

// Helper to slugify strings
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

// Convert plain text to simple Portable Text
function toPortableText(text) {
  if (!text) return [];
  return [
    {
      _type: 'block',
      children: [{ _type: 'span', text }],
      markDefs: [],
      style: 'normal',
    },
  ];
}

async function uploadImage(imagePath) {
  if (!imagePath || !fs.existsSync(imagePath)) {
    console.warn(`  Warning: File not found: ${imagePath}`);
    return null;
  }

  try {
    const filename = path.basename(imagePath);
    const asset = await client.assets.upload('image', fs.createReadStream(imagePath), {
      filename: filename,
    });
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    };
  } catch (err) {
    console.error(`  Error uploading image ${imagePath}:`, err.message);
    return null;
  }
}

async function uploadChimaPadua() {
  const artistName = "Chima Padua";
  const artistSlug = slugify(artistName);
  const artistId = `artist-${artistSlug}`;
  const imagesDir = path.join(process.cwd(), 'Chima Artwork Images');

  console.log(`Ensuring artist ${artistName} exists...`);
  
  await client.createOrReplace({
    _id: artistId,
    _type: 'artist',
    name: artistName,
    slug: { _type: 'slug', current: artistSlug },
    bio: toPortableText("Contemporary British-Nigerian artist known for vibrant pop art and neo-expressionist style."),
    featured: true,
  });

  const artworks = [
    { title: "MRS JONES", price: "US$36,000", medium: "Acrylic paint and water-based marker on canvas", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022" },
    { title: "THE LAST DRAGON", price: "US$15,000", medium: "Acrylic on canvas", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022" },
    { title: "BRUNCH AT CARTIER", price: "US$15,000", medium: "Acrylic and marker on canvas", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022" },
    { title: "LUNCH AT VAN CLEEF", price: "US$15,000", medium: "Acrylic paint, Acrylic marker, and Oil-based marker on canvas", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022" },
    { title: "VINCENT & JULES", price: "US$30,000", medium: "Acrylic paint, Acrylic Marker pen, Water-based marker pen, and Oil-based marker pen", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022" },
    { title: "Taxi NYC", price: "US$35,000", medium: "Acrylic and marker on canvas", dimensions: "24 × 24 in | 61 × 61 cm", year: "2022", imageFile: "Taxi NYC.png" },
    { title: "Ketchup Face", price: "US$37,000", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Ketchup Face.png" },
    { title: "Everyone Has A Plan Until...", price: "US$31,670", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Everyone Has A Plan Until....png" },
    { title: "A Peaceful Beatle", price: "US$31,670", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "A Peaceful Beatle.png" },
    { title: "Dinner at Pandora", price: "US$21,180", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Dinner at Pandora.png" },
    { title: "Golden Goose", price: "US$42,130", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Golden Goose.png" },
    { title: "Live Long And Prosper", price: "US$31,660", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Live Long And Prosper.png" },
    { title: "Rogers", price: "US$31,760", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Rogers.png" },
    { title: "Twenty Three", price: "US$52,800", medium: "Acrylic on Canvas", dimensions: "24 x 24 in / 61 x 61 cm", year: "2022", imageFile: "Twenty Three.png" }
  ];

  console.log(`Uploading ${artworks.length} artworks...`);

  for (const art of artworks) {
    const slug = slugify(art.title);
    console.log(`- ${art.title}`);
    
    let image = null;
    if (art.imageFile) {
      const imagePath = path.join(imagesDir, art.imageFile);
      image = await uploadImage(imagePath);
    }

    await client.createOrReplace({
      _id: `artwork-${artistSlug}-${slug}`,
      _type: 'artwork',
      title: art.title,
      slug: { _type: 'slug', current: slug },
      artist: { _type: 'reference', _ref: artistId },
      images: image ? [image] : undefined,
      year: art.year,
      medium: art.medium,
      dimensions: art.dimensions,
      price: art.price, // Internal Price field
      estimate: "Price Upon Request", // What displays on the website via data/api.ts (which I set to "POA" but the schema also has this)
      status: 'Available',
      source: 'arthur-james'
    });
  }

  console.log('Upload completed successfully!');
}

uploadChimaPadua().catch(err => {
  console.error('Upload failed:', err);
  process.exit(1);
});
