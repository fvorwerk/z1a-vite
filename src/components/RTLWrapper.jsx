import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// List of RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

const RTLWrapper = ({ children }) => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Check if current language is RTL
    const isRTL = RTL_LANGUAGES.includes(i18n.language);
    
    // Set direction attribute on html element
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add or remove RTL class on body for additional styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    return () => {
      // Cleanup function to reset direction when component unmounts
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    };
  }, [i18n.language]);
  
  return children;
};

export default RTLWrapper;
