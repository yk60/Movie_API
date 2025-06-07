const axios = require("axios");
const { Movie } = require("../models/Movie");

async function fetchAndSaveMovies(req, res) {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const response = await axios.get(url);
    const movies = response.data.results.slice(0, 5); // get first 20 movies

    const movies_filtered = movies.map((m) => ({
      title: m.title ? m.title : "",
      genre: m.genre_ids ? m.genre_ids[0] : "",
      release_date: m.release_date
        ? new Date(m.release_date).toLocaleDateString()
        : "",
      overview: m.overview ? m.overview : "",
      poster_path: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : "",
    }));
    console.log(movies_filtered);

    await Movie.insertMany(movies_filtered);

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching or saving movies:", error);
    res.status(500).json({ error: "Failed to fetch or save movies" });
  }
}

module.exports = { fetchAndSaveMovies };
