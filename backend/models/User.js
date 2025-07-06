const mongoose = require("mongoose");
const { movieSchema } = require("./Movie");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  watched_movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // an array of ObjectIds referencing documents in the Movie collection
});
const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
