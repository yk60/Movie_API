// CRUD operations
const { Movie } = require("../models/Movie");

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
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).exec();
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
    console.log(req.query);
    const { query, genre, page, limit, sort } = req.query;
    const skip = (page - 1) * limit;

    // search/filter movies
    const filter = {};
    if (query) {
      filter.title = { $regex: query, $options: "i" };
    }
    if (genre) {
      const genre_list = Array.isArray(genre) ? genre : [genre];
      filter.genre = { $in: genre_list };
    }

    // sort movies
    let sortOption = "";
    switch (sort) {
      case "recent":
        sortOption = { release_date: -1 };
        break;
      case "alphabetical":
        sortOption = { title: 1 };
        break;
      case "popularity":
        sortOption = { popularity: -1 };
        break;
    }
    const movies = await Movie.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const total = await Movie.countDocuments(filter);
    console.log("total filtered movies: " + total.toString());
    if (!movies) {
      return res.status(404).json({ error: "Movies not found" });
    }

    res.status(200).json({
      movies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
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
    const { movieId } = req.params;
    const movie = await Movie.findByIdAndDelete(movieId);
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

module.exports = {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
