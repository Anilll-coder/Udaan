import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import SiteLanguageDropdown from '../components/SiteLanguage';
import axios from "axios";

const Register = () => {
  const { t, i18n } = useTranslation();

  const [role, setRole] = useState('student');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const avatarOptions = [
    { id: 1, name: 'Knight', emoji: '⚔️', color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Wizard', emoji: '🧙‍♂️', color: 'from-purple-500 to-purple-600' },
    { id: 3, name: 'Scholar', emoji: '🎓', color: 'from-emerald-500 to-emerald-600' },
    { id: 4, name: 'Explorer', emoji: '🔍', color: 'from-amber-500 to-amber-600' },
    { id: 5, name: 'Archer', emoji: '🏹', color: 'from-green-500 to-green-600' },
    { id: 6, name: 'Scientist', emoji: '🔬', color: 'from-cyan-500 to-cyan-600' },
    { id: 7, name: 'Artist', emoji: '🎨', color: 'from-pink-500 to-pink-600' },
    { id: 8, name: 'Musician', emoji: '🎵', color: 'from-indigo-500 to-indigo-600' },
  ];

  const onLanguageChange = (lang) => {
    i18n.changeLanguage(lang.key);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedAvatar) {
      alert('Please select an avatar to continue');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/register', {
        ...formData,
        role: role,
        avatar: selectedAvatar,
      });
      
      console.log('Registration successful:', response.data);
      setCurrentStep(3);
      
      setTimeout(() => {
        alert(`Welcome to QuestLearn! Registered successfully as ${role}!`);
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
            ${currentStep >= step 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-500'
            }
          `}>
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 3 && (
            <div className={`
              w-12 h-1 mx-2 transition-all duration-300
              ${currentStep > step ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'}
            `} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-6 animate-slideIn">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          {t('register.title', 'Join QuestLearn')}
        </h2>
        <p className="text-gray-600">Start your learning adventure today!</p>
      </div>

      <div className="relative">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {t('register.role', 'I am a')}
        </label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
        >
          <option value="student">{t('register.student', '🎓 Student')}</option>
          <option value="teacher">{t('register.teacher', '👨‍🏫 Teacher')}</option>
        </select>
      </div>

      {[
        { field: 'username', icon: User, type: 'text' },
        { field: 'email', icon: Mail, type: 'email' },
        { field: 'password', icon: Lock, type: 'password' },
      ].map(({ field, icon: Icon, type }) => (
        <div key={field} className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {t(`register.${field}`, field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'))}
          </label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={
                field.includes('password') 
                  ? (field === 'password' ? (showPassword ? 'text' : 'password'):'text')
                  : type
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className={`
                w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white shadow-sm hover:shadow-md
                ${errors[field] 
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                }
              `}
              placeholder={t(`register.${field}Placeholder`, `Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)}
            />
            {field.includes('password') && (
              <button
                type="button"
                onClick={() => field === 'password' ? setShowPassword(!showPassword) : {}}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {(field === 'password') ? (showPassword ? 
                  <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />):{}
                }
              </button>
            )}
          </div>
          {errors[field] && (
            <div className="flex items-center mt-1 text-red-500 text-sm animate-shake">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors[field]}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleNextStep}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-300"
      >
        Next: Choose Your Avatar →
      </button>
    </div>
  );

  const renderAvatarStep = () => (
    <div className="space-y-6 animate-slideIn">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Choose Your Learning Avatar
        </h2>
        <p className="text-gray-600">Pick an avatar that represents your learning journey!</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {avatarOptions.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => setSelectedAvatar(avatar)}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
              ${selectedAvatar?.id === avatar.id
                ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
              }
            `}
          >
            <div className={`
              w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${avatar.color} 
              flex items-center justify-center text-white text-xl shadow-md
            `}>
              {avatar.emoji}
            </div>
            <p className="text-xs font-medium text-gray-700 text-center">{avatar.name}</p>
            {selectedAvatar?.id === avatar.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!selectedAvatar || isLoading}
          className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Start My Adventure!'
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6 animate-bounce-in">
      <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-pulse">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Welcome to QuestLearn!</h2>
      <p className="text-gray-600">Your account has been created successfully. Get ready to embark on your learning adventure!</p>
      <div className="animate-celebration">🎉 🎊 ✨</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10 animate-float-delayed"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
        <div className="absolute top-4 right-4">
          <SiteLanguageDropdown onLanguageChange={onLanguageChange} />
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            {renderStepIndicator()}
            
            {currentStep === 1 && renderFormStep()}
            {currentStep === 2 && renderAvatarStep()}
            {currentStep === 3 && renderSuccessStep()}
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes celebration {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .animate-slideIn { animation: slideIn 0.5s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out; }
        .animate-celebration { animation: celebration 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;