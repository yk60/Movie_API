import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "./MovieList";
import { buildMoviesUrl } from "../utils/Util";
import { apiCall } from "../utils/Api";
import ReactPaginate from "react-paginate";

// function to fetch movies based on page number + optional filters
function PaginatedMovieList({
  query,
  genre = [], // default value
  page,
  limit,
  sort,
  moviesSaved,
  setMoviesSaved,
}) {
  const [movies, setMovies] = useState([]); // all movies in curr page

  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0); // num movies in db
  const [totalPages, setTotalPages] = useState(1);

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  const handlePageClick = (data) => {
    searchParams.set("page", data.selected + 1);
    setSearchParams(searchParams);
  };

  const fetchMovies = async () => {
    console.log("Fetching movies with", { query, genre, page, limit, sort });
    let url = buildMoviesUrl({ query, genre, page, limit, sort });

    try {
      const data = await apiCall(url);
      setMovies(data.movies);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  // build the url for API GET request
  useEffect(() => {
    fetchMovies();
  }, [query, genre, page, limit, sort]);

  return (
    <div className="cell2-content">
      <div className="cell2-header">
        <div className="search-result-range">
          {`${start} - ${end} of ${total} results`}
        </div>
        <div className="sort-filter-dropdown-wrapper">
          <div className="sort-filter-dropdown">
            <select
              onChange={(e) => {
                searchParams.set("sort", e.target.value);
                setSearchParams(searchParams);
              }}
            >
              <option value={"recent"}>Recent</option>
              <option value={"alphabetical"}>Alphabetical</option>
              <option value={"popularity"}>Popularity</option>
            </select>
          </div>
          <div className="sort-filter-dropdown">
            <select
              onChange={(e) => {
                searchParams.set("limit", Number(e.target.value));
                searchParams.set("page", 1);
                setSearchParams(searchParams);
              }}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
              <option value={parseInt(total)}>All movies</option>
            </select>
          </div>
        </div>
      </div>
      <div className="movie-list-flex">
        <MovieList
          movies={movies}
          moviesSaved={moviesSaved}
          setMoviesSaved={setMoviesSaved}
        />
      </div>
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
  );
}

export default PaginatedMovieList;
