import React, { useState } from "react";
import { LeftSidebar } from "../components/LeftSideBar.jsx";
import { LessonPath } from "../components/LessonPath.jsx";
import { LessonModal } from "../components/LessonModel.jsx";
import { ProgressBar } from "../components/Progress.jsx";
import lessons from "../data/lesson.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Main1() {
  const nav = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem("user") === "guest") {
        setUserStats({
          name: "Guest",
          avatar: "/default1.jpg",
          level: 0,
          streak: 0,
          xp: 0,
          hearts: 0,
          totalXP: 0,
          friendsCount: 0,
          currentClass: "Mathematics",
          currentLevelXP: 0,
          nextLevelXP: 100,
        });
        return ;
      }
      const res = await axios.post("http://localhost:8000/auth/user/info", {
        token: localStorage.getItem("token"),
      });
      setUserStats({
        name: res.data.username,
        avatar: res.data.profile_url,
        level: 4,
        streak: 7,
        xp: 1450,
        hearts: 5,
        totalXP: 2850,
        friendsCount: 4,
        currentClass: "Mathematics",
        currentLevelXP: 350,
        nextLevelXP: 600,
      });
    };
    getUser();
  }, []);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  const handleStartLesson = () => {
    alert(`Starting lesson: ${selectedLesson?.title}`);
    setSelectedLesson(null);
  };

  const handleClassChange = (className) => {
    setUserStats((prev) => ({ ...prev, currentClass: className }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
    alert("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <LeftSidebar
        user={userStats}
        onClassChange={handleClassChange}
        onLogout={handleLogout}
      />

      <main className="md:ml-96 max-w-4xl mx-auto px-4 py-22 md:py-6">
        <ProgressBar
          current={userStats.currentLevelXP}
          total={userStats.nextLevelXP}
          level={userStats.level}
        />

        <div className="bg-white rounded-xl shadow-lg p-6 min-h-[800px]">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Your Learning Path
            </h2>
            <p className="text-gray-600">
              Complete lessons to unlock new content!
            </p>
          </div>

          <LessonPath lessons={lessons} onLessonClick={handleLessonClick} />
        </div>
      </main>

      <LessonModal
        lesson={selectedLesson}
        onClose={handleCloseModal}
        onStart={handleStartLesson}
      />
    </div>
  );
}

export default Main1;
