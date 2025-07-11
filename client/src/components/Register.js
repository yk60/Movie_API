import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

import Notification from "./Notification.js";
import "../styles/Login.css";

function Register() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

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
