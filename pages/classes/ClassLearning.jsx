import React, { useState } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Levels from "../games/Levels.jsx"

const subjectsByClass = {
  6: ["Math", "Science", "English", "History"],
  7: ["Math", "Science", "Geography", "English"],
  8: ["Math", "Physics", "Chemistry", "Biology"],
  9: ["Math", "Science", "English", "Social Studies"],
  10: ["Math", "Science", "English", "Economics"],
  11: ["Math", "Physics", "Chemistry", "Biology", "Computer Science"],
  12: ["Math", "Physics", "Chemistry", "Biology", "Computer Science"],
};

// Dummy levels

export default function ClassLearning() {
  const { classId } = useParams();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = subjectsByClass[classId] || [];

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-tr from-green-50 via-white to-green-100 p-6 gap-6">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sm:w-1/3 bg-white shadow-lg rounded-2xl p-6"
      >
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Class {classId} – Subjects
        </h1>
        <div className="space-y-4">
          {subjects.map((subject, idx) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubject(subject)}
              className={`cursor-pointer p-4 rounded-xl shadow-md text-center font-semibold transition-all ${
                selectedSubject === subject
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {subject}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 bg-white shadow-lg rounded-2xl p-6"
      >
        {!selectedSubject ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-lg">
            Select a subject to see levels →
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-green-700 mb-6">
              {selectedSubject} – Choose Level
            </h2>
            <Levels/>
          </>
        )}
      </motion.div>
    </div>
  );
}
