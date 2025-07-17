import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Notification from "./Notification.js";
import "../styles/App.css";
import "../styles/Login.css";

function Register() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Successfully created a new account: ", user);
    }
  }, [user, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setNotification("Account created");
        setTimeout(() => {
          navigate("/auth/login");
        }, 500);
      })
      .catch((err) => console.error(err));
    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <Notification message={notification} onDone={() => setNotification("")} />

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
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              paddingRight: "48px",
            }}
          />
          <button
            className="show-password-btn"
            type="button"
            onClick={toggleShowPassword}
            tabIndex={-1}
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button type="submit">Sign Up</button>
        <span style={{ textAlign: "center", marginTop: "8px" }}>
          <a
            href="/auth/login"
            style={{
              color: "var(--color-primary);",
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
