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

// Helper to upload images
async function uploadImage(imagePath) {
  if (!imagePath) return null;
  // If it's a full URL, we skip for now (or download and upload)
  if (imagePath.startsWith('http')) return null;

  // Paths in dummy data are usually relative to /public
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Warning: File not found: ${fullPath}`);
    return null;
  }

  try {
    const filename = path.basename(fullPath);
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
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

async function migrateExhibitions() {
  console.log('Migrating Exhibitions...');
  // Dummy data copy-pasted for simplicity in script
  const dummyExhibitions = [
    {
      slug: "spring-exhibition-2026",
      title: "Arthur James Gallery - Spring Exhibition",
      location: "London Head Office, Holborn",
      startDate: "2026-04-12",
      endDate: "2026-05-30",
      type: "In-Person / Private Viewing",
      imageSrc: "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg",
      description: "An exclusive presentation focusing on mid-century abstract expressionism. This viewing traces the philosophical development of abstraction as it moved away from purely representational forms towards spiritual and emotional resonances. Key works from our current private inventory will be accessible."
    },
    {
      slug: "artist-talk-chima-padua",
      title: "Artist Talks: Chima Padua",
      location: "Digital Access / Zoom",
      startDate: "2026-06-15",
      endDate: "2026-06-15",
      type: "Advisory Exclusive",
      imageSrc: "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg",
      description: "Join us for an intimate digital conversation with Chima Padua as we explore the intersection of conceptual materiality and contemporary aesthetics. Padua will discuss his latest series and the philosophical framework behind his evolving practice."
    },
    {
      slug: "artist-talk-freddie-peacock",
      title: "Artist Talks: Freddie Peacock",
      location: "Digital Access / Zoom",
      startDate: "2026-07-20",
      endDate: "2026-07-20",
      type: "Advisory Exclusive",
      imageSrc: "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg",
      description: "An exclusive Zoom presentation with Freddie Peacock. This session offers clients a unique opportunity to engage with Peacock's technical process and the psychological depth of his latest figurative works, preceding our upcoming private inventory update."
    }
  ];

  for (const item of dummyExhibitions) {
    console.log(`- ${item.title}`);
    const image = await uploadImage(item.imageSrc);
    await client.createOrReplace({
      _id: `exhibition-${item.slug}`,
      _type: 'exhibition',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      type: item.type,
      image: image || undefined,
      description: toPortableText(item.description),
    });
  }
}

async function migrateReports() {
  console.log('Migrating Reports...');
  const dummyReports = [
    { slug: "digital-provenance", title: "The Rise of Digital Provenance", summary: "An analysis of how cryptographic verification is reshaping the secondary market for contemporary art.", date: "2026-03-15T00:00:00Z" },
    { slug: "emerging-geographies", title: "Emerging Geographies", summary: "Exploring the vibrant cultural landscapes and evolving artistic movements across the Asia-Pacific region.", date: "2026-02-28T00:00:00Z" },
    { slug: "post-war-resurgence", title: "Post‑War Resurgence", summary: "A deep dive into the enduring influence of mid-century European abstractionists and their philosophical resonance today.", date: "2026-02-10T00:00:00Z" },
    { slug: "navigating-private-sale", title: "Navigating the Private Sale", summary: "A comprehensive guide for private collectors on executing discreet, high-value off-market transactions.", date: "2026-01-22T00:00:00Z" },
    { slug: "sculpture-spatial-assets", title: "Sculpture & Spatial Form", summary: "Examining the growing prominence of large-scale outdoor installations in contemporary private collections.", date: "2026-01-05T00:00:00Z" },
    { slug: "institutional-shift", title: "The Institutional Shift", summary: "How major museums' evolving curatorial focus is creating new opportunities for private collectors.", date: "2025-12-14T00:00:00Z" },
    { slug: "the-female-gaze", title: "The Female Gaze: A Re‑evaluation", summary: "Tracking the long-overdue critical recognition and evolving appreciation for mid-20th-century female surrealists.", date: "2025-11-15T00:00:00Z" }
  ];

  for (const item of dummyReports) {
    console.log(`- ${item.title}`);
    await client.createOrReplace({
      _id: `report-${item.slug}`,
      _type: 'report',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      summary: item.summary,
      publishedAt: item.date,
      gated: true,
    });
  }
}

async function migrateArtists() {
  console.log('Migrating Artists...');
  const dummyArtists = [
    {
      "slug": "freddie-peacock",
      "name": "Freddie Peacock",
      "bio": "Contemporary artist featured in the March Inventory.",
      "imageSrc": "/images/freddie-peacock/freddie-peacock.jpeg"
    }
  ];

  for (const item of dummyArtists) {
    console.log(`- ${item.name}`);
    const portrait = await uploadImage(item.imageSrc);
    await client.createOrReplace({
      _id: `artist-${item.slug}`,
      _type: 'artist',
      name: item.name,
      slug: { _type: 'slug', current: item.slug },
      portrait: portrait || undefined,
      bio: toPortableText(item.bio),
      featured: true,
    });
  }
}

async function migrateArtworks() {
  console.log('Migrating Artworks...');
  const dummyArtworks = [
    { "slug": "cat", "title": "Cat", "artist": "freddie-peacock", "year": "2024", "medium": "Acrylic on Canvas", "dimensions": "100cm x 150cm", "estimate": "", "status": "Available", "provenance": "A striking exploration of feline grace merged with bold street-art textures. This piece captures the enigmatic nature of the alley cat through layers of vibrant acrylic.", "imageSrc": ["/images/freddie-peacock/Cat.jpeg"] },
    { "slug": "kate-moss-calvin-klein", "title": "Kate Moss Calvin Klein", "artist": "freddie-peacock", "year": "2026", "medium": "Acrylic on Campaign Poster", "dimensions": "100cm x 130cm", "estimate": "", "status": "Available", "provenance": "A deconstructed homage to 90s minimalism and high-fashion iconography. Peacock overlays raw industrial strokes atop the legendary Calvin Klein aesthetic.", "imageSrc": ["/images/freddie-peacock/Kate Moss Calvin Klein.jpeg"] },
    { "slug": "supreme-x-lou-reed", "title": "Supreme x Lou Reed", "artist": "freddie-peacock", "year": "2026", "medium": "Acrylic on Campaign Poster", "dimensions": "100cm x 150cm", "estimate": "", "status": "Available", "provenance": "The intersection of downtown rock royalty and modern streetwear dominance. This work recontextualizes the 'cool' of Lou Reed for the high-velocity generation.", "imageSrc": ["/images/freddie-peacock/Supreme x Lou Reed.jpeg"] },
    { "slug": "burberry-x-4", "title": "Burberry x 4: Saka, Iris Law, Lennon Gallagher, Slew", "artist": "freddie-peacock", "year": "2026", "medium": "Acrylic on Campaign Posters", "dimensions": "100cm x 130cm (Lennon 100cm x 150cm)", "estimate": "", "status": "Available", "provenance": "A multifaceted study of modern British identity and high-fashion heritage. This quartet juxtaposes the timeless Burberry check with the faces of current cultural pioneers.", "imageSrc": ["/images/freddie-peacock/Burberry x 4 (1).jpeg", "/images/freddie-peacock/Burberry x 4 (2).jpeg"] },
    { "slug": "lima", "title": "Lima", "artist": "freddie-peacock", "year": "2024", "medium": "Acrylic on Canvas", "dimensions": "100cm x 150cm", "estimate": "", "status": "Available", "provenance": "An atmospheric tribute to South American urban life, rendered with a sophisticated, moody palette. The canvas vibrates with the low-frequency energy of a city at rest.", "imageSrc": ["/images/freddie-peacock/Lima.jpeg"] },
    { "slug": "honestly-i-dont-even-know", "title": "Honestly, I don't even know", "artist": "freddie-peacock", "year": "2023", "medium": "Mixed media on Cardboard", "dimensions": "Approx 100cm x 130cm", "estimate": "", "status": "Available", "provenance": "A chaotic yet deliberate explosion of pure creative impulse. This work invites the viewer to navigate its labyrinth of subconscious markings and abstract forms.", "imageSrc": ["/images/freddie-peacock/Honestly, I don't even know.jpeg"] },
    { "slug": "mr-white-print", "title": "Mr. White Print, edition of 23", "artist": "freddie-peacock", "year": "2023", "medium": "High grade art print. (same level as roger rabbits we did)", "dimensions": "Approx A1", "estimate": "", "status": "Available", "provenance": "A sleek, monochromatic dive into refined character study and graphic precision. Part of a limited series that explores the anonymity of contemporary style.", "imageSrc": ["/images/freddie-peacock/Mr White Paint, Edition of 23.jpeg"] },
    { "slug": "if-looks-could-kill", "title": "If Looks Could Kill", "artist": "freddie-peacock", "year": "2022", "medium": "Acrylic on Canvas", "dimensions": "70cm x 60cm", "estimate": "", "status": "Available", "provenance": "A hauntingly beautiful portrait that commands the room with its intense gaze. The artist masterfully blends high-contrast silhouettes with subtle urban grit.", "imageSrc": ["/images/freddie-peacock/If Looks Could Kill.jpeg"] },
    { "slug": "somewhere-no-where", "title": "Somewhere, No where", "artist": "freddie-peacock", "year": "2023", "medium": "Acrylic on Canvas", "dimensions": "70cm x 60cm x 2", "estimate": "", "status": "Available", "provenance": "A dreamlike landscape where urban structures dissolve into ethereal, painterly voids. A poignant reflection on the feeling of being present yet completely lost.", "imageSrc": ["/images/freddie-peacock/Somewhere, No where (1).jpeg", "/images/freddie-peacock/Somewhere, No where (2).jpeg"] },
    { "slug": "ricky-hitman-hatton-print", "title": "Ricky Hitman Hatton print unnumbered edition", "artist": "freddie-peacock", "year": "2025", "medium": "High grade art print", "dimensions": "A1", "estimate": "", "status": "Available", "provenance": "A powerful, grit-soaked celebration of a boxing legend's enduring spirit. This print captures the kinetic energy and raw determination of the Manchester 'Hitman'.", "imageSrc": ["/images/freddie-peacock/Ricky 'Hitman' Hatton - Print Unnumbered Edition.jpeg"] }
  ];

  for (const item of dummyArtworks) {
    console.log(`- ${item.title}`);
    const images = [];
    for (const src of item.imageSrc) {
      const img = await uploadImage(src);
      if (img) images.push({ ...img, _key: Math.random().toString(36).substring(7) });
    }

    await client.createOrReplace({
      _id: `artwork-${item.slug}`,
      _type: 'artwork',
      title: item.title,
      slug: { _type: 'slug', current: item.slug },
      artist: { _type: 'reference', _ref: `artist-${item.artist}` },
      images: images,
      year: item.year,
      medium: item.medium,
      dimensions: item.dimensions,
      provenance: toPortableText(item.provenance),
      status: item.status,
      featured: item.slug === 'cat', // example
    });
  }
}

async function run() {
  try {
    await migrateExhibitions();
    await migrateReports();
    await migrateArtists();
    await migrateArtworks();
    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

run();
