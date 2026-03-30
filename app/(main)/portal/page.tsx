"use client";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function PortalPage() {
  return (
    <div className="flex flex-col w-full bg-navy min-h-screen pt-32 pb-32 px-6 md:px-12 text-beige items-center justify-center relative overflow-hidden">
      
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg"
          alt="Portal Background"
          fill
          priority
          className="object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" />
      </div>

      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center">
        <div className="bg-white/5 p-4 rounded-full backdrop-blur-md mb-8 border border-white/10">
          <Lock strokeWidth={1} className="w-8 h-8 text-gold opacity-80" />
        </div>
        <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">Client Portal</span>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
          Private Access
        </h1>
        
        <div className="w-full border-[1.5px] border-white/20 p-8 md:p-16 flex flex-col items-center bg-white/5 backdrop-blur-sm mt-8">
          <h2 className="font-serif text-3xl mb-6">Exclusivity Assured.</h2>
          <p className="font-sans text-sm text-beige/60 leading-relaxed max-w-md text-center mb-10">
            This secure environment is reserved for private acquisitions and bespoke market intelligence. Your dedicated gallery liaison manages all updates to your private viewing room and collection history directly.
          </p>
          <p className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase border-t border-white/10 pt-8 w-full">
            Correspondence is strictly confidential.
          </p>
        </div>
      </div>
    </div>
  );
}
