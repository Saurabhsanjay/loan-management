const userService = require("../services/user.service");

const User = require("../models/user.model");
const generateToken = require("../helpers/generate-jwt");
const generateUniqueKey = require("../helpers/generate-keys");
const { redisClient } = require("../db/connection");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, email, branch, mobile, role } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: { email: email },
    });
    if (existingUser) {
    return  res.status(409).json({"message":`${role} already exists with the provided email`});
    }
    // Create user
    const user = await userService.registerUser({
      username,
      password,
      email,
      branch,
      mobile,
      role,
    });

    res.status(201).json({ message: `${role} created successfully`, email });
  } catch (error) {
    console.error(`Error registering ${role}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const user = await userService.loginUser(email, password);

    // Generate token
    const token = generateToken(user);

    // Store the token in Redis with a unique key
    const key = generateUniqueKey(user.role);
    redisClient.set(key, token,"EX",24 * 60 * 60);

    // Authentication successful
    res.status(200).json({ message: "Login successful", key });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };