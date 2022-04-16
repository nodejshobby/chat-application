const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportAuth = require("../config/passportAuthConfig");

const userValidation = require("../validation/userValidation");

const userController = require("../controllers/userController");

passport.use("userAuth", passportAuth);

router.get("/login", userController.getLoginPage);

router.get("/register", userController.getRegisterPage);

router.get("/reset", userController.getResetPage);

router.post(
  "/register",
  userValidation.registrationForm,
  userController.createUser
);

router.post(
  "/login",
  passport.authenticate("userAuth", {
    failureRedirect: "/user/login",
    successRedirect: "/",
    failureFlash: true,
    badRequestMessage: "Enter all fields",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_message", "You have sucessfully logout");
  return res.redirect("/user/login");
});

router.post("/reset", userValidation.resetForm, userController.updatePassword);
module.exports = router;
