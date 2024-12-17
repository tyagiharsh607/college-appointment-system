const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    try {
      token = req.cookies.token;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user to the request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token invalid" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
