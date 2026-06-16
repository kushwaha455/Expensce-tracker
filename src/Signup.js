import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup({ setUsers, users }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      alert("Email already exists. Please login instead.");
      return;
    }

    // Create new user
    const newUser = { name: name.trim(), email: email.trim(), password: password.trim(), categories: [] };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Account created. Please login with your email and password.");
    window.location.href = "/";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header-row">
          <div className="logo-circle" style={{ width: 56, height: 56 }}><div style={{fontSize:22,fontWeight:800,color:'#fff'}}>PT</div></div>
          <div style={{ marginLeft: 12 }}>
            <div className="brand-title" style={{ fontSize: 20 }}>Pisa Tracker</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Create your account to get started</div>
          </div>
        </div>
        <h2 style={{ marginTop: 12 }}>Create account</h2>
        <p className="small muted">Join Pisa Tracker — it's free</p>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-row">
            <div className="icon">🙂</div>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-row">
            <div className="icon">✉️</div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-row">
            <div className="icon">🔒</div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="primary-btn">Create Account</button>
          <div className="helper-links">
            <span />
            <Link to="/">Already have an account?</Link>
          </div>
        </form>
        <div style={{ marginTop: 12, textAlign: 'center' }} className="small muted">or sign up with</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center', }}>
          <button className="primary-btn" style={{ background: '#111827' }}>GitHub</button>
          <button className="primary-btn" style={{ background: '#1da1f2' }}>Twitter</button>
        </div>
      </div>
    </div>
  );
}
