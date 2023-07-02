const applicationSchema = require("../schema/application.schema");

// Middleware function to validate the fields
const applicationValidator = (req, res, next) => {
  const { error } = applicationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = applicationValidator;
