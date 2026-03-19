const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'data/artworks.ts');
let content = fs.readFileSync(file, 'utf8');

const newArtworks = [
  {
    id: "dali-persistence",
    slug: "the-persistence-of-memory",
    title: "The Persistence of Memory (Study)",
    artist: "Salvador Dalí",
    year: "1931",
    price: "Price Upon Request",
    imageSrc: "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"
  },
  {
    id: "picasso-guernica",
    slug: "guernica-study",
    title: "Study for Guernica",
    artist: "Pablo Picasso",
    year: "1937",
    price: "USD 12,000,000 - 15,000,000",
    imageSrc: "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg"
  },
  {
    id: "warhol-marilyn",
    slug: "shot-sage-blue-marilyn",
    title: "Shot Sage Blue Marilyn",
    artist: "Andy Warhol",
    year: "1964",
    price: "Price Upon Request",
    imageSrc: "/images/josh-liu-Tjio9DgtIls-unsplash.jpg"
  },
  {
    id: "basquiat-skull",
    slug: "untitled-skull",
    title: "Untitled (Skull)",
    artist: "Jean-Michel Basquiat",
    year: "1981",
    price: "USD 50,000,000 - 70,000,000",
    imageSrc: "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg"
  },
  {
    id: "hockney-pool",
    slug: "a-bigger-splash",
    title: "A Bigger Splash",
    artist: "David Hockney",
    year: "1967",
    price: "Price Upon Request",
    imageSrc: "/images/antenna-jqh0GEvuNBY-unsplash.jpg"
  },
  {
    id: "banksy-girl",
    slug: "girl-with-balloon",
    title: "Girl with Balloon",
    artist: "Banksy",
    year: "2006",
    price: "USD 1,000,000 - 1,500,000",
    imageSrc: "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"
  },
  {
    id: "kusama-pumpkin",
    slug: "yellow-pumpkin",
    title: "Yellow Pumpkin",
    artist: "Yayoi Kusama",
    year: "1992",
    price: "USD 3,000,000 - 5,000,000",
    imageSrc: "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg"
  },
  {
    id: "riley-movement",
    slug: "movement-in-squares",
    title: "Movement in Squares",
    artist: "Bridget Riley",
    year: "1961",
    price: "USD 2,000,000 - 3,000,000",
    imageSrc: "/images/josh-liu-Tjio9DgtIls-unsplash.jpg"
  },
  {
    id: "emin-bed",
    slug: "my-bed",
    title: "My Bed (Edition)",
    artist: "Tracey Emin",
    year: "1998",
    price: "Price Upon Request",
    imageSrc: "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg"
  },
  {
    id: "slawn-face",
    slug: "untitled-face",
    title: "Untitled (Face)",
    artist: "Oluas Slawn",
    year: "2023",
    price: "USD 40,000 - 60,000",
    imageSrc: "/images/antenna-jqh0GEvuNBY-unsplash.jpg"
  },
  {
    id: "padua-untitled",
    slug: "untitled-figure",
    title: "Untitled Figure",
    artist: "Chima Padua",
    year: "2024",
    price: "USD 15,000 - 25,000",
    imageSrc: "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"
  },
  {
    id: "peacock-abstract",
    slug: "abstract-study",
    title: "Abstract Study",
    artist: "Freddie Peacock",
    year: "2025",
    price: "USD 10,000 - 15,000",
    imageSrc: "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg"
  }
];

content = content.replace(/\];$/, ',\n  ' + newArtworks.map(x => JSON.stringify(x, null, 2)).join(',\n  ') + '\n];');
fs.writeFileSync(file, content);
console.log('Appended new artworks.');
