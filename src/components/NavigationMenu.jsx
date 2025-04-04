import { useTranslation } from 'react-i18next';

const NavigationMenu = ({ isCompact }) => {
  const { t } = useTranslation();
  
  // Define nav link style with hover effect
  const navLinkClass = "nav-link relative inline-block py-1 hover:text-blue-600 transition-colors";

  const handleHashClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`bg-white shadow-md transition-all duration-500 ease-out ${
      isCompact ? 'max-h-0 opacity-0 transform translate-y-[-10px] overflow-hidden' : 'max-h-[200px] opacity-100 transform translate-y-0'
    }`}>
      <nav className="container mx-auto px-2 sm:px-4 py-2">
        <ul className="flex flex-row items-center justify-between w-full">
          <li className="flex-1 text-center">
            <button onClick={(e) => handleHashClick(e, 'mission')} className={`${navLinkClass} text-sm sm:text-sm md:text-base w-full px-1`}>
              {t("Mission")}
            </button>
          </li>
          <li className="flex-1 text-center">
            <button onClick={(e) => handleHashClick(e, 'services')} className={`${navLinkClass} text-sm sm:text-sm md:text-base w-full px-1`}>
              {t("Services")}
            </button>
          </li>
          <li className="flex-1 text-center">
            <button onClick={(e) => handleHashClick(e, 'projects')} className={`${navLinkClass} text-sm sm:text-sm md:text-base w-full px-1`}>
              {t("Projects")}
            </button>
          </li>
          <li className="flex-1 text-center">
            <button onClick={(e) => handleHashClick(e, 'contact')} className={`${navLinkClass} text-sm sm:text-sm md:text-base w-full px-1`}>
              {t("Contact")}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationMenu;
