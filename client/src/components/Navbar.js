import { Link, useNavigate } from "react-router-dom";

function Navbar({ children }) {
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
          <Link to="/profile">Profile</Link>
          <Link to="/watchlists">Watchlist</Link>
        </div>
        {children}
      </div>
      <div className="navbar-links">
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
}
export default Navbar;
