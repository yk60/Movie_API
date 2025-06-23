// CRUD operations
const { Movie } = require("../models/Movie");
const User = require("../models/User");

const createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    console.log(newMovie);
    res.status(201).json(newMovie);
  } catch (err) {
    // catch unexpected errors
    res.status(400).json({ error: err.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (!movies) {
      return res.status(404).json({ error: "Movies not found" });
    }
    // console.log(movies);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(204).json(movie); // success with no returned content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAllMovies = async (req, res) => {
  try {
    const movies = await Movie.deleteMany({});
    if (!movies) {
      return res.status(404).json({ error: "Movies not found" });
    }
    res.status(200).json({ deletedCount: movies.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchMovies = async (req, res) => {
  try {
    const { query, genre } = req.query; // genre will be string or list based on count
    const filter = {}; // filter object

    // find movie titles that contain the query
    if (query) {
      filter.title = { $regex: query, $options: "i" };
    }
    if (genre) {
      const genres = Array.isArray(genre) ? genre : [genre];
      filter.genre = genres.length > 1 ? { $all: genres } : { $in: genres };
    }

    const movies = await Movie.find(filter);
    console.log(movies);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  searchMovies,
};
