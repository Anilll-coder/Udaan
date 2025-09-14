import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./pages_css/Classes.css"

const subjectsByClass = {
  6: ['Math', 'Science', 'English'],
  7: ['Math', 'Science', 'English'],
  8: ['Math', 'Science', 'English'],
  9: ['Math', 'Physics', 'Chemistry', 'Biology'],
  10: ['Math', 'Physics', 'Chemistry', 'Biology'],
  11: ['Math', 'Physics', 'Chemistry', 'Biology'],
  12: ['Math', 'Physics', 'Chemistry', 'Biology'],
};

const levels = ['Level 1', 'Level 2', 'Level 3'];

export default function SubjectSelectionPage() {
  const { classId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState('Math');
  const [loading, setLoading] = useState(false);

  const handleSubjectSelect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen p-8 flex flex-col items-center text-white"
      style={{
        backgroundImage:
          'url(../src/assets/bground.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl text-black font-extrabold mb-8 drop-shadow-lg">
        Subjects for Class {classId}
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {subjectsByClass[classId].map((subject) => (
          <button
            key={subject}
            onClick={() => {handleSubjectSelect();setSelectedSubject(subject)}}
            className={`card cursor-pointer select-none rounded-lg px-8 py-4 font-semibold text-xl transition-all duration-300 shadow-lg transform ${
              selectedSubject === subject
                ? ' scale-110 shadow-2xl'
                : 'hover:scale-105'
            }`}
          >
            {subject}
            <span
      className={`
        absolute bottom-2 left-6 right-6 h-1 rounded bg-blue-600 transition-all duration-300
        ${selectedSubject === subject ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
      `}
    />
          </button>
        ))}
      </div>

      <div className="bgg w-full flex flex-col items-center gap-6">
        {/* The subject label */}
        <h2 className="text-3xl font-semibold mb-2 text-green-800">
          {selectedSubject} Levels
        </h2>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center animate-pulse">
            <div className="loader rounded-full border-8 border-t-8 border-blue-300 h-16 w-16 mb-4"></div>
            <p className="text-lg font-medium">Loading levels...</p>
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-full max-w-2xl pt-8">
            <svg className="absolute left-0 right-0 top-12 h-16 w-full pointer-events-none z-0" viewBox="0 0 600 80">
              {levels.map((lvl, idx) =>
                idx < levels.length - 1 ? (
                  <line
                    key={idx}
                    x1={100 + idx * 120}
                    y1={40}
                    x2={100 + (idx + 1) * 120}
                    y2={40}
                    stroke="#38bdf8"
                    strokeDasharray="8"
                    strokeWidth="4"
                    style={{ animation: 'dashGrow 1s ease-out forwards', animationDelay: `${idx * 0.18}s` }}
                  />
                ) : null
              )}
            </svg>
            <div className="flex gap-24 z-10">
              {levels.map((lvl, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl border-4
                      transition-transform duration-300
                      ${lvl.completed ? 'bg-green-400 border-green-900' : 'bg-white border-blue-400 animate-bounceIn'}
                      relative
                    `}
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    {lvl.completed ? (
                      <span className="text-green-900 scale-150 animate-fadeIn">&#10003;</span>
                    ) : (
                      <span className="text-blue-600">{idx + 1}</span>
                    )}
                  </div>
                  <span className={`mt-3 text-lg font-semibold ${lvl.completed ? 'text-green-900' : 'text-blue-700'} drop-shadow-md animate-fadeIn`}>
                    {lvl.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .loader {
            border-top-color: darkblue;
            animation: spin 1s linear infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
          @keyframes dashGrow {
            from { stroke-dashoffset: 80; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes bounceIn {
            0% { transform: scale(0.4); opacity: 0;}
            50% { transform: scale(1.2); opacity: 1;}
            100% { transform: scale(1); opacity: 1;}
          }
          @keyframes fadeIn {
            from { opacity: 0;}
            to { opacity: 1;}
          }
          .animate-bounceIn { animation: bounceIn 0.7s both;}
          .animate-fadeIn { animation: fadeIn 0.7s 0.4s both;}
          .bgg{
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2); /* Transparent */
            backdrop-filter: blur(15px); /* Gaussian blur */
            border: 2px solid rgba(255, 255, 255, 0.3);
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
