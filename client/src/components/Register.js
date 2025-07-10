import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // if (onSignup) onSignup({ name, username, password });
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        {error && <div className="auth-error">{error}</div>}
        <button type="submit">Sign Up</button>
        <span style={{ textAlign: "center", marginTop: "8px" }}>
          <a
            href="/login"
            style={{
              color: "#6c63ff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            I am already a member
          </a>
        </span>
      </form>
    </div>
  );
}

export default Register;
