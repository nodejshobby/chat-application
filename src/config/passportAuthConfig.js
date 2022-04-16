const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const authConfig = new LocalStrategy("userAuth", function verify(
  username,
  password,
  cb
) {
  User.findOne({ username }, (err, user) => {
    if (err) return cb(err);
    if (!user)
      return cb(null, false, { message: "Invalid username or password" });

    bcrypt.compare(password, user.password, (err, check) => {
      if (err) return cb(err);
      if (!check)
        return cb(null, false, { message: "Invalid username or password" });
      return cb(null, user);
    });
  });
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
module.exports = authConfig;
