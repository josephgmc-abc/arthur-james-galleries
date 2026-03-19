"use client";

import { useState, useMemo } from "react";

import ArtworkCard from "@/components/ArtworkCard";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { ArtworkType } from "@/components/ArtworkClientView";

const parsePrice = (priceStr?: string) => {
  if (!priceStr || priceStr.toLowerCase().includes('request')) return Infinity; 
  const match = priceStr.match(/([A-Z]{3})\s*([\d,]+)/i);
  if (!match) {
    const backup = priceStr.replace(/,/g, '').match(/\d+/);
    return backup ? parseInt(backup[0], 10) : Infinity;
  }
  const val = parseInt(match[2].replace(/,/g, ''), 10);
  return val;
};

const parseYear = (yearStr?: string) => {
  if (!yearStr) return 0;
  const match = yearStr.match(/\d{4}/);
  if (match) return parseInt(match[0], 10);
  if (yearStr.toLowerCase().includes('20th')) {
    if (yearStr.toLowerCase().includes('mid')) return 1950;
    if (yearStr.toLowerCase().includes('late')) return 1980;
    if (yearStr.toLowerCase().includes('early')) return 1920;
    return 1950;
  }
  if (yearStr.toLowerCase().includes('21st')) return 2010;
  return 0;
};

type SortOption = "featured" | "price-desc" | "price-asc" | "year-desc" | "year-asc";
type PriceRange = "all" | "under-50k" | "50k-250k" | "over-250k";

export default function ArtworksClientFilter({ artworks }: { artworks: ArtworkType[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");

  const artistsList = useMemo(() => Array.from(new Set(artworks.map(a => a.artist))).sort(), [artworks]);

  const toggleArtist = (artist: string) => {
    setSelectedArtists(prev => 
      prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
    );
  };

  const processedArtworks = useMemo(() => {
    let result = [...artworks];

    if (selectedArtists.length > 0) {
      result = result.filter(a => selectedArtists.includes(a.artist));
    }

    if (priceRange !== "all") {
      result = result.filter(a => {
        const val = parsePrice(a.price);
        if (val === Infinity) return priceRange === "over-250k";
        
        if (priceRange === "under-50k") return val < 50000;
        if (priceRange === "50k-250k") return val >= 50000 && val <= 250000;
        if (priceRange === "over-250k") return val > 250000;
        return true;
      });
    }

    if (sortOption !== "featured") {
      result.sort((a, b) => {
        if (sortOption === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
        if (sortOption === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
        if (sortOption === "year-desc") return parseYear(b.year) - parseYear(a.year);
        if (sortOption === "year-asc") return parseYear(a.year) - parseYear(b.year);
        return 0;
      });
    }

    return result;
  }, [artworks, selectedArtists, sortOption, priceRange]);

  return (
    <>
      <section className="py-24 px-6 md:px-12">
        <div className="flex justify-between items-center mb-16 border-b-[1.5px] border-navy/10 pb-8">
          <span className="font-sans text-[10px] tracking-widest text-charcoal/50">
            Showing {processedArtworks.length} {processedArtworks.length === 1 ? 'work' : 'works'}
          </span>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="group flex items-center gap-3 font-sans text-xs tracking-widest text-navy hover:text-gold transition-colors duration-500"
          >
            <SlidersHorizontal strokeWidth={1.5} className="w-4 h-4" />
            <span>Filter & sort</span>
          </button>
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-10 md:gap-y-20"
        >
          <AnimatePresence>
            {processedArtworks.map((artwork) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={artwork.id}
              >
                <ArtworkCard 
                  title={artwork.title}
                  artist={artwork.artist}
                  year={artwork.year}
                  imageSrc={artwork.imageSrc}
                  slug={artwork.slug}
                  price={artwork.price}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {processedArtworks.length === 0 && (
          <div className="w-full text-center py-32">
            <p className="font-sans text-charcoal/50 tracking-widest text-xs">No works found for this selection.</p>
            <button 
              onClick={() => {
                setSelectedArtists([]);
                setPriceRange("all");
                setSortOption("featured");
              }}
              className="mt-8 font-sans text-[10px] tracking-[0.2em] text-navy border-b-[1.5px] border-navy pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-navy text-beige z-[70] flex flex-col shadow-2xl border-l-[1.5px] border-white/10"
            >
              <div className="flex justify-between items-center px-8 py-10 border-b-[1.5px] border-white/10">
                <span className="font-serif text-3xl text-beige">Filter & Sort</span>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-beige/50 hover:text-gold transition-colors duration-500"
                >
                  <X strokeWidth={1} className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-16 custom-scrollbar">
                
                <div className="flex flex-col gap-6">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold">Sort by</span>
                  <div className="flex flex-col gap-4 font-sans text-sm tracking-widest">
                    {[
                      { value: "featured", label: "Featured" },
                      { value: "price-desc", label: "Price: High to low" },
                      { value: "price-asc", label: "Price: Low to high" },
                      { value: "year-desc", label: "Recent: New to old" },
                      { value: "year-asc", label: "Recent: Old to new" },
                    ].map(opt => (
                      <label key={opt.value} className="flex items-center gap-4 cursor-pointer group">
                        <div className={`w-3 h-3 rounded-full border-[1.5px] transition-colors duration-300 flex items-center justify-center ${sortOption === opt.value ? 'border-gold' : 'border-beige/30 group-hover:border-beige/60'}`}>
                          {sortOption === opt.value && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
                        </div>
                        <input 
                          type="radio" 
                          name="sort" 
                          value={opt.value} 
                          checked={sortOption === opt.value}
                          onChange={(e) => setSortOption(e.target.value as SortOption)}
                          className="hidden"
                        />
                        <span className={`transition-colors duration-300 ${sortOption === opt.value ? 'text-white' : 'text-beige/60 group-hover:text-beige'}`}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold">Price range</span>
                  <div className="flex flex-col gap-4 font-sans text-sm tracking-widest">
                    {[
                      { value: "all", label: "All prices" },
                      { value: "under-50k", label: "Under $50,000" },
                      { value: "50k-250k", label: "$50,000 - $250,000" },
                      { value: "over-250k", label: "Over $250,000 & POA" },
                    ].map(opt => (
                      <label key={opt.value} className="flex items-center gap-4 cursor-pointer group">
                        <div className={`w-3 h-3 rounded-full border-[1.5px] transition-colors duration-300 flex items-center justify-center ${priceRange === opt.value ? 'border-gold' : 'border-beige/30 group-hover:border-beige/60'}`}>
                          {priceRange === opt.value && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
                        </div>
                        <input 
                          type="radio" 
                          name="priceRange" 
                          value={opt.value} 
                          checked={priceRange === opt.value}
                          onChange={(e) => setPriceRange(e.target.value as PriceRange)}
                          className="hidden"
                        />
                        <span className={`transition-colors duration-300 ${priceRange === opt.value ? 'text-white' : 'text-beige/60 group-hover:text-beige'}`}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="font-sans text-[10px] tracking-[0.3em] text-gold">Artists</span>
                  <div className="flex flex-col gap-4 font-sans text-sm tracking-widest">
                    {artistsList.map(artist => (
                      <label key={artist} className="flex items-center gap-4 cursor-pointer group">
                        <div className={`w-3 h-3 border-[1.5px] transition-colors duration-300 flex items-center justify-center ${selectedArtists.includes(artist) ? 'border-gold bg-gold/20' : 'border-beige/30 group-hover:border-beige/60'}`}>
                          {selectedArtists.includes(artist) && <div className="w-1.5 h-1.5 bg-gold" />}
                        </div>
                        <input 
                          type="checkbox" 
                          checked={selectedArtists.includes(artist)}
                          onChange={() => toggleArtist(artist)}
                          className="hidden"
                        />
                        <span className={`transition-colors duration-300 ${selectedArtists.includes(artist) ? 'text-white' : 'text-beige/60 group-hover:text-beige'}`}>
                          {artist}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              <div className="p-8 border-t-[1.5px] border-white/10 bg-navy mt-auto">
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-beige text-navy py-5 font-sans text-xs tracking-widest hover:bg-gold transition-colors duration-500"
                >
                  View results ({processedArtworks.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 1); 
        }
      `}} />
    </>
  );
}
