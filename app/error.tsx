"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Critical System Failure:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-beige text-navy flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="font-serif text-4xl mb-6">A Critical Interruption.</h1>
        <p className="font-sans text-sm text-charcoal/60 mb-12 max-w-sm">
          A critical system error has occurred. Please attempt to re-establish your connection or contact our technical advisors.
        </p>
        <button
          onClick={() => reset()}
          className="bg-navy text-white px-10 py-5 font-sans text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-navy transition-all duration-700"
        >
          Reset Connection
        </button>
      </body>
    </html>
  );
}
