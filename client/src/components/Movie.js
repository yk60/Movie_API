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
    navigate(`/movies/${_id}`);
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
        <div className="movie-title">{title}</div>

        <div className="movie-release-date">
          {release_date ? new Date(release_date).getFullYear() : ""}
        </div>
      </div>
      {/* add to watchlist btn */}
      <button onClick={handleMovieSave}>+</button>
      <ToastContainer />
    </div>
  );
}

export default Movie;
