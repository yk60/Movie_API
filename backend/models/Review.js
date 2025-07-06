const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  text: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review, reviewSchema };
