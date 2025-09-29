import React from 'react';
import { CheckCircle, Lock, Star } from 'lucide-react';

export const LessonNode = ({ lesson, onClick, position }) => {
  const getNodeStyles = () => {
    switch (lesson.status) {
      case 'locked':
        return 'bg-gray-300 text-gray-500 cursor-not-allowed';
      case 'available':
        return 'bg-green-500 text-white hover:bg-green-600 cursor-pointer transform hover:scale-110 transition-all duration-200';
      case 'current':
        return 'bg-yellow-400 text-white cursor-pointer transform hover:scale-110 ring-4 ring-yellow-200 animate-pulse transition-all duration-200';
      case 'completed':
        return 'bg-yellow-500 text-white cursor-pointer transform hover:scale-110 transition-all duration-200';
      default:
        return 'bg-gray-300';
    }
  };

  const getIcon = () => {
    if (lesson.status === 'locked') return <Lock className="w-6 h-6" />;
    if (lesson.status === 'completed') return <CheckCircle className="w-6 h-6" />;
    if (lesson.type === 'story') return <Star className="w-6 h-6" />;
    if (lesson.type === 'checkpoint') return <span className="text-xs font-bold">CP</span>;
    return <span className="text-lg font-bold">{lesson.id.charAt(0)}</span>;
  };

  const handleClick = () => {
    if (lesson.status !== 'locked') {
      onClick(lesson);
    }
    else{
      alert("locked");
    }
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${getNodeStyles()}`}
        onClick={handleClick}
      >
        {getIcon()}
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-sm font-semibold text-gray-700 max-w-20 mx-auto leading-tight">
          {lesson.id}
        </p>
        {lesson.stars && lesson.status === 'completed' && (
          <div className="flex justify-center mt-1 space-x-1">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < lesson.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
