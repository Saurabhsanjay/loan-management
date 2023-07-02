const jwt = require("jsonwebtoken");
const redis = require("redis");
const { redisClient } = require("../db/connection");
require("dotenv").config(".././.env");

const authMiddleware = (req, res, next) => {
  const key = req.headers.authorization.split(' ')[1];

  // Check if the key exists in Redis
  redisClient.get(key, (err, token) => {
    if (err) {
      console.error("Error retrieving token from Redis:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!token) {
      return res.status(401).json({ error: "Invalid key" });
    }

    // Key is valid, verify JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return res.status(401).json({ error: "Invalid token" });
    }
  });
};

module.exports = authMiddleware;
