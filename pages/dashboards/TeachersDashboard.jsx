import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function TeacherDashboard() {
  // Dummy data (replace with API later)
  const [rooms] = useState([
    { id: 1, name: "Math Class 9A", code: "MATH9A123" },
    { id: 2, name: "Science Class 10B", code: "SCI10B456" },
  ]);

  const [requests, setRequests] = useState([
    { id: 1, student: "Alice", roomId: 1 },
    { id: 2, student: "Bob", roomId: 2 },
    { id: 3, student: "Charlie", roomId: 1 },
  ]);

  const handleDecision = (id, decision) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    alert(`Request ${decision}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 via-white to-green-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 mb-10 text-center"
      >
        Teacher Dashboard 👩‍🏫
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Rooms */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            My Rooms
          </h2>
          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="p-4 rounded-xl bg-green-100 text-green-700 flex justify-between items-center shadow"
              >
                <div>
                  <p className="font-semibold">{room.name}</p>
                  <p className="text-sm text-gray-600">
                    Code: <span className="font-mono">{room.code}</span>
                  </p>
                </div>
                <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student Join Requests */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            Student Join Requests
          </h2>
          {requests.length === 0 ? (
            <p className="text-gray-500 text-center">No pending requests 🎉</p>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-xl bg-green-50 shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{req.student}</p>
                    <p className="text-sm text-gray-600">
                      Requested to join{" "}
                      {rooms.find((r) => r.id === req.roomId)?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(req.id, "Approved ✅")}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(req.id, "Rejected ❌")}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
