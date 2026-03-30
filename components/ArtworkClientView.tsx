"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, Maximize2, Share2, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StandardCarousel from "@/components/StandardCarousel";
import { useCurrency } from "./CurrencyContext";
import SafeImage from "./SafeImage";

export interface ArtworkType {
  id: string;
  slug: string;
  title: string;
  artist: string;
  year: string;
  price: string;
  medium?: string;
  dimensions?: string;
  provenance?: string;
  imageSrc: string;
  featured?: boolean;
  artistFeatured?: boolean;
  status?: string;
}

interface ArtworkClientViewProps {
  artwork: ArtworkType;
  relatedArtworks: ArtworkType[];
}

export default function ArtworkClientView({ artwork, relatedArtworks }: ArtworkClientViewProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const { formatPrice } = useCurrency();

  const handleShare = async () => {
    const shareData = {
      title: `${artwork.title} | ${artwork.artist}`,
      text: `View "${artwork.title}" by ${artwork.artist} at Arthur James Galleries.`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleDownloadDossier = async () => {
    try {
      setIsDownloading(true);
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ format: "a4", unit: "mm" });
      
      // Load Cormorant Garamond Regular
      try {
        const cormorantBlob = await fetch('/fonts/CormorantGaramond-Regular.ttf').then(r => {
          if (!r.ok) throw new Error('Cormorant font not found');
          return r.blob();
        });
        const cormorantBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(cormorantBlob);
        });
        doc.addFileToVFS('CormorantGaramond-Regular.ttf', cormorantBase64);
        doc.addFont('CormorantGaramond-Regular.ttf', 'CormorantGaramond', 'normal');
      } catch (fontErr) {
        console.warn("Could not load Cormorant font for PDF, using fallback:", fontErr);
        // jspdf will use default 'times'
      }

      // Load Neue Haas Grotesk Roman
      try {
        const neueBlob = await fetch('/fonts/NeueHaasGrotText-Roman.ttf').then(r => {
          if (!r.ok) throw new Error('Neue Haas font not found');
          return r.blob();
        });
        const neueBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(neueBlob);
        });
        doc.addFileToVFS('NeueHaasGrotText-Roman.ttf', neueBase64);
        doc.addFont('NeueHaasGrotText-Roman.ttf', 'NeueHaasGrotesk', 'normal');
      } catch (fontErr) {
        console.warn("Could not load Neue Haas font for PDF, using fallback:", fontErr);
        // jspdf will use default 'helvetica'
      }

      // Helper function to draw the header
      const drawHeader = () => {
        doc.setFont("CormorantGaramond", "normal");
        doc.setFontSize(28);
        doc.setTextColor(20, 20, 20);
        doc.text("Arthur James Galleries", 20, 25);
        
        doc.setFont("NeueHaasGrotesk", "normal");
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("PRIVATE & CONFIDENTIAL DOSSIER", 20, 32);

        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.5);
        doc.line(20, 40, 190, 40);
      };

      // Helper function to draw the footer
      const drawFooter = () => {
        doc.setFont("NeueHaasGrotesk", "normal");
        doc.setFontSize(8);
        doc.setTextColor(180, 180, 180);
        doc.text("Arthur James Galleries | London & Berlin", 20, 285);
        doc.text(new Date().getFullYear().toString(), 190, 285, { align: "right" });
      };

      // PAGE 1: HERO IMAGE & BASIC INFO & DETAILS
      drawHeader();

      let currentY = 50;

      // Try to add the image, but don't fail the whole document if it fails
      try {
        // Use a proxy for external images (Sanity CDN) to avoid CORS issues on deployed sites
        const isExternal = artwork.imageSrc.startsWith('http');
        const fetchUrl = isExternal 
          ? `/api/proxy-image?url=${encodeURIComponent(artwork.imageSrc)}`
          : artwork.imageSrc;

        const imgBlob = await fetch(fetchUrl).then(r => {
          if (!r.ok) throw new Error("Image not found");
          return r.blob();
        });
        const base64data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imgBlob);
        });

        const maxWidth = 170;
        const maxHeight = 100;
        const imgProps = doc.getImageProperties(base64data);
        const ratio = imgProps.width / imgProps.height;
        let width = maxWidth;
        let height = maxWidth / ratio;
        
        if (height > maxHeight) {
          height = maxHeight;
          width = maxHeight * ratio;
        }
        
        const xOffset = 20 + (maxWidth - width) / 2;
        doc.addImage(base64data, 'JPEG', xOffset, currentY, width, height); 
        currentY += height + 15;
      } catch (e) {
        console.warn("Could not include image in PDF:", e);
        currentY += 10; // Add small spacing since image is missing
      }

      // Details section - outside the image try/catch so it ALWAYS renders
      doc.setFont("NeueHaasGrotesk", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`${artwork.artist ? artwork.artist.toUpperCase() : "UNKNOWN ARTIST"}`, 20, currentY);
      
      doc.setTextColor(20, 20, 20);
      doc.setFont("CormorantGaramond", "normal");
      doc.setFontSize(26);
      const splitTitleHero = doc.splitTextToSize(artwork.title, 170);
      doc.text(splitTitleHero, 20, currentY + 10);
      
      const heroTitleHeight = splitTitleHero.length * 10;
      doc.setFont("NeueHaasGrotesk", "normal");
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text(`${artwork.year || "Unknown"}`, 20, currentY + 10 + heroTitleHeight - 2);

      // Details Box
      const startY = currentY + 10 + heroTitleHeight + 15;
      
      // Left Column (Details)
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("ESTIMATED PRICE", 20, startY);
      doc.setTextColor(20, 20, 20);
      doc.setFont("NeueHaasGrotesk", "normal");
      doc.setFontSize(14);
      doc.text(formatPrice(artwork.price), 20, startY + 6);

      doc.setFont("NeueHaasGrotesk", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("MEDIUM", 20, startY + 20);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      doc.text(artwork.medium || "Contact for medium", 20, startY + 26);

      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("DIMENSIONS", 20, startY + 40);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      doc.text(artwork.dimensions || "Contact for dimensions", 20, startY + 46);

      // Right Column (Description & Additional Info)
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("DESCRIPTION", 105, startY);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      const descriptionText = artwork.provenance || "Reach out to our advisors for more information on the story behind this piece.";
      const splitDesc = doc.splitTextToSize(descriptionText, 85);
      doc.text(splitDesc, 105, startY + 6);
      
      const descHeight = splitDesc.length * 5;
      
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("EXHIBITION HISTORY", 105, startY + descHeight + 15);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      const splitExh = doc.splitTextToSize("Please contact the gallery for the complete exhibition history.", 85);
      doc.text(splitExh, 105, startY + descHeight + 21);

      drawFooter();
      doc.save(`${artwork.slug}-dossier.pdf`);
      setIsDownloading(false);
    } catch (err) {
      console.error("Error generating dossier PDF:", err);
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-32 px-6 md:px-12 text-navy">
        <Link href="/artworks" className="inline-flex items-center gap-4 text-xs tracking-widest uppercase text-charcoal/50 hover:text-gold transition-colors duration-500 mb-16 w-fit">
          <ArrowLeft strokeWidth={1} className="w-4 h-4" />
          Back to Viewing Room
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Image Display */}
          <div className="lg:col-span-8 relative flex items-center justify-center bg-white/50 p-8 md:p-16 border border-navy/5 group cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 text-navy bg-white/50 p-2 rounded-full backdrop-blur-md">
              <Maximize2 strokeWidth={1} className="w-5 h-5" />
            </div>
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[80vh] overflow-hidden">
              <SafeImage
                src={artwork.imageSrc}
                alt={artwork.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Artwork Metadata */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex flex-col gap-2 mb-12 border-b-[1.5px] border-navy/20 pb-12 relative">
              <div className="flex justify-between items-start gap-4">
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                  {artwork.title}
                </h1>
                <button 
                  onClick={handleShare}
                  className="mt-2 p-3 text-navy/40 hover:text-gold border border-navy/10 hover:border-gold rounded-full transition-all duration-500 bg-white/30 backdrop-blur-sm group relative"
                  aria-label="Share artwork"
                >
                  <Share2 strokeWidth={1.2} className="w-5 h-5" />
                  <AnimatePresence>
                    {showShareSuccess && (
                      <motion.span 
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        className="absolute -top-12 left-1/2 bg-navy text-beige text-[9px] tracking-widest uppercase px-3 py-2 whitespace-nowrap pointer-events-none"
                      >
                        Link copied
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              <p className="font-sans text-sm tracking-widest text-charcoal/70 uppercase">
                {artwork.artist}
              </p>
              {artwork.year && (
                <p className="font-sans text-xs tracking-widest text-charcoal/50 mt-1">
                  {artwork.year}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-8 mb-16">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Estimated Price</span>
                <p className="font-serif text-xl whitespace-nowrap">{formatPrice(artwork.price)}</p>              </div>
              
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Medium</span>
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{artwork.medium || "Contact for medium"}</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Dimensions</span>
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed">{artwork.dimensions || "Contact for dimensions"}</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Description</span>
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed max-w-sm">
                  {artwork.provenance || "Reach out to our advisors for more information on the story behind this piece."}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full bg-navy text-white px-8 py-5 font-sans text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-500"
              >
                Enquire About This Work
              </button>
              
              <button 
                onClick={handleDownloadDossier}
                disabled={isDownloading}
                className={`w-full border-[1.5px] border-navy/20 text-navy px-8 py-5 font-sans text-xs uppercase tracking-widest transition-colors duration-500 ${isDownloading ? 'opacity-50 cursor-wait' : 'hover:border-navy hover:bg-navy/5'}`}
              >
                {isDownloading ? 'Generating...' : 'Download Dossier (PDF)'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Works Engine */}
        {relatedArtworks.length > 0 && (
          <div className="mt-48">
            <h2 className="font-serif text-4xl mb-16">Related Works</h2>
            <div className="-mx-6 md:-mx-12">
              <StandardCarousel artworks={relatedArtworks} />
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy flex items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors duration-500 z-50 p-4"
            >
              <CloseIcon strokeWidth={1} className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full max-h-[90vh] max-w-[90vw] cursor-zoom-out" onClick={() => setIsLightboxOpen(false)}>
              <Image
                src={artwork.imageSrc}
                alt={artwork.title}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-Out Enquiry Drawer */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEnquiryOpen(false)}
              className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-beige text-navy z-[70] flex flex-col shadow-2xl border-l-[1.5px] border-navy/10"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center px-8 py-10 border-b-[1.5px] border-navy/10 bg-beige sticky top-0 z-10">
                <span className="font-serif text-3xl">Enquiry</span>
                <button 
                  onClick={() => setIsEnquiryOpen(false)}
                  className="p-2 text-navy/50 hover:text-gold transition-colors duration-500"
                >
                  <X strokeWidth={1} className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col custom-scrollbar">
                
                {/* Pre-filled Artwork Details */}
                <div className="flex gap-6 mb-12 border border-navy/10 p-4 bg-white/50">
                  <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-navy/5">
                    <Image src={artwork.imageSrc} alt={artwork.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-serif text-xl leading-tight mb-1">{artwork.title}</h4>
                    <span className="font-sans text-[10px] tracking-widest uppercase text-charcoal/50">{artwork.artist}</span>
                    <span className="font-sans text-[10px] tracking-widest text-charcoal/40 mt-2 font-mono">REF: {artwork.id.substring(0, 8).toUpperCase()}</span>
                  </div>
                </div>

                <form className="flex flex-col gap-10">
                  <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                    <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Full Name</label>
                    <input type="text" className="bg-transparent outline-none text-navy font-sans text-sm w-full" required />
                  </div>
                  <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                    <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Email Address</label>
                    <input type="email" className="bg-transparent outline-none text-navy font-sans text-sm w-full" required />
                  </div>
                  <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                    <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Phone Number (Optional)</label>
                    <input type="tel" className="bg-transparent outline-none text-navy font-sans text-sm w-full" />
                  </div>
                  <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                    <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Message</label>
                    <textarea rows={4} className="bg-transparent outline-none text-navy font-sans text-sm w-full resize-none" placeholder="I am interested in acquiring this piece..." required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-navy text-white px-8 py-5 font-sans text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-500 mt-4">
                    Send Enquiry
                  </button>
                  <p className="font-sans text-[9px] tracking-widest text-charcoal/40 uppercase text-center mt-2">
                    A director will be in touch shortly.
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
