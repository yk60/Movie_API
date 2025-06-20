import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie({
  _id,
  title,
  genre,
  release_date,
  poster_path,
  moviesSaved,
  setMoviesSaved,
}) {
  const navigate = useNavigate();
  const movie_placeholder = "/movie_placeholder.jpg";

  const handleMovieClick = () => {
    navigate(`/movie/${_id}`);
  };
  const handleBtnClick = () => {
    toast("button clicked!");
  };

  // create a copy of the prev array then append new object
  const handleMovieSave = () => {
    setMoviesSaved((prev) => [
      ...prev,
      { _id, title, genre, release_date, poster_path },
    ]);
  };

  // filter out the deleted object
  const handleMovieunsave = () => {
    setMoviesSaved((prev) => prev.filter((movie) => movie._id !== _id));
  };
  return (
    <div className="movie-card">
      <div onClick={handleMovieClick}>
        {poster_path ? (
          <img className="movie-poster" src={poster_path} alt="Movie Poster" />
        ) : (
          <img
            className="movie-poster"
            src={movie_placeholder}
            alt="Movie Poster"
          />
        )}
      </div>
      {/* wrap all remaining content except img */}
      <div className="movie-property-row">
        <h2 className="movie-title">{title}</h2>

        <div className="movie-meta">
          {genre && genre.length > 0
            ? genre.map((g) => <span key={g}>{g}</span>)
            : "N/A"}
        </div>

        <div className="movie-meta">
          {release_date ? new Date(release_date).toLocaleDateString() : ""}
        </div>
      </div>
      {/* add to watchlist btn */}
      <button onClick={handleMovieSave}>+</button>
      <ToastContainer />
    </div>
  );
}

export default Movie;
