const express = require("express");
const router = express.Router();
const {
  createMovie,
  getMovie,
  getAllMovies, // = searchMovies
  updateMovie,
  deleteMovie,
  deleteAllMovies,
} = require("../controllers/Controller");
const { fetchAndSaveMovies } = require("../controllers/fetchdata");
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addMovie,
  removeMovie,
  removeAllMovies,
} = require("../controllers/UserController");
const {
  createReview,
  getReview,
  getAllReviewsFromUser,
  getAllReviewsForMovie,
  updateReview,
  deleteReview,
} = require("../controllers/ReviewController");
const {
  createWatchlist,
  getWatchlist,
  getAllWatchlistsFromUser,
  getAllWatchlists,
  updateWatchlist,
  deleteWatchlist,
} = require("../controllers/WatchlistController");

// Define routes and connect to controller functions
// Movie routes
router.post("/movies/", createMovie);
router.get("/movies/", getAllMovies);
router.delete("/movies/", deleteAllMovies);
router.get("/movies/:movieId", getMovie);
router.put("/movies/:movieId", updateMovie);
router.delete("/movies/:movieId", deleteMovie);
router.get("/fetch-movies", fetchAndSaveMovies);

// User routes
router.post("/users/", createUser);
router.get("/users/:userId", getUser);
router.get("/users/", getAllUsers);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

// User's watch history routes
router.post("/users/:userId/movies/:movieId", addMovie);
router.delete("/users/:userId/movies/:movieId", removeMovie);
router.delete("/users/:userId/movies", removeAllMovies);

// Review routes
router.post("/reviews/", createReview);
router.get("/reviews/:reviewId", getReview);
router.get("/users/:userId/reviews", getAllReviewsFromUser);
router.get("/movies/:movieId/reviews", getAllReviewsForMovie);
router.put("/reviews/:reviewId", updateReview);
router.delete("/reviews/:reviewId", deleteReview);

// Watchlist routes
router.post("/watchlists/", createWatchlist);
router.get("/watchlists/:watchlistId", getWatchlist);
router.get("/users/:userId/watchlists/", getAllWatchlistsFromUser);
router.get("/watchlists/", getAllWatchlists);
router.put("/watchlists/:watchlistId", updateWatchlist);
router.delete("/watchlists/:watchlistId", deleteWatchlist);

router.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});
module.exports = router;
