"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface SafeImageProps extends ImageProps {
  fallbackClassName?: string;
}

export default function SafeImage({ src, alt, fallbackClassName, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-navy/[0.03]">
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-beige animate-pulse"
          />
        )}
      </AnimatePresence>

      {error ? (
        <div className={`flex flex-col items-center justify-center w-full h-full bg-navy/5 p-8 text-center ${fallbackClassName}`}>
          <div className="w-12 h-px bg-navy/20 mb-4" />
          <span className="font-sans text-[10px] tracking-[0.3em] text-navy/30 uppercase">Image Unavailable</span>
          <span className="font-serif text-xs text-navy/20 mt-2 italic">Arthur James Galleries</span>
        </div>
      ) : (
        <Image
          {...props}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`transition-all duration-[1.5s] ease-[0.16,1,0.3,1] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } ${props.className || ""}`}
        />
      )}
    </div>
  );
}
