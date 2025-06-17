import { Link, useNavigate } from "react-router-dom";

function Navbar({ children }) {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1 onClick={handleHomeClick}>Welcome to Movies API</h1>
      <Link to="/movie">Movies</Link>
      <Link to="/profile">Profile</Link>
      {children}
    </div>
  );
}
export default Navbar;
