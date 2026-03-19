"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrency } from "./CurrencyContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { showBanner } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home, Reports, Artists, and Artworks have dark hero backgrounds at the top
  const isDarkHero = pathname === "/" || pathname === "/reports" || pathname === "/artists" || pathname === "/artworks";
  
  // Text should be white if we're at the top of a dark hero page
  const isTopDark = !isScrolled && isDarkHero;

  return (
    <nav 
      className={`fixed z-50 w-full px-6 md:px-12 transition-all duration-700 flex justify-between items-center ${showBanner ? 'top-10' : 'top-0'} ${
        isScrolled 
          ? "py-6 md:py-6 bg-beige/95 backdrop-blur-md border-b-[1.5px] border-navy/10 shadow-sm" 
          : "py-6 md:py-10 bg-transparent border-b-[1.5px] border-transparent"
      }`}
    >
      <Link 
        href="/" 
        className={`font-serif text-2xl md:text-3xl tracking-tight uppercase transition-colors duration-700 ${
          isTopDark ? "text-white hover:text-white/80" : "text-navy hover:text-navy/80"
        }`}
      >
        Arthur James
      </Link>
      
      <div className="hidden md:flex gap-10 font-sans text-xs tracking-widest uppercase">
        {[
          { label: "Home", href: "/" },
          { label: "Artists", href: "/artists" },
          { label: "Viewing Room", href: "/artworks" },
          { label: "Market Insights", href: "/reports" },
          { label: "Contact", href: "/contact" },
        ].map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`relative group py-2 transition-colors duration-700 ${
                isTopDark ? "text-white/90 hover:text-white" : "text-navy/80 hover:text-navy"
              }`}
            >
              <span className={isActive ? (isTopDark ? "text-white font-medium" : "text-navy font-medium") : ""}>
                {link.label}
              </span>
              {/* Animated Underline */}
              <span className={`absolute left-0 bottom-0 w-full h-[1.5px] transition-transform duration-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left ${
                isTopDark ? "bg-white" : "bg-navy"
              }`} />
            </Link>
          );
        })}
      </div>
      
      <Link 
        href="/contact"
        className={`text-xs tracking-widest uppercase px-8 py-3 transition-all duration-700 border-[1.5px] ${
          isTopDark 
            ? "text-white border-white/30 hover:bg-white hover:text-navy" 
            : "text-navy border-navy/20 hover:bg-navy hover:text-white"
        }`}
      >
        Inquire
      </Link>
    </nav>
  );
}
