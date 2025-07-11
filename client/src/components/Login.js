import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  // local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
        setUser({
          userId: data.user.id,
          name: data.user.name,
          username: data.user.username,
        });
        setIsAuthenticated(true);
        console.log("Successfully signed in: ", user);
      })
      .catch((err) => console.error(err));
    setError("");
  };

  const handleSignupClick = () => {
    navigate("/auth/register");
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
