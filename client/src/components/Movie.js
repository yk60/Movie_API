import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie({ _id, title, genre, release_date, poster_path }) {
  const navigate = useNavigate();
  const movie_placeholder = "/movie_placeholder.jpg";

  const handleMovieClick = () => {
    navigate(`/movie/${_id}`);
  };
  const handleBtnClick = () => {
    toast("button clicked!");
  };
  return (
    <div className="movie-card">
      <div onClick={handleMovieClick}>
        <div className="movie-poster-container" onClick={handleMovieClick}>
          {poster_path ? (
            <img
              className="movie-poster"
              src={poster_path}
              alt="Movie Poster"
            />
          ) : (
            <img
              className="movie-poster"
              src={movie_placeholder}
              alt="Movie Poster"
            />
          )}
        </div>
        <h2 className="movie-property-row movie-title">{title}</h2>

        <div className="movie-property-row">
          <strong>Genre:</strong>
          <span>
            {genre && genre.length > 0
              ? genre.map((g) => <span>{g} </span>)
              : "N/A"}
          </span>
        </div>
        <div className="movie-property-row">
          <strong>Release Date:</strong>
          <span>
            {release_date ? new Date(release_date).toLocaleDateString() : ""}
          </span>
        </div>
      </div>
      <button onClick={handleBtnClick}>Add to watchlist</button>
      <ToastContainer />
    </div>
  );
}

export default Movie;
