const Joi = require("joi");

// Schema for the fields
const applicationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
  }),
  dob: Joi.date().iso().required().messages({
    "any.required": "Date of birth is required",
    "date.format": "Date of birth should be in ISO format",
  }),
  mobileNo: Joi.number()
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
  emailId: Joi.string().email().required().messages({
    "any.required": "Email address is required",
    "string.empty": "Email address is required",
    "string.email": "Email address should be a valid email",
  }),
  pan: Joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "any.required": "PAN number is required",
      "string.empty": "PAN number is required",
      "string.pattern.base": "PAN number should be in the format ABCDE1234F",
    }),
  adhar: Joi.string()
    .pattern(/^[0-9]{12}$/)
    .required()
    .messages({
      "any.required": "Aadhaar number is required",
      "string.empty": "Aadhaar number is required",
      "string.pattern.base": "Aadhaar number should be a 12-digit number",
    }),
  permanentAddress: Joi.string().required().messages({
    "any.required": "Permanent address is required",
    "string.empty": "Permanent address is required",
  }),
  landmark: Joi.string().optional(),
  city: Joi.string().required().messages({
    "any.required": "City is required",
    "string.empty": "City is required",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required",
    "string.empty": "State is required",
  }),
  pincode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .required()
    .messages({
      "any.required": "Pincode is required",
      "string.empty": "Pincode is required",
      "string.pattern.base": "Pincode should be a 6-digit number",
    }),
  employmentType: Joi.string()
    .valid("Full-Time", "Part-Time")
    .required()
    .messages({
      "any.required": "Employment type is required",
      "string.empty": "Employment type is required",
      "any.only": 'Employment type should be either "Full-Time" or "Part-Time"',
    }),
  employerName: Joi.string().required().messages({
    "any.required": "Employer name is required",
    "string.empty": "Employer name is required",
  }),
  loanType: Joi.string().required().messages({
    "any.required": "Loan type is required",
    "string.empty": "Loan type is required",
  }),
  loanAmount: Joi.number().positive().required().messages({
    "any.required": "Loan amount is required",
    "number.positive": "Loan amount should be a positive number",
  }),
});
module.exports = applicationSchema;
