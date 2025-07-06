const mongoose = require("mongoose");

// each movie document will have this schema
const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number },
  title: { type: String, required: true },
  release_date: { type: Date, required: true },
  genre: { type: [String], required: true },
  poster_path: { type: String },
  popularity: { type: Number },
  overview: { type: String },
});

// create collections
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
  movieSchema,
};
