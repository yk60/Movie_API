import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation, replace with real API call
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setError("");
    // if (onLogin) onLogin({ username, password });
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
        />
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-buttons-wrapper">
          <button onClick={handleSignupClick}>Sign Up</button>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
