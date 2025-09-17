import "./pages_css/home.css";
import SiteLanguageDropdown from "../components/SiteLanguage";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Home = () => {
  const { t, i18n } = useTranslation();

  const onLanguageChange = (lang) => {
    console.log(lang.key);
    i18n.changeLanguage(lang.key);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f9fafb] via-[#f0fdf4] to-[#e0f2fe] flex flex-col font-sans relative overflow-hidden">
      
      {/* Language Dropdown */}
      <div className="flex justify-end pt-4 pr-4">
        <SiteLanguageDropdown onLanguageChange={onLanguageChange} />
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-8 md:gap-16 flex-1 px-6 py-4">
        
        {/* Left Section: Logo */}
        <div className="concept-two flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
          {['L', 'E', 'V', 'E', 'L', 'U', 'P'].map((letter, idx) => (
          <div className="hover text-xl sm:text-2xl md:text-3xl font-bold">
            <h1
              key={idx}
              
            >
              {letter}
            </h1>
            </div>
          ))}
        </div>

        {/* Right Section: Content */}
        <div className="w-full max-w-md text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 leading-tight mb-6 font-inter">
            {t('home.sen1')} <br /> {t('home.sen2')}
          </h1>

          {/* Buttons */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/register" className="w-full">
              <button className="btn-primary">{t('home.get')}</button>
            </Link>

            <Link to="/login" className="w-full">
              <button className="btn-secondary">{t('home.acc')}</button>
            </Link>

            <button
              onClick={() => alert("Guest mode activated")}
              className="btn-guest w-full"
            >
              {t('home.guest') || "Continue as Guest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
