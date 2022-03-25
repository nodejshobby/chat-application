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

module.exports = {
  registrationForm,
};
