import React, { useEffect, useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
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
import PageNotFound from "./components/PageNotFound";
import ReactPaginate from "react-paginate";
import { buildMoviesUrl } from "./utils/Util";
import Watchlist from "./components/Watchlist";
import Watchlists from "./components/Watchlists";

function App() {
  const [users, setUsers] = useState([]); // all users
  const [showForm, toggle] = useToggle(false);
  const [popupMsg, setPopupMsg] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genre = searchParams.getAll("genre") || [];

  const [moviesSaved, setMoviesSaved] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;

  const navigate = useNavigate();
  const location = useLocation();

  // Any time user navigates to other pages out of /search, reset searchParams
  useEffect(() => {
    if (location.pathname !== "/movies") {
      searchParams.delete("query");
      searchParams.delete("genre");
      setSearchParams(searchParams);
    }
  }, [location.pathname]);

  // set default values to searchparams
  useEffect(() => {
    console.log("App useEffect: checking for default params");

    if (
      location.pathname === "/movies" &&
      !searchParams.get("page") &&
      !searchParams.get("limit")
      // !searchParams.get("query") &&
      // !searchParams.get("genre")
    ) {
      console.log("App useEffect: setting default page and limit");

      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      params.set("limit", limit);
      params.set("query", query);
      params.set("genre", genre);
      navigate(`/movies?${params.toString()}`, { replace: true });
    }
  }, [location.pathname, searchParams, navigate]);
  console.log("App rendered");

  return (
    <div className="App">
      <Navbar>
        <Searchbar page={page} limit={limit} />
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <div className="container">
              <div className="cell2">
                <Popup message={popupMsg} onDone={() => setPopupMsg("")} />
                <SearchResult
                  query={query}
                  genre={genre}
                  page={page}
                  limit={limit}
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />
              </div>
              <div className="cell3 movie-saved">
                <Watchlists
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />
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
                    toggle={toggle}
                  />
                )}
              </div>
              <div className="grid-col-span-3"></div>
            </div>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MovieDetail popupMsg={popupMsg} setPopupMsg={setPopupMsg} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlists" element={<Watchlists />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
