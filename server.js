const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./models");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.use(require("./router"));

//middleware handle error
app.use(require("./middleware/error.handler"));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to MongoDB
  db.connectDB();
});
