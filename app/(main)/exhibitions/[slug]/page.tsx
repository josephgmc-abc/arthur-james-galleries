/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExhibitions } from "@/data/api";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";

export default async function ExhibitionDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const exhibitions = await getExhibitions();
  const exhibition = exhibitions.find((item: any) => item.slug === slug);

  if (!exhibition) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-32 px-6 md:px-12 text-navy">
      <Link href="/exhibitions" className="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-charcoal/50 hover:text-gold transition-colors duration-500 mb-16 w-fit">
        <ArrowLeft strokeWidth={1} className="w-4 h-4" />
        Back to Exhibitions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
        {/* Exhibition Header & Metadata */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">Exhibition</span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] mb-12 text-navy">
            {exhibition.title}
          </h1>

          <div className="flex flex-col gap-8 border-y-[1.5px] border-navy/20 py-12">
            <div className="flex items-start gap-6">
              <Calendar strokeWidth={1} className="w-6 h-6 text-gold shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Dates</span>
                <p className="font-sans text-base text-navy">{exhibition.dates}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <MapPin strokeWidth={1} className="w-6 h-6 text-gold shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Location</span>
                <p className="font-sans text-base text-navy">{exhibition.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <Tag strokeWidth={1} className="w-6 h-6 text-gold shrink-0 mt-1" />
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Access</span>
                <p className="font-sans text-base text-navy">{exhibition.type}</p>
              </div>
            </div>
          </div>

          <Link 
            href="/contact"
            className="w-full bg-navy text-white text-center px-8 py-5 font-sans text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-500 mt-12 block"
          >
            Request Private Viewing
          </Link>
        </div>

        {/* Exhibition Image & Description */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5 border-[1.5px] border-navy/10 p-4">
            <div className="relative w-full h-full">
              <Image
                src={exhibition.imageSrc}
                alt={exhibition.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
            </div>
          </div>
          
          <div className="prose prose-lg prose-p:font-sans prose-p:text-charcoal/80 prose-p:leading-relaxed prose-p:tracking-wide max-w-none">
            <p className="text-xl md:text-2xl font-serif text-navy leading-relaxed mb-6">
              {exhibition.description}
            </p>
            <p>
              Our exhibitions are meticulously curated to provide an immersive experience into the artist&apos;s world. Whether you are expanding an established collection or exploring new acquisitions, our gallery directors are available for bespoke walkthroughs and advisory sessions.
            </p>
            <p>
              Please note that access to certain monumental works and off-market pieces may be restricted to private viewing appointments only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
