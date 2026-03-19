const fs = require('fs');
const path = require('path');
const google = require('googlethis');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const artworksFile = path.join(__dirname, 'data', 'artworks.ts');
const artistsFile = path.join(__dirname, 'data', 'artists.ts');
const realImagesDir = path.join(__dirname, 'public', 'images', 'real');

if (!fs.existsSync(realImagesDir)) {
  fs.mkdirSync(realImagesDir, { recursive: true });
}

// Very simple eval-based extraction for our specific format
const extractArray = (fileContent) => {
  const arrayString = fileContent.match(/export const \w+ = (\[[\s\S]*\]);/)[1];
  return eval(arrayString);
};

const downloadImage = async (url, filepath) => {
  try {
    const res = await fetch(url, { 
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const dest = fs.createWriteStream(filepath);
    await finished(Readable.fromWeb(res.body).pipe(dest));
    return true;
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
    return false;
  }
};

const updateImages = async () => {
  const artworksContent = fs.readFileSync(artworksFile, 'utf8');
  let artworks = extractArray(artworksContent);

  const artistsContent = fs.readFileSync(artistsFile, 'utf8');
  let artists = extractArray(artistsContent);

  console.log(`Checking ${artworks.length} artworks...`);

  // We limit concurrent downloads to avoid being blocked
  for (let i = 0; i < artworks.length; i++) {
    const artwork = artworks[i];
    if (artwork.imageSrc.includes('unsplash.jpg')) {
      const query = `${artwork.artist} ${artwork.title} artwork high resolution`;
      console.log(`Searching: ${query}`);
      try {
        const images = await google.image(query, { safe: false });
        if (images && images.length > 0) {
          // Try to find the first working image
          for (let j = 0; j < Math.min(3, images.length); j++) {
            const url = images[j].url;
            // Basic extension check
            const ext = url.split('?')[0].split('.').pop().toLowerCase();
            const validExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
            const filename = `${artwork.slug}.${validExt}`;
            const filepath = path.join(realImagesDir, filename);
            
            const success = await downloadImage(url, filepath);
            if (success) {
              artwork.imageSrc = `/images/real/${filename}`;
              console.log(`Updated ${artwork.title} with real image.`);
              break; // Found one!
            }
          }
        }
      } catch (err) {
        console.error(`Error searching for ${query}: ${err.message}`);
      }
      // Add a small delay
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // Update artists using the first artwork we downloaded for them
  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i];
    if (artist.imageSrc.includes('unsplash.jpg')) {
      const relatedArtwork = artworks.find(a => a.artist === artist.name && !a.imageSrc.includes('unsplash.jpg'));
      if (relatedArtwork) {
        artist.imageSrc = relatedArtwork.imageSrc;
        console.log(`Updated artist ${artist.name} with real image from ${relatedArtwork.title}.`);
      } else {
        // Search specifically for artist photo or artwork
        const query = `${artist.name} artist portrait high resolution`;
        console.log(`Searching: ${query}`);
        try {
          const images = await google.image(query, { safe: false });
          if (images && images.length > 0) {
            for (let j = 0; j < Math.min(3, images.length); j++) {
              const url = images[j].url;
              const ext = url.split('?')[0].split('.').pop().toLowerCase();
              const validExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'jpg';
              const filename = `${artist.slug}-portrait.${validExt}`;
              const filepath = path.join(realImagesDir, filename);
              
              const success = await downloadImage(url, filepath);
              if (success) {
                artist.imageSrc = `/images/real/${filename}`;
                console.log(`Updated ${artist.name} portrait.`);
                break;
              }
            }
          }
        } catch (err) {
          console.error(`Error searching for ${query}: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 1000));
      }
    }
  }

  // Rewrite files
  fs.writeFileSync(artworksFile, `export const dummyArtworks = ${JSON.stringify(artworks, null, 2)};\n`);
  fs.writeFileSync(artistsFile, `export const dummyArtists = ${JSON.stringify(artists, null, 2)};\n`);
  console.log('Finished updating artworks and artists.');
};

updateImages();
