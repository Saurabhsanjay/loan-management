const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a string",
    "string.empty": "Username is required",
    "string.min": "Username should have a minimum length of {#limit}",
    "string.max": "Username should have a maximum length of {#limit}",
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password should be at least 8 characters long and contain at least one letter and one digit",
      "any.required": "Password is required",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email is required",
    "string.email": "Email should be a valid email address",
    "any.required": "Email is required",
  }),
  branch: Joi.string().required().messages({
    "string.base": "Branch should be a string",
    "string.empty": "Branch is required",
    "any.required": "Branch is required",
  }),
  mobile: Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required()
    .messages({
      "number.base": "Mobile should be a number",
      "number.empty": "Mobile is required",
      "number.integer": "Mobile should be an integer",
      "number.min": "Mobile should be a 10-digit number",
      "number.max": "Mobile should be a 10-digit number",
      "any.required": "Mobile is required",
    }),
  role: Joi.string()
    .valid("admin", "user", "physical_verifier", "telecaller")
    .required()
    .messages({
      "string.base": "Role should be a string",
      "string.empty": "Role is required",
      "any.only":
        'Role should be either "admin","user",physical_verifier or telecaller',
      "any.required": "Role is required",
    }),
});

module.exports=registerSchema;