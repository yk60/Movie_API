// CRUD operations
const { Movie } = require('../models/Movie')
const User = require('../models/User')

const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body)
        console.log(newMovie)
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).exec();
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        // console.log(movies);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteMovie = async (req, res) => {
    try {
         const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = {
    createMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie

}
