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

// Define routes and connect to controller functions
router.post("/movies/", createMovie);
router.get("/movies/", getAllMovies);
router.delete("/movies/", deleteAllMovies);
router.get("/movies/:id", getMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/fetch-movies", fetchAndSaveMovies);

router.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});
module.exports = router;
