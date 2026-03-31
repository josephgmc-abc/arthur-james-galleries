"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const rates: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150, AUD: 1.52, 
  CAD: 1.35, CHF: 0.88, CNY: 7.2, HKD: 7.82, NZD: 1.66, 
  SEK: 10.4, KRW: 1330, SGD: 1.34, NOK: 10.6, MXN: 17.0, 
  INR: 83.0, RUB: 92.0, ZAR: 19.0, TRY: 31.0, BRL: 5.0
};

export const topCurrencies = Object.keys(rates);

const countryCurrencyMap: Record<string, string> = {
  US: 'USD', GB: 'GBP', UK: 'GBP', EU: 'EUR', FR: 'EUR', DE: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
  JP: 'JPY', AU: 'AUD', CA: 'CAD', CH: 'CHF', CN: 'CNY', HK: 'HKD', NZ: 'NZD',
  SE: 'SEK', KR: 'KRW', SG: 'SGD', NO: 'NOK', MX: 'MXN', IN: 'INR', RU: 'RUB',
  ZA: 'ZAR', TR: 'TRY', BR: 'BRL'
};

interface CurrencyContextType {
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (priceStr?: string) => string;
  detectedCountryCode: string | null;
  detectedCountryName: string | null;
  isInternational: boolean;
  dismissBanner: () => void;
  showBanner: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState('USD');
  const [detectedCountryCode, setDetectedCountryCode] = useState<string | null>(null);
  const [detectedCountryName, setDetectedCountryName] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('arthur_james_currency');
    const bannerDismissed = localStorage.getItem('arthur_james_banner_dismissed');
    const cachedGeo = localStorage.getItem('arthur_james_geo');
    
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }

    // Process geo data and decide whether to show banner
    const processGeo = (data: any) => {
      if (data && data.country_code) {
        const country = data.country_code;
        setDetectedCountryCode(country);
        setDetectedCountryName(data.country_name || country);
        const detectedCurrency = countryCurrencyMap[country];
        
        if (!savedCurrency && detectedCurrency) {
          setCurrency(detectedCurrency);
        }
        
        // Show banner only if it has never been dismissed
        if (bannerDismissed !== 'true') {
          setShowBanner(true);
        }
      }
    };

    if (cachedGeo) {
      try {
        processGeo(JSON.parse(cachedGeo));
      } catch (e) {
        localStorage.removeItem('arthur_james_geo');
      }
    } else {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            localStorage.setItem('arthur_james_geo', JSON.stringify(data));
            processGeo(data);
          }
        })
        .catch(err => {
          console.error('Geo lookup failed:', err);
        });
    }
  }, []);

  const handleSetCurrency = (c: string) => {
    setCurrency(c);
    localStorage.setItem('arthur_james_currency', c);
    setShowBanner(false);
    localStorage.setItem('arthur_james_banner_dismissed', 'true');
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('arthur_james_banner_dismissed', 'true');
  };

  const formatPrice = (priceStr?: string) => {
    if (!priceStr || priceStr.toLowerCase().includes('request')) return 'Price Upon Request';
    
    const match = priceStr.match(/([A-Z]{3})\s*([\d,]+)\s*-\s*([\d,]+)/i) || priceStr.match(/([A-Z]{3})\s*([\d,]+)/i);
    
    if (!match) return priceStr;

    const baseCurrency = match[1].toUpperCase();
    if (!rates[baseCurrency] || !rates[currency]) return priceStr;

    const convert = (valStr: string) => {
      const val = parseInt(valStr.replace(/,/g, ''), 10);
      const inUSD = val / rates[baseCurrency];
      const inTarget = inUSD * rates[currency];
      return Math.round(inTarget).toLocaleString();
    };

    if (match.length === 4) {
       return `${currency} ${convert(match[2])} - ${convert(match[3])}`;
    } else {
       return `${currency} ${convert(match[2])}`;
    }
  };

  const isInternational = detectedCountryCode ? !countryCurrencyMap[detectedCountryCode] : true;

  // Hydration will match server since default is USD
  // Then useEffect updates client-side.

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: handleSetCurrency, 
      formatPrice, 
      detectedCountryCode, 
      detectedCountryName,
      isInternational,
      dismissBanner, 
      showBanner 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};
