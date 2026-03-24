/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Hero from "@/components/Hero";
import ReportCard from "@/components/ReportCard";
import StandardCarousel from "@/components/StandardCarousel";
import SubscribeForm from "@/components/SubscribeForm";
import { getArtworks, getReports, getExhibitions } from "@/data/api";

const Divider = () => <div className="mx-6 md:mx-12 h-[1.5px] bg-navy/20" />;

export default async function Home() {
  const allArtworks = await getArtworks();
  const reports = await getReports();
  const exhibitions = await getExhibitions();

  // Prioritize featured artworks and artworks by featured artists for the homepage
  const featuredArtworks = allArtworks.filter((art: any) => art.featured || art.artistFeatured);
  
  // Fallback to all artworks if none are marked featured (to avoid empty section)
  const displayArtworks = featuredArtworks.length > 0 ? featuredArtworks : allArtworks;

  return (
    <div className="flex flex-col w-full bg-beige">
      <Hero />
      
      {/* Featured Artworks Section */}
      <section className="py-32 bg-beige">
        <div className="flex justify-between items-end mb-16 px-6 md:px-12">
          <h2 className="font-serif text-4xl md:text-5xl">Selected Works</h2>
          <Link href="/artworks" className="font-sans text-xs tracking-widest uppercase hover:text-gold transition-colors duration-500 hidden md:block">
            View All Artworks
          </Link>
        </div>
        
        <StandardCarousel artworks={displayArtworks.slice(0, 10)} />
      </section>

      <Divider />

      {/* 2026 Guide Email Capture */}
      <section className="py-48 px-6 md:px-12 bg-navy flex flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center w-full max-w-3xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-10">Private Intelligence</span>
          <h2 className="font-serif text-5xl md:text-8xl text-beige mb-10 leading-[1.1] tracking-tight">
            The 2026 <br /> Market Report.
          </h2>
          <p className="font-sans text-base md:text-lg text-beige/60 mb-16 max-w-xl leading-relaxed font-light">
            Acquisition advice, quarterly performance analysis, and private viewing invitations. Reserved for the discerning collector.
          </p>
          
          <SubscribeForm />
        </div>
      </section>

      <Divider />

      {/* Exhibitions Section */}
      <section className="py-32 px-6 md:px-12 bg-beige">
        <div className="flex justify-between items-end mb-24">
          <div className="max-w-2xl">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase mb-4 block">Global Calendar</span>
            <h2 className="font-serif text-4xl md:text-6xl text-navy">Current & <br /> Upcoming Exhibitions</h2>
          </div>
          <Link href="/exhibitions" className="font-sans text-xs uppercase tracking-widest hover:text-gold transition-colors duration-500 hidden md:block border-b-[1.5px] border-navy/30 pb-1">
            View Full Schedule
          </Link>
        </div>

        <div className="flex flex-col gap-0">
          {exhibitions.slice(0, 3).map((exhibition: any) => (
            <Link href={`/exhibitions/${exhibition.slug}`} key={exhibition.slug} className="group border-t-[1.5px] border-navy/20 py-12 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-navy/[0.02] transition-colors duration-500 px-4 -mx-4 cursor-pointer">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-[0.2em] text-charcoal/40 uppercase group-hover:text-gold transition-colors duration-500">{exhibition.dates}</span>
                <h3 className="font-serif text-3xl md:text-4xl text-navy group-hover:translate-x-2 transition-transform duration-700 ease-out">{exhibition.title}</h3>
              </div>
              <div className="flex flex-col md:items-end gap-1 mt-6 md:mt-0 text-right">
                <p className="font-sans text-sm text-charcoal/80">{exhibition.location}</p>
                <p className="font-sans text-[10px] tracking-widest text-charcoal/40 uppercase">{exhibition.type}</p>
              </div>
            </Link>
          ))}
          <div className="border-t-[1.5px] border-navy/20"></div>
        </div>
      </section>

      <Divider />

      {/* Market Insights */}
      <section className="py-32 px-6 md:px-12 bg-navy">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-beige">Market Insights</h2>
          <Link href="/reports" className="font-sans text-xs uppercase tracking-widest text-beige/50 hover:text-gold transition-colors duration-500 hidden md:block border-b-[1.5px] border-white/20 pb-1">
            View All Reports
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-16">
          {reports.slice(0, 6).map((report: any) => (
            <ReportCard 
              key={report.slug}
              dark
              title={report.title}
              summary={report.summary}
              date={report.date}
              href={`/reports/${report.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
