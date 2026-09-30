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
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

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

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    /* ======================
       CREATE JWT TOKEN
    ====================== */

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      "farmtech_secret",
      {
        expiresIn: "1d"
      }
    );

    /* ======================
       LOGIN RESPONSE
    ====================== */

    return res.status(200).json({
      token,
      username: user.username,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);

    return res.status(500).json({
      message: "Login failed"
    });
  }
});


/* ======================
   🌱 CHANGE PASSWORD ROUTE
====================== */
router.patch("/change-password", async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required"
      });
    }

    /* ======================
       GET TOKEN
    ====================== */

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const token =
      authHeader.split(" ")[1];

    /* ======================
       VERIFY JWT
    ====================== */

    const decoded = jwt.verify(
      token,
      "farmtech_secret"
    );

    /* ======================
       FIND USER
    ====================== */

    const user = await User.findById(
      decoded.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    /* ======================
       CHECK CURRENT PASSWORD
    ====================== */

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect"
      });
    }

    /* ======================
       HASH NEW PASSWORD
    ====================== */

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    /* ======================
       UPDATE PASSWORD
    ====================== */

    user.password =
      hashedPassword;

    await user.save();

    return res.status(200).json({
      message:
        "Password changed successfully"
    });

  } catch (err) {
    console.error(
      "🔥 CHANGE PASSWORD ERROR:",
      err
    );

    if (
      err.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        message:
          "Invalid authentication token"
      });
    }

    if (
      err.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        message:
          "Authentication token expired"
      });
    }

    return res.status(500).json({
      message:
        "Server error while changing password"
    });
  }
});


module.exports = router;