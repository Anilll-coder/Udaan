import React from 'react';
import { useNavigate } from 'react-router-dom';

const classes = [6, 7, 8, 9, 10, 11, 12];

export default function ClassSelectionPage() {
  const navigate = useNavigate();

  const handleClassSelect = (cls) => {
    navigate(`/subjects/${cls}`);
  };

  return (
    <div className='bgd'>
    <div className="classes h-max p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 drop-shadow-md">
        Select Your Class
      </h1>

      <div className="mb-8 grid grid-cols-4 gap-6 max-w-xl w-full">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => handleClassSelect(cls)}
            className="py-3 rounded-xl font-bold text-lg bg-white text-[#64ac46] hover:bg-[#64ac46] hover:text-white shadow-md transition transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-400"
          >
            Class {cls}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
}
