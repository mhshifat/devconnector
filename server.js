// Import External Dependencies
const color = require("colors");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

// Import Config Variables
const { port } = require("./config/config");

// Import App Routes Files
const usersRoutes = require("./routes/api/users");
const postsRoutes = require("./routes/api/posts");
const profilesRoutes = require("./routes/api/profiles");

// Require Database Connection
require("./database/conn");

// Require Passport
require("./config/passport")(passport);

// Initialize Express App
const app = express();

// User Dependencies as Middlewares
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup App Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Homepage"
  });
});

// Use Routes as Middleware
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/profiles", profilesRoutes);

// Listening To Port
app.listen(port, err => {
  if (err) {
    console.log(color.red(err));
  } else {
    console.log(
      color.magenta(`==> The server is running on http://localhost:${port}`)
    );
  }
});
