const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const Equipment = require("../models/equipment");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ==========================
// GET ALL BOOKINGS
// ==========================

router.get(
  "/bookings",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const bookings = await Booking.find()
        .populate("userId", "username email")
        .sort({ bookedAt: -1 });

      res.json(bookings);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch all bookings"
      });

    }

  }
);
// ==========================
// UPDATE BOOKING STATUS
// ==========================

router.patch(
  "/bookings/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const { status } = req.body

      const allowedStatuses = [
        "Pending",
        "Approved",
        "Completed",
        "Cancelled"
      ]

      if (!allowedStatuses.includes(status)) {

        return res.status(400).json({
          message: "Invalid booking status"
        })

      }


      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            status: status
          },
          {
            new: true,
            runValidators: true
          }
        )


      if (!booking) {

        return res.status(404).json({
          message: "Booking not found"
        })

      }


      res.json(booking)

    } catch (err) {

      console.error(err)

      res.status(500).json({
        message: "Failed to update booking status"
      })

    }

  }
)

// ==========================
// GET ALL USERS
// ==========================

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const users = await User.find()
        .select("-password")
        .sort({ _id: -1 });

      res.json(users);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch users"
      });

    }

  }
);


// ==========================
// GET ALL EQUIPMENT
// ==========================

router.get(
  "/equipment",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const equipment = await Equipment.find()
        .sort({ _id: -1 });

      res.json(equipment);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to fetch equipment"
      });

    }

  }
);


// ==========================
// ADD EQUIPMENT
// ==========================

router.post(
  "/equipment",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const {
        name,
        category,
        price,
        availability
      } = req.body;


      const equipment =
        await Equipment.create({
          name,
          category,
          price,
          availability
        });


      res.status(201).json(equipment);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to add equipment"
      });

    }

  }
);


// ==========================
// UPDATE EQUIPMENT
// ==========================

router.put(
  "/equipment/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const equipment =
        await Equipment.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );


      if (!equipment) {

        return res.status(404).json({
          message: "Equipment not found"
        });

      }


      res.json(equipment);

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to update equipment"
      });

    }

  }
);


// ==========================
// DELETE EQUIPMENT
// ==========================

router.delete(
  "/equipment/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const equipment =
        await Equipment.findByIdAndDelete(
          req.params.id
        );


      if (!equipment) {

        return res.status(404).json({
          message: "Equipment not found"
        });

      }


      res.json({
        message: "Equipment deleted successfully"
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message: "Failed to delete equipment"
      });

    }

  }
);
// ADMIN DASHBOARD STATISTICS
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const totalUsers =
        await User.countDocuments();

      const totalBookings =
        await Booking.countDocuments();

      const pendingBookings =
        await Booking.countDocuments({
          status: "Pending"
        });

      const completedBookings =
        await Booking.find({
          status: "Completed"
        });

      const totalRevenue =
        completedBookings.reduce(
          (sum, booking) =>
            sum + booking.totalAmount,
          0
        );

      res.json({
        totalUsers,
        totalBookings,
        pendingBookings,
        totalRevenue
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        message:
          "Failed to fetch dashboard statistics"
      });

    }
  }
);
// ADMIN EQUIPMENT STATISTICS
router.get(
  "/equipment-stats",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {

      const available =
        await Equipment.countDocuments({
          availability: "Available"
        })

      const maintenance =
        await Equipment.countDocuments({
          availability: "Maintenance"
        })

      const unavailable =
        await Equipment.countDocuments({
          availability: "Unavailable"
        })

      res.json({
        available,
        maintenance,
        unavailable
      })

    } catch (err) {

      console.error(err)

      res.status(500).json({
        message:
          "Failed to fetch equipment statistics"
      })

    }
  }
)

module.exports = router;