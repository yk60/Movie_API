import React, { useEffect, useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
import "./styles/Theme.css";
import Movie from "./components/Movie";
import MovieDetail from "./components/MovieDetail";
import MovieForm from "./components/MovieForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import { useToggle } from "./useToggle";
import Notification from "./components/Notification";
import PaginatedMovieList from "./components/PaginatedMovieList";
import PageNotFound from "./components/PageNotFound";
import ReactPaginate from "react-paginate";
import { buildMoviesUrl } from "./utils/Util";
import Watchlist from "./components/Watchlist";
import Watchlists from "./components/Watchlists";
import Login from "./components/Login";
import Register from "./components/Register";
import { NotificationContext } from "./context/NotificationContext";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [users, setUsers] = useState([]); // all users
  const [showForm, toggle] = useToggle(false);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genre = searchParams.getAll("genre").filter((g) => g && g.trim()); // filter out null and whitespace

  const [moviesSaved, setMoviesSaved] = useState([]);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const sort = searchParams.get("sort") || "recent";

  const navigate = useNavigate();
  const location = useLocation();

  function isTokenExpired(token) {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  }

  // on app load, updates the authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && !isTokenExpired(token)) {
      setIsAuthenticated(true);
      setUser(user ? JSON.parse(user) : null);
      console.log("User is still signed in");
    } else {
      setIsAuthenticated(false);
      setUser(null);
      console.log("Invalid or expired token. User is signed out");
    }
  }, []);

  // set default values to searchparams
  useEffect(() => {
    console.log("App useEffect: checking for default params");

    if (
      location.pathname === "/movies" &&
      !searchParams.get("page") &&
      !searchParams.get("limit") &&
      !searchParams.get("sort")
    ) {
      console.log("App useEffect: setting default page and limit");

      const params = new URLSearchParams(searchParams);
      params.set("page", page);
      params.set("limit", limit);
      params.set("sort", sort);
      navigate(`/movies?${params.toString()}`, { replace: true });
    }
  }, [location.pathname, searchParams, navigate]);
  console.log("App rendered");

  return (
    <div className={`App ${theme === "Dark" && "dark"}`}>
      <Navbar>
        <Searchbar page={page} limit={limit} sort={sort} />
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies"
          element={
            <div className="container">
              <div className="cell1">
                {/* Create movie form */}
                {user && isAuthenticated ? (
                  <>
                    {" "}
                    <button onClick={toggle}>
                      {showForm ? "Hide Form" : "Show Form"}
                    </button>
                    {showForm && (
                      <MovieForm
                        notification={notification}
                        setNotification={setNotification}
                        toggle={toggle}
                      />
                    )}
                  </>
                ) : (
                  <div>Sigin in to add movie</div>
                )}
              </div>
              <div className="cell2">
                <Notification
                  message={notification}
                  onDone={() => setNotification("")}
                />
                <PaginatedMovieList
                  query={query}
                  genre={genre}
                  page={page}
                  limit={limit}
                  sort={sort}
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />
              </div>
              <div className="cell3 movie-saved">
                {user && isAuthenticated ? (
                  <div>My watchlists</div>
                ) : (
                  <div>Sign in to create watchlists</div>
                )}
                <Watchlists
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />
              </div>

              <div className="grid-col-span-3"></div>
            </div>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MovieDetail
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/watchlists" element={<Watchlists />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
