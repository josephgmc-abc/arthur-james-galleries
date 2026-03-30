"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowRight } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error("Main Layout Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-beige text-navy px-6 text-center py-32">
      <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-8 block">System Alert</span>
      <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
        A Temporary <br /> Interruption.
      </h1>
      <p className="font-sans text-sm md:text-base text-charcoal/60 max-w-md leading-relaxed mb-12 font-light">
        Our intelligence feed has encountered a technical difficulty. This could be due to a momentary disruption in our global server network.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => reset()}
          className="group inline-flex items-center gap-4 bg-navy text-white px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-navy transition-all duration-700"
        >
          Re-establish Session
          <RefreshCw strokeWidth={1} className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
        </button>
        
        <Link 
          href="/artworks" 
          className="group inline-flex items-center gap-4 border border-navy/20 text-navy px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all duration-700"
        >
          Return to Gallery
          <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
        </Link>
      </div>
      
      <div className="mt-24 pt-12 border-t border-navy/10 w-full max-w-xs">
        <p className="font-sans text-[9px] tracking-[0.2em] text-charcoal/30 uppercase italic">
          Error Ref: {error.digest?.substring(0, 8).toUpperCase() || "INTERNAL-001"}
        </p>
      </div>
    </div>
  );
}
