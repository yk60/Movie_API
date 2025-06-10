import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Movie from "./Movie";
import MovieList from "./MovieList";

function SearchResult() {
  const [movies, setMovies] = useState([]); // filtered movies
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetch(
      `http://localhost:3000/movie/search?query=${encodeURIComponent(query)}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [query]);

  return (
    <div className="container">
      <div className="cell2">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default SearchResult;
