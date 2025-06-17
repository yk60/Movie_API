import React, { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "./styles/App.css";
import "./styles/Movie-card.css";
import "./styles/Movie-detail.css";
import Movie from "./components/Movie";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useToggle } from "./useToggle";
import Popup from "./components/Popup";
import SearchResult from "./components/SearchResult";
import MovieList from "./components/MovieList";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [movies, setMovies] = useState([]); // all movies in the db
  const [users, setUsers] = useState([]); // all users
  const [showForm, toggle] = useToggle(false);
  const [popupMsg, setPopupMsg] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";

  const [moviesSaved, setMoviesSaved] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchMovies = () => {
    fetch("http://localhost:3000/movie/")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (location.pathname === "/movie") {
      fetchMovies();
    }
  }, [location.pathname]);

  // Any time user navigates to other pages out of /search, reset searchParams
  useEffect(() => {
    if (location.pathname !== "/movie/search") {
      searchParams.delete("query");
      searchParams.delete("genre");
      setSearchParams(searchParams);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Navbar>
        <Searchbar />
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movie"
          // if user is searching, display the search result. Else, display all
          element={
            <div className="container">
              <div className="cell2">
                <Popup message={popupMsg} onDone={() => setPopupMsg("")} />
                <MovieList
                  movies={movies}
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />
              </div>
              <div className="cell3 movie-saved">
                <p2>Saved movies</p2>
                {moviesSaved.map((saved, index) => (
                  <div className="movie-saved-row" key={index}>
                    <h2 className="movie-saved-row-title">{saved.title}</h2>
                    {<img src={saved.poster_path} alt="Movie Poster" />}
                    <button className="movie-saved-row-delete">Delete</button>
                  </div>
                ))}
              </div>

              <div className="cell1">
                {/* Create movie form */}
                <button onClick={toggle}>
                  {showForm ? "Hide Form" : "Show Form"}
                </button>
                {showForm && (
                  <MovieForm
                    popupMsg={popupMsg}
                    setPopupMsg={setPopupMsg}
                    fetchMovies={fetchMovies}
                    toggle={toggle}
                  />
                )}
              </div>
              <div className="grid-col-span-3"></div>
            </div>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              popupMsg={popupMsg}
              setPopupMsg={setPopupMsg}
              fetchMovies={fetchMovies}
            />
          }
        />
        <Route path="/movie/search" element={<SearchResult />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
