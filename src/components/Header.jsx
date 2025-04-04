import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo2 from '../assets/images/logo-2.png';
import { RTL_LANGUAGES } from '../i18n'; // Import the RTL languages list

const Header = ({ siteTitle }) => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  
  // Get available languages from i18n
  useEffect(() => {
    const languages = Object.keys(i18n.services.resourceStore.data);
    setAvailableLanguages(languages);
  }, [i18n]);

  // Define all available languages with their metadata in one place
  const AVAILABLE_LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'bg', name: 'Български', flag: '🇧🇬' },
    { code: 'be', name: 'Беларуская', flag: '🇧🇾' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
    { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Get current language flag and name using AVAILABLE_LANGUAGES
  const getCurrentLanguageInfo = () => {
    const currentLang = AVAILABLE_LANGUAGES.find(lang => lang.code === i18n.language) || 
                        { code: i18n.language, name: i18n.language, flag: '🌐' };
    return currentLang;
  };

  // Check if current language is RTL
  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  // Define nav link style with hover effect
  const navLinkClass = "nav-link relative inline-block py-1 hover:text-blue-600 transition-colors";
  
  // Get current language information
  const currentLanguage = getCurrentLanguageInfo();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className={`container mx-auto px-4 py-2 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-center`}>
        <Link to="/" className="flex items-center">
          <img src={logo2} alt="Z1 Ausbildungszentrum GmbH" className={`h-10 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        </Link>
        
        <nav>
          <ul className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-6 items-center`}>
            <li><a href="#mission" className={navLinkClass}>{t("Mission")}</a></li>
            <li><a href="#services" className={navLinkClass}>{t("Services")}</a></li>
            <li><a href="#projects" className={navLinkClass}>{t("Projects")}</a></li>
            <li><a href="#contact" className={navLinkClass}>{t("Contact")}</a></li>
            <li className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <span className="mr-1">{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isDropdownOpen && (
                <>
                  {/* Invisible overlay to detect clicks outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={handleClickOutside}
                    aria-hidden="true"
                  ></div>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 max-h-96 overflow-y-auto">
                    <div className="px-2 py-3">
                      <div className="text-gray-500 px-3 text-sm font-medium mb-2">
                        {t('Language')}
                      </div>
                      <div className="space-y-1">
                        {AVAILABLE_LANGUAGES.map((language) => (
                          <button
                            key={language.code}
                            className={`w-full text-left px-3 py-1 text-sm rounded-md flex items-center ${
                              i18n.language === language.code
                                ? 'bg-primary-50 text-primary-600'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => {
                              i18n.changeLanguage(language.code);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <span className="mr-2 text-lg" aria-hidden="true">{language.flag}</span>
                            {language.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
