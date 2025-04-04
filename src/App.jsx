import { useTranslation } from 'react-i18next';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
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

function App() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  return (
    <CookieConsentProvider>
      <RTLWrapper>
        <div className="flex flex-col min-h-screen overflow-x-hidden">
          <Header siteTitle="Z1 Ausbildungszentrum GmbH" />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              
              {/* Legal pages */}
              <Route path="/legal/impressum" element={<ImpressumPage />} />
              <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/legal/terms" element={<TermsPage />} />
              <Route path="/legal/withdrawal" element={<WithdrawalPage />} />
              <Route path="/legal/shipping" element={<ShippingPage />} />
              
              {/* Add the debug route */}
              <Route path="/translation-debug" element={<TranslationDebugPage />} />
              
              {/* 404 page */}
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
