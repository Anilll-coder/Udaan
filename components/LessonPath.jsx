import React from 'react';
import { LessonNode } from './LessonNode';

export const LessonPath = ({ lessons, onLessonClick }) => {
  const getPosition = (index) => {
    const centerX = 300;
    const startY = 100;
    const verticalSpacing = 100;
    const horizontalVariation = 80;
    
    const row = index;
    const zigzagPattern = Math.sin(index * 0.8) * horizontalVariation;
    
    return {
      x: centerX + zigzagPattern,
      y: startY + row * verticalSpacing,
    };
  };

  const renderPath = () => {
    const pathElements = [];
    
    for (let i = 0; i < lessons.length - 1; i++) {
      const currentPos = getPosition(i);
      const nextPos = getPosition(i + 1);
      
      pathElements.push(
        <line
          key={`path-${i}`}
          x1={currentPos.x}
          y1={currentPos.y + 32} // Offset by node radius
          x2={nextPos.x}
          y2={nextPos.y - 32} // Offset by node radius
          stroke="#d1d5db"
          strokeWidth="4"
          strokeDasharray="8,4"
        />
      );
    }
    
    return pathElements;
  };

  const maxY = getPosition(lessons.length - 1).y + 100;

  return (
    <div className="relative w-full overflow-y-auto" style={{ height: maxY }}>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {renderPath()}
      </svg>
      
      {lessons.map((lesson, index) => (
        <LessonNode
          key={lesson.id}
          lesson={lesson}
          onClick={onLessonClick}
          position={getPosition(index)}
        />
      ))}
    </div>
  );
};
