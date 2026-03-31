import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CurrencyProvider } from "@/components/CurrencyContext";
import GeoBanner from "@/components/GeoBanner";
import FooterCurrencySelector from "@/components/FooterCurrencySelector";
import CookieBanner from "@/components/CookieBanner";

const cormorant = localFont({
  src: [
    {
      path: "../../public/fonts/CormorantGaramond-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CormorantGaramond-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CormorantGaramond-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const neueHaas = localFont({
  src: [
    {
      path: "../../public/fonts/NeueHaasGrotText-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NeueHaasGrotText-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arthur James Galleries | Bespoke Art Advisory",
  description: "Independent advisory and curation for established collections and private institutions.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${neueHaas.variable} bg-beige text-navy antialiased min-h-screen flex flex-col`}>
        <CurrencyProvider>
          <GeoBanner />
          <CookieBanner />
          <Navbar />
          
          <main className="flex-grow flex flex-col">
            {children}
          </main>

          <footer className="w-full px-6 py-16 md:px-12 md:py-24 border-t-[1.5px] border-navy/20 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
              <div className="lg:col-span-4">
                <h2 className="font-serif text-3xl mb-6 text-navy">Arthur James Galleries</h2>
                <p className="font-sans text-sm tracking-wide text-charcoal/80 max-w-sm leading-relaxed mb-6">
                  Advisory and curation for dedicated collectors.
                </p>
                <p className="font-sans text-sm tracking-widest text-navy mb-2">
                  +44 (0) 203 603 0441
                </p>
                <p className="font-sans text-[11px] tracking-widest text-navy">
                  <a href="mailto:info@arthurjamesgallery.com" className="hover:text-gold transition-colors duration-500">info@arthurjamesgallery.com</a>
                </p>
              </div>

                <div className="lg:col-span-3 flex flex-col gap-4">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">Head Office</span>
                <h3 className="font-serif text-2xl text-navy">London</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">
                  27 Old Gloucester Rd <br />
                  Holborn, London <br />
                  WC1N 3AX, UK
                </p>
                </div>
              <div className="lg:col-span-3 flex flex-col gap-4">
                <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">Private Viewing</span>
                <h3 className="font-serif text-2xl text-navy">Kent</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">
                  The Estate Annex <br />
                  Kent, United Kingdom
                </p>
                <p className="font-sans text-sm text-charcoal/50 italic mt-1">
                  By strict appointment only.
                </p>
              </div>

              <div className="lg:col-span-2 flex flex-col lg:items-end gap-4 text-[10px] tracking-[0.2em] text-charcoal/60 mt-1">
                <FooterCurrencySelector />
                <Link href="/contact" className="hover:text-gold transition-colors duration-500">Contact Us</Link>
                <Link href="/terms" className="hover:text-gold transition-colors duration-500">Terms & Conditions of Sale</Link>
                <Link href="/privacy" className="hover:text-gold transition-colors duration-500">Privacy Policy</Link>
              </div>
            </div>
            
            <div className="mt-24 pt-8 border-t-[1.5px] border-navy/10 text-[9px] text-charcoal/40 tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4">
              <span>&copy; 2026 Arthur James Galleries. All rights reserved.</span>
              <span>Strict Discretion Assured</span>
            </div>
          </footer>
        </CurrencyProvider>
      </body>
    </html>
  );
}
