const express = require('express');
const router = express.Router();

const {
    createMovie,
    getAllMovies

} = require('../controllers/Controller');

// Define routes and connect to controller functions
router.post('/', createMovie);
router.get('/', getAllMovies);

module.exports = router;
