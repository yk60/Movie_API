const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  movies_list: [
    {
      movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
      status: {
        type: String,
        enum: ["not watched", "in progress", "watched"],
        default: "not watched",
      },
    },
  ],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = { Watchlist, watchlistSchema };
