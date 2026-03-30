import { Metadata } from "next";
import Image from "next/image";
import { getArtworks } from "@/data/api";
import ArtworksClientFilter from "@/components/ArtworksClientFilter";

export const metadata: Metadata = {
  title: "Viewing Room | Arthur James Galleries",
  description: "Explore our curated collection of contemporary and modern masterpieces. Private acquisitions and bespoke advisory for the dedicated collector.",
};

export default async function ArtworksPage() {
  const artworks = await getArtworks();

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen">
      {/* Sophisticated Hero Banner */}
      <section className="relative h-[65vh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12 bg-navy">
        <div className="absolute inset-0 bg-navy z-0">
          <Image 
            src="/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg"
            alt="Viewing Room"
            fill
            priority
            className="object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6 block">The collection</span>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            Viewing <br /> Room
          </h1>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-lg leading-relaxed font-light tracking-wide">
            An exclusive selection of modern and contemporary works, curated for our most discerning collectors.
          </p>
        </div>
      </section>

      {/* Main Content with Filter */}
      <ArtworksClientFilter artworks={artworks} />
    </div>
  );
}
