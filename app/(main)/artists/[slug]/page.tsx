/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtists, getArtworks } from "@/data/api";
import ArtworkCard from "@/components/ArtworkCard";
import { ArrowLeft } from "lucide-react";

export default async function ArtistProfilePage({ params }: { params: { slug: string } }) {
  // Wait for params to resolve in Next.js App Router dynamic routes
  const { slug } = await params;
  
  const artists = await getArtists();
  const artist = artists.find((item: any) => item.slug === slug);

  if (!artist) {
    notFound();
  }

  const artworks = await getArtworks();
  // Find all artworks associated with this artist
  const artistArtworks = artworks.filter(
    (artwork: any) => artwork.artist === artist.name
  );

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-32 px-6 md:px-12">
      <Link href="/artists" className="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-charcoal/50 hover:text-gold transition-colors duration-500 mb-16 w-fit">
        <ArrowLeft strokeWidth={1} className="w-4 h-4" />
        Back to Available Artists
      </Link>

      {/* Artist Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 border-b-[1.5px] border-navy/20 pb-32">
        <div className="lg:col-span-5 relative aspect-[3/4] w-full overflow-hidden bg-navy/5">
          <Image
            src={artist.imageSrc}
            alt={artist.name}
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
        
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="font-serif text-5xl md:text-7xl leading-none mb-12 text-navy">
            {artist.name}
          </h1>
          <div className="prose prose-lg prose-p:font-sans prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:tracking-wide max-w-2xl">
            <p>{artist.bio}</p>
          </div>
        </div>
      </div>

      {/* Artist's Artworks Section */}
      <div>
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-serif text-4xl md:text-5xl">Available Works</h2>
          <span className="font-sans text-xs tracking-widest uppercase text-charcoal/50">
            {artistArtworks.length} {artistArtworks.length === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        {artistArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-10 md:gap-y-20">
            {artistArtworks.map((artwork: any) => (
              <ArtworkCard 
                key={artwork.id}
                title={artwork.title}
                artist={artwork.artist}
                year={artwork.year}
                imageSrc={artwork.imageSrc}
                slug={artwork.slug}
                price={artwork.price}
                status={artwork.status}
              />
            ))}
          </div>
        ) : (
          <p className="font-sans text-charcoal/50 italic tracking-wide">
            There are currently no publicly available works for this artist.
          </p>
        )}
      </div>
    </div>
  );
}
