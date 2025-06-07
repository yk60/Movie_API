import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToggle } from "../useToggle";

function Movie_detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [draft, setDraft] = useState(null);
  const [editMovie, toggle] = useToggle(false);

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
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMovie = () => {
    fetch(`http://localhost:3000/movie/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="movie-card">
        <div className="movie-property-row">
          <strong>Title:</strong>{" "}
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
        </div>

        <div className="movie-property-row">
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
            movie.genre
          )}
        </div>

        <div className="movie-property-row">
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
            new Date(movie.release_date).toLocaleDateString()
          ) : (
            ""
          )}
        </div>

        <div className="movie-property-row">
          <strong>Description:</strong>{" "}
          {editMovie ? (
            <input
              className="inline-edit-input"
              name="description"
              type="String"
              value={draft.description}
              onChange={handleChange}
            ></input>
          ) : (
            movie.description
          )}
        </div>
      </div>

      <button onClick={toggle}>{editMovie ? "Close" : "Edit"}</button>
      {editMovie && (
        <div>
          <button onClick={handleEditReset}>Reset</button>
          <button onClick={handleEditSave}>Save</button>
        </div>
      )}

      <button onClick={handleDeleteMovie}>Delete Movie</button>
    </div>
  );
}

export default Movie_detail;
