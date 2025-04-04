import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">{t("Page Not Found")}</h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        {t("The page you are looking for doesn't exist or has been moved.")}
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        {t("Go back home")}
      </Link>
    </div>
  );
};

export default NotFoundPage;
