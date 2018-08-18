// Import External Dependencies
const mongoose = require("mongoose");
const color = require("colors");

// Import Environment Variables
require("dotenv").config();

// Export Database Connection
module.exports = mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(color.red(err));
    } else {
      console.log(
        color.magenta(`==> A database connection has been established`)
      );
    }
  }
);
