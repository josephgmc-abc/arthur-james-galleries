import { createClient } from '@sanity/client';

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

async function cleanup() {
  const artistName = "Chima Padua";
  console.log(`Cleaning up artworks for ${artistName} that don't have images...`);

  // Query for all artworks by Chima Padua
  const artworks = await client.fetch(
    `*[_type == "artwork" && artist->name == $artistName] { _id, title, images }`,
    { artistName }
  );

  console.log(`Found ${artworks.length} total artworks for ${artistName}.`);

  let deleteCount = 0;
  for (const art of artworks) {
    if (!art.images || art.images.length === 0) {
      console.log(`- Deleting: ${art.title} (${art._id})`);
      await client.delete(art._id);
      deleteCount++;
    } else {
      console.log(`- Keeping: ${art.title} (Has ${art.images.length} image(s))`);
    }
  }

  console.log(`Cleanup completed. Deleted ${deleteCount} artworks.`);
}

cleanup().catch(err => {
  console.error('Cleanup failed:', err);
  process.exit(1);
});
