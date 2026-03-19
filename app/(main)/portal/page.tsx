"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

      <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center">
        <div className="bg-white/5 p-4 rounded-full backdrop-blur-md mb-8 border border-white/10">
          <Lock strokeWidth={1} className="w-8 h-8 text-gold opacity-80" />
        </div>
        <span className="font-sans text-[10px] tracking-[0.4em] text-gold uppercase mb-6 block">Client Portal</span>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
          Private Access
        </h1>
        <p className="font-sans text-sm text-beige/60 leading-relaxed font-light mb-16 max-w-md">
          A secure environment for viewing private acquisitions, portfolio valuations, and bespoke market intelligence.
        </p>

        {!isAuthenticated ? (
          <div className="w-full border-[1.5px] border-white/20 p-8 md:p-16 flex flex-col items-center bg-white/5 backdrop-blur-sm">
            <form 
              className="flex flex-col w-full gap-8"
              onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}
            >
              <div className="flex flex-col border-b-[1.5px] border-beige/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-beige/40 uppercase mb-2 text-left">Client ID or Email</label>
                <input 
                  type="text" 
                  className="bg-transparent outline-none text-beige font-sans text-base w-full focus:bg-transparent"
                  required
                />
              </div>
              <div className="flex flex-col border-b-[1.5px] border-beige/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-beige/40 uppercase mb-2 text-left">Access Token</label>
                <input 
                  type="password" 
                  className="bg-transparent outline-none text-beige font-sans text-base w-full focus:bg-transparent"
                  required
                />
              </div>
              
              <button type="submit" className="bg-beige text-navy font-sans text-xs uppercase tracking-[0.2em] px-12 py-5 hover:bg-gold hover:text-navy transition-all duration-500 mt-4">
                Authenticate
              </button>
              <p className="font-sans text-[9px] tracking-[0.2em] text-beige/30 uppercase mt-4">
                Strict discretion assured.
              </p>
            </form>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full border-[1.5px] border-white/20 p-8 md:p-16 flex flex-col items-center bg-white/5 backdrop-blur-sm"
          >
            <h2 className="font-serif text-3xl mb-6">Welcome back.</h2>
            <p className="font-sans text-sm text-beige/60 leading-relaxed max-w-md text-center mb-10">
              Your dedicated liaison is currently preparing your Q3 acquisition portfolio. You will receive a notification once the private viewing room is unlocked.
            </p>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="border-[1.5px] border-white/20 text-beige px-8 py-4 font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-navy transition-colors duration-500"
            >
              Sign Out
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
