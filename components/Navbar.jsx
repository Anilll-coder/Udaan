import React, { useState } from "react";
import { Link } from "react-router-dom";
import SiteLanguageDropdown from "./SiteLanguage";

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-purple-900 shadow-lg sticky top-0 z-50">
      <div className=" sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img
              src={user?.profile || "default1.jpg"}
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-cyan-400 shadow-md"
            />
            <span className="ml-4 text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
              {user?.username || "Guest"}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/home"
              className="text-gray-200 hover:text-cyan-400 transition text-lg font-semibold"
            >
              Home
            </Link>
            <Link
              to="/learn"
              className="text-gray-200 hover:text-cyan-400 transition text-lg font-semibold"
            >
              Learn
            </Link>
            <Link
              to="/classroom"
              className="text-gray-200 hover:text-cyan-400 transition text-lg font-semibold"
            >
              Classroom
            </Link>

            {/* Site Language Dropdown */}

            {/* User Section */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLogout}
                  className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-lg font-bold rounded-lg hover:opacity-90 transition shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-lg font-bold rounded-lg hover:opacity-90 transition shadow-md"
              >
                Login
              </Link>
            )}
            <SiteLanguageDropdown />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-cyan-400 focus:outline-none text-3xl"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-4 space-y-4">
          <Link to="/home" className="block hover:text-cyan-400 text-lg font-semibold">
            Home
          </Link>
          <Link to="/learn" className="block hover:text-cyan-400 text-lg font-semibold">
            Learn
          </Link>
          <Link to="/classroom" className="block hover:text-cyan-400 text-lg font-semibold">
            Classroom
          </Link>
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-md text-white text-lg font-bold shadow-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-md text-white text-lg font-bold shadow-md"
            >
              Login
            </Link>
          )}
          <SiteLanguageDropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
