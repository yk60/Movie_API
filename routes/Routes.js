const express = require('express');
const router = express.Router();

const {
    createMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie

} = require('../controllers/Controller');

// Define routes and connect to controller functions
router.post('/', createMovie);
router.get('/:id', getMovie);
router.get('/', getAllMovies);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
