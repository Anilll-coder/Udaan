import React, { useState } from "react";
import SiteLanguageDropdown from "../components/SiteLanguage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [teacherCode, setTeacherCode] = useState("");
  const [error,setError] = useState("");
    const { i18n } = useTranslation();
  
    const onLanguageChange = (lang) => {
      console.log(lang.key);
      i18n.changeLanguage(lang.key);
    };
  const nav = useNavigate();

  const handleClassJoin = () => {
    if(selectedClass==="")
      setError("select class");
    setError("");
    nav(`/learn/class/${selectedClass}`);
  };

  const handleCodeJoin = () => {
    if (!teacherCode) {
      alert("Please enter teacher code.");
      return;
    }
    alert(`Joining with Teacher Code: ${teacherCode}`);
  };

  return (
    <div className="flex flex-col p-2 bg-gray-100">
     <div className="self-end p-2 ">
    <SiteLanguageDropdown onLanguageChange={onLanguageChange}/>
    </div> 
    <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-100 px-4 font-sans">
      
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center">
        Join Your Classroom
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        
        {/* Class Selection Box */}
        <div className="bg-white shadow-md rounded-2xl p-8 w-80 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Select Your Class
          </h2>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Choose Class --</option>
            {[6, 7, 8, 9, 10, 11, 12].map((cls) => (
              <option key={cls} value={cls}>
                Class {cls}
              </option>
            ))}
          </select>
          <div className={(error==="")?`hidden`:`text-lg text-red-500`}>{error}</div>
          <button
            onClick={handleClassJoin}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Join by Class
          </button>
        </div>

        {/* OR Divider */}
        <div className="text-gray-500 font-semibold text-lg">OR</div>

        {/* Teacher Code Box */}
        <div className="bg-white shadow-md rounded-2xl p-8 w-80 text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Enter Teacher Code
          </h2>
          <input
            type="text"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            placeholder="Enter code"
            className="w-full p-3 border rounded-lg mb-5 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleCodeJoin}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Join by Code
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}
