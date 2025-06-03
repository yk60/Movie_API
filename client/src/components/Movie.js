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
    <div
      className="movie-card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px 0",
        maxWidth: "400px",
      }}
    >
      <div onClick={handleMovieClick}>
        <h2 style={{ margin: "0 0 8px 0" }}>{title}</h2>
        <p style={{ margin: "4px 0" }}>
          <strong>Genre:</strong> {genre}
        </p>
        <p style={{ margin: "4px 0" }}>
          <strong>Release Date:</strong>{" "}
          {release_date ? new Date(release_date).toLocaleDateString() : ""}
        </p>
      </div>

      <button onClick={handleBtnClick}>Add to watchlist</button>
      <ToastContainer />
    </div>
  );
}

export default Movie;
