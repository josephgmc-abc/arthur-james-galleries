const fs = require('fs');
const path = require('path');

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    (txt) => text = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

const newItems = [
  {
    "artist": "PABLO PICASSO",
    "title": "Flying Dove (with Rainbow) | La Colombe Volante (à l'arc-en-ciel)",
    "year": "Unknown",
    "estimate": "USD 10,600"
  },
  {
    "artist": "MARC CHAGALL",
    "title": "Wedding Feast in the Nymphs' Grotto",
    "year": "Unknown",
    "estimate": "USD 5,900"
  },
  {
    "artist": "DOUGLAS GORDON",
    "title": "Portrait of a Self Portrait of a Self, as Marilyna",
    "year": "Unknown",
    "estimate": "USD 8,000"
  },
  {
    "artist": "AI WEIWEI",
    "title": "Vase | Green",
    "year": "Unknown",
    "estimate": "USD 5,300"
  },
  {
    "artist": "AI WEIWEI",
    "title": "Vase | Blue",
    "year": "Unknown",
    "estimate": "USD 5,300"
  },
  {
    "artist": "JEFF KOONS",
    "title": "Balloon Monkey",
    "year": "Unknown",
    "estimate": "USD 16,500"
  },
  {
    "artist": "ROBERT LONGO",
    "title": "Rick, from: Men in the Cities",
    "year": "1994",
    "estimate": "USD 41,200"
  },
  {
    "artist": "ALEX KATZ",
    "title": "Peonies, from: Flowers Portfolio",
    "year": "Unknown",
    "estimate": "USD 16,500"
  },
  {
    "artist": "FRANCIS BACON",
    "title": "Triptych August 1972",
    "year": "1989",
    "estimate": "USD 47,100"
  },
  {
    "artist": "SAM FRANCIS",
    "title": "Untitled SFE-003 (Light Blue)",
    "year": "Unknown",
    "estimate": "USD 3,600"
  },
  {
    "artist": "ALBERTO GIACOMETTI",
    "title": "Nude with Flowers | Nu aux fleurs",
    "year": "1960",
    "estimate": "USD 11,800"
  },
  {
    "artist": "AMOAKO BOAFO",
    "title": "Red Tulip Trench Coat",
    "year": "Unknown",
    "estimate": "USD 25,000"
  },
  {
    "artist": "GERHARD RICHTER",
    "title": "Canary Landscapes I e",
    "year": "Unknown",
    "estimate": "USD 6,500"
  },
  {
    "artist": "SALVADOR DALÍ",
    "title": "Head of Veal, from: Faust",
    "year": "1968/69",
    "estimate": "USD 1,600"
  },
  {
    "artist": "JEAN-PAUL RIOPELLE",
    "title": "Owl X | Hibou X",
    "year": "1970",
    "estimate": "USD 5,300"
  },
  {
    "artist": "Kang Youwei",
    "title": "Calligraphy Couplet in Xingshu",
    "year": "Unknown",
    "estimate": "USD 15,308 - 25,514"
  },
  {
    "artist": "GENE DAVIS",
    "title": "Untitled",
    "year": "Unknown",
    "estimate": "USD 20,000"
  },
  {
    "artist": "GENE DAVIS",
    "title": "Dolphin",
    "year": "Unknown",
    "estimate": "USD 18,000"
  },
  {
    "artist": "RICHARD PRINCE",
    "title": "Together",
    "year": "Unknown",
    "estimate": "USD 46,000"
  },
  {
    "artist": "MARC QUINN",
    "title": "Winter Garden | Set of 8",
    "year": "Unknown",
    "estimate": "USD 20,000"
  },
  {
    "artist": "MARC QUINN",
    "title": "Portrait of Landscapes",
    "year": "Unknown",
    "estimate": "USD 20,000"
  },
  {
    "artist": "Lu Xiaoman",
    "title": "Hermitage in Lush Mountains",
    "year": "Unknown",
    "estimate": "USD 19,135 - 38,271"
  },
  {
    "artist": "Zenzaburo Kojima",
    "title": "Nude",
    "year": "Unknown",
    "estimate": "USD 127,570 - 255,140"
  },
  {
    "artist": "PETER DOIG",
    "title": "Zermatt Series | Set of 6",
    "year": "Unknown",
    "estimate": "USD 57,000"
  },
  {
    "artist": "DAMIEN HIRST",
    "title": "Eternal Love (Clear and Gold)",
    "year": "Unknown",
    "estimate": "USD 19,500"
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

const newArtworks = newItems.map((item, i) => {
  const artistName = toTitleCase(item.artist);
  return {
    id: slugify(`fine-art-${artistName}-${item.title}-${i}`),
    slug: slugify(`fine-art-${item.title}-${i}`),
    title: item.title,
    artist: artistName,
    year: item.year,
    price: item.estimate,
    imageSrc: images[i % images.length]
  };
});

artworksContent = artworksContent.replace(/\];$/, ',\n  ' + newArtworks.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
fs.writeFileSync(artworksFile, artworksContent);

const artistsFile = path.join(__dirname, 'data/artists.ts');
let artistsContent = fs.readFileSync(artistsFile, 'utf8');

// Parse current artists to avoid duplicates
const existingMatch = artistsContent.match(/name:\n?\s*"([^"]+)"/g);
const existingArtists = existingMatch ? existingMatch.map(s => s.split('"')[1]) : [];

const newArtists = [...new Set(newItems.map(i => toTitleCase(i.artist)))].filter(a => !existingArtists.includes(a));

const newArtistsData = newArtists.map((artist, i) => ({
  slug: slugify(artist),
  name: artist,
  bio: `An acclaimed artist featured in the Fine Art collection. Biography to be provided.`,
  imageSrc: images[i % images.length]
}));

if (newArtistsData.length > 0) {
    artistsContent = artistsContent.replace(/\];$/, ',\n  ' + newArtistsData.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
    fs.writeFileSync(artistsFile, artistsContent);
}

console.log('Appended Fine Art artworks and artists successfully.');