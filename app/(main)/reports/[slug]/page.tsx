import Link from "next/link";
import { notFound } from "next/navigation";
import { dummyReports } from "@/data/reports";
import { ArrowLeft, Lock } from "lucide-react";

export default async function ReportDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  
  const report = dummyReports.find((item) => item.slug === slug);

  if (!report) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full bg-navy min-h-screen pt-32 pb-32 px-6 md:px-12 text-beige">
      <div className="w-full max-w-3xl mb-16">
        <Link href="/reports" className="inline-flex items-center gap-4 text-xs tracking-widest text-beige/50 hover:text-gold transition-colors duration-500 mb-16 w-fit border-b border-transparent hover:border-gold pb-1">
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back to Journal
        </Link>
      </div>

      <div className="w-full max-w-3xl text-center flex flex-col items-center">
        <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">{report.date}</span>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
          {report.title}
        </h1>
        <p className="font-sans text-lg text-beige/60 leading-relaxed font-light mb-16 max-w-2xl">
          {report.summary}
        </p>

        {/* Gated Content Box */}
        <div className="w-full border-[1.5px] border-white/20 p-8 md:p-16 flex flex-col items-center bg-white/5 backdrop-blur-sm relative mt-8">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-navy px-6">
            <Lock strokeWidth={1} className="w-8 h-8 text-gold opacity-80" />
          </div>

          <h2 className="font-serif text-3xl mb-6 mt-4">Restricted Access</h2>
          <p className="font-sans text-sm text-beige/60 leading-relaxed max-w-md text-center mb-10">
            This proprietary analysis is reserved exclusively for Arthur James Galleries advisory clients and registered institutional partners.
          </p>

          <form className="flex flex-col w-full max-w-md gap-6">
            <div className="flex flex-col border-b-[1.5px] border-beige/20 focus-within:border-gold transition-colors duration-500 pb-2">
              <label className="font-sans text-[10px] tracking-[0.2em] text-beige/40 uppercase mb-2 text-left">Email Address</label>
              <input 
                type="email" 
                className="bg-transparent outline-none text-beige font-sans text-base w-full focus:bg-transparent"
                required
              />
            </div>

            <button type="submit" className="bg-beige text-navy font-sans text-xs uppercase tracking-[0.2em] px-12 py-5 hover:bg-gold hover:text-navy transition-all duration-500 mt-4">
              Request Full Report (PDF)
            </button>
            <p className="font-sans text-[9px] tracking-[0.2em] text-beige/30 uppercase mt-4">
              Credentials will be verified manually by your gallery liaison.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
