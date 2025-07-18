import "../styles/Profile.css";

function ProfileImage({ name, size }) {
  return (
    <div className="profile-header">
      <div className={`profile-avatar profile-avatar-${size}`}>
        {name ? name.charAt(0).toUpperCase() : "U"}
      </div>
    </div>
  );
}
export default ProfileImage;
