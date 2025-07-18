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
    const { status } = req.body;
    const movie = await Movie.findById(movieId).exec();
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    // if movie exists, then update watch status
    let user = await User.findOneAndUpdate(
      {
        _id: userId,
        "watched_movies.movie": movieId,
      },
      {
        $set: { "watched_movies.$.status": status },
      },
      { new: true }
    ).populate("watched_movies");

    // else, add movie
    if (!user) {
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { watched_movies: { movie: movieId, status: status } },
        },
        { new: true }
      ).populate("watched_movies");
    }

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
      { $pull: { watched_movies: { movie: movieId } } },
      { new: true }
    ).populate("watched_movies");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
    console.log("succesfullu removed movie from watch history");
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
