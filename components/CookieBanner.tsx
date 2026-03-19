"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("arthur_james_cookie_consent");
    if (!consent) {
      // Small delay so it doesn't clash immediately with the geo banner
      const timer = setTimeout(() => setShowCookieBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("arthur_james_cookie_consent", "true");
    setShowCookieBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("arthur_james_cookie_consent", "false");
    setShowCookieBanner(false);
  };

  return (
    <AnimatePresence>
      {showCookieBanner && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:bottom-12 z-[100] bg-navy border-[1.5px] border-white/20 p-6 md:p-8 max-w-sm shadow-2xl flex flex-col gap-6 text-white"
        >
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[9px] tracking-[0.3em] text-gold uppercase">Privacy & Data</span>
            <h3 className="font-serif text-2xl tracking-wide">Cookie Policy</h3>
            <p className="font-sans text-xs text-white/70 leading-relaxed font-light mt-2">
              Arthur James Galleries uses essential cookies to ensure the security and functionality of our platform, alongside analytical tracking to refine your bespoke experience.
            </p>
          </div>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={handleAccept}
              className="bg-white text-navy font-sans text-[9px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-gold transition-colors duration-500 flex-1"
            >
              Accept All
            </button>
            <button 
              onClick={handleDecline}
              className="bg-transparent border-[1.5px] border-white/20 text-white font-sans text-[9px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white/10 transition-colors duration-500 flex-1"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
