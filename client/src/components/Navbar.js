import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CgProfile } from "react-icons/cg";
import "../styles/Login.css";

function Navbar({ children }) {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="App-name" onClick={handleHomeClick}>
        Welcome to Movies API
      </div>
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/movies">Movies</Link>
          <Link to="/watchlists">Watchlist</Link>
        </div>
        {children}
      </div>
      {user && isAuthenticated ? (
        <>
          <div className="navbar-links">
            <Link to="/profile">{`Hello ${user.username}`}</Link>
          </div>
          <CgProfile className="profile-icon" />
        </>
      ) : (
        <>
          <div className="navbar-links">
            <Link to="/auth/login">Sign In</Link>
          </div>
        </>
      )}
    </div>
  );
}
export default Navbar;
