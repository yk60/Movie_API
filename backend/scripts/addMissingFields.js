const mongoose = require("mongoose");
require("dotenv").config();

const { User } = require("../models/User");

// matches documents with missing fields, then sets the value of a field to a default value
async function addMissingFields() {
  await mongoose.connect(process.env.MONGO_URI);

  await User.updateMany(
    { watched_movies: { $exists: false } },
    { $set: { watched_movies: [] } }
  );

  await User.updateMany(
    { watchlist: { $exists: false } },
    { $set: { watchlist: [] } }
  );

  await User.updateMany(
    { reviews: { $exists: false } },
    { $set: { reviews: [] } }
  );

  await User.updateMany(
    { profile: { $exists: false } },
    { $set: { profile: {} } }
  );

  console.log("Migration complete.");
  await mongoose.disconnect();
}

addMissingFields();
