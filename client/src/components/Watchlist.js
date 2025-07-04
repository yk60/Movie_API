import React, { useState } from "react";

function Watchlist({ title = "Untitled", movies = [], handleMovieunsave }) {
  return (
    <div className="watchlist">
      <div className="watchlist-title">{title}</div>
      {movies.length === 0 && (
        <div className="watchlist-empty">No movies saved</div>
      )}
      {movies.map((movie, index) => (
        <div className="movie-saved-row" key={movie._id || index}>
          <h2 className="movie-saved-row-title">{movie.title}</h2>
          <img src={movie.poster_path} alt="Movie Poster" />
          <button
            className="movie-saved-row-delete"
            onClick={() => {
              handleMovieunsave(movie._id);
            }} // remove from global saved movies collection
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
