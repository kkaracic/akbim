// src/components/Navbar.jsx
// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, MessageCircle, User } from "lucide-react";

const Navbar = ({ type, loggedIn }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Landing navbar – providni
  if (type === "landing") {
    return (
      <nav className="absolute top-0 left-0 w-full px-10 py-6 flex justify-between items-center text-lg font-semibold z-10">
        <div className="flex items-center space-x-10">
          <img src="/logo.png" alt="Logo" className="h-16 object-contain" />
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Help</a>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white text-green-600 px-4 py-1.5 text-sm rounded hover:bg-gray-100 transition-all duration-200">
            Login
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 text-sm rounded transition-all duration-200">
            Sign Up
          </button>
        </div>
      </nav>
    );
  }

  // Engineer navbar – logovan
  if (type === "engineer") {
    return (
      <nav className="w-full flex justify-between items-center text-base font-semibold fixed top-0 left-0 z-20 px-6 py-1 bg-[#1b1f3a] text-white">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-gray-700 rounded-md">
            <Menu size={24} />
          </button>
          <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
            <a href="#" className="hover:text-gray-300">Help</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-700 rounded-full"><Bell size={20} /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><MessageCircle size={20} /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><User size={20} /></button>
        </div>
      </nav>
    );
  }

  // Investor guest
  if (type === "investor" && loggedIn === false) {
    return (
      <nav className="w-full flex justify-between items-center text-base font-semibold fixed top-0 left-0 z-20 px-6 py-1 bg-[#1b1f3a] text-white">
        <div className="flex items-center space-x-6">
          <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
            <a href="#" className="hover:text-gray-300">Help</a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-white text-green-600 px-3 py-1 text-sm rounded hover:bg-gray-100 transition-all duration-200">
            Login
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-all duration-200">
            Sign Up
          </button>
        </div>
      </nav>
    );
  }

  // Investor logged
  if (type === "investor" && loggedIn === true) {
    return (
      <nav className="w-full flex justify-between items-center text-base font-semibold fixed top-0 left-0 z-20 px-6 py-1 bg-[#1b1f3a] text-white">
        <div className="flex items-center space-x-6">
          <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <a href="#" className="hover:text-gray-300">About</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
            <a href="#" className="hover:text-gray-300">Help</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Ikone sa tooltip-om mogu se dodati kasnije */}
          <button className="p-2 hover:bg-gray-700 rounded-full"><Bell size={20} /></button>
          <button className="p-2 hover:bg-gray-700 rounded-full"><MessageCircle size={20} /></button>
          <div className="relative">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <User size={20} />
            </button>
            {/* Dropdown meni */}
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg hidden group-hover:block">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return null;
};

export default Navbar;

