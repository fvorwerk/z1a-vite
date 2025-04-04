import { createContext, useState, useEffect, useContext } from 'react';

const CookieConsentContext = createContext();

export const useCookieConsent = () => useContext(CookieConsentContext);

export const CookieConsentProvider = ({ children }) => {
  // Default consent state
  const [consent, setConsent] = useState({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
    consentGiven: false,
    lastUpdated: null
  });
  
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Load consent from localStorage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setConsent(parsedConsent);
        
        // If consent has been given before, don't show banner
        if (parsedConsent.consentGiven) {
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error parsing stored consent:', error);
        setShowBanner(true);
      }
    } else {
      // No stored consent, show banner
      setShowBanner(true);
    }
  }, []);
  
  // Save consent to localStorage whenever it changes
  useEffect(() => {
    if (consent.consentGiven) {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
    }
  }, [consent]);
  
  // Accept all cookies
  const acceptAll = () => {
    setConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      consentGiven: true,
      lastUpdated: new Date().toISOString()
    });
    setShowBanner(false);
    setShowPreferences(false);
  };
  
  // Accept only necessary cookies
  const acceptNecessary = () => {
    setConsent({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      consentGiven: true,
      lastUpdated: new Date().toISOString()
    });
    setShowBanner(false);
    setShowPreferences(false);
  };
  
  // Update specific consent categories
  const updateConsent = (category, value) => {
    setConsent(prev => ({
      ...prev,
      [category]: value,
      lastUpdated: new Date().toISOString()
    }));
  };
  
  // Save current preferences
  const savePreferences = () => {
    setConsent(prev => ({
      ...prev,
      consentGiven: true,
      lastUpdated: new Date().toISOString()
    }));
    setShowBanner(false);
    setShowPreferences(false);
  };
  
  // Open preferences modal
  const openPreferences = () => {
    setShowPreferences(true);
    setShowBanner(false);
  };
  
  // Close preferences modal
  const closePreferences = () => {
    setShowPreferences(false);
    // Show banner again if consent hasn't been given
    if (!consent.consentGiven) {
      setShowBanner(true);
    }
  };
  
  return (
    <CookieConsentContext.Provider value={{
      consent,
      showBanner,
      showPreferences,
      acceptAll,
      acceptNecessary,
      updateConsent,
      savePreferences,
      openPreferences,
      closePreferences
    }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export default CookieConsentContext;
