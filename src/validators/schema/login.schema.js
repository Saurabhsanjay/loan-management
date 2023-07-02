const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.empty": "Email is required",
    "string.email": "Email should be a valid email address",
    "any.required": "Email is required",
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
});

module.exports=loginSchema