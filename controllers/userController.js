const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);

    // Set the JWT in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user's profile

const getUserProfile = async (req, res) => {
  try {
    // Use the user ID from the authenticated user (set by the `protect` middleware)
    const userId = req.user._id;

    // Find the user by ID and exclude the password field from the result
    const user = await User.findById(userId).select("-password");

    if (!user) {
      // If no user is found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's profile (excluding sensitive information)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    // If an error occurs, return a 500 error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) }); // Expire the token
  res.status(200).json({ message: "Logged out successfully" });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Export functions as module
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
