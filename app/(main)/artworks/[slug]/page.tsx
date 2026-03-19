import { notFound } from "next/navigation";
import { dummyArtworks } from "@/data/artworks";
import ArtworkClientView from "@/components/ArtworkClientView";

// 1. Dynamic SEO & OpenGraph Generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artwork = dummyArtworks.find((item) => item.slug === slug);

  if (!artwork) return {};

  return {
    title: `${artwork.title} by ${artwork.artist} | Arthur James Galleries`,
    description: `Explore "${artwork.title}" by ${artwork.artist}. Estimated at ${artwork.price}. Property from a distinguished private collection.`,
    openGraph: {
      title: `${artwork.title} | ${artwork.artist}`,
      description: `Inquire about "${artwork.title}" (${artwork.year}) through Arthur James Galleries.`,
      images: [
        {
          url: artwork.imageSrc,
          width: 1200,
          height: 630,
          alt: `${artwork.title} by ${artwork.artist}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function ArtworkPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artwork = dummyArtworks.find((item) => item.slug === slug);

  if (!artwork) {
    notFound();
  }

  // Find related artworks by the same artist, excluding this exact one
  const relatedArtworks = dummyArtworks.filter(
    (a) => a.artist === artwork.artist && a.id !== artwork.id
  );

  return <ArtworkClientView artwork={artwork} relatedArtworks={relatedArtworks} />;
}
