const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  watched_movies: [
    {
      movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      status: {
        type: String,
        enum: ["not watched", "in progress", "watched"],
        default: "not watched",
      },
    },
  ], // an array of ObjectIds referencing documents in the Movie collection
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Watchlist" }], // collection of movies (watched/not watched)
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  profile: {
    image: { type: String, default: "" },
  },
});
const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
