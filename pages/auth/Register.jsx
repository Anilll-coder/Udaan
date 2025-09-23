import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle,
} from "lucide-react";
import SiteLanguageDropdown from "../../components/SiteLanguage";
import axios from "axios";
import logo from "../../src/assets/logo2.png";
import bgVideo from "../../src/assets/bg.mp4";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState("student");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profile:""
  });

  const avatarOptions = [
    { id: 1, name: "Knight", emoji: "⚔️", profile:"/profiles/swords.png", color: "from-blue-500 to-blue-600" },
    { id: 2, name: "Wizard", emoji: "🧙‍♂️", profile:"/profiles/mage.png", color: "from-purple-500 to-purple-600" },
    { id: 3, name: "Scholar", emoji: "🎓", profile:"/profiles/hat.png", color: "from-emerald-500 to-emerald-600" },
    { id: 4, name: "Explorer", emoji: "🔍", profile:"/profiles/mag.png", color: "from-amber-500 to-amber-600" },
    { id: 5, name: "Archer", emoji: "🏹", profile:"/profiles/bow_and_arrow.png", color: "from-green-500 to-green-600" },
    { id: 6, name: "Scientist", emoji: "🔬", profile:"/profiles/microscope.png", color: "from-cyan-500 to-cyan-600" },
    { id: 7, name: "Artist", emoji: "🎨", profile:"/profiles/art.png", color: "from-pink-500 to-pink-600" },
    { id: 8, name: "Musician", emoji: "🎵", profile:"/profiles/musical_note.png", color: "from-indigo-500 to-indigo-600" },
  ];

  const onLanguageChange = (lang) => {
    i18n.changeLanguage(lang.key);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAvatar) {
      alert("Please select an avatar to continue");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/auth/register",{
        username:formData.username
        ,email:formData.email
        ,password:formData.password,
        profile_url:selectedAvatar.profile
        ,role:role
      });
      setCurrentStep(3);
      setTimeout(() => {
        alert(`Welcome to QuestLearn! Registered successfully as ${role}!`);
        navigate("/main");
      }, 2000);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Username or email already exists");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div
            className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
              ${currentStep >= step
                ? "bg-gradient-to-r from-green-300 to-green-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {currentStep > step ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div
              className={`
                w-8 h-1 sm:w-12 mx-1 sm:mx-2 transition-all duration-300
                ${currentStep > step
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                  : "bg-gray-200"
                }
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-6 z-[1]">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {t("register.title", "Join QuestLearn")}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">Start your learning adventure today!</p>
      </div>
      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {t("register.role", "I am a")}
        </label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm hover:shadow-md text-base"
        >
          <option value="student">{t("register.student", "🎓 Student")}</option>
          <option value="teacher">{t("register.teacher", "👨‍🏫 Teacher")}</option>
        </select>
      </div>
      {/* Inputs */}
      {[
        { field: "username", icon: User, type: "text" },
        { field: "email", icon: Mail, type: "email" },
        { field: "password", icon: Lock, type: "password" },
      // eslint-disable-next-line no-unused-vars
      ].map(({ field, icon: Icon, type }) => (
        <div key={field} className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t(
              `register.${field}`,
              field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
            )}
          </label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={
                field === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className={`
                w-full pl-10 pr-10 py-2 sm:py-3 rounded-xl bg-white shadow-sm hover:shadow-md border
                ${errors[field]
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-indigo-500"
                }
              `}
              placeholder={t(
                `register.${field}Placeholder`,
                `Enter your ${field}`
              )}
            />
            {field === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          {errors[field] && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[field]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-3 sm:py-4 text-base sm:text-lg bg-gray-900 text-white font-semibold rounded-xl shadow hover:bg-gray-700 transition"
      >
        Next: Choose Your Avatar →
      </button>
    </div>
  );

  const renderAvatarStep = () => (
    <div className="space-y-6 z-[1]">
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
          Choose Your Learning Avatar
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">
          Pick an avatar that represents your learning journey!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {avatarOptions.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => setSelectedAvatar(avatar)}
            className={`
              relative p-2 sm:p-4 rounded-xl border-2 transition-all
              ${selectedAvatar?.id === avatar.id
                ? "border-indigo-500 bg-indigo-50 shadow-lg"
                : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
              }
            `}
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-white text-xl shadow-md`}
            >
              {avatar.emoji}
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">
              {avatar.name}
            </p>
            {selectedAvatar?.id === avatar.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!selectedAvatar || isLoading}
          className="flex-1 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow hover:bg-gray-700 transition disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Start My Adventure!"}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6 z-[1]">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Welcome to QuestLearn!
      </h2>
      <p className="text-gray-600 text-base sm:text-lg">
        Your account has been created successfully. Get ready to embark on your
        learning adventure!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col font-[Poppins] relative ">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      {/* Top Section: Logo + Language */}
      <div className="flex justify-between items-start px-4 sm:px-6 pt-4 sm:pt-6 relative">
        <img
          src={logo}
          alt="LevelUp Logo"
          className="h-10 sm:h-20 md:h-24 lg:h-32 object-contain"
        />
        <SiteLanguageDropdown onLanguageChange={onLanguageChange}/>
      </div>
      {/* Form Card */}
      <div className="flex flex-1 justify-center items-center px-2 sm:px-6  relative z-10">
        <div
          className="w-full max-w-xs sm:max-w-md md:max-w-lg rounded-2xl shadow-lg px-4 sm:px-6 py-6"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {renderStepIndicator()}
            {currentStep === 1 && renderFormStep()}
            {currentStep === 2 && renderAvatarStep()}
            {currentStep === 3 && renderSuccessStep()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
