import React, { useState } from "react";
import "./Login.scss";

/**
 * Login Page Component
 * Placeholder for Admin Authentication.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    // Auth logic will be implemented here
  };

  return (
    <div className="container">
      <div className="login-wrapper" style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: "0.8rem" }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: "0.8rem" }}
          />
          <button type="submit" style={{ padding: "0.8rem", backgroundColor: "#4A6984", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;