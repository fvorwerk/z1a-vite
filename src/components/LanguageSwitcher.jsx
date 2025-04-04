import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const LanguageSwitcher = ({ isCompact }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Define all available languages with their metadata
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  const changeLanguage = (newLang) => {
    // Get the current path segments
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    // If we're at root language path (e.g., /de, /en)
    if (pathSegments.length <= 1) {
      navigate(`/${newLang}`);
    } else {
      // For other paths, replace the language segment
      const newPath = `/${newLang}/${pathSegments.slice(1).join('/')}`;
      navigate(newPath);
    }
    
    i18n.changeLanguage(newLang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Get current language flag and name
  const getCurrentLanguageInfo = () => {
    const currentLang = AVAILABLE_LANGUAGES.find(lang => lang.code === i18n.language) || 
                        { code: i18n.language, name: i18n.language, flag: '🌐' };
    return currentLang;
  };
  
  const currentLanguage = getCurrentLanguageInfo();

  // Calculate dropdown position based on button position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  
  // Function to update dropdown position - simplified to use viewport coordinates only
  const updateDropdownPosition = () => {
    if (buttonRef.current && isDropdownOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        right: window.innerWidth - rect.right
      });
    }
  };

  // Update position only when dropdown opens or compact status changes
  useEffect(() => {
    if (isDropdownOpen) {
      updateDropdownPosition();
    }
  }, [isDropdownOpen, isCompact]);
  
  // Update position on window resize only
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const handleResize = () => {
      window.requestAnimationFrame(updateDropdownPosition);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDropdownOpen]);

  // Prevent body scroll when dropdown is open
  useEffect(() => {
    if (isDropdownOpen) {
      // Save the current body overflow style
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      // This prevents the page from shifting when dropdown opens
      document.body.style.overflow = originalStyle;
    }
    
    return () => {
      // No need to reset - we're not changing the original style
    };
  }, [isDropdownOpen]);

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className={`transition-opacity duration-300 ${
          isCompact ? 'hidden' : 'hidden md:inline ml-2'
        }`}>{currentLanguage.name}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed w-48 bg-white rounded-md shadow-lg py-1 z-[9999] border border-gray-200 max-h-[60vh] overflow-y-auto"
          style={{ 
            top: `${dropdownPosition.top}px`, 
            right: `${dropdownPosition.right}px`,
            position: 'fixed', // Ensure it's fixed
            transform: 'translateZ(0)' // Force GPU acceleration for smoother rendering
          }}
        >
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
                  onClick={() => changeLanguage(language.code)}
                >
                  <span className="mr-2 text-lg" aria-hidden="true">{language.flag}</span>
                  {language.name}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LanguageSwitcher;
