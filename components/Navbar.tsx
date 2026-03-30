"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrency } from "./CurrencyContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Home, Reports, Artists, and Artworks have dark hero backgrounds at the top
  const isDarkHero = pathname === "/" || pathname === "/reports" || pathname === "/artists" || pathname === "/artworks";
  
  // Text should be white if we're at the top of a dark hero page (and mobile menu isn't covering it)
  const isTopDark = !isScrolled && isDarkHero && !isMobileMenuOpen;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Artists", href: "/artists" },
    { label: "Viewing Room", href: "/artworks" },
    { label: "Market Insights", href: "/reports" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed z-50 w-full px-6 md:px-12 transition-all duration-700 flex justify-between items-center ${showBanner ? 'top-24 md:top-10' : 'top-0'} ${
          isScrolled || isMobileMenuOpen
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
          {navLinks.map((link) => {
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
        
        <div className="flex items-center gap-6">
          <Link 
            href="/contact"
            className={`hidden md:inline-flex text-xs tracking-widest uppercase px-8 py-3 transition-all duration-700 border-[1.5px] ${
              isTopDark 
                ? "text-white border-white/30 hover:bg-white hover:text-navy" 
                : "text-navy border-navy/20 hover:bg-navy hover:text-white"
            }`}
          >
            Enquire
          </Link>
          
          <button 
            className={`md:hidden p-2 transition-colors duration-700 ${
              isTopDark ? "text-white" : "text-navy"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X strokeWidth={1} className="w-8 h-8" /> : <Menu strokeWidth={1} className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-beige pt-32 px-6 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-8 mt-12 mb-12">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`font-serif text-4xl uppercase tracking-widest transition-colors duration-500 ${
                      isActive ? "text-gold" : "text-navy"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto pb-12 flex flex-col gap-6">
              <Link 
                href="/contact"
                className="w-full bg-navy text-white text-center py-5 font-sans text-xs tracking-widest uppercase hover:bg-gold transition-colors duration-500"
              >
                Enquire About Services
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
