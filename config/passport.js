// Import External Dependencies
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Import Environment Variables
require("dotenv").config();

// Import Models
const User = require("../models/User");

// Create Options Object
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTSECRETKEY;

// Export
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        }
      });
    })
  );
};
