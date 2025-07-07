const { Watchlist } = require("../models/Watchlist");
const { User } = require("../models/User");

const createWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.create(req.body);
    await User.findByIdAndUpdate(watchlist.user, {
      $push: { watchlist: watchlist._id },
    });
    res.status(201).json(watchlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const { watchlistId } = req.params;
    const watchlist = await Watchlist.findById(watchlistId).exec();
    if (!watchlist)
      return res.status(404).json({ error: "Watchlist not found" });
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWatchlistsFromUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const watchlists = await Watchlist.find({ user: userId }).exec();
    res.status(200).json(watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllWatchlists = async (req, res) => {
  try {
    const watchlists = await Watchlist.find({}).exec();
    res.status(200).json(watchlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { watchlistId } = req.params;
    const watchlist = await Watchlist.findByIdAndUpdate(watchlistId, req.body, {
      new: true,
    });
    if (!watchlist)
      return res.status(404).json({ error: "Watchlist not found" });
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteWatchlist = async (req, res) => {
  try {
    const { watchlistId } = req.params;
    const watchlist = await Watchlist.findByIdAndDelete(watchlistId);
    if (!watchlist)
      return res.status(404).json({ error: "Watchlist not found" });
    res.status(204).json(watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createWatchlist,
  getWatchlist,
  getAllWatchlistsFromUser,
  getAllWatchlists,
  updateWatchlist,
  deleteWatchlist,
};
