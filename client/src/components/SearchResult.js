import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Movie from "./Movie";
import MovieList from "./MovieList";

function SearchResult() {
  const [movies, setMovies] = useState([]); // filtered movies
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || "";

  // build the url for API GET request
  useEffect(() => {
    let url = `http://localhost:3000/movie/search?`;
    if (query) {
      url += `query=${encodeURIComponent(query)}&`;
    }
    if (genre) {
      url += `genre=${encodeURIComponent(genre)}&`;
    }
    url = url.slice(0, -1); // remove trailing &
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [query, genre]);

  return (
    <div className="container">
      <div className="cell2">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default SearchResult;
