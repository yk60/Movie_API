const axios = require("axios");
const { Movie } = require("../models/Movie");

async function fetchAndSaveMovies(req, res) {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const genre_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en`;

    const response = await axios.get(url);
    const genre_response = await axios.get(genre_url);

    const movies = response.data.results.slice(0, 20); // get first 20 movies
    const movieGenre = genre_response.data.genres; // get all movie genres (id, name)

    const genreMap = {};
    // loop to populate the genreMap, where key = genre id(Number), value = genre name
    movieGenre.forEach((genre) => {
      genreMap[Number(genre.id)] = genre.name;
    });

    // extract only the selected parameters from each movie
    const movies_filtered = movies.map((movie) => ({
      tmdb_id: movie.id, // int or 0 by default
      title: movie.title ? movie.title : "",
      genre: movie.genre_ids
        ? movie.genre_ids.map((id) => genreMap[id]).filter(Boolean)
        : [],
      release_date: movie.release_date
        ? new Date(movie.release_date).toLocaleDateString()
        : "",
      poster_path: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      popularity: movie.popularity ? movie.popularity : 0,
      overview: movie.overview ? movie.overview : "",
    }));

    await Movie.insertMany(movies_filtered);

    res.status(200).json({ movies_filtered });
  } catch (error) {
    console.error("Error fetching or saving movies:", error);
    res.status(500).json({ error: "Failed to fetch or save movies" });
  }
}

module.exports = { fetchAndSaveMovies };
