const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const MONGO_URI =
  "mongodb://127.0.0.1:27017/farmtech";


async function createAdmin() {

  try {

    // ======================
    // CONNECT TO DATABASE
    // ======================

    await mongoose.connect(MONGO_URI);

    console.log("🌱 Database connected");


    // ======================
    // ADMIN DETAILS
    // ======================

    const username = "FarmTech Admin";

    const email = "admin@farmtech.com";

    const password = "Admin@123";


    // ======================
    // CHECK EXISTING USER
    // ======================

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      console.log(
        "⚠️ A user with this email already exists."
      );

      console.log(
        "Current role:",
        existingUser.role
      );

      await mongoose.connection.close();

      return;
    }


    // ======================
    // HASH PASSWORD
    // ======================

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // ======================
    // CREATE ADMIN
    // ======================

    const admin = new User({

      username: username,

      email: email,

      password: hashedPassword,

      role: "admin"

    });


    await admin.save();


    // ======================
    // SUCCESS
    // ======================

    console.log(
      "✅ Admin created successfully!"
    );

    console.log(
      "👤 Username:",
      username
    );

    console.log(
      "📧 Email:",
      email
    );

    console.log(
      "🔐 Password:",
      password
    );

    console.log(
      "👑 Role:",
      admin.role
    );


    // ======================
    // CLOSE DATABASE
    // ======================

    await mongoose.connection.close();

    console.log(
      "🔌 Database connection closed"
    );

  } catch (error) {

    console.error(
      "🔥 ADMIN CREATION ERROR:",
      error
    );

    process.exit(1);
  }
}


createAdmin();