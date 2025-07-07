const { User } = require("../models/User");
const { Movie } = require("../models/Movie");
const { Watchlist } = require("../models/Watchlist");

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const movie = await Movie.findById(movieId).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watched_movies: movieId } }, // prevents duplicate insertion
      { new: true } // return the updated document so that the client immediately sees the change
    ).populate("watched_movies");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const movie = await Movie.findById(movieId).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { watched_movies: movieId } },
      { new: true }
    ).populate("watched_movies");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeAllMovies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { watched_movies: [] } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addMovie,
  removeMovie,
  removeAllMovies,
};
