import { useTranslation } from 'react-i18next';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { RTL_LANGUAGES } from '../i18n';

const CookiePreferencesModal = () => {
  const { t, i18n } = useTranslation();
  const { 
    showPreferences, 
    consent, 
    updateConsent, 
    savePreferences, 
    closePreferences,
    acceptAll 
  } = useCookieConsent();
  
  // Check if current language is RTL
  const isRTL = RTL_LANGUAGES.includes(i18n.language);
  
  if (!showPreferences) return null;
  
  // Cookie categories with descriptions
  const cookieCategories = [
    {
      id: 'necessary',
      name: t('Necessary'),
      description: t('These cookies are essential for the website to function properly. They cannot be disabled.'),
      required: true
    },
    {
      id: 'functional',
      name: t('Functional'),
      description: t('These cookies enable personalized features and functionality. They may be set by us or third-party providers.'),
      required: false
    },
    {
      id: 'analytics',
      name: t('Analytics'),
      description: t('These cookies help us understand how visitors interact with our website, helping us improve our services.'),
      required: false
    },
    {
      id: 'marketing',
      name: t('Marketing'),
      description: t('These cookies are used to track visitors across websites to display relevant advertisements.'),
      required: false
    }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className={`p-6 border-b ${isRTL ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-semibold">{t("Cookie Preferences")}</h2>
        </div>
        
        <div className={`p-6 overflow-y-auto max-h-[60vh] ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-gray-600 mb-6">
            {t("Manage your cookie preferences. Necessary cookies help make a website usable by enabling basic functions like page navigation. The website cannot function properly without these cookies.")}
          </p>
          
          <div className="space-y-6">
            {cookieCategories.map(category => (
              <div key={category.id} className="pb-4 border-b border-gray-200 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{category.name}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={consent[category.id]}
                      onChange={(e) => updateConsent(category.id, e.target.checked)}
                      disabled={category.required}
                    />
                    <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:${isRTL ? 'right-[2px]' : 'left-[2px]'} after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
                <p className="text-sm text-gray-500">{category.description}</p>
                {category.required && (
                  <span className="text-xs text-gray-400 italic block mt-1">
                    {t("Required for the website to function properly")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className={`p-6 border-t bg-gray-50 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between`}>
          <button 
            onClick={closePreferences}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors"
          >
            {t("Cancel")}
          </button>
          
          <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
            <button 
              onClick={acceptAll}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
            >
              {t("Accept All")}
            </button>
            <button 
              onClick={savePreferences}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t("Save Preferences")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
