import React from 'react';
import { Flame, Zap, Heart } from 'lucide-react';

export const Header = ({ streak, xp, hearts }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-green-500">LearnLingo</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-500">{streak}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-blue-500">{xp}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-bold text-red-500">{hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
