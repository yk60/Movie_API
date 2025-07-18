import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import Notification from "./Notification.js";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "../styles/Login.css";

function Login() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);

  // local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Successfully signed in: ", user);
    }
  }, [user, isAuthenticated]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    // make post request to /auth/login endpoint
    fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        console.log(data);
        const parsedUser = {
          userId: data.user.id,
          name: data.user.name,
          username: data.user.username,
        };
        setUser(parsedUser);
        setIsAuthenticated(true);
        // save token and user info to local storage so that refresh does not reset auth context
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(parsedUser));
        setNotification("Signed in");
        setTimeout(() => {
          navigate(-1); // navigate to last opened page
        }, 500);
      })
      .catch((err) => console.error(err));
    setError("");
  };

  const handleSignupClick = () => {
    navigate("/auth/register");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <Notification message={notification} onDone={() => setNotification("")} />

      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
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
        <div className="auth-buttons-wrapper">
          <button onClick={handleSignupClick}>Sign Up</button>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
