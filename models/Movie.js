const mongoose = require('mongoose');

// each movie document will have this schema
const movieSchema = new mongoose.Schema({
    title: String,
    release_date: Date,
    genre: String
});

// create collections
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    Movie,
    movieSchema
}