import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useToggle } from "../useToggle";
import Popup from "./Popup";

function Movie_detail(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [draft, setDraft] = useState(null);
  const [editMovie, toggle] = useToggle(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setDraft(data); // create copy of movie data
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
    fetch(`http://localhost:3000/movie/${id}`, {
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
        props.setPopupMsg("Saved changes");
        props.fetchMovies();
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMovie = () => {
    fetch(`http://localhost:3000/movie/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setMovie(null); // reset the local states
        setDraft(null);
        props.fetchMovies();
        navigate("/movie");
        props.setPopupMsg("Deleted movie");
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <div className="cell2">
        <Popup message={props.popupMsg} onDone={() => props.setPopupMsg("")} />
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
              <input
                className="inline-edit-input"
                name="title"
                type="String"
                value={draft.title}
                onChange={handleChange}
              ></input>
            ) : (
              <h2>{movie.title}</h2>
            )}
            <strong>Genre:</strong>{" "}
            {editMovie ? (
              <input
                className="inline-edit-input"
                name="genre"
                type="String"
                value={draft.genre}
                onChange={handleChange}
              ></input>
            ) : (
              <h2>{movie.genre}</h2>
            )}
            <strong>Release Date:</strong>{" "}
            {editMovie ? (
              <input
                className="inline-edit-input"
                name="release_date"
                type="String"
                value={
                  draft.release_date
                    ? new Date(draft.release_date).toLocaleDateString()
                    : ""
                }
                onChange={handleChange}
              ></input>
            ) : movie.release_date ? (
              <h2>{new Date(movie.release_date).toLocaleDateString()}</h2>
            ) : (
              ""
            )}
            {editMovie ? (
              <input
                className="inline-edit-input"
                name="description"
                type="String"
                value={draft.description}
                onChange={handleChange}
              ></input>
            ) : (
              <h2>{movie.description}</h2>
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}

export default Movie_detail;
