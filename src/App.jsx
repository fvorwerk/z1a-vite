import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, BrowserRouter, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RTLWrapper from './components/RTLWrapper';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import NotFoundPage from './pages/NotFoundPage';
import ImpressumPage from './pages/legal/ImpressumPage';
import PrivacyPolicyPage from './pages/legal/PrivacyPolicyPage';
import TermsPage from './pages/legal/TermsPage';
import WithdrawalPage from './pages/legal/WithdrawalPage';
import ShippingPage from './pages/legal/ShippingPage';
import CookieConsentBanner from './components/CookieConsentBanner';
import CookiePreferencesModal from './components/CookiePreferencesModal';
import { CookieConsentProvider } from './contexts/CookieConsentContext';
import TranslationDebugPage from './pages/TranslationDebugPage';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const defaultLanguage = 'de';
  const supportedLanguages = ['en', 'de', 'ru', 'bg', 'be', 'sr', 'uk', 'mk', 'tr', 'ar'];

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const pathLang = pathSegments[0];

    // Handle root path and language switching
    if (!pathLang) {
      navigate(`/${defaultLanguage}`, { replace: true });
    } else if (supportedLanguages.includes(pathLang) && pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang);
    } else if (!supportedLanguages.includes(pathLang)) {
      navigate(`/${defaultLanguage}${location.pathname}`, { replace: true });
    }
  }, [location, navigate, i18n, defaultLanguage]);

  // Add scroll restoration on route change
  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]); // Only trigger on pathname changes, not hash changes

  return (
    <CookieConsentProvider>
      <RTLWrapper>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header siteTitle="Z1 Ausbildungszentrum GmbH" />
          <main className="flex-grow relative">
            <Routes>
              {/* Redirect root to default language */}
              <Route path="/" element={<Navigate to={`/${defaultLanguage}`} replace />} />
              
              {/* Language-specific routes */}
              <Route path="/:lang" element={<HomePage />} />
              <Route path="/:lang/services" element={<ServicesPage />} />
              <Route path="/:lang/legal/impressum" element={<ImpressumPage />} />
              <Route path="/:lang/legal/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/:lang/legal/terms" element={<TermsPage />} />
              <Route path="/:lang/legal/withdrawal" element={<WithdrawalPage />} />
              <Route path="/:lang/legal/shipping" element={<ShippingPage />} />
              
              {/* 404 for invalid languages or paths */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
          
          {/* Cookie consent components */}
          <CookieConsentBanner />
          <CookiePreferencesModal />
        </div>
      </RTLWrapper>
    </CookieConsentProvider>
  );
}

export default App;
