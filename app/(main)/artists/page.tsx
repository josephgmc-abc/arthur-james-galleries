/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { getArtists } from "@/data/api";

export default async function ArtistsDirectoryPage() {
  const artists = await getArtists();
  // Sort artists: Featured first, then alphabetically
  const sortedArtists = [...artists].sort((a: any, b: any) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen">
      {/* Sophisticated Hero Banner */}
      <section className="relative h-[65vh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12 bg-navy">
        <div className="absolute inset-0 bg-navy z-0">
          <Image 
            src="/images/dannie-jing-3GZlhROZIQg-unsplash.jpg"
            alt="Artists Directory"
            fill
            priority
            className="object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">Our Roster</span>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            Represented <br /> Artists
          </h1>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-lg leading-relaxed font-light tracking-wide uppercase">
            We proudly represent and advise on acquisitions from a highly curated selection of the most significant figures in modern and contemporary art.
          </p>
        </div>
      </section>
      
      {/* Main Directory */}
      <section className="py-32 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
          {sortedArtists.map((artist) => (
            <Link href={`/artists/${artist.slug}`} key={artist.slug} className="group cursor-pointer flex flex-col gap-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy/5">
                <Image
                  src={artist.imageSrc}
                  alt={artist.name}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
              <div className="flex justify-between items-baseline border-b-[1.5px] border-navy/20 pb-4">
                <h3 className="font-serif text-3xl tracking-wide group-hover:text-gold transition-colors duration-500">{artist.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
