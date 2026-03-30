"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  // Priority Markets
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+49", name: "DE", flag: "🇩🇪" },
  { code: "+1", name: "US/CA", flag: "🇺🇸" },
  { code: "+33", name: "FR", flag: "🇫🇷" },
  { code: "+41", name: "CH", flag: "🇨🇭" },
  { code: "+852", name: "HK", flag: "🇭🇰" },
  { code: "+65", name: "SG", flag: "🇸🇬" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  
  // Extended List
  { code: "+355", name: "AL", flag: "🇦🇱" },
  { code: "+213", name: "DZ", flag: "🇩🇿" },
  { code: "+376", name: "AD", flag: "🇦🇩" },
  { code: "+244", name: "AO", flag: "🇦🇴" },
  { code: "+54", name: "AR", flag: "🇦🇷" },
  { code: "+374", name: "AM", flag: "🇦🇲" },
  { code: "+297", name: "AW", flag: "🇦🇼" },
  { code: "+61", name: "AU", flag: "🇦🇺" },
  { code: "+43", name: "AT", flag: "🇦🇹" },
  { code: "+994", name: "AZ", flag: "🇦🇿" },
  { code: "+973", name: "BH", flag: "🇧🇭" },
  { code: "+880", name: "BD", flag: "🇧🇩" },
  { code: "+375", name: "BY", flag: "🇧🇾" },
  { code: "+32", name: "BE", flag: "🇧🇪" },
  { code: "+501", name: "BZ", flag: "🇧🇿" },
  { code: "+229", name: "BJ", flag: "🇧🇯" },
  { code: "+975", name: "BT", flag: "🇧🇹" },
  { code: "+591", name: "BO", flag: "🇧🇴" },
  { code: "+387", name: "BA", flag: "🇧🇦" },
  { code: "+267", name: "BW", flag: "🇧🇼" },
  { code: "+55", name: "BR", flag: "🇧🇷" },
  { code: "+673", name: "BN", flag: "🇧🇳" },
  { code: "+359", name: "BG", flag: "🇧🇬" },
  { code: "+226", name: "BF", flag: "🇧🇫" },
  { code: "+257", name: "BI", flag: "🇧🇮" },
  { code: "+855", name: "KH", flag: "🇰🇭" },
  { code: "+237", name: "CM", flag: "🇨🇲" },
  { code: "+238", name: "CV", flag: "🇨🇻" },
  { code: "+236", name: "CF", flag: "🇨🇫" },
  { code: "+235", name: "TD", flag: "🇹🇩" },
  { code: "+56", name: "CL", flag: "🇨🇱" },
  { code: "+86", name: "CN", flag: "🇨🇳" },
  { code: "+57", name: "CO", flag: "🇨🇴" },
  { code: "+269", name: "KM", flag: "🇰🇲" },
  { code: "+242", name: "CG", flag: "🇨🇬" },
  { code: "+682", name: "CK", flag: "🇨🇰" },
  { code: "+506", name: "CR", flag: "🇨🇷" },
  { code: "+385", name: "HR", flag: "🇭🇷" },
  { code: "+53", name: "CU", flag: "🇨🇺" },
  { code: "+357", name: "CY", flag: "🇨🇾" },
  { code: "+420", name: "CZ", flag: "🇨🇿" },
  { code: "+45", name: "DK", flag: "🇩🇰" },
  { code: "+253", name: "DJ", flag: "🇩🇯" },
  { code: "+593", name: "EC", flag: "🇪🇨" },
  { code: "+20", name: "EG", flag: "🇪🇬" },
  { code: "+503", name: "SV", flag: "🇸🇻" },
  { code: "+240", name: "GQ", flag: "🇬🇶" },
  { code: "+291", name: "ER", flag: "🇪🇷" },
  { code: "+372", name: "EE", flag: "🇪🇪" },
  { code: "+251", name: "ET", flag: "🇪🇹" },
  { code: "+679", name: "FJ", flag: "🇫🇯" },
  { code: "+358", name: "FI", flag: "🇫🇮" },
  { code: "+241", name: "GA", flag: "🇬🇦" },
  { code: "+220", name: "GM", flag: "🇬🇲" },
  { code: "+995", name: "GE", flag: "🇬🇪" },
  { code: "+233", name: "GH", flag: "🇬🇭" },
  { code: "+30", name: "GR", flag: "🇬🇷" },
  { code: "+299", name: "GL", flag: "🇬🇱" },
  { code: "+502", name: "GT", flag: "🇬🇹" },
  { code: "+224", name: "GN", flag: "🇬🇳" },
  { code: "+592", name: "GY", flag: "🇬🇾" },
  { code: "+509", name: "HT", flag: "🇭🇹" },
  { code: "+504", name: "HN", flag: "🇭🇳" },
  { code: "+36", name: "HU", flag: "🇭🇺" },
  { code: "+354", name: "IS", flag: "🇮🇸" },
  { code: "+91", name: "IN", flag: "🇮🇳" },
  { code: "+62", name: "ID", flag: "🇮🇩" },
  { code: "+98", name: "IR", flag: "🇮🇷" },
  { code: "+964", name: "IQ", flag: "🇮🇶" },
  { code: "+353", name: "IE", flag: "🇮🇪" },
  { code: "+972", name: "IL", flag: "🇮🇱" },
  { code: "+39", name: "IT", flag: "🇮🇹" },
  { code: "+225", name: "CI", flag: "🇨🇮" },
  { code: "+1876", name: "JM", flag: "🇯🇲" },
  { code: "+81", name: "JP", flag: "🇯🇵" },
  { code: "+962", name: "JO", flag: "🇯🇴" },
  { code: "+7", name: "KZ", flag: "🇰🇿" },
  { code: "+254", name: "KE", flag: "🇰🇪" },
  { code: "+965", name: "KW", flag: "🇰🇼" },
  { code: "+996", name: "KG", flag: "🇰🇬" },
  { code: "+856", name: "LA", flag: "🇱🇦" },
  { code: "+371", name: "LV", flag: "🇱🇻" },
  { code: "+961", name: "LB", flag: "🇱🇧" },
  { code: "+266", name: "LS", flag: "🇱🇸" },
  { code: "+231", name: "LR", flag: "🇱🇷" },
  { code: "+218", name: "LY", flag: "🇱🇾" },
  { code: "+423", name: "LI", flag: "🇱🇮" },
  { code: "+370", name: "LT", flag: "🇱🇹" },
  { code: "+352", name: "LU", flag: "🇱🇺" },
  { code: "+853", name: "MO", flag: "🇲🇴" },
  { code: "+389", name: "MK", flag: "🇲🇰" },
  { code: "+261", name: "MG", flag: "🇲🇬" },
  { code: "+265", name: "MW", flag: "🇲🇼" },
  { code: "+60", name: "MY", flag: "🇲🇾" },
  { code: "+960", name: "MV", flag: "🇲🇻" },
  { code: "+223", name: "ML", flag: "🇲🇱" },
  { code: "+356", name: "MT", flag: "🇲🇹" },
  { code: "+222", name: "MR", flag: "🇲🇷" },
  { code: "+230", name: "MU", flag: "🇲🇺" },
  { code: "+52", name: "MX", flag: "🇲🇽" },
  { code: "+373", name: "MD", flag: "🇲🇩" },
  { code: "+377", name: "MC", flag: "🇲🇨" },
  { code: "+976", name: "MN", flag: "🇲🇳" },
  { code: "+382", name: "ME", flag: "🇲🇪" },
  { code: "+212", name: "MA", flag: "🇲🇦" },
  { code: "+258", name: "MZ", flag: "🇲🇿" },
  { code: "+95", name: "MM", flag: "🇲🇲" },
  { code: "+264", name: "NA", flag: "🇳🇦" },
  { code: "+977", name: "NP", flag: "🇳🇵" },
  { code: "+31", name: "NL", flag: "🇳🇱" },
  { code: "+64", name: "NZ", flag: "🇳🇿" },
  { code: "+505", name: "NI", flag: "🇳🇮" },
  { code: "+227", name: "NE", flag: "🇳🇪" },
  { code: "+234", name: "NG", flag: "🇳🇬" },
  { code: "+47", name: "NO", flag: "🇳🇴" },
  { code: "+968", name: "OM", flag: "🇴🇲" },
  { code: "+92", name: "PK", flag: "🇵🇰" },
  { code: "+970", name: "PS", flag: "🇵🇸" },
  { code: "+507", name: "PA", flag: "🇵🇦" },
  { code: "+675", name: "PG", flag: "🇵🇬" },
  { code: "+595", name: "PY", flag: "🇵🇾" },
  { code: "+51", name: "PE", flag: "🇵🇪" },
  { code: "+63", name: "PH", flag: "🇵🇭" },
  { code: "+48", name: "PL", flag: "🇵🇱" },
  { code: "+351", name: "PT", flag: "🇵🇹" },
  { code: "+974", name: "QA", flag: "🇶🇦" },
  { code: "+40", name: "RO", flag: "🇷🇴" },
  { code: "+7", name: "RU", flag: "🇷🇺" },
  { code: "+250", name: "RW", flag: "🇷🇼" },
  { code: "+966", name: "SA", flag: "🇸🇦" },
  { code: "+221", name: "SN", flag: "🇸🇳" },
  { code: "+381", name: "RS", flag: "🇷🇸" },
  { code: "+248", name: "SC", flag: "🇸🇨" },
  { code: "+232", name: "SL", flag: "🇸🇱" },
  { code: "+421", name: "SK", flag: "🇸🇰" },
  { code: "+386", name: "SI", flag: "🇸🇮" },
  { code: "+252", name: "SO", flag: "🇸🇴" },
  { code: "+27", name: "ZA", flag: "🇿🇦" },
  { code: "+82", name: "KR", flag: "🇰🇷" },
  { code: "+34", name: "ES", flag: "🇪🇸" },
  { code: "+94", name: "LK", flag: "🇱🇰" },
  { code: "+249", name: "SD", flag: "🇸🇩" },
  { code: "+597", name: "SR", flag: "🇸🇷" },
  { code: "+268", name: "SZ", flag: "🇸🇿" },
  { code: "+46", name: "SE", flag: "🇸🇪" },
  { code: "+963", name: "SY", flag: "🇸🇾" },
  { code: "+886", name: "TW", flag: "🇹🇼" },
  { code: "+992", name: "TJ", flag: "🇹🇯" },
  { code: "+255", name: "TZ", flag: "🇹🇿" },
  { code: "+66", name: "TH", flag: "🇹🇭" },
  { code: "+228", name: "TG", flag: "🇹🇬" },
  { code: "+676", name: "TO", flag: "🇹🇴" },
  { code: "+216", name: "TN", flag: "🇹🇳" },
  { code: "+90", name: "TR", flag: "🇹🇷" },
  { code: "+993", name: "TM", flag: "🇹🇲" },
  { code: "+256", name: "UG", flag: "🇺🇬" },
  { code: "+380", name: "UA", flag: "🇺🇦" },
  { code: "+598", name: "UY", flag: "🇺🇾" },
  { code: "+998", name: "UZ", flag: "🇺🇿" },
  { code: "+678", name: "VU", flag: "🇻🇺" },
  { code: "+58", name: "VE", flag: "🇻🇪" },
  { code: "+84", name: "VN", flag: "🇻🇳" },
  { code: "+967", name: "YE", flag: "🇾🇪" },
  { code: "+260", name: "ZM", flag: "🇿🇲" },
  { code: "+263", name: "ZW", flag: "🇿🇼" },
];

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: `${selectedCountry.code} ${formData.get("phone")}`,
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

              {/* Phone Number with Country Dropdown */}
              <div className="flex flex-col border-b-[1.5px] border-navy/20 focus-within:border-gold transition-colors duration-500 pb-2 relative">
                <label className="font-sans text-[10px] tracking-[0.2em] text-charcoal/50 uppercase mb-2">Phone Number</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-2 font-sans text-sm text-navy hover:text-gold transition-colors duration-300 py-1"
                      disabled={status === "loading"}
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronDown strokeWidth={1.5} className={`w-3 h-3 transition-transform duration-500 ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-4 bg-white border border-navy/10 shadow-2xl z-[100] w-48 max-h-64 overflow-y-auto custom-scrollbar">
                        {countries.map((c) => (
                          <button
                            key={`${c.name}-${c.code}`}
                            type="button"
                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-beige text-left transition-colors duration-300 border-b border-navy/[0.05] last:border-0"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                            }}
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="font-sans text-xs text-charcoal/60 w-8">{c.name}</span>
                            <span className="font-sans text-xs text-navy font-medium ml-auto">{c.code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input 
                    name="phone"
                    type="tel" 
                    placeholder="7700 900000"
                    className="bg-transparent outline-none text-navy font-sans text-base w-full focus:bg-transparent"
                    required
                    disabled={status === "loading"}
                  />
                </div>
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

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 34, 68, 0.05); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.3); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 0.6); 
        }
      `}} />
    </div>
  );
}
