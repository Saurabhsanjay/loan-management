const bcrypt = require('bcrypt');
const User = require('../models/user.model');

const registerUser = async (userData) => {
  try {
  

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create the user record
    const user = await User.create({
      username: userData.username,
      password: hashedPassword,
      email: userData.email,
      branch: userData.branch,
      mobile: userData.mobile,
      role: userData.role,
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

//login service
const loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return user;
  } catch (error) {
    throw error;
  }
};



module.exports = { registerUser, loginUser };
