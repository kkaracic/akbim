import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      {/* Logo */}
      <div className="login-logo">
        <img src="/Logolite-sp.png" alt="Logo" />
      </div>

      {/* Heading */}
      <h1 className="login-title">Sign in to Solar Project</h1>

      {/* Form */}
      <form className="login-form">
        <label className="login-label">
          Username or email
          <input type="text" className="login-input" />
        </label>

       <label className="login-label">
          Password
          <input type="password" className="login-input" />
           <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
        </label>

        <button type="submit" className="login-btn">Log in</button>
      </form>

      {/* Footer */}
      <div className="login-footer">
        New to Solar Project? <Link to="/dashboard">Create an account</Link>
      </div>
    </div>
  );
}
