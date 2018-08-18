// Import External Dependencies
const Validator = require("validator");

// Import isEmpty Function
const { isEmpty } = require("./isEmpty");

const validateRegisterInput = data => {
  const errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  if (!Validator.isLength(data.username, { min: 5, max: 25 })) {
    errors.username = "Username must be 5 to 25 characters long";
  }
  if (!Validator.isLength(data.password, { min: 10, max: 25 })) {
    errors.password = "Password must be 10 to 25 characters long";
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { validateRegisterInput };
