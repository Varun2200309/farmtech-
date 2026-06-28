const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* ======================
   🌱 REGISTER ROUTE
====================== */
router.post("/register", async (req, res) => {
  try {
    console.log("➡️ Register hit:", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("✅ User registered");

    return res.status(201).json({
      message: "Registration successful 🌾"
    });

  } catch (err) {
    console.error("🔥 REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Server error during registration"
    });
  }
});

/* ======================
   🌱 LOGIN ROUTE (EMAIL)
====================== */
router.post("/login", async (req, res) => {
  try {
    console.log("➡️ Login hit:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Farmer not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "farmtech_secret",
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      username: user.username
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Login failed"
    });
  }
});

module.exports = router;
