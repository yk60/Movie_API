const mongoose = require("mongoose");

// each movie document will have this schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release_date: { type: Date, required: true },
  genre: { type: [String], required: true },
  description: { type: String },
  poster_path: { type: String },
});

// create collections
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie,
  movieSchema,
};
