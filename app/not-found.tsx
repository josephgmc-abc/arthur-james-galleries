import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-beige text-navy px-6 text-center">
      <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-8 block">Private Intelligence</span>
      <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">
        A Discreet <br /> Disconnection.
      </h1>
      <p className="font-sans text-sm md:text-base text-charcoal/60 max-w-md leading-relaxed mb-12 font-light">
        This corridor is currently private or does not exist. Allow us to guide you back to the public viewing room.
      </p>
      
      <Link 
        href="/artworks" 
        className="group inline-flex items-center gap-4 bg-navy text-white px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-navy transition-all duration-700"
      >
        Return to Gallery
        <ArrowRight strokeWidth={1} className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
      </Link>
      
      <div className="mt-24 pt-12 border-t border-navy/10 w-full max-w-xs">
        <p className="font-sans text-[9px] tracking-[0.2em] text-charcoal/30 uppercase italic">
          Strict Discretion Assured
        </p>
      </div>
    </div>
  );
}
