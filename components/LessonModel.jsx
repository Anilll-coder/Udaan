import React from 'react';
import { X, Star, Zap } from 'lucide-react';

export const LessonModal = ({ lesson, onClose, onStart }) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl self-center font-bold text-gray-800">{lesson.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {lesson.type === 'story' ? (
              <Star className="w-10 h-10 text-white" />
            ) : (
              <span className="text-2xl font-bold text-white">{lesson.id}</span>
            )}
          </div>
          
          <p className="text-center text-gray-600 mb-4">
            {lesson?.topic}
          </p>
          
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>+{lesson.xp || 20} XP</span>
            </div>
            {lesson.type !== 'story' && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Earn 3 stars</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onStart}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {lesson.status === 'completed' ? 'Practice Again' : 'Start Lesson'}
          </button>
          
          {lesson.status === 'available' && (
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
            >
              Maybe Later
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
