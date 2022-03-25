const express = require("express");
const router = express.Router();

const userValidation = require("../validation/userValidation");

const userController = require("../controllers/userController");

router.get("/login", userController.getLoginPage);

router.get("/register", userController.getRegisterPage);

router.get("/reset", userController.getResetPage);

router.post(
  "/register",
  userValidation.registrationForm,
  userController.createUser
);

module.exports = router;
