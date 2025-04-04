import { useTranslation } from 'react-i18next';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { RTL_LANGUAGES } from '../i18n';

const CookieConsentBanner = () => {
  const { t, i18n } = useTranslation();
  const { showBanner, acceptAll, acceptNecessary, openPreferences } = useCookieConsent();
  
  // Check if current language is RTL
  const isRTL = RTL_LANGUAGES.includes(i18n.language);
  
  if (!showBanner) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-lg font-semibold mb-2">{t("Cookie Settings")}</h3>
          <p className="text-gray-600 mb-4">
            {t("We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.")}
          </p>
          
          <div className={`flex flex-col sm:flex-row ${isRTL ? 'sm:flex-row-reverse' : ''} gap-3 mt-2`}>
            <button 
              onClick={acceptNecessary}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              {t("Accept Necessary")}
            </button>
            <button 
              onClick={acceptAll}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t("Accept All")}
            </button>
            <button 
              onClick={openPreferences}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              {t("Customize")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
