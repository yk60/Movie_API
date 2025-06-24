import React, { useEffect, useState } from "react";
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
import MovieList from "./components/MovieList";
import PageNotFound from "./components/PageNotFound";
import ReactPaginate from "react-paginate";

function App() {
  const [movies, setMovies] = useState([]); // all movies in the db
  const [users, setUsers] = useState([]); // all users
  const [showForm, toggle] = useToggle(false);
  const [popupMsg, setPopupMsg] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";

  const [moviesSaved, setMoviesSaved] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setmoviesPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchMovies = () => {
    console.log(`current page num: ${currentPage}`);
    console.log(`current movies per page: ${moviesPerPage}`);

    let url = `http://localhost:3000/movie/?`;
    url += `page=${currentPage}&`;
    url += `limit=${moviesPerPage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      })
      .catch((err) => console.error(err));
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage, moviesPerPage]);

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
                <div className="items-per-page-dropdown">
                  <select
                    value={moviesPerPage}
                    onChange={(e) => {
                      setmoviesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={parseInt(total)}>All movies</option>
                  </select>
                </div>

                <MovieList
                  movies={movies}
                  moviesSaved={moviesSaved}
                  setMoviesSaved={setMoviesSaved}
                />

                <div className="pagination">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
              <div className="cell3 movie-saved">
                <div>Saved movies</div>
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
