import React, { useState } from 'react';
import "./pages_css/Classes.css"

export default function LoginPage() {
  const [userType, setUserType] = useState('student');

  const bgImage = '../src/assets/bground.png';

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Frosted glass login card */}
        <div className="w-full rounded-3xl shadow-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '2px solid rgba(255,255,255,0.18)',
          }}
        >
          {/* Toggle Buttons Container */}
          <div className="flex justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 text-white rounded-full m-6 p-1 shadow-lg select-none opacity-90">
            <button
              onClick={() => setUserType('student')}
              className={`w-1/2 py-3 font-semibold rounded-full transition relative ${
                userType === 'student'
                  ? 'bg-white text-indigo-700 shadow-inner scale-105'
                  : 'hover:bg-white/20 hover:text-indigo-200'
              }`}
              style={{
                animation: userType === 'student' ? 'popIn 0.5s ease forwards' : '',
              }}
            >
              Student
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className={`w-1/2 py-3 font-semibold rounded-full transition relative ${
                userType === 'teacher'
                  ? 'bg-white text-indigo-700 shadow-inner scale-105'
                  : 'hover:bg-white/20 hover:text-indigo-200'
              }`}
              style={{
                animation: userType === 'teacher' ? 'popIn 0.5s ease forwards' : '',
              }}
            >
              Teacher
            </button>
          </div>

          {/* Sliding Forms Container */}
          <div className="relative h-[360px] overflow-hidden px-6">
            <div
              className="absolute top-0 left-0 flex transition-transform duration-600 ease-in-out"
              style={{ width: '200%', transform: userType === 'student' ? 'translateX(0%)' : 'translateX(-50%)' }}
            >
              {/* Student Form */}
              <form className="w-1/2 p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-lg">
                  Student Login
                </h2>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition shadow-md font-semibold  text-indigo-900 bg-white/60"
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{ fontSize: '0.875rem' }}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition shadow-md font-semibold  text-indigo-900 bg-white/60"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:from-pink-600 hover:via-purple-700 hover:to-indigo-800 transition"
                >
                  Login
                </button>
                <p className="text-center text-indigo-700 font-semibold mt-4">
                  Don't have an account?{' '}
                  <a href="#" className="underline hover:text-pink-600 transition">
                    Sign Up
                  </a>
                </p>
              </form>

              {/* Teacher Form */}
              <form className="w-1/2 p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center drop-shadow-lg">
                  Teacher Login
                </h2>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-300 placeholder: focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition shadow-md font-semibold  text-indigo-900 bg-white/60 text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-600 transition shadow-md font-semibold  text-indigo-900 bg-white/60 text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white rounded-xl font-bold shadow-lg hover:from-pink-600 hover:via-purple-700 hover:to-indigo-800 transition"
                >
                  Login
                </button>
                <p className="text-center text-indigo-700 font-semibold mt-4">
                  Don't have an account?{' '}
                  <a href="/signup" className="underline hover:text-pink-600 transition">
                    Sign Up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
