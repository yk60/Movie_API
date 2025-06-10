import React, { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "./App.css";
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

function App() {
  const [movies, setMovies] = useState([]); // all movies in the db
  const [users, setUsers] = useState([]); // all users
  const [showForm, toggle] = useToggle(false);
  const [popupMsg, setPopupMsg] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const navigate = useNavigate();
  const location = useLocation();

  const fetchMovies = () => {
    fetch("http://localhost:3000/movie/")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (location.pathname === "/movie") {
      fetchMovies();
    }
  }, [location.pathname]);

  // Any time user navigates to other pages out of /search, reset query
  useEffect(() => {
    if (location.pathname !== "/movie/search") {
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <h1 onClick={handleHomeClick}>Welcome to Movies API</h1>

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
                <MovieList movies={movies} />
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
      </Routes>
    </div>
  );
}

export default App;
