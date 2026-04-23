import { createClient } from '@sanity/client';

// Configuration
const PROJECT_ID = 'kcvm5a8w';
const DATASET = 'production';
const TOKEN = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  useCdn: false,
  apiVersion: '2024-03-19',
});

async function check() {
  const artworks = await client.fetch(`*[_type == "artwork" && artist->name == "Chima Padua"] {
    title,
    "artistName": artist->name,
    "artistFeatured": artist->featured,
    featured,
    _createdAt
  }`);
  console.log(JSON.stringify(artworks, null, 2));
}

check();
