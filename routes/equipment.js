const express = require("express")

const Equipment = require("../models/equipment")

const router = express.Router()


// GET ALL EQUIPMENT
router.get("/", async (req, res) => {

  try {

    const equipment =
      await Equipment.find()
        .sort({ _id: -1 })

    res.json(equipment)

  } catch (err) {

    console.error(err)

    res.status(500).json({
      message: "Failed to fetch equipment"
    })

  }

})


module.exports = router