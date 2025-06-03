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
router.post('/movie/', createMovie);
router.get('/movie/', getAllMovies);
router.get('/movie/:id', getMovie);
router.put('/movie/:id', updateMovie);
router.delete('/movie/:id', deleteMovie);

module.exports = router;
