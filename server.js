const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");
const equipmentRoutes = require("./routes/equipment");

const app = express();

// ======================
// MIDDLEWARE
// ======================

app.use(cors());

app.use(express.json());

// ======================
// ROUTES
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/equipment", equipmentRoutes);


// ======================
// DATABASE
// ======================

const MONGO_URI =
  "mongodb://127.0.0.1:27017/farmtech";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("🌱 Database connected");
  })
  .catch((err) => {
    console.error(
      "🔥 MongoDB connection error:",
      err
    );
  });

// ======================
// SERVER
// ======================

app.listen(5000, () => {
  console.log(
    "🚜 Server running on port 5000"
  );
});