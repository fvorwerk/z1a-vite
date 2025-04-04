import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import logo2 from '../assets/images/logo-2.png';
import icon1 from '../assets/images/icon-1.png';
import { RTL_LANGUAGES } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationMenu from './NavigationMenu';

const Header = ({ siteTitle }) => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const prevScrollRef = useRef(0);
  const headerRef = useRef(null);
  const ticking = useRef(false);
  
  // Improved scroll position tracking with throttling and debouncing
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const isScrollUp = currentScroll < prevScrollRef.current;
          
          // Increased threshold to reduce sensitivity
          const scrollThreshold = 15;
          if (Math.abs(currentScroll - prevScrollRef.current) > scrollThreshold) {
            setIsScrollingUp(isScrollUp);
            
            // Clear any pending timeout to debounce rapid changes
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              // Set compact mode with increased hysteresis to prevent flickering
              if (currentScroll > 120 && !isScrollUp) {
                setIsCompact(true);
              } else if (currentScroll <= 40 || (isScrollUp && currentScroll <= 100)) {
                setIsCompact(false);
              }
            }, 50); // Short debounce delay
          }
          
          setScrollPosition(currentScroll);
          prevScrollRef.current = currentScroll;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Check if current language is RTL
  const isRTL = RTL_LANGUAGES.includes(i18n.language);

  // Calculate header height for placeholder
  const [headerHeight, setHeaderHeight] = useState(148);
  
  // Improved header height management with a more robust approach
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        // Get the actual rendered height
        const actualHeight = headerRef.current.offsetHeight;
        
        // Add a small buffer to prevent content from being cut off (5px)
        const heightWithBuffer = actualHeight + 5;
        
        // Only update if there's a significant change to avoid unnecessary re-renders
        if (Math.abs(heightWithBuffer - headerHeight) > 2) {
          setHeaderHeight(heightWithBuffer);
        }
      }
    };
    
    // Run initially
    updateHeaderHeight();
    
    // Create a more robust observer that watches for size changes
    let resizeObserver;
    try {
      // Use ResizeObserver if available (more accurate than MutationObserver for size changes)
      resizeObserver = new ResizeObserver(() => {
        window.requestAnimationFrame(updateHeaderHeight);
      });
      
      if (headerRef.current) {
        resizeObserver.observe(headerRef.current);
      }
    } catch (e) {
      // Fallback to standard approach if ResizeObserver isn't available
      const observer = new MutationObserver(updateHeaderHeight);
      if (headerRef.current) {
        observer.observe(headerRef.current, { 
          attributes: true, 
          childList: true,
          subtree: true 
        });
      }
      
      // Also listen for window resize
      window.addEventListener('resize', updateHeaderHeight);
      
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateHeaderHeight);
      };
    }
    
    // Additional listeners for layout shifts
    window.addEventListener('load', updateHeaderHeight);
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('load', updateHeaderHeight);
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [isCompact, headerHeight]); // Include headerHeight in dependencies

  return (
    <>
      <header ref={headerRef} className="fixed w-full top-0 z-40 shadow-sm">
        <div className="bg-white">
          {/* Top section with logo and language switcher */}
          <div className={`transition-all duration-500 ease-out will-change-transform ${
            isCompact ? 'h-12' : 'h-[88px] md:h-[100px]'
          }`}>
            <div className="container mx-auto px-4 h-full">
              <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-center h-full`}>
                <Link to={`/${i18n.language}`} className="flex items-center">
                  <img 
                    src={isCompact ? icon1 : logo2} 
                    alt={siteTitle} 
                    className={`transition-all duration-300 ${
                      isCompact ? 'h-8' : 'h-12 md:h-14 lg:h-16'
                    }`}
                  />
                </Link>
                
                {/* Back to Top Button - Only visible in compact mode */}
                {isCompact && (
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded-full transition-colors shadow-sm border border-gray-200"
                    aria-label={t("Back to Top")}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                    <span className="text-[10px] leading-tight mt-0.5">{t("Back to Top")}</span>
                  </button>
                )}
                
                {/* Language Switcher Component */}
                <LanguageSwitcher isCompact={isCompact} />
              </div>
            </div>
          </div>

          {/* Navigation Menu Component */}
          <NavigationMenu isCompact={isCompact} />
        </div>
      </header>
      {/* Improved placeholder - use inline style with !important to ensure it takes precedence */}
      <div 
        style={{ height: `${headerHeight}px !important`, minHeight: `${headerHeight}px !important` }} 
        className="w-full" 
        aria-hidden="true"
      />
    </>
  );
};

export default Header;
