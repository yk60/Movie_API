const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/Routes");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors()); // allows frontend to access API
app.use("/", routes);

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});

module.exports = app;
