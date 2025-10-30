const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const db = require("./models");

require("dotenv").config();

//built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use(require("./router"));

//middlewares handle error
app.use(require("./middleware/error.handler"));

// Connect MongoDB (Giữ cả db.connectDB() từ branch hiện tại)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Connect to MongoDB
  db.connectDB();
});
