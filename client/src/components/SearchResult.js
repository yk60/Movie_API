import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "./MovieList";
import { buildMoviesUrl } from "../utils/Util";
import ReactPaginate from "react-paginate";

// function to fetch movies based on page number + optional filters
function SearchResult({
  query,
  genres,
  page,
  limit,
  moviesSaved,
  setMoviesSaved,
}) {
  const [movies, setMovies] = useState([]); // all movies in db
  const [searchParams, setSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0); // num movies in db
  const [totalPages, setTotalPages] = useState(1);

  const handlePageClick = (data) => {
    searchParams.set("page", data.selected + 1);
    setSearchParams(searchParams);
  };

  // build the url for API GET request
  useEffect(() => {
    console.log("Fetching movies with", { query, genres, page, limit });
    let url = buildMoviesUrl({ query, genres, page, limit });
    fetch("http://localhost:3000" + url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      });
  }, [page, limit, query, genres]);

  return (
    <div className="container">
      <div className="cell2">
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

export default SearchResult;
