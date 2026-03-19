"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mb-24">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">Contact</h1>
        <p className="font-sans text-lg text-charcoal/70 max-w-2xl">
          To inquire about a specific work, arrange a private viewing, or discuss our advisory services, please correspond with our directors below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Contact Form */}
        <div className="lg:col-span-7 flex flex-col">
          <form className="flex flex-col gap-12 w-full max-w-2xl">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex flex-col flex-1 border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">First Name</label>
                <input 
                  type="text" 
                  className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                  required
                />
              </div>
              <div className="flex flex-col flex-1 border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
              <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
              <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Subject of Inquiry</label>
              <select className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent appearance-none cursor-pointer">
                <option value="acquisition">Artwork Acquisition</option>
                <option value="advisory">Advisory Services</option>
                <option value="viewing">Private Viewing Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
              <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Message</label>
              <textarea 
                rows={4}
                className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent resize-none"
                required
              ></textarea>
            </div>

            <button type="submit" className="bg-navy text-white font-sans text-xs uppercase tracking-widest px-12 py-5 hover:bg-gold hover:text-navy transition-all duration-500 w-fit mt-4">
              Submit Inquiry
            </button>
          </form>
        </div>

        {/* Gallery Locations & Info */}
        <div className="lg:col-span-5 flex flex-col gap-16 border-t-[1.5px] lg:border-t-0 lg:border-l-[1.5px] border-navy/10 pt-16 lg:pt-0 lg:pl-16">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">Head Office</span>
            <h3 className="font-serif text-3xl text-navy">London</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">
              Arthur James Galleries <br />
              High Holborn <br />
              London, WC1V 6BX <br />
              United Kingdom
            </p>
            <p className="font-sans text-sm text-charcoal/70 mt-2">
              <a href="mailto:london@arthurjames.com" className="hover:text-gold transition-colors duration-500 border-b-[1.5px] border-navy/20 pb-0.5">london@arthurjames.com</a>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">Private Viewing</span>
            <h3 className="font-serif text-3xl text-navy">Kent</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">
              The Estate Annex <br />
              (Full address provided upon confirmation of appointment) <br />
              Kent, United Kingdom
            </p>
            <p className="font-sans text-sm text-charcoal/70 mt-2">
              <span className="text-charcoal/50 italic">By strict appointment only.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <span className="font-sans text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">Direct Line</span>
            <p className="font-sans text-lg tracking-widest text-navy">
              +44 (0) 20 7946 0812
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
