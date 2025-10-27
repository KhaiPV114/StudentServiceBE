const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const eventRouter = require("./router/event.router");
const ticketRouter = require("./router/ticket.router");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/api/events", eventRouter);
app.use("/api/tickets", ticketRouter);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
