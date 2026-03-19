"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Check if hovering over a specific interactive element
      const target = e.target as HTMLElement;
      const cursorElement = target.closest('[data-cursor]');
      
      if (cursorElement) {
        const type = cursorElement.getAttribute('data-cursor');
        if (type === 'discover') {
          setCursorVariant('discover');
          setCursorText('DISCOVER');
        } else if (type === 'inquire') {
          setCursorVariant('inquire');
          setCursorText('INQUIRE');
        } else if (type === 'view') {
          setCursorVariant('view');
          setCursorText('VIEW');
        }
      } else {
        // Fallback for standard links
        if (target.closest('a') || target.closest('button')) {
          setCursorVariant("pointer");
          setCursorText("");
        } else {
          setCursorVariant("default");
          setCursorText("");
        }
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Return nothing on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(0, 34, 68, 0.5)", // Navy with opacity
      mixBlendMode: "multiply" as const,
      border: "0px solid transparent",
      opacity: 1,
    },
    pointer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(197, 160, 89, 0.1)", // Gold with low opacity
      border: "1px solid rgba(197, 160, 89, 0.5)",
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
    discover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "1.5px solid rgba(0, 34, 68, 0.1)", // Navy border
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
    inquire: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(0, 34, 68, 0.9)", // Solid Navy
      border: "1.5px solid rgba(197, 160, 89, 0.5)", // Gold border
      mixBlendMode: "normal" as const,
      opacity: 1,
    },
    view: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Translucent white
      border: "1.5px solid rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(4px)",
      mixBlendMode: "normal" as const,
      opacity: 1,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center overflow-hidden hidden md:flex"
      variants={variants}
      animate={cursorVariant}
      transition={{ 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        mass: 0.5 
      }}
    >
      <motion.span 
        className={`font-sans text-[8px] tracking-[0.2em] font-medium uppercase ${cursorVariant === 'inquire' || cursorVariant === 'view' ? 'text-white' : 'text-navy'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: cursorText ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
}
