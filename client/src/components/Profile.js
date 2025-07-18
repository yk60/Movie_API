import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import Notification from "./Notification.js";
import ProfileImage from "./ProfileImage.js";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    setUser([]);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setNotification("Successfully signed out of account");
  };

  const handleSignin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="container">
      <div className="cell2">
        <Notification
          message={notification}
          onDone={() => setNotification("")}
        />
        <div className="profile-container">
          {!user || !isAuthenticated ? (
            <div className="profile-card">
              <div className="profile-signin-prompt">
                Sign in to view your profile
              </div>
              <div className="profile-actions">
                <button onClick={handleSignin}>Sign In</button>
              </div>
            </div>
          ) : (
            <div className="profile-card">
              <ProfileImage name={user.name} size="large" />
              <div className="profile-info">
                <div className="profile-field">
                  <div className="profile-label">Name</div>
                  <div className="profile-value">{user.name}</div>
                </div>
                <div className="profile-field">
                  <div className="profile-label">Username</div>
                  <div className="profile-value">{user.username}</div>
                </div>

                <div className="profile-field">
                  <div className="profile-label">User ID</div>
                  <div className="profile-value">{user.userId}</div>
                </div>
              </div>

              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="profile-stat-number">0</div>
                  <div className="profile-stat-label">Movies Watched</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-number">0</div>
                  <div className="profile-stat-label">Watchlists</div>
                </div>
                <div className="profile-stat">
                  <div className="profile-stat-number">0</div>
                  <div className="profile-stat-label">Reviews</div>
                </div>
              </div>

              <div className="profile-actions">
                <button onClick={handleSignout}>Sign Out</button>
              </div>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
export default Profile;
