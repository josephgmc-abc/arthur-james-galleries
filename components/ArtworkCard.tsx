"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCurrency } from "./CurrencyContext";

interface ArtworkCardProps {
  title: string;
  artist: string;
  year: string;
  imageSrc: string;
  slug: string;
  price?: string;
}

export default function ArtworkCard({ title, artist, year, imageSrc, slug, price }: ArtworkCardProps) {
  const { formatPrice } = useCurrency();

  return (
    <Link href={`/artworks/${slug}`} className="group cursor-pointer flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 h-full"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy/5">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
          />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <div className="flex justify-between items-baseline gap-4">
            <h3 className="font-serif text-2xl tracking-wide group-hover:text-gold transition-colors duration-500 line-clamp-1">{title}</h3>
            <span className="font-sans text-xs tracking-widest text-charcoal/50 shrink-0">{year}</span>
          </div>
          <div className="flex justify-between items-start mt-auto pt-1 gap-4">
            <p className="font-sans text-sm tracking-wide text-charcoal/70 uppercase line-clamp-1">{artist}</p>
            <p className="font-sans text-[10px] tracking-widest text-charcoal/50 text-right shrink-0 whitespace-nowrap">{formatPrice(price)}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
