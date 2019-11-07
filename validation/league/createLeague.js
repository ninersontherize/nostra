const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateLeagueInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.game = !isEmpty(data.game) ? data.game : "";

  if (Validator.isEmpty(data.name)) {
    errors.username = "Name field is required";
  }

  if (Validator.isEmpty(data.game)) {
    errors.password = "Game field is required";
  }

  if (!data.leagues_supported.length) {
    errors.password2 = "Leagues Supported field is required";
  }

  return{
    errors,
    isValid: isEmpty(errors)
  };
};