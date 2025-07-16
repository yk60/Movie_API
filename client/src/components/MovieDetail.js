import React, { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";
import "../styles/Movie-detail.css";

function Movie_detail(props) {
  const { id } = useParams(); //movieId
  const [movie, setMovie] = useState(null);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState("not watched");
  const [editMovie, editMovieToggle] = useToggle(false);
  const [showStatus, showStatusToggle] = useToggle(false);

  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setDraft(data); // create copy of movie data
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [id]); // runs once or whenever id changes

  if (!movie) return <div>Loading...</div>;

  // access edited property from js object, then updates its value
  const handleChange = (e) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditReset = (e) => {
    setDraft(movie);
  };

  const handleEditSave = () => {
    fetch(`http://localhost:3000/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    })
      .then((res) => res.json())
      .then((data) => {
        setDraft(data);
        setMovie(data);
        editMovieToggle();
        props.setNotification("Saved changes");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMovie = async () => {
    try {
      const res = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        props.setNotification("Deleted movie");
        navigate("/movies");
      } else {
        props.setNotification("Error deleting movie");
      }
    } catch (err) {
      console.error(err);
      props.setNotification("Error deleting movie");
    }
  };

  const handleAddToList = () => {
    if (user && isAuthenticated) {
      showStatusToggle(!showStatus);
    } else {
      alert("Log in to add to list ");
    }
  };

  // add/update/remove movie from user's watch history
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    fetch(`http://localhost:3000/users/${user.userId}/movies/${id}`, {
      method:
        newStatus === "watched" || newStatus === "in progress"
          ? "POST"
          : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        showStatusToggle();
        props.setNotification(`Changed watch status to ${newStatus}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <div className="cell2">
        <Notification
          message={props.notification}
          onDone={() => props.setNotification("")}
        />
        {/* wrapper for the entire content in page */}
        <div>
          {editMovie ? (
            <div className="movie-detail-container">
              <div className="movie-detail">
                <label>
                  Title:
                  <input
                    className="inline-edit-input"
                    name="title"
                    type="text"
                    value={draft.title}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  overview:
                  <input
                    className="inline-edit-input"
                    name="overview"
                    type="text"
                    value={draft.overview}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="movie-info">
                <label>
                  Genre:
                  <input
                    className="inline-edit-input"
                    name="genre"
                    type="text"
                    value={draft.genre}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Release Date:
                  <input
                    className="inline-edit-input"
                    name="release_date"
                    type="text"
                    value={
                      draft.release_date
                        ? new Date(draft.release_date).toLocaleDateString()
                        : ""
                    }
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="movie-detail-container">
              <div className="movie-detail">
                <div>
                  <img
                    className="movie-detail-img"
                    src={movie.poster_path}
                    alt="Movie Poster"
                  />
                </div>
                <div className="movie-detail-text">
                  <h2>{movie.title}</h2>
                  <h3>{movie.overview}</h3>
                  <div className="status-wrapper">
                    <button className="addToListBtn" onClick={handleAddToList}>
                      Add to List
                    </button>
                    {showStatus ? (
                      <div className="watch-status-dropdown">
                        <select
                          id="status"
                          size="3"
                          onChange={handleStatusChange}
                        >
                          <option value="not watched">Not Watched</option>
                          <option value="in progress">In Progress</option>
                          <option value="watched">Watched</option>
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>

              <div className="movie-info">
                {" "}
                <h2>{movie.genre.join(" ")}</h2>
                {movie.release_date ? (
                  <h2>{movie.release_date.slice(0, 10)}</h2>
                ) : (
                  ""
                )}
                <h2>{movie.popularity}</h2>
                {user && isAuthenticated ? (
                  <div className="edit-btns-wrapper">
                    <div className="edit-delete-btns">
                      <button onClick={editMovieToggle}>
                        {editMovie ? "Close" : "Edit"}
                      </button>
                      <button onClick={handleDeleteMovie}>Delete Movie</button>
                    </div>
                    {editMovie && (
                      <div className="reset-save-btns">
                        <button onClick={handleEditReset}>Reset</button>
                        <button onClick={handleEditSave}>Save</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie_detail;
