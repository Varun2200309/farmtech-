const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  availability: {
    type: String,
    enum: ["Available", "Unavailable", "Maintenance"],
    default: "Available"
  }

});

module.exports = mongoose.model(
  "Equipment",
  equipmentSchema
);