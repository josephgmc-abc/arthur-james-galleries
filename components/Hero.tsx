"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/michael-matloka-4a7K9tI_XFs-unsplash.jpg",
  "/images/antenna-jqh0GEvuNBY-unsplash.jpg",
  "/images/dannie-jing-3GZlhROZIQg-unsplash.jpg",
  "/images/jessica-pamp-JNTSoyb_bbw-unsplash.jpg",
  "/images/josh-liu-Tjio9DgtIls-unsplash.jpg",
];

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through the images every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[101vh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12 bg-navy">
      {/* Background Image Container */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt="Arthur James Galleries"
              fill
              priority
              className="object-cover opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient Overlay placed above the changing images */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent z-10" />
      </motion.div>
      
      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-4xl"
      >
        <h1 className="font-serif font-normal text-white text-5xl md:text-8xl leading-[1.1] tracking-tight mb-8">
          Defining <br />
          the legacy of art.
        </h1>
        <p className="text-white/80 font-sans text-lg tracking-wide max-w-lg mb-12">
          Advisory, acquisition, and curation for established collections and private institutions.
        </p>
        <Link href="/artworks" className="inline-block text-xs tracking-widest uppercase text-white border border-white/30 px-8 py-4 hover:bg-white hover:text-navy transition-all duration-700">
          Explore The Collection
        </Link>
      </motion.div>
    </div>
  );
}
