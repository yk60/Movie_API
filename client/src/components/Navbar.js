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
      <Link to="/movies">Movies</Link>
      <Link to="/profile">Profile</Link>
      {children}
    </div>
  );
}
export default Navbar;
