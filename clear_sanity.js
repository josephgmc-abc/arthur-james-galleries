const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'kcvm5a8w',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-19',
});

if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN === 'YOUR_SANITY_TOKEN_HERE') {
  console.error('Error: SANITY_API_TOKEN environment variable is not set.');
  process.exit(1);
}

const clear = async () => {
  console.log('Clearing Sanity dataset...');
  const types = ['artwork', 'artist', 'exhibition', 'report'];
  
  for (const type of types) {
    console.log(`Deleting all documents of type: ${type}`);
    await client.delete({query: `*[_type == "${type}"]`});
  }
  console.log('Done clearing dataset.');
};

clear().catch(err => {
  console.error(err);
  process.exit(1);
});