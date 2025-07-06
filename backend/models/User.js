const mongoose = require('mongoose');
const { movieSchema } = require('./Movie')

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    watched_movies: [movieSchema]

});
const User = mongoose.model('User', userSchema)

module.exports = User;