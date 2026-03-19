"use client";

import { useCurrency, topCurrencies } from "./CurrencyContext";

export default function FooterCurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex flex-col gap-2 mb-4 w-full lg:items-end">
      <label className="text-[9px] tracking-[0.3em] text-gold uppercase">Currency</label>
      <select 
        value={currency} 
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-transparent border-b-[1.5px] border-navy/20 text-navy outline-none py-1 cursor-pointer w-full lg:w-24 text-right"
      >
        {topCurrencies.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  );
}
