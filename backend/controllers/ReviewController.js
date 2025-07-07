const { Review } = require("../models/Review");
const { User } = require("../models/User");

const createReview = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const review = await Review.create(req.body);
    await User.findByIdAndUpdate(review.user, {
      $push: { reviews: review._id },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId).exec();
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllReviewsFromUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }
    const reviews = await await Review.find({ user: userId }).exec();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllReviewsForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const reviews = await await Review.find({ movie: movieId }).exec();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndUpdate(reviewId, req.body, {
      new: true,
    });
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.status(204).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createReview,
  getReview,
  getAllReviewsFromUser,
  getAllReviewsForMovie,
  updateReview,
  deleteReview,
};
