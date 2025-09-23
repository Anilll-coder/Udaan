import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, BookOpen, Bot, HelpCircle, CheckCircle, Gamepad2 } from "lucide-react";

const features = [
  {
    title: "Virtual Classroom",
    description: "Join interactive classrooms with teachers and peers.",
    icon: <Users size={40} className="text-green-400" />,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Self Learning",
    description: "Explore subjects at your own pace with guided paths.",
    icon: <BookOpen size={40} className="text-blue-400" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "AI Doubt Bot",
    description: "Ask any question and get instant AI-powered answers.",
    icon: <Bot size={40} className="text-purple-400" />,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Quizzes & Challenges",
    description: "Test your skills with gamified quizzes and leaderboards.",
    icon: <Gamepad2 size={40} className="text-yellow-400" />,
    color: "from-yellow-500 to-orange-600",
  },
  {
    title: "Assignments",
    description: "Complete tasks, track progress, and earn rewards.",
    icon: <CheckCircle size={40} className="text-pink-400" />,
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Help & Support",
    description: "Get guidance from mentors and resolve issues quickly.",
    icon: <HelpCircle size={40} className="text-cyan-400" />,
    color: "from-cyan-500 to-teal-600",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      {/* Hero Section */}
      <header className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500"
        >
          Gamified Learning 
        </motion.h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Learn, play, and grow — education meets gaming!  
          Unlock skills, interact in classrooms, and use AI to clear doubts instantly.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold shadow-lg shadow-green-500/30">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl font-semibold">
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`rounded-2xl p-6 bg-gradient-to-br ${feature.color} cursor-pointer hover:scale-105 transform transition shadow-lg`}
          >
            <div className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-xl font-bold mt-3">{feature.title}</h3>
              <p className="text-sm mt-2 text-gray-100">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 mt-auto bg-gray-900/80 text-gray-400">
        © 2025 Gamified Learning Platform · Learn smarter, play harder 🚀
      </footer>
    </div>
  );
};

export default Home;
