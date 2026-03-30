/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to submit enquiry.");
    }
  };

  return (
    <div className="flex flex-col w-full bg-beige min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mb-24">
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-navy">Contact</h1>
        <p className="font-sans text-lg text-charcoal/70 max-w-2xl">
          To enquire about a specific work, arrange a private viewing, or discuss our advisory services, please correspond with our directors below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Contact Form */}
        <div className="lg:col-span-7 flex flex-col">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center p-12 border-[1.5px] border-navy/20 bg-navy/5 text-center h-full">
              <h3 className="font-serif text-3xl text-navy mb-4">Enquiry Received</h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-md">
                Thank you for reaching out to Arthur James Galleries. A director will review your correspondence and be in touch shortly with the utmost discretion.
              </p>
            </div>
          ) : (
            <form className="flex flex-col gap-12 w-full max-w-2xl" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex flex-col flex-1 border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                  <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">First Name</label>
                  <input 
                    name="firstName"
                    type="text" 
                    className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col flex-1 border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                  <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Last Name</label>
                  <input 
                    name="lastName"
                    type="text" 
                    className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Email Address</label>
                <input 
                  name="email"
                  type="email" 
                  className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Subject of Enquiry</label>
                <select name="subject" className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent appearance-none cursor-pointer" disabled={status === "loading"}>
                  <option value="Artwork Acquisition">Artwork Acquisition</option>
                  <option value="Advisory Services">Advisory Services</option>
                  <option value="Private Viewing Request">Private Viewing Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent resize-none"
                  required
                  disabled={status === "loading"}
                ></textarea>
              </div>

              {status === "error" && (
                <p className="text-red-800 text-sm font-sans tracking-wide bg-red-100 p-4 border-l-2 border-red-800">{errorMessage}</p>
              )}

              <button 
                type="submit" 
                disabled={status === "loading"}
                className={`bg-navy text-white font-sans text-xs uppercase tracking-widest px-12 py-5 transition-all duration-500 w-fit mt-4 ${status === "loading" ? "opacity-50 cursor-wait" : "hover:bg-gold hover:text-navy"}`}
              >
                {status === "loading" ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          )}
        </div>

        {/* Gallery Locations & Info */}
        <div className="lg:col-span-5 flex flex-col gap-16 border-t-[1.5px] lg:border-t-0 lg:border-l-[1.5px] border-navy/10 pt-16 lg:pt-0 lg:pl-16">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gold uppercase">Head Office</span>
            <h3 className="font-serif text-3xl text-navy">London</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">
              Arthur James Galleries <br />
              27 Old Gloucester Rd <br />
              Holborn, London <br />
              WC1N 3AX, UK
            </p>
            <p className="font-sans text-sm text-charcoal/70 mt-2">
              <a href="mailto:info@arthurjamesgallery.com" className="hover:text-gold transition-colors duration-500 border-b-[1.5px] border-navy/20 pb-0.5">info@arthurjamesgallery.com</a>
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
              +44 (0) 203 603 0441
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
