const axios = require("axios");
const { Movie } = require("../models/Movie");

async function fetchAndSaveMovies(req, res) {
  try {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;

    console.log(TMDB_API_KEY);

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const response = await axios.get(url);
    const movies = response.data.results.slice(0, 5); // get first 20 movies

    const movies_filtered = movies.map((m) => ({
      title: m.title,
      overview: m.overview,
      releaseDate: m.release_date,
    }));
    console.log(movies_filtered);

    // await Movie.insertMany(movieDocs);

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error fetching or saving movies:", error);
    res.status(500).json({ error: "Failed to fetch or save movies" });
  }
}

module.exports = { fetchAndSaveMovies };
