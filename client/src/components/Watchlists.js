import Watchlist from "./Watchlist";
import { useEffect, useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import { AuthContext } from "../context/AuthContext";
import { apiCall } from "../utils/Api";
import "../styles/Watchlist.css";

function Watchlists({ moviesSaved, setMoviesSaved }) {
  const { watchlists, setWatchlists } = useContext(WatchlistContext); // list of watchlist objects
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const getWatchlists = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await apiCall(`/users/${user.userId}/watchlists/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setWatchlists(data);
        console.log(`user's watchlists: ${watchlists}`);
      } else {
        console.log(`user's watchlists: ${watchlists}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) {
      getWatchlists();
    }
  }, [user, isAuthenticated]);

  // filter out the deleted object
  const handleMovieunsave = (id) => {
    setMoviesSaved((prev) => prev.filter((movie) => movie._id !== id));
  };

  const handleCreate = async () => {
    if (!user || !isAuthenticated) {
      alert("Please sign in to create a list");
      return;
    }
    const name = prompt("Enter collection name:");
    if (!name) return;
    setWatchlists((prev) => [
      ...prev,
      {
        title: name,
        movies: [],
        handleMovieunsave: handleMovieunsave, // You can pass a real handler if needed
      },
    ]);
    try {
      const data = await apiCall("/watchlists/", {
        method: "POST",
        body: JSON.stringify({ user: user.userId, title: name }),
      });
      console.log("new watchlist created in db");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteList = async (watchlistId) => {
    try {
      const response = await apiCall(`/watchlists/${watchlistId}`, {
        method: "DELETE",
        body: JSON.stringify({ watchlistId: watchlistId }),
      });

      console.log(`deleted list: ${watchlistId}`);
      setWatchlists(watchlists.filter((w) => w._id !== watchlistId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      <div className="watchlists">
        {watchlists ? (
          watchlists.map((w, idx) => (
            <div key={w.title || idx} className="watchlist-btn-wrapper">
              <Watchlist
                id={w._id}
                title={w.title}
                movies={w.movies}
                handleMovieunsave={w.handleMovieunsave}
              />
              <button onClick={() => deleteList(w._id)}>X</button>
            </div>
          ))
        ) : (
          <div>Create a new collection</div>
        )}
      </div>
    </div>
  );
}

export default Watchlists;
