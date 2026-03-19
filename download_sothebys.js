const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const { finished } = require('stream/promises');

const artworks = [
  {
    "artist": "Krishnaji Howlaji Ara",
    "title": "Untitled (Governor General’s Bodyguards)",
    "year": "Mid 20th Century",
    "estimated_price": "USD 10,000 - 15,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/5b151d3a-0547-471d-8129-7a6e4790654a/primary/extra_small"
  },
  {
    "artist": "Krishnaji Howlaji Ara",
    "title": "Untitled",
    "year": "Mid 20th Century",
    "estimated_price": "USD 10,000 - 15,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/9d21cc41-d579-47ea-a3bf-8f53a6407828/primary/extra_small"
  },
  {
    "artist": "Maqbool Fida Husain",
    "title": "Her Daughter",
    "year": "Late 20th Century",
    "estimated_price": "USD 150,000 - 200,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/d3fcf7e1-ad34-40f7-b8df-64e63f1bf186/primary/extra_small"
  },
  {
    "artist": "Mohan Samant",
    "title": "Magician",
    "year": "Late 20th Century",
    "estimated_price": "USD 30,000 - 50,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/c71a206d-0c02-4da4-9264-2089cc44c033/primary/extra_small"
  },
  {
    "artist": "Mohan Samant",
    "title": "Untitled",
    "year": "Late 20th Century",
    "estimated_price": "USD 4,000 - 6,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/19ed52db-fbee-4ea2-9761-57974d5d5a54/primary/extra_small"
  },
  {
    "artist": "Francis Newton Souza",
    "title": "Untitled (Set of 5)",
    "year": "1960s",
    "estimated_price": "USD 15,000 - 20,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/3959a068-b9fc-4bc4-90b4-856f53ac3d19/primary/extra_small"
  },
  {
    "artist": "Akbar Padamsee",
    "title": "Femme au Paysage",
    "year": "1960s",
    "estimated_price": "USD 250,000 - 350,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/9824773a-b4d9-4e40-9f3a-7ec3137cfe94/primary/extra_small"
  },
  {
    "artist": "Francis Newton Souza",
    "title": "Untitled (Study for Mystic Repast)",
    "year": "1950s",
    "estimated_price": "USD 10,000 - 15,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/6ad16542-9e41-4d3f-b42b-f90aa232ad8c/primary/extra_small"
  },
  {
    "artist": "Maqbool Fida Husain",
    "title": "Second Act",
    "year": "1958",
    "estimated_price": "USD 2,800,000 - 3,500,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/d2a9543f-4d5d-4ac2-abdb-a996029f4ea3/primary/extra_small"
  },
  {
    "artist": "Maqbool Fida Husain",
    "title": "Untitled",
    "year": "1970s",
    "estimated_price": "USD 150,000 - 200,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/181ecf03-bd2d-4337-a1d9-6121adb60b54/primary/extra_small"
  },
  {
    "artist": "Ram Kumar",
    "title": "Untitled",
    "year": "Late 20th Century",
    "estimated_price": "USD 200,000 - 300,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/54f3a060-3bd1-4613-83e3-f903f3406c2e/primary/extra_small"
  },
  {
    "artist": "Maqbool Fida Husain",
    "title": "Untitled (Women)",
    "year": "Late 20th Century",
    "estimated_price": "USD 150,000 - 200,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/54662972-e1c5-4ee4-a125-025c4856165d/primary/extra_small"
  },
  {
    "artist": "Jehangir Sabavala",
    "title": "And the Paddy Was Not Yet Long",
    "year": "Late 20th Century",
    "estimated_price": "USD 600,000 - 1,200,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/6b9898e7-c1e5-4083-9193-cbd7e8593184/primary/extra_small"
  },
  {
    "artist": "Sayed Haider Raza",
    "title": "Untitled",
    "year": "1980s",
    "estimated_price": "USD 50,000 - 70,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/b4aaf10e-60ee-4f3e-8c51-0d470bdbe6fc/primary/extra_small"
  },
  {
    "artist": "Francis Newton Souza",
    "title": "Houses in Moonlight",
    "year": "1960s",
    "estimated_price": "USD 300,000 - 500,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/b67913d2-e0f2-4e9b-af1b-e5bc2a45da9d/primary/extra_small"
  },
  {
    "artist": "Sadanand K. Bakre",
    "title": "Untitled (Landscape)",
    "year": "Mid 20th Century",
    "estimated_price": "USD 30,000 - 50,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/4fa2569b-62a7-4842-bf60-c02481da64c0/primary/extra_small"
  },
  {
    "artist": "Francis Newton Souza",
    "title": "Untitled (Mountain with Houses)",
    "year": "1960s",
    "estimated_price": "USD 400,000 - 600,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/84662ed5-45d8-49a0-b7dd-087813789165/primary/extra_small"
  },
  {
    "artist": "Maqbool Fida Husain",
    "title": "Seve[n] Shades [...] Bamboos",
    "year": "1970s",
    "estimated_price": "USD 450,000 - 650,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/80fe7006-6adc-46d4-a760-40ac92d8bb5d/primary/extra_small"
  },
  {
    "artist": "Bhupen Khakhar",
    "title": "Sakhis in Vrindavan",
    "year": "Late 20th Century",
    "estimated_price": "USD 60,000 - 80,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/93bfb512-c480-491a-a27c-95d419553dc9/primary/extra_small"
  },
  {
    "artist": "Bhupen Khakhar",
    "title": "Untitled (Seated Man)",
    "year": "Late 20th Century",
    "estimated_price": "USD 7,000 - 9,000",
    "image_url": "https://dam.sothebys.com/dam/image/lot/4e41dded-ed62-4ad0-a10a-4a54d5eaf0dc/primary/extra_small"
  }
];

const downloadImage = async (url, filepath) => {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`unexpected response ${res.statusText}`);
  const dest = fs.createWriteStream(filepath);
  await finished(Readable.fromWeb(res.body).pipe(dest));
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const run = async () => {
  const finalData = [];
  
  for (let i = 0; i < artworks.length; i++) {
    const item = artworks[i];
    const filename = `${slugify(item.artist)}-${slugify(item.title)}-${i}.jpg`;
    const filepath = path.join(__dirname, 'public', 'images', 'sothebys', filename);
    
    try {
      await downloadImage(item.image_url.replace('/extra_small', '/large'), filepath);
      console.log(`Downloaded ${filename}`);
      finalData.push({
        id: slugify(`${item.artist}-${item.title}-${i}`),
        slug: slugify(`${item.artist}-${item.title}-${i}`),
        title: item.title,
        artist: item.artist,
        year: item.year,
        price: item.estimated_price,
        imageSrc: `/images/sothebys/${filename}`
      });
    } catch (e) {
      console.error(`Failed to download ${item.image_url}`, e);
    }
  }

  const tsFile = `export const dummyArtworks = ${JSON.stringify(finalData, null, 2)};`;
  fs.writeFileSync(path.join(__dirname, 'data', 'artworks.ts'), tsFile);
  console.log('Finished writing data/artworks.ts');
};

run();
