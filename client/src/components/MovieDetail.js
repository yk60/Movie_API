import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToggle } from "../useToggle";

function Movie_detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [editMovie, toggle] = useToggle(false);
  const [draft, setDraft] = useState(null);

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
        setMovie(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button onClick={toggle}>{editMovie ? "Close" : "Edit"}</button>
      {editMovie && (
        <div>
          <input
            name="title"
            type="String"
            value={draft.title}
            onChange={handleChange}
          ></input>
          <input
            name="genre"
            type="String"
            value={draft.genre}
            onChange={handleChange}
          ></input>
          <input
            name="release_date"
            type="Date"
            value={draft.release_date ? draft.release_date.slice(0, 10) : ""}
            onChange={handleChange}
          ></input>

          <input
            name="description"
            type="String"
            value={draft.description}
            onChange={handleChange}
          ></input>
          <br />
          <button onClick={handleEditReset}>Reset</button>
          <button onClick={handleEditSave}>Save</button>
        </div>
      )}

      <div className="movie-card">
        <h1>{movie.title}</h1>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
        <p>
          <strong>Release Date:</strong>{" "}
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString()
            : ""}
        </p>
        <p>
          <strong>Description:</strong> {movie.description}
        </p>
      </div>
    </div>
  );
}

export default Movie_detail;
