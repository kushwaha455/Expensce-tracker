import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setCurrentUser, users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const user = users.find(u => u.email === email.trim() && u.password === password.trim());
    
    if (user) {
      const loggedInUser = { name: user.name, email: user.email, categories: user.categories || [] };
      setCurrentUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password. Please create an account first.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header-row">
          <div className="logo-circle" style={{ width: 56, height: 56 }}><div style={{fontSize:22,fontWeight:800,color:'#fff'}}>PT</div></div>
          <div style={{ marginLeft: 12 }}>
            <div className="brand-title" style={{ fontSize: 20 }}>Pisa Tracker</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Track expenses easily and securely</div>
          </div>
        </div>
        <h2 style={{ marginTop: 12 }}>Welcome back</h2>
        <p className="small muted">Please login to continue</p>
        <form className="auth-form" onSubmit={handleLogin}>
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
          <button type="submit" className="primary-btn">Login</button>
          <div className="helper-links">
            <Link to="/forgot-password">
                      Forgot Password?
            </Link>
            <Link to="/signup">Create account</Link>
          </div>
        </form>
        <div style={{ marginTop: 12, textAlign: 'center' }} className="small muted">or continue with</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'center', }}>
          <button className="primary-btn" style={{ background: '#111827' }}>GitHub</button>
          <button className="primary-btn" style={{ background: '#db4437' }}>Google</button>
        </div>
      </div>
    </div>
  );
}
