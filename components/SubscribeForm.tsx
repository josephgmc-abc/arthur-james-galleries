"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function SubscribeForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");
    
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative h-[68px]">
        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row gap-0 border border-beige/20 focus-within:border-gold transition-colors duration-700 absolute inset-0 bg-navy"
            >
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting"}
                className="bg-transparent px-8 py-6 outline-none text-beige font-sans text-sm flex-grow placeholder:text-beige/20 tracking-[0.2em] disabled:opacity-50"
                required
              />
              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="bg-beige text-navy font-sans text-[10px] tracking-[0.3em] px-12 py-6 hover:bg-gold hover:text-navy transition-all duration-500 whitespace-nowrap border-t md:border-t-0 md:border-l border-beige/10 disabled:opacity-80 flex items-center justify-center min-w-[140px]"
              >
                {status === "submitting" ? (
                  <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 border border-gold/50 bg-gold/5 flex items-center justify-center gap-4 text-gold"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              >
                <Check strokeWidth={1.5} className="w-5 h-5" />
              </motion.div>
              <span className="font-sans text-xs tracking-[0.3em] uppercase">Subscription Confirmed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <div className="flex items-center justify-center gap-4 mt-8 opacity-30">
        <div className="h-[1px] w-8 bg-beige"></div>
        <p className="font-sans text-[9px] tracking-[0.2em] text-beige">
          Strict Discretion Assured
        </p>
        <div className="h-[1px] w-8 bg-beige"></div>
      </div>
    </div>
  );
}
