const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/farmtech")
  .then(() => console.log("🌱 Database connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// SERVER
app.listen(5000, () => {
  console.log("🚜 Server running on port 5000");
});


