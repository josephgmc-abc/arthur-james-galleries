import Link from "next/link";
import Image from "next/image";
import { getExhibitions } from "@/data/api";
import { Exhibition } from "@/data/types";

export default async function ExhibitionsPage() {
  const exhibitions: Exhibition[] = await getExhibitions();

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[65vh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12 bg-navy">
        <div className="absolute inset-0 bg-navy z-0">
          <Image 
            src="/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"
            alt="Exhibitions"
            fill
            priority
            className="object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold mb-6 block uppercase">Global Calendar</span>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            Current & <br /> Upcoming
          </h1>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-lg leading-relaxed font-light tracking-wide uppercase">
            Curated exhibitions and private viewings at our international locations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 px-6 md:px-12 bg-beige">
        <div className="flex flex-col gap-0 max-w-6xl mx-auto">
          {exhibitions.map((exhibition: any) => (
            <Link href={`/exhibitions/${exhibition.slug}`} key={exhibition.slug} className="group border-t-[1.5px] border-navy/20 py-16 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-navy/[0.02] transition-colors duration-500 px-6 -mx-6 cursor-pointer">
              <div className="flex flex-col gap-4 max-w-3xl">
                <span className="font-sans text-[10px] tracking-[0.2em] text-charcoal/40 uppercase group-hover:text-gold transition-colors duration-500">{exhibition.dates}</span>
                <h3 className="font-serif text-4xl md:text-5xl text-navy group-hover:translate-x-2 transition-transform duration-700 ease-out leading-tight">{exhibition.title}</h3>
                <p className="font-sans text-base text-charcoal/60 leading-relaxed mt-2 line-clamp-2 md:line-clamp-none max-w-2xl">{exhibition.description}</p>
              </div>
              <div className="flex flex-col md:items-end gap-2 mt-8 md:mt-0 text-left md:text-right shrink-0">
                <p className="font-sans text-base text-charcoal/80">{exhibition.location}</p>
                <p className="font-sans text-[10px] tracking-widest text-charcoal/40 uppercase">{exhibition.type}</p>
                <span className="mt-4 font-sans text-[10px] tracking-widest uppercase text-navy border-b-[1.5px] border-navy/20 pb-1 group-hover:text-gold group-hover:border-gold transition-colors duration-500">
                  View Details
                </span>
              </div>
            </Link>
          ))}
          <div className="border-t-[1.5px] border-navy/20"></div>
        </div>
      </section>
    </div>
  );
}
