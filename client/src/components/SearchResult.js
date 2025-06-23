import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Movie from "./Movie";
import MovieList from "./MovieList";

function SearchResult() {
  const [movies, setMovies] = useState([]); // filtered movies
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const genres = searchParams.getAll("genre") || []; // returns list of strings

  // build the url for API GET request
  useEffect(() => {
    let url = `http://localhost:3000/movie/search?`;
    if (query) {
      url += `query=${encodeURIComponent(query)}&`;
    }

    if (genres) {
      genres.map((genre, index) => {
        url += `genre=${encodeURIComponent(genre)}&`;
      });
    }
    url = url.slice(0, -1); // remove trailing &
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, [query, genres]);

  return (
    <div className="container">
      <div className="cell2">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default SearchResult;
