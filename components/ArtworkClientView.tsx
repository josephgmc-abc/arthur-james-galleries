"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, Maximize2, X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StandardCarousel from "@/components/StandardCarousel";
import { useCurrency } from "./CurrencyContext";

export interface ArtworkType {
  id: string;
  slug: string;
  title: string;
  artist: string;
  year: string;
  price: string;
  imageSrc: string;
}

interface ArtworkClientViewProps {
  artwork: ArtworkType;
  relatedArtworks: ArtworkType[];
}

export default function ArtworkClientView({ artwork, relatedArtworks }: ArtworkClientViewProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { formatPrice } = useCurrency();

  const handleDownloadDossier = async () => {
    try {
      setIsDownloading(true);
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ format: "a4", unit: "mm" });
      
      // Add Gallery Header
      doc.setFont("times", "normal");
      doc.setFontSize(24);
      doc.text("Arthur James Galleries", 105, 25, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("PRIVATE & CONFIDENTIAL DOSSIER", 105, 32, { align: "center" });

      // Add Line
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 40, 190, 40);

      // Artwork Details
      doc.setTextColor(20, 20, 20);
      doc.setFont("times", "normal");
      doc.setFontSize(32);
      
      const splitTitle = doc.splitTextToSize(artwork.title, 170);
      doc.text(splitTitle, 20, 55);
      
      const titleHeight = splitTitle.length * 12;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`${artwork.artist.toUpperCase()}`, 20, 55 + titleHeight);
      doc.text(`${artwork.year || "Unknown"}`, 20, 62 + titleHeight);

      // Details Box
      const startY = 75 + titleHeight;
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("ESTIMATED PRICE", 20, startY);
      doc.setTextColor(20, 20, 20);
      doc.setFont("times", "normal");
      doc.setFontSize(14);
      doc.text(formatPrice(artwork.price), 20, startY + 6);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("MEDIUM", 20, startY + 20);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      doc.text("Oil on canvas (Assumed)", 20, startY + 25);

      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("DIMENSIONS", 20, startY + 35);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      doc.text("Contact for dimensions", 20, startY + 40);

      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text("PROVENANCE", 20, startY + 50);
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(10);
      const splitProv = doc.splitTextToSize("Property from a distinguished private collection. Accompanied by a certificate of authenticity.", 170);
      doc.text(splitProv, 20, startY + 55);

      // Add image to next page
      try {
        const imgBlob = await fetch(artwork.imageSrc).then(r => r.blob());
        const reader = new FileReader();
        reader.readAsDataURL(imgBlob);
        reader.onloadend = function() {
          const base64data = reader.result as string;
          doc.addPage();
          
          // Basic aspect ratio math to fit A4 (210x297mm) with 20mm margins
          const maxWidth = 170;
          const maxHeight = 250;
          
          const imgProps = doc.getImageProperties(base64data);
          const ratio = imgProps.width / imgProps.height;
          let width = maxWidth;
          let height = maxWidth / ratio;
          
          if (height > maxHeight) {
            height = maxHeight;
            width = maxHeight * ratio;
          }
          
          doc.addImage(base64data, 'JPEG', 20 + (maxWidth - width)/2, 20, width, height); 
          doc.save(`${artwork.slug}-dossier.pdf`);
          setIsDownloading(false);
        }
      } catch (e) {
        doc.save(`${artwork.slug}-dossier.pdf`);
        setIsDownloading(false);
      }

    } catch (err) {
      console.error(err);
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
          <div data-cursor="view" className="lg:col-span-8 relative flex items-center justify-center bg-white/50 p-8 md:p-16 border border-navy/5 group cursor-none" onClick={() => setIsLightboxOpen(true)}>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 text-navy bg-white/50 p-2 rounded-full backdrop-blur-md">
              <Maximize2 strokeWidth={1} className="w-5 h-5" />
            </div>
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-[80vh] overflow-hidden">
              <Image
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
            <div className="flex flex-col gap-2 mb-12 border-b-[1.5px] border-navy/20 pb-12">
              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                {artwork.title}
              </h1>
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
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed">Oil on canvas (Assumed)</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Dimensions</span>
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed">Contact for dimensions</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">Provenance</span>
                <p className="font-sans text-sm text-charcoal/80 leading-relaxed max-w-sm">
                  Property from a distinguished private collection. Accompanied by a certificate of authenticity.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={() => setIsInquiryOpen(true)}
                className="w-full bg-navy text-white px-8 py-5 font-sans text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-500"
              >
                Inquire About This Work
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

      {/* Slide-Out Inquiry Drawer */}
      <AnimatePresence>
        {isInquiryOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInquiryOpen(false)}
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
                <span className="font-serif text-3xl">Inquiry</span>
                <button 
                  onClick={() => setIsInquiryOpen(false)}
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
                    Send Inquiry
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
