const mongoose = require("mongoose");
const { movieSchema } = require("./Movie");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  watched_movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], //  an array of ObjectIds referencing the Movie collection
});
const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
