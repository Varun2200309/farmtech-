const express = require("express");
const Booking = require("../models/Booking");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* ======================
   🚜 CREATE BOOKING
====================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to book" });
    }

    const booking = new Booking({
      userId: req.user.id,
      items,
      totalAmount
    });

    await booking.save();

    res.status(201).json({
      message: "Booking saved successfully 🚜"
    });

  } catch (err) {
    res.status(500).json({
      message: "Booking failed"
    });
  }
});

/* ======================
   📜 GET MY BOOKINGS
====================== */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ bookedAt: -1 });

    res.json(bookings);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bookings"
    });
  }
});

module.exports = router;
//newly added line
/* ======================
   ❌ CANCEL BOOKING
====================== */
router.patch("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled"
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled successfully ❌"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to cancel booking"
    });
  }
});
