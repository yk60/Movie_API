import React, { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Movie from "./components/Movie";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useToggle } from "./useToggle";

function App() {
  const [movies, setMovies] = useState([]); // all movies in the db
  const [searchQuery, setsearchQuery] = useState("");
  const [users, setUsers] = useState([]); // all users
  const navigate = useNavigate();
  const [showForm, toggle] = useToggle(false);

  useEffect(() => {
    fetch("http://localhost:3000/movie/")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  // setter function - pass to searchbar component as prop so that it can use it
  const handleMovieSearch = (searchQuery) => {
    setsearchQuery(searchQuery);
  };

  const selected_movies = !searchQuery
    ? movies
    : movies.filter(
        (movie) =>
          searchQuery &&
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="App">
      <h1 onClick={handleHomeClick}>Welcome to Movies API</h1>

      <Navbar />
      <Searchbar handleMovieSearch={handleMovieSearch} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movie"
          // if user is searching, display the search result. Else, display all
          element={
            <div>
              <div className="movie-list">
                {selected_movies.map((movie) => (
                  <Movie
                    key={movie._id}
                    _id={movie._id}
                    title={movie.title}
                    genre={movie.genre}
                    release_date={movie.release_date}
                  />
                ))}
              </div>
              <div>
                {/* Create movie form */}
                <button onClick={toggle}>
                  {showForm ? "Hide Form" : "Show Form"}
                </button>
                {showForm && <MovieForm />}
              </div>
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
