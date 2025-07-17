import React, { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";
import { RiProgress3Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import makeRequest from "../services/LLMService";
import Chat from "./Chat";
import "../styles/Movie-detail.css";
import "../styles/Chat.css";

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

  // make GET request
  // const getWatchStatus = () => {
  //   fetch(`http://localhost:3000/users/${user.userId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStatus(data.status);
  //     })
  //     .catch((err) => console.error(err));
  // };

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
          duration={3200}
          onDone={() => props.setNotification("")}
        />
        <div className="movie-detail-container">
          <div className="movie-detail-info-wrapper">
            {/* left side */}
            <div className="movie-detail">
              <img
                className="movie-detail-img"
                src={movie.poster_path}
                alt="Movie Poster"
              />
              <div className="movie-detail-text">
                <div className="movie-title-wrapper">
                  <h2 className="movie-detail-title">{movie.title}</h2>

                  <FaCheckCircle className="movie-status-icon" />
                </div>

                <h3 className="movie-overview">{movie.overview}</h3>
                <div className="status-wrapper">
                  <button className="addToListBtn" onClick={handleAddToList}>
                    Add to List
                  </button>
                  {showStatus && (
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
                  )}
                </div>
              </div>
            </div>

            {/* right side */}
            <div className="movie-info">
              <div>
                <label className="field-label">Genres</label>
                <p className="field-value">{movie.genre.join(" ")}</p>
              </div>
              <div>
                <label className="field-label">Release Date</label>
                {movie.release_date && (
                  <p className="field-value">
                    {movie.release_date.slice(0, 10)}
                  </p>
                )}
              </div>
              <div>
                <label className="field-label">Popularity</label>
                <p className="field-value">{movie.popularity}</p>
              </div>
              {user && isAuthenticated && (
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
              )}
            </div>
          </div>
          <div className="chat-container">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie_detail;
