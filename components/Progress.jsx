import React from 'react';

export const ProgressBar = ({ current, total, level }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-600">Level {level}</span>
        <span className="text-sm font-semibold text-gray-600">{current}/{total} XP</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}` }}
        ></div>
      </div>
    </div>
  );
};
