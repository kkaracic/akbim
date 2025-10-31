import React from 'react';
import { Link } from 'react-router-dom';
import LoginPage from "./LoginPage";
import Navbar from '../components/Navbar';

export default function App() {
  return (
    
    <div
      className="relative min-h-screen bg-cover bg-center text-white font-sans"
      style={{ backgroundImage: "url('/solar-bg.jpg')" }}
    >
      <Navbar type="landing" />
      {/* Navbar 
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

</nav> */}

      {/* Hero Content - Bottom Left */}
      <div className="absolute bottom-16 left-10 z-10 max-w-xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight opacity-0 translate-y-6 animate-fadeInUp animation-delay-200">
          Turn solars into a piece of cake
        </h1>
        <p className="mt-6 text-lg leading-relaxed max-w-md opacity-0 translate-y-6 animate-fadeInUp animation-delay-500">
          The fastest way to plan and invest in solar power — without the headache.
        </p>
        <div className="mt-6 flex space-x-4 opacity-0 translate-y-6 animate-fadeInUp animation-delay-700">
  <div className="mt-6 flex space-x-4 opacity-0 translate-y-6 animate-fadeInUp animation-delay-700">
  {/* For Investors → white with green text */}
  <Link to="/investors">
  <button className="bg-white text-green-600 px-6 py-3 rounded hover:bg-gray-100 transition-transform duration-200 hover:scale-105">
    For Investors
  </button>
  </Link>
  
  <Link to="/login">

  {/* For Engineers → filled green */}
  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded transition-transform duration-200 hover:scale-105">
    For Engineers
  </button>
    </Link>

</div>

</div>

      </div>
    </div>
  );
}
