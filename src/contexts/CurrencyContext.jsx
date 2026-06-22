import React, { createContext, useContext, useState } from 'react';

const currencies = [
  { code: 'USD', symbol: '$', rate: 1, label: 'US Dollar' },
  { code: 'GBP', symbol: '£', rate: 0.79, label: 'British Pound' },
  { code: 'EUR', symbol: '€', rate: 0.92, label: 'Euro' },
  { code: 'JPY', symbol: '¥', rate: 155, label: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', rate: 7.23, label: 'Chinese Yuan' },
  { code: 'NGN', symbol: '₦', rate: 1500, label: 'Nigerian Naira' },
  { code: 'GHS', symbol: '₵', rate: 14, label: 'Ghanaian Cedi' },
];

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [activeCurrencyCode, setActiveCurrencyCode] = useState('USD');

  const activeCurrency = currencies.find(c => c.code === activeCurrencyCode) || currencies[0];

  const convertAndFormat = (usdValue, showDecimals = true) => {
    const converted = usdValue * activeCurrency.rate;
    
    // For high inflation currencies, drop decimals for visual cleanliness unless it's very small
    let decimals = showDecimals ? 2 : 0;
    if (['JPY', 'NGN'].includes(activeCurrencyCode) || converted > 100000) {
      decimals = 0;
    }

    return `${activeCurrency.symbol}${converted.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    })}`;
  };

  const convertRaw = (usdValue) => {
    return usdValue * activeCurrency.rate;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currencies, 
      activeCurrencyCode, 
      setActiveCurrencyCode, 
      activeCurrency,
      convertAndFormat,
      convertRaw
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
