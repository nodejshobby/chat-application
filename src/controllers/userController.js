const User = require("../model/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

getLoginPage = (req, res) => {
  res.render("login");
};

getRegisterPage = (req, res) => {
  res.render("register");
};

getResetPage = (req, res) => {
  res.render("reset");
};

createUser = async (req, res) => {
  const { username, password: plainPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);

    await User({ username, password }).save();

    return res
      .status(201)
      .json({ status: "Ok", message: "Registration was successful" });
  } catch (error) {
    return res.status(422).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  getResetPage,
  createUser,
};
