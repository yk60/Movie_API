import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <div>
            <Link to="/movie">Movies</Link>
            <Link to="/profile">Profile</Link>
        </div>

    );
}
export default Navbar;