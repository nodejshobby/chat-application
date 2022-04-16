const User = require("../model/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const getLoginPage = (req, res) => {
  res.render("login");
};

const getRegisterPage = (req, res) => {
  res.render("register");
};

const getResetPage = (req, res) => {
  res.render("reset");
};

const createUser = async (req, res) => {
  const { username, password: plainPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("/user/register");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);

    await User({ username, password }).save();

    req.flash("success_message", "Registration was successful.Login here");
    return res.redirect("/user/login");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    req.flash("error_message", "Something went wrong!");
    return res.redirect("/user/register");
  }
};

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("/user/reset");
  }

  try {
    const user = await User.findById(req.user._id);
    const check = await bcrypt.compare(oldPassword, user.password);
    if (!check) {
      req.flash("error_message", "Enter correct old password");
      return res.redirect("/user/reset");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    const updateUser = await User.findByIdAndUpdate(req.user.id, {
      password: hashedNewPassword,
    });
    req.flash("success_message", "You have sucessfully updated your password");
    return res.redirect("/user/reset");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    req.flash("error_message", "Something went wrong!");
    return res.redirect("/user/reset");
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  getResetPage,
  createUser,
  updatePassword,
};
