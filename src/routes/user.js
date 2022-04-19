const express = require("express");
const router = express.Router();
const passport = require("passport");

const userValidation = require("../validation/userValidation");

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/Auth");

router.get(
  "/login",
  authMiddleware.redirectIfAuthenticated,
  userController.getLoginPage
);

router.get("/register", userController.getRegisterPage);

router.get(
  "/reset",
  authMiddleware.isAuthenticated,
  userController.getResetPage
);

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

router.get("/logout", authMiddleware.isAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_message", "You have sucessfully logout");
  return res.redirect("/user/login");
});

router.post("/reset", userValidation.resetForm, userController.updatePassword);
module.exports = router;
