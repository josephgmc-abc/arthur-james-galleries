"use client";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";

interface ReportCardProps {
  title: string;
  summary: string;
  date: string;
  href: string;
  dark?: boolean;
}

export default function ReportCard({ title, summary, date, href, dark = false }: ReportCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`p-8 md:p-12 transition-all duration-700 h-full flex flex-col ${
          dark 
            ? "border-[1.5px] border-white/20 hover:bg-white/5 bg-navy" 
            : "border-[1.5px] border-navy/20 hover:bg-navy hover:text-white"
        }`}
      >
        <div className="flex justify-between items-start mb-16">
          <span className={`font-sans text-xs tracking-widest uppercase transition-colors duration-700 ${
            dark ? "text-beige/40 group-hover:text-beige/60" : "text-charcoal/50 group-hover:text-white/50"
          }`}>
            {date}
          </span>
          <Download strokeWidth={1.5} className={`w-5 h-5 transition-opacity duration-700 ${
            dark ? "text-white opacity-40 group-hover:opacity-100 group-hover:text-gold" : "text-gold opacity-20 group-hover:opacity-100"
          }`} />
        </div>
        <h3 className={`font-serif text-3xl tracking-tight mb-4 transition-colors duration-700 ${
          dark ? "text-beige group-hover:text-gold" : "group-hover:text-gold"
        }`}>
          {title}
        </h3>
        <p className={`font-sans text-sm leading-relaxed transition-colors duration-700 flex-grow ${
          dark ? "text-beige/60 group-hover:text-beige/80" : "text-charcoal/70 group-hover:text-white/70"
        }`}>
          {summary}
        </p>
      </motion.div>
    </Link>
  );
}
