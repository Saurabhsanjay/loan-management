const jwt = require("jsonwebtoken");
require("dotenv").config(".././.env");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
   process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return token;
};
module.exports=generateToken;