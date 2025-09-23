import React, { useState } from "react";
import {
  User,
  Users,
  BookOpen,
  LogOut,
  Trophy,
  Target,
  Calendar,
  Home,
  Award,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LeftSidebar = ({ user, onClassChange, onLogout }) => {
  const [showClassModal, setShowClassModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showFriendsModal, setShowFriendsModal] = useState(false);
  const nav = useNavigate();

  const sub = ["Mathematics", "Physics", "Chemistry", "Biology"];

  const stats = [
    { label: "Total XP", value: user.totalXP, icon: Trophy },
    { label: "Current Streak", value: `${user.streak} days`, icon: Target },
    { label: "Lessons Completed", value: "12", icon: BookOpen },
    { label: "Days Learning", value: "23", icon: Calendar },
  ];

  const friends = [
    { name: "Sarah Chen", level: 12, streak: 15, avatar: "👩‍💼" },
    { name: "Mike Johnson", level: 8, streak: 7, avatar: "👨‍💻" },
    { name: "Emma Wilson", level: 15, streak: 22, avatar: "👩‍🎓" },
    { name: "Alex Rodriguez", level: 6, streak: 4, avatar: "👨‍🎨" },
  ];

  const navigationItems = [
    { icon: Home, label: "Learn", active: true },
    { icon: Award, label: "Leaderboards", active: false },
    {
      icon: Users,
      label: "Friends",
      active: false,
      onClick: () => setShowFriendsModal(true),
    },
    { icon: Trophy, label: "Achievements", active: false },
  ];

  return (
    <>
      {/* Sidebar for md and up */}
      <div className="hidden md:flex fixed left-4 top-4 bottom-4 w-80 bg-white rounded-2xl shadow-2xl z-40 flex-col overflow-hidden">
        {/* User Profile Section */}
        <div className="p-6 bg-gradient-to-br from-green-500 to-blue-600 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-green-700 bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
              <img
                className="rounded-full"
                style={{ width: "98%", height: "98%" }}
                src={user.avatar}
                alt=""
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-green-100">Level {user.level}</p>
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-sm text-green-700 mb-1">Currently learning</p>
            <p className="font-semibold text-green-600">{user.currentClass}</p>
          </div>
        </div>
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-green-50 text-green-700 border-2 border-green-200"
                    : "hover:bg-green-100 text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => setShowStatsModal(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <Trophy className="w-5 h-5" />
              <span className="font-medium">View Stats</span>
            </button>
            <button
              onClick={() => setShowClassModal(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Change Class</span>
            </button>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100">
          {localStorage.getItem("user") === "guest" ? (
              <button
                onClick={() => nav("/login")}
                className="flex items-center justify-center px-2 py-2 rounded-md hover:bg-green-50 text-green-600"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Login</span> 
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="flex items-center px-2 py-2 rounded-md hover:bg-red-50 text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span> 
              </button>
            )}
        </div>
      </div>

      {/* Top Navbar for mobile */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 w-full h-20 bg-white shadow-lg z-40">
        {/* Profile & Nav Items Row */}
        <div className="flex items-center justify-between w-full px-4">
          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold overflow-hidden">
              <img className="w-10 h-10" src={user.avatar} alt="" />
            </div>
            <div>
              <h2 className="text-base font-bold">{user.name}</h2>
              <p className="text-green-500 text-xs">Lvl {user.level}</p>
            </div>
          </div>
          {/* Nav Buttons */}
          <div className="flex space-x-2">
            {navigationItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick}
                className={`flex items-center justify-center px-2 py-2 rounded-md transition-colors ${
                  item.active
                    ? "bg-green-50 text-green-700 border-2 border-green-200"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
            <button
              onClick={() => setShowStatsModal(true)}
              className="flex items-center px-2 py-2 rounded-md hover:bg-blue-50 text-blue-700"
            >
              <Trophy className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowClassModal(true)}
              className="flex items-center px-2 py-2 rounded-md hover:bg-purple-50 text-purple-700"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            {localStorage.getItem("user") === "guest" ? (
              <button
                onClick={() => nav("/login")}
                className="flex items-center px-2 py-2 rounded-md hover:bg-green-50 text-green-600"
              >
                <User className="w-5 h-5" />
                Login
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="flex items-center px-2 py-2 rounded-md hover:bg-red-50 text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Your Stats</h2>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 text-center"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Friends Modal */}
      {showFriendsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Friends</h2>
              <button
                onClick={() => setShowFriendsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                      {friend.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {friend.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Level {friend.level}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-orange-600">
                      {friend.streak} day streak
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">
              Add Friends
            </button>
          </div>
        </div>
      )}

      {/* Class Selection Modal */}
      {showClassModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Select Your Class
              </h2>
              <button
                onClick={() => setShowClassModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {sub.map((className, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onClassChange(className);
                    setShowClassModal(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                    className === user.currentClass
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{className}</span>
                    {className === user.currentClass && (
                      <span className="text-green-600 text-sm">Current</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
