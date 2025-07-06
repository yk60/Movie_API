const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  movies_list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = { Watchlist, watchlistSchema };
