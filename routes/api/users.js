// Import External Dependencies
const color = require("colors");
const express = require("express");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Import Environment Variables
require("dotenv").config();

// Import Models
const User = require("../../models/User");

// Import validateRegisterInput Function
const { validateRegisterInput } = require("../../validator/register");
const { validateLoginInput } = require("../../validator/login");

// Setup Express Router
const router = express.Router();

// Setup App Routes
// Route: GET /api/users/test
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

// Route: POST /api/users/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      console.log(color.red(err));
    } else {
      if (!foundUser) {
        res.status(404).json({
          email: "A user of this email doesn't exist"
        });
      } else {
        bcrypt.compare(password, foundUser.password, (err, matched) => {
          if (err) {
            console.log(color.red(err));
          } else {
            if (!matched) {
              res.status(400).json({
                password: "The given password is incorrect"
              });
            } else {
              const payload = {
                id: foundUser._id,
                username: foundUser.username,
                avatar: foundUser.avatar
              };
              jwt.sign(
                payload,
                process.env.JWTSECRETKEY,
                { expiresIn: "1h" },
                (err, token) => {
                  if (err) {
                    console.log(color.red(err));
                  } else {
                    res.status(200).json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                }
              );
            }
          }
        });
      }
    }
  });
});

// Route: POST /api/users/register
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      console.log(color.red(err));
    } else {
      if (foundUser) {
        res.status(400).json({
          email: "A user of this email already exist"
        });
      } else {
        bcrypt.hash(password, 10, (err, hashedPWD) => {
          if (err) {
            console.log(color.red(err));
          } else {
            const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
            const newUser = {
              username,
              email,
              password: hashedPWD,
              avatar
            };
            User.create(newUser, (err, createdUser) => {
              if (err) {
                console.log(color.red(err));
              } else {
                if (createdUser) {
                  res.status(200).json(createdUser);
                }
              }
            });
          }
        });
      }
    }
  });
});

// Export Router
module.exports = router;
