import Movie from "./Movie";

function MovieList({ movies, moviesSaved, setMoviesSaved }) {
  return (
    <div>
      <div className="movie-list">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Movie
              key={movie._id}
              _id={movie._id}
              title={movie.title}
              genre={movie.genre}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              moviesSaved={moviesSaved}
              setMoviesSaved={setMoviesSaved}
            />
          ))
        ) : (
          <p>There are no movies</p>
        )}
      </div>
    </div>
  );
}
export default MovieList;
