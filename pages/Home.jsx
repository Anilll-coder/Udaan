import SiteLanguageDropdown from "../components/SiteLanguage";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo2.png"; 
import bgVideo from "../src/assets/bg.mp4";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const onLanguageChange = (lang) => {
    console.log(lang.key);
    i18n.changeLanguage(lang.key);
  };

  const handleGuest = ()=>{
    localStorage.setItem("user","guest");
    nav("/learn");
  }
  return (
    <div className="min-h-screen w-full flex flex-col font-[Poppins] relative overflow-hidden">
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Top Section: Logo + Language */}
      <div className="flex justify-between items-start px-4 sm:px-6 pt-4 sm:pt-6 relative ">
        {/* Logo PNG top-left */}
        <img
          src={logo}
          alt="LevelUp Logo"
          className="h-14 sm:h-20 md:h-28 lg:h-36 object-contain"
        />

        <SiteLanguageDropdown onLanguageChange={onLanguageChange} />
      </div>

      {/* 🔹 Main Layout */}
      <div className="flex flex-1 justify-center items-center px-4 sm:px-6 py-4 relative z-10">
        <div
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl shadow-lg px-4 sm:px-6 py-6 sm:py-8 transform sm:translate-x-40 md:translate-x-50 lg:translate-x-60"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-6 text-center tracking-tight">
            {t("home.sen1")} <br /> {t("home.sen2")}
          </h1>

          {/* 🔹 Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <Link to="/register" className="w-full">
              <button className="w-full py-2 sm:py-3 bg-gray-900 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition text-sm sm:text-base">
                {t("home.get")}
              </button>
            </Link>

            <Link to="/login" className="w-full">
              <button className="w-full py-2 sm:py-3 bg-white/80 text-gray-900 border border-gray-300 rounded-lg font-semibold shadow hover:bg-white transition text-sm sm:text-base">
                {t("home.acc")}
              </button>
            </Link>

            <button
              onClick={() => handleGuest()}
              className="w-full py-2 sm:py-3 bg-gray-200/80 text-gray-700 rounded-lg font-medium hover:bg-gray-300/90 transition text-sm sm:text-base"
            >
              {t("home.guest") || "Continue as Guest"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
