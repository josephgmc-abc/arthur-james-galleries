const fs = require('fs');
const path = require('path');

const newItems = [
  {
    "artist": "Huma Bhabha",
    "title": "Constantium",
    "year": "2026",
    "estimate": "HKD 1,200,000 - 1,800,000",
  },
  {
    "artist": "Kim Lim",
    "title": "Relief Sculpture",
    "year": "1990",
    "estimate": "HKD 1,000,000 - 1,500,000",
  },
  {
    "artist": "Unknown Artist",
    "title": "A large 'Lingbi' scholar's rock",
    "year": "Ming - Qing dynasty",
    "estimate": "HKD 900,000 - 1,200,000",
  },
  {
    "artist": "Unknown Artist",
    "title": "Tracery Section from the Nave of York Minster",
    "year": "15th Century",
    "estimate": "HKD 500,000 - 700,000",
  },
  {
    "artist": "Zao Wou-Ki",
    "title": "Nuage",
    "year": "1980",
    "estimate": "HKD 30,000,000 - 50,000,000",
  },
  {
    "artist": "Lalan",
    "title": "Untitled",
    "year": "1970",
    "estimate": "HKD 1,000,000 - 2,000,000",
  },
  {
    "artist": "Hans Hartung",
    "title": "T1962-L38",
    "year": "1962",
    "estimate": "HKD 1,800,000 - 2,800,000",
  },
  {
    "artist": "Lee Ufan",
    "title": "From Line No. 780224",
    "year": "1978",
    "estimate": "HKD 4,000,000 - 6,000,000",
  },
  {
    "artist": "Zao Wou-Ki",
    "title": "Terre rouge – 16.01.2005",
    "year": "2005",
    "estimate": "HKD 20,000,000 - 40,000,000",
  },
  {
    "artist": "Lucy Bull",
    "title": "22:14",
    "year": "2020",
    "estimate": "HKD 3,500,000 - 5,500,000",
  },
  {
    "artist": "Unknown Artist",
    "title": "A white-glazed moon jar",
    "year": "Joseon period, 18th century",
    "estimate": "HKD 800,000 - 1,800,000",
  },
  {
    "artist": "Unknown Artist",
    "title": "A 'Qilian' scholar's rock",
    "year": "Ming - Qing dynasty",
    "estimate": "HKD 280,000 - 350,000",
  },
  {
    "artist": "Kameda Bōsai",
    "title": "Poems in Cursive Script",
    "year": "1752-1826",
    "estimate": "HKD 200,000 - 400,000",
  },
  {
    "artist": "Georges Mathieu",
    "title": "La passion retrouvée",
    "year": "1988",
    "estimate": "HKD 1,200,000 - 2,200,000",
  },
  {
    "artist": "Joan Mitchell",
    "title": "La Grande Vallée VII",
    "year": "1983",
    "estimate": "HKD 110,000,000 - 300,000,000",
  }
];

const images = [
  "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg",
  "/images/antenna-jqh0GEvuNBY-unsplash.jpg",
  "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg",
  "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg",
  "/images/josh-liu-Tjio9DgtIls-unsplash.jpg",
];

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const artworksFile = path.join(__dirname, 'data/artworks.ts');
let artworksContent = fs.readFileSync(artworksFile, 'utf8');

const newArtworks = newItems.map((item, i) => ({
  id: slugify(`${item.artist}-${item.title}-${i}`),
  slug: slugify(`${item.title}-${i}`),
  title: item.title,
  artist: item.artist,
  year: item.year,
  price: item.estimate,
  imageSrc: images[i % images.length]
}));

artworksContent = artworksContent.replace(/\];$/, ',\n  ' + newArtworks.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
fs.writeFileSync(artworksFile, artworksContent);

const artistsFile = path.join(__dirname, 'data/artists.ts');
let artistsContent = fs.readFileSync(artistsFile, 'utf8');

const existingArtists = ["Salvador Dalí", "Pablo Picasso", "Andy Warhol", "Jean-Michel Basquiat", "David Hockney", "Banksy", "Yayoi Kusama", "Bridget Riley", "Tracey Emin", "Oluas Slawn", "Chima Padua", "Freddie Peacock"];

const newArtists = [...new Set(newItems.map(i => i.artist))].filter(a => !existingArtists.includes(a));

const newArtistsData = newArtists.map((artist, i) => ({
  slug: slugify(artist),
  name: artist,
  bio: `An acclaimed artist featured in the Modern & Contemporary Evening Auction. Biography to be provided.`,
  imageSrc: images[i % images.length]
}));

artistsContent = artistsContent.replace(/\];$/, ',\n  ' + newArtistsData.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
fs.writeFileSync(artistsFile, artistsContent);

console.log('Appended new artworks and artists successfully.');
