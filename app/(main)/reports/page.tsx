import { Metadata } from "next";
import ReportCard from "@/components/ReportCard";
import { getReports } from "@/data/api";
import Link from "next/link";
import Image from "next/image";
import { Report } from "@/data/types";

export const metadata: Metadata = {
  title: "Market Intelligence | Arthur James Galleries",
  description: "Proprietary market research and quarterly analysis for the dedicated art collector. Private access to our exclusive archival data.",
};

export default async function ReportsPage() {
  const reports: Report[] = await getReports();

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen">
      {/* Video Hero Section */}
      <section className="relative h-[75vh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12">
        {/* Placeholder Video / Overlay */}
        <div className="absolute inset-0 bg-navy z-0">
          <div className="absolute inset-0 bg-navy/40 z-10" />
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-70"
          >
            <source src="/videos/herovideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent z-10 opacity-60" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">The Private Journal</span>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight">
            Market <br /> Intelligence
          </h1>
          <p className="font-sans text-sm md:text-base text-white/80 max-w-lg leading-relaxed font-light">
            Proprietary research and quarterly market reviews for the global collector.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-32 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-6xl text-navy mb-6">Archive</h2>
            <p className="font-sans text-lg text-charcoal/70 leading-relaxed">
              Explore our full catalogue of research papers, legislative updates, and secondary market analysis.
            </p>
          </div>
          <div className="flex items-center gap-3 font-sans text-[10px] tracking-widest uppercase text-charcoal/50">
            <span>Sort by:</span>
            <span className="text-navy border-b-[1.5px] border-navy pb-1 font-medium">New to Old</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-8 md:gap-y-16 mb-16">
          {reports.map((report: any) => (
            <ReportCard 
              key={report.slug}
              title={report.title}
              summary={report.summary}
              date={report.date}
              href={`/reports/${report.slug}`}
              dark={false} // Using the light variant on the beige background
            />
          ))}
        </div>
      </section>

      {/* Bespoke Intelligence Callout */}
      <section className="py-48 px-6 md:px-12 bg-navy text-beige flex justify-center border-t-[1.5px] border-navy/10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-24 items-center">
           <div className="flex-1">
              <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-8 block">Private Advisory</span>
              <h3 className="font-serif text-5xl md:text-7xl text-beige mb-10 leading-tight">Bespoke <br /> Intelligence</h3>
              <p className="font-sans text-lg text-beige/70 leading-relaxed mb-12 font-light max-w-lg">
                In addition to our public journal, Arthur James Galleries provides personalised acquisition strategies and collection management for private family offices.
              </p>
              <Link href="/contact" className="inline-block bg-beige text-navy px-12 py-6 font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-gold transition-colors duration-500">
                Discuss Advisory Services
              </Link>
           </div>
           <div className="flex-1 w-full relative aspect-[4/5] lg:aspect-square overflow-hidden border-[1.5px] border-white/20 p-4 md:p-6">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg" 
                  alt="Private Advisory" 
                  fill
                  className="object-cover grayscale opacity-90"
                />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
