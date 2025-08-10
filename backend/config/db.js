const mongoose = require("mongoose");

const connectDB = async () => {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      const mongoUri =
        process.env.MONGO_URI || "mongodb://localhost:27017/movie";

      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // 10 seconds
        socketTimeoutMS: 45000, // 45 seconds
      });

      console.log("MongoDB connected successfully");
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err.message);

      if (i === maxRetries - 1) {
        console.error("All MongoDB connection attempts failed");
        process.exit(1);
      }

      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

module.exports = connectDB;
