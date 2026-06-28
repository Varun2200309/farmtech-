const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Completed", "Cancelled"],
    default: "Pending"
  },

  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
