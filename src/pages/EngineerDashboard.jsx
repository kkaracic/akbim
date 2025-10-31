import React from "react";
import './EngineerDashboard.css';
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Navbar from '../components/Navbar';

export default function EngineerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Sarajevo Rooftop",
      modified: "Oct 18, 2025",
      thumb: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      name: "Mostar PV Field",
      modified: "Sep 29, 2025",
      thumb: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=801&q=60",
    },
    {
      id: 3,
      name: "Zenica Factory",
      modified: "Oct 10, 2025",
      thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Tuzla Carport",
      modified: "Oct 02, 2025",
      thumb: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=802&q=60",
    },
  ];
const handleCloseSidebar = () => {
  setIsClosing(true);
  setTimeout(() => {
    setSidebarOpen(false);
    setIsClosing(false);
  }, 350);
};

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSidebarOpen(false);
      setIsClosing(false);
    }, 300);
  }
  return (
    <div className="investor-shell">
      <div className="investor-content">
        <Navbar type="engineer" loggedIn={true} />
        {/*
        <nav 
            className="w-full flex justify-between items-center text-base font-semibold fixed top-0 left-0 z-20 px-6 py-1"
          style={{ backgroundColor: "#1b1f3a", color: "white" }}
        >
          <div className="flex items-center space-x-4">
  
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-md"
          >
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
          <div className="flex items-center space-x-2">

            <button className="bg-white text-green-600 px-3 py-1 text-sm rounded hover:bg-gray-100 transition-all duration-200">
              Login
           </button>

       
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded transition-all duration-200">
              Sign Up
            </button>
          </div>
        </nav>*/}
        {/* SIDEBAR */}
      {sidebarOpen && (
  <>
    <div
      className={`sidebar-overlay ${isClosing ? "fade-out" : "fade-in"}`}
      onClick={handleCloseSidebar}
    ></div>

    <div
      className={`sidebar ${isClosing ? "slide-out" : "slide-in"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={handleCloseSidebar}
            className="p-1 hover:bg-green-700 rounded"
          >
            ✖
          </button>
        </div>

        <nav>
          <Link to="/feed" onClick={handleCloseSidebar}>Feed</Link>
          <Link to="/profile" onClick={handleCloseSidebar}>Profile</Link>
          <Link to="/map" onClick={handleCloseSidebar}>Map</Link>
          <Link to="/projects" onClick={handleCloseSidebar}>Projects</Link>
          <Link to="/settings" onClick={handleCloseSidebar}>Settings</Link>
        </nav>
      </div>

      <div className="border-t border-green-700 pt-4 text-sm">
        <button
          onClick={handleCloseSidebar}
          className="text-white hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  </>
)}


    <div className="dashboard-wrapper">
      <div className="dashboard-inner">
        <header className="dashboard-header flex flex-col w-full mt-8">
  {/* Heading */}
  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2 text-left">
    Welcome back, Salahudin 👋
  </h1>

  {/* Subheading + buttons */}
  <div className="flex flex-col items-center mt-6 gap-8">
    <p className="text-sm font-medium text-gray-600 text-center">
      What would you like to work on today?
    </p>

    <div className="flex gap-8">
      <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
        Feed
      </button>
      <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
        Open Projects
      </button>
      <button className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
        New Project
      </button>
    </div>
  </div>
</header>
      <section className="recent-section">
  <div className="recent-container">
    <h2 className="section-title">Recent Projects</h2>

    <div className="project-grid">
      {projects.map((p) => (
        <article key={p.id} className="project-card">
          <div className="thumb-wrap">
            <img src={p.thumb} alt={p.name} className="thumb" />
            <div className="thumb-overlay">
              <Link to={`/projects/${p.id}`} className="overlay-btn">
                Continue
              </Link>
            </div>
          </div>
          <div className="project-info">
            <div className="project-name">{p.name}</div>
            <div className="project-meta">Last modified • {p.modified}</div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>




      </div>
    </div>
    </div>
    </div>
  );
}
