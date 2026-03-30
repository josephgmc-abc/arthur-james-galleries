import { notFound } from "next/navigation";
import { getArtworks } from "@/data/api";
import ArtworkClientView from "@/components/ArtworkClientView";
import { Artwork } from "@/data/types";

// 1. Dynamic SEO & OpenGraph Generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artworks: Artwork[] = await getArtworks();
  const artwork = artworks.find((item) => item.slug === slug);

  if (!artwork) return { title: "Artwork Not Found | Arthur James Galleries" };

  const shareTitle = `${artwork.title} by ${artwork.artist}`;
  const shareDesc = `Explore this exceptional work from our private collection. ${artwork.medium ? `${artwork.medium}.` : ""} ${artwork.year ? `Year: ${artwork.year}.` : ""}`;

  return {
    title: `${shareTitle} | Arthur James Galleries`,
    description: shareDesc,
    openGraph: {
      title: shareTitle,
      description: shareDesc,
      siteName: "Arthur James Galleries",
      images: [
        {
          url: artwork.imageSrc,
          width: 1200,
          height: 630,
          alt: shareTitle,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDesc,
      images: [artwork.imageSrc],
    },
  };
}

export default async function ArtworkPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const artworks: Artwork[] = await getArtworks();
  const artwork = artworks.find((item) => item.slug === slug);

  if (!artwork) {
    notFound();
  }

  // Find related artworks by the same artist, excluding this exact one
  const relatedArtworks = artworks.filter(
    (a) => a.artist === artwork.artist && a.id !== artwork.id
  );

  return <ArtworkClientView artwork={artwork} relatedArtworks={relatedArtworks} />;
}
