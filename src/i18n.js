import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Array of all supported languages
const supportedLanguages = ['en', 'de', 'ru', 'bg', 'be', 'sr', 'uk', 'mk', 'tr', 'ar'];

// Array of RTL languages - export this for Header.jsx
export const RTL_LANGUAGES = ['ar'];

i18n
  // Load translations using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Init i18next
  .init({
    fallbackLng: 'de',
    supportedLngs: supportedLanguages,
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // not needed for React
    },
    
    // Backend configuration to point to the correct folder structure
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Adjust document direction based on language
    react: {
      useSuspense: true,
    },
    
    // Function to handle RTL languages
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0, // Detect language from the first segment of the path
      caches: ['localStorage'],
    },

    // Change default language to German
    lng: 'de',
  });

// Set document direction based on language
i18n.on('languageChanged', (lng) => {
  const direction = RTL_LANGUAGES.includes(lng) ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = lng;
});

export default i18n;
