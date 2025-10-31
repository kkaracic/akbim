// src/App.jsx
/*import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import InvestorPage from './pages/InvestorPage';
import LoginPage from './pages/LoginPage';
import EngineerDashboard from './pages/EngineerDashboard';
import Navbar from "./components/Navbar";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/investors" element={<InvestorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<EngineerDashboard />} />
    </Routes>
  );
}

export default App;
*/

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import InvestorPage from "./pages/InvestorPage";
import LoginPage from "./pages/LoginPage";
import EngineerDashboard from "./pages/EngineerDashboard";


function App() {

  return (
    <div className="min-h-screen bg-[#f9fafb]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/investors" element={<InvestorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<EngineerDashboard />} />
        </Routes>
    </div>
  );
}

export default App;

