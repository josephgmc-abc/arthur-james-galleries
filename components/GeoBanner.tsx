"use client";

import { useCurrency } from "./CurrencyContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getFlagEmoji = (countryCode: string | null) => {
  if (!countryCode) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function GeoBanner() {
  const { showBanner, dismissBanner, detectedCountryName, detectedCountryCode, isInternational, currency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 w-full z-[100] bg-navy text-white px-6 py-2 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8 font-serif text-sm md:text-base border-b border-white/10 shadow-lg"
        >
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-lg">{getFlagEmoji(detectedCountryCode)}</span>
            {isInternational ? (
              <span className="leading-tight">You are visiting from {detectedCountryName || 'an international location'}. You have been directed to the international site (USD).</span>
            ) : (
              <span className="leading-tight">You are on the {detectedCountryName} store ({currency}).</span>
            )}
          </div>
          <button 
            onClick={dismissBanner} 
            className="px-3 py-1 border border-white/20 text-white font-sans text-[8px] tracking-[0.2em] uppercase hover:bg-white hover:text-navy transition-colors duration-500 shrink-0"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
