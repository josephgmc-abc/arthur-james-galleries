const fs = require('fs');
const path = require('path');

const newItems = [
  {
    "artist": "Ji Xin",
    "title": "Portrait of a Young Woman",
    "year": "Unknown",
    "estimate": "HKD 80,000 - 200,000",
  },
  {
    "artist": "Yu Nishimura",
    "title": "A Car Running in the Green",
    "year": "Unknown",
    "estimate": "HKD 250,000 - 450,000",
  },
  {
    "artist": "Kei Imazu",
    "title": "Hug",
    "year": "Unknown",
    "estimate": "HKD 150,000 - 300,000",
  },
  {
    "artist": "Firenze Lai",
    "title": "Yoga Class",
    "year": "Unknown",
    "estimate": "HKD 1,000,000 - 2,000,000",
  },
  {
    "artist": "Kohei Nawa",
    "title": "PixCell-Bambi #15",
    "year": "Unknown",
    "estimate": "HKD 1,500,000 - 2,500,000",
  },
  {
    "artist": "Andy Warhol",
    "title": "Clockwork Panda Drummer",
    "year": "Unknown",
    "estimate": "HKD 1,500,000 - 3,000,000",
  },
  {
    "artist": "Mehdi Ghadyanloo",
    "title": "Untitled",
    "year": "Unknown",
    "estimate": "HKD 800,000 - 1,500,000",
  },
  {
    "artist": "Tracey Emin",
    "title": "I can't Believe (how much) How much I Loved You",
    "year": "Unknown",
    "estimate": "HKD 600,000 - 900,000",
  },
  {
    "artist": "Annie Morris",
    "title": "Stack 3, Cadmium Red",
    "year": "Unknown",
    "estimate": "HKD 1,000,000 - 2,000,000",
  },
  {
    "artist": "Yayoi Kusama",
    "title": "Corn",
    "year": "Unknown",
    "estimate": "HKD 3,000,000 - 5,000,000",
  },
  {
    "artist": "Yayoi Kusama",
    "title": "Infinity Nets",
    "year": "Unknown",
    "estimate": "HKD 2,400,000 - 3,500,000",
  },
  {
    "artist": "Yayoi Kusama",
    "title": "The Ground (2)",
    "year": "Unknown",
    "estimate": "HKD 700,000 - 1,000,000",
  },
  {
    "artist": "Yayoi Kusama",
    "title": "Pumpkin (8)",
    "year": "Unknown",
    "estimate": "HKD 5,200,000 - 7,000,000",
  },
  {
    "artist": "Yayoi Kusama",
    "title": "Mt. Fuji in Seven Colours (set of 7 works)",
    "year": "Unknown",
    "estimate": "HKD 1,800,000 - 2,800,000",
  },
  {
    "artist": "Minoru Nomata",
    "title": "Bourou-H",
    "year": "Unknown",
    "estimate": "HKD 80,000 - 150,000",
  },
  {
    "artist": "Maria Taniguchi",
    "title": "Untitled -1",
    "year": "Unknown",
    "estimate": "HKD 150,000 - 250,000",
  },
  {
    "artist": "Anish Kapoor",
    "title": "Untitled",
    "year": "Unknown",
    "estimate": "HKD 2,500,000 - 3,500,000",
  },
  {
    "artist": "Etel Adnan",
    "title": "Untitled",
    "year": "Unknown",
    "estimate": "HKD 400,000 - 600,000",
  },
  {
    "artist": "Sol LeWitt",
    "title": "Complex Structure in Contained Space",
    "year": "Unknown",
    "estimate": "HKD 120,000 - 240,000",
  },
  {
    "artist": "Sam Francis",
    "title": "Untitled (Triptych)",
    "year": "Unknown",
    "estimate": "HKD 800,000 - 1,500,000",
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
  id: slugify(`day-auction-${item.artist}-${item.title}-${i}`),
  slug: slugify(`day-auction-${item.title}-${i}`),
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

const existingArtists = ["Salvador Dalí", "Pablo Picasso", "Andy Warhol", "Jean-Michel Basquiat", "David Hockney", "Banksy", "Yayoi Kusama", "Bridget Riley", "Tracey Emin", "Oluas Slawn", "Chima Padua", "Freddie Peacock", "Huma Bhabha", "Kim Lim", "Unknown Artist", "Zao Wou-Ki", "Lalan", "Hans Hartung", "Lee Ufan", "Lucy Bull", "Kameda Bōsai", "Georges Mathieu", "Joan Mitchell", "Krishnaji Howlaji Ara", "Maqbool Fida Husain", "Mohan Samant", "Francis Newton Souza", "Akbar Padamsee", "Ram Kumar", "Jehangir Sabavala", "Sayed Haider Raza", "Sadanand K. Bakre", "Bhupen Khakhar"];

const newArtists = [...new Set(newItems.map(i => i.artist))].filter(a => !existingArtists.includes(a));

const newArtistsData = newArtists.map((artist, i) => ({
  slug: slugify(artist),
  name: artist,
  bio: `An acclaimed artist featured in the Contemporary Day Auction. Biography to be provided.`,
  imageSrc: images[i % images.length]
}));

if (newArtistsData.length > 0) {
    artistsContent = artistsContent.replace(/\];$/, ',\n  ' + newArtistsData.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
    fs.writeFileSync(artistsFile, artistsContent);
}

console.log('Appended Contemporary Day Auction artworks and artists successfully.');
