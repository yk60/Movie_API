import { Link } from "react-router-dom";
function Navbar({ children }) {
  return (
    <div className="navbar">
      <Link to="/movie">Movies</Link>
      <Link to="/profile">Profile</Link>
      {children}
    </div>
  );
}
export default Navbar;
