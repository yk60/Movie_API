const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/Routes");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors()); // allows frontend to access API
app.use("/", routes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  connectDB()
    .then(() => {
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      process.exit(1);
    });
}

module.exports = app;
