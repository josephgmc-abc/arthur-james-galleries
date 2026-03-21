/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { getArtworks } from "@/data/api";
import ArtworkClientView from "@/components/ArtworkClientView";

// 1. Dynamic SEO & OpenGraph Generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artworks = await getArtworks();
  const artwork = artworks.find((item: any) => item.slug === slug);

  if (!artwork) return {};

  return {
    title: `${artwork.title} by ${artwork.artist} | Arthur James Galleries`,
    description: `Explore "${artwork.title}" by ${artwork.artist}. Estimated at ${artwork.price}. ${artwork.provenance || ""}`,
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
  const artworks = await getArtworks();
  const artwork = artworks.find((item: any) => item.slug === slug);

  if (!artwork) {
    notFound();
  }

  // Find related artworks by the same artist, excluding this exact one
  const relatedArtworks = artworks.filter(
    (a: any) => a.artist === artwork.artist && a.id !== artwork.id
  );

  return <ArtworkClientView artwork={artwork} relatedArtworks={relatedArtworks} />;
}
