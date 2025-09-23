import { useState } from "react";
import { Trophy, Star, Award } from "lucide-react";

export default function LevelsPage() {
  const [user] = useState({
    name: "John Doe",
    level: 5,
    xp: 3200,
    nextLevelXP: 4000,
  });

  const leaderboard = [
    { name: "Alice", level: 7, xp: 5200 },
    { name: "Bob", level: 6, xp: 4500 },
    { name: "John Doe (You)", level: 5, xp: 3200 },
    { name: "Chris", level: 4, xp: 2800 },
    { name: "Sophia", level: 3, xp: 1900 },
  ];

  const progressPercent = (user.xp / user.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-white to-green-100 relative p-6">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"></div>

      {/* Page Container */}
      <div className="relative z-10">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-8 drop-shadow-md">
           Levels & Leaderboard
        </h1>

        {/* Current Level Section */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your Level
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Level{" "}
            <span className="font-bold text-green-600">{user.level}</span>
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            {user.xp} XP / {user.nextLevelXP} XP
          </p>
        </div>

        {/* Next Levels Preview */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upcoming Levels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="p-4 rounded-xl border bg-green-50 hover:bg-green-100 transition"
              >
                <Star className="mx-auto text-yellow-500" size={28} />
                <p className="font-medium">Level {user.level + n}</p>
                <p className="text-xs text-gray-500">
                  Unlock at {user.nextLevelXP + n * 1000} XP
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Trophy className="mr-2 text-yellow-500" /> Leaderboard
          </h2>
          <ul className="divide-y divide-gray-200">
            {leaderboard.map((player, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center py-3 px-2 rounded-lg transition ${
                  player.name.includes("You")
                    ? "bg-green-100 font-semibold"
                    : "hover:bg-green-50"
                }`}
              >
                <span>
                  {idx + 1}. {player.name}
                </span>
                <span className="flex items-center gap-2">
                  <Award className="text-green-500" size={18} /> Lvl{" "}
                  {player.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
