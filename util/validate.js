const validator = require("validator");
const User = require("../models/User");

//validation function for all fields in registration form
const validateRegistration = async user => {
  let errors = {};
  if (user.email === undefined) {
    errors.email = "Email Required";
  }
  if (!validator.isEmail(user.email)) {
    errors.email = "Not A Valid Email";
  }
  if (user.password === undefined) {
    errors.password = "Password Is Required";
  }
  if (user.pwConfirm != user.password) {
    errors.password = "Passwords Do Not Match";
  }
  if (user.name === undefined) {
    errors.name = "Name Is Required";
  }
  user = await User.findOne({ email: user.email });
  if (user) {
    errors.email = "Email Already Exists";
    return errors;
  } else {
    return errors;
  }
};

//validation function for all fields in login form
const validateLogin = user => {
  let errors = {};
  if (user.email === undefined) {
    errors.email = "Email Is Required";
  }
  if (!validator.isEmail(user.email)) {
    errors.email = "This Is Not A Valid Email";
  }
  if (user.password === undefined) {
    errors.password = "Password Is Required";
  }

  return errors;
};

module.exports = { validateRegistration, validateLogin };
