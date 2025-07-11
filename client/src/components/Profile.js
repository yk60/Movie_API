import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import Notification from "./Notification.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    setUser([]);
    setIsAuthenticated(false);
    setNotification("Successfully signed out of account");
  };

  const handleSignin = () => {
    navigate("/auth/login");
  };

  return (
    <div>
      <Notification message={notification} onDone={() => setNotification("")} />
      {!user || !isAuthenticated ? (
        <>
          <div>Sign in to view your profile</div>
          <button onClick={handleSignin}>Sign in</button>
        </>
      ) : (
        <>
          <h2>ID: {user.userId}</h2>
          <h2>name: {user.name}</h2>
          <h2>username: {user.username}</h2>
          <button onClick={handleSignout}>Sign out</button>
        </>
      )}
    </div>
  );
}
export default Profile;
