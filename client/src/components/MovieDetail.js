import React, { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";

function Movie_detail(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [draft, setDraft] = useState(null);
  const [editMovie, toggle] = useToggle(false);

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
        toggle();
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

  return (
    <div className="container">
      <div className="cell2">
        <Notification
          message={props.notification}
          onDone={() => props.setNotification("")}
        />
        {/* wrapper for the entire content in page */}
        <div className="movie-detail-container">
          <div>
            <img
              className="movie-detail-img"
              src={movie.poster_path}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-detail-info">
            {editMovie ? (
              <div>
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
            ) : (
              <div>
                <h2>{movie.title}</h2>
                <h2>{movie.genre.join(" ")}</h2>
                {movie.release_date ? (
                  <h2>{movie.release_date.slice(0, 10)}</h2>
                ) : (
                  ""
                )}
                <h2>{movie.popularity}</h2>
                <h3>{movie.overview}</h3>
              </div>
            )}
          </div>

          {user && isAuthenticated ? (
            <div className="movie-detail-btn">
              <button onClick={toggle}>{editMovie ? "Close" : "Edit"}</button>
              {editMovie && (
                <div>
                  <button onClick={handleEditReset}>Reset</button>
                  <button onClick={handleEditSave}>Save</button>
                </div>
              )}

              <button onClick={handleDeleteMovie}>Delete Movie</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie_detail;
