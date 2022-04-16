const { body } = require("express-validator");
const User = require("../model/userModel");

//RegExp ^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
const registrationForm = [
  body("username")
    .notEmpty()
    .bail()
    .withMessage("Enter a valid username")
    .isLength({ min: 5 })
    .bail()
    .withMessage(
      "Your username should be more than 5 characters and less than 20 characters"
    )
    .matches(/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .bail()
    .withMessage("Enter a valid username")
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (user) {
          return Promise.reject("Use another Username");
        }
      });
    }),

  body("password")
    .notEmpty()
    .bail()
    .withMessage("Enter a valid password")
    .isLength({
      min: 6,
    })
    .bail()
    .withMessage("Your password should be more than 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Passwords do match");
      } else {
        return true;
      }
    }),
];

const resetForm = [
  body("oldPassword")
    .notEmpty()
    .bail()
    .withMessage("Enter your old password")
    .isLength({
      min: 6,
    })
    .withMessage("Your old password should be more than 6 characters"),

  body("newPassword")
    .notEmpty()
    .bail()
    .withMessage("Enter a new valid password")
    .isLength({
      min: 6,
    })
    .bail()
    .withMessage("Your new password should be more than 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("New passwords do match");
      } else {
        return true;
      }
    }),
];
module.exports = {
  registrationForm,
  resetForm,
};
