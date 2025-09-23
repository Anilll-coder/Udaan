import React, { useState } from 'react';
import bgVideo from "../../src/assets/bg.mp4";
import logo from "../../src/assets/logo2.png";
import { useTranslation } from 'react-i18next';
import SiteLanguageDropdown from '../../components/SiteLanguage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [userType, setUserType] = useState('student');
  const [i18n] = useTranslation();
  const [formData, setFormData] = useState({ name: '', pass: '' });
  const nav = useNavigate();

  const onLanguageChange = (lang) => {
    i18n.changeLanguage(lang.key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/login",{
        username_or_email: formData.name,
        password: formData.pass,
        role: userType
      });
      localStorage.setItem("token", res.data.access_token);
      localStorage.removeItem("user");
      nav("/main");
    } catch (err) {
      alert("Login failed: " + err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="flex justify-between items-start px-4 sm:px-6 pt-4 sm:pt-6 relative">
        <img
          src={logo}
          alt="LevelUp Logo"
          className="h-10 sm:h-20 md:h-24 lg:h-32 object-contain"
        />
        <SiteLanguageDropdown onLanguageChange={onLanguageChange} />
      </div>

      <div className="w-full flex items-center justify-center font-[Inter]">
        <div className="relative w-full max-w-md flex flex-col items-center">
          {/* Frosted glass login card */}
          <div
            className="w-full rounded-2xl shadow-md overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(220,220,220,0.5)',
            }}
          >
            {/* Toggle Buttons */}
            <div className="flex justify-center bg-gray-200 text-gray-600 rounded-full m-6 p-1 select-none">
              <button
                onClick={() => setUserType('student')}
                className={`w-1/2 py-2.5 font-medium rounded-full transition-all duration-300 ${
                  userType === 'student'
                    ? 'bg-white text-gray-900 shadow-sm scale-[1.02]'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setUserType('teacher')}
                className={`w-1/2 py-2.5 font-medium rounded-full transition-all duration-300 ${
                  userType === 'teacher'
                    ? 'bg-white text-gray-900 shadow-sm scale-[1.02]'
                    : 'hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Sliding Forms */}
            <div className="relative h-[340px] overflow-hidden px-6">
              <div
                className="absolute top-0 left-0 flex transition-transform duration-500 ease-in-out"
                style={{
                  width: '200%',
                  transform: userType === 'student' ? 'translateX(0%)' : 'translateX(-50%)',
                }}
              >
                {/* Student Form */}
                <form
                  className="w-1/2 p-6 space-y-5 transition-opacity duration-300"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
                    Student Login
                  </h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
                    value={formData.pass}
                    onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-700 transition"
                  >
                    Login
                  </button>
                  <p className="text-center text-gray-600 text-sm mt-4">
                    Don’t have an account?{' '}
                    <a href="/register" className="underline hover:text-gray-900 transition">
                      Sign Up
                    </a>
                  </p>
                </form>

                {/* Teacher Form */}
                <form
                  className="w-1/2 p-6 space-y-5 transition-opacity duration-300"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
                    Teacher Login
                  </h2>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
                    value={formData.pass}
                    onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium shadow hover:bg-gray-700 transition"
                  >
                    Login
                  </button>
                  <p className="text-center text-gray-600 text-sm mt-4">
                    Don’t have an account?{' '}
                    <a href="/register" className="underline hover:text-gray-900 transition">
                      Sign Up
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
