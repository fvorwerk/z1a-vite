import { useTranslation } from 'react-i18next';
import { RTL_LANGUAGES } from '../i18n';

const LegalPageLayout = ({ title, children }) => {
  const { t, i18n } = useTranslation();
  const isRTL = RTL_LANGUAGES.includes(i18n.language);
  
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className={`bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
          
          <div className="prose prose-blue max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;
