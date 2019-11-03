const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdatePasswordInput(data) {
  let errors = {};

  //Convert empty fields to empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Name field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min:6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
