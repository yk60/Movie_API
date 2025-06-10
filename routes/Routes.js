const express = require("express");
const router = express.Router();

const {
  createMovie,
  getMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  searchMovies,
} = require("../controllers/Controller");
const { fetchAndSaveMovies } = require("../controllers/fetchdata");

// Define routes and connect to controller functions
router.post("/movie/", createMovie);
router.get("/movie/", getAllMovies);
router.get("/movie/", deleteAllMovies);
router.get("/movie/search", searchMovies);
router.get("/movie/:id", getMovie);
router.put("/movie/:id", updateMovie);
router.delete("/movie/:id", deleteMovie);

router.get("/fetch-movies", fetchAndSaveMovies);
// router.update("/movie/:id/edit", updateMovie)

module.exports = router;
