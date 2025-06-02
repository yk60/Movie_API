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

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// const updateMovie = async (req, res) => {
//     try {
//         req.body

//     }
// }

module.exports = {
    createMovie,
    getAllMovies,

}
