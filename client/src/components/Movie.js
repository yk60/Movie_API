import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie({ _id, title, genre, release_date }) {
  const navigate = useNavigate();
  const handleMovieClick = () => {
    navigate(`/movie/${_id}`);
  };
  const handleBtnClick = () => {
    toast("button clicked!");
  };
  return (
    <div className="movie-card">
      <div onClick={handleMovieClick}>
        <h2 className="movie-title">{title}</h2>
        <div className="movie-property-row">
          <strong>Genre:</strong>
          <span>{genre}</span>
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
