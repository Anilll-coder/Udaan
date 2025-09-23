import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const classes = [6, 7, 8, 9, 10, 11, 12];

export default function SelectClass() {
  const navigate = useNavigate();

  const handleSelect = (cls) => {
    navigate(`/self-learn/class/${cls}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-6">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 mb-10 text-center"
      >
        Choose Your Class 📚
      </motion.h1>

      {/* Class Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl w-full">
        {classes.map((cls, index) => (
          <motion.div
            key={cls}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(cls)}
            className="cursor-pointer bg-white shadow-lg rounded-2xl p-8 flex items-center justify-center text-xl font-semibold text-green-700 hover:shadow-2xl transition-all"
          >
            Class {cls}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
