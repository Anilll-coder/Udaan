import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [classCode, setClassCode] = useState("");
  const navigate = useNavigate();
  const handleJoin = () => {
    if (classCode.trim() !== "") {
      navigate(`/class/${classCode}`);
    } else {
      alert("Please enter a valid class code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 via-white to-green-200 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.h1
          className="text-2xl font-bold text-center mb-6 text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome Student 🎓
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Join a Class
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter teacher's code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              onClick={handleJoin}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
            >
              Join
            </button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-400 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Self Learn */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Prefer Self Learning?
          </h2>
          <button
            onClick={() => navigate("/self-learn")}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-2 rounded-xl shadow-md transition-all duration-300"
          >
            Start Self Learn 
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
