
function Profile(props) {
    return (
        <div>
            <h2>Name:{props.name}</h2>
            <h2>Username:{props.username}</h2>
            <h2>Watched movies:{props.watched_movies}</h2>
        </div>
    );

}
export default Profile;