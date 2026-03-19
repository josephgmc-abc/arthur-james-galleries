"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArtworkCard from "./ArtworkCard";
import { ArtworkType } from "./ArtworkClientView";

interface StandardCarouselProps {
  artworks: ArtworkType[];
}

export default function StandardCarousel({ artworks }: StandardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.5 
        : scrollLeft + clientWidth * 0.5;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 hidden md:block">
        <button 
          onClick={() => scroll("left")}
          className="bg-navy text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold hover:scale-110 flex items-center justify-center border border-white/10"
          aria-label="Scroll Left"
        >
          <ChevronLeft strokeWidth={1} className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 hidden md:block">
        <button 
          onClick={() => scroll("right")}
          className="bg-navy text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold hover:scale-110 flex items-center justify-center border border-white/10"
          aria-label="Scroll Right"
        >
          <ChevronRight strokeWidth={1} className="w-6 h-6" />
        </button>
      </div>

      {/* Carousel Track */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-8 md:gap-12 pb-16 snap-x snap-mandatory hide-scrollbar px-6 md:px-12"
      >
        {artworks.map((artwork) => (
          <div key={artwork.id} className="shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw] snap-center">
            <ArtworkCard 
              title={artwork.title}
              artist={artwork.artist}
              year={artwork.year}
              imageSrc={artwork.imageSrc}
              slug={artwork.slug}
              price={artwork.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
