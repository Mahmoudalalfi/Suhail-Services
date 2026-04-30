import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Check local storage or default to German
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_lang') || 'de';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === 'de' ? 'de' : 'en';
    document.title =
      lang === 'de'
        ? 'Suhail Services — Service & Facility'
        : 'Suhail Services — Facility Services';
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'de' : 'en'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // fallback to key if not found
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
