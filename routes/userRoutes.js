const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/userController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/logout", protect, logoutUser);

module.exports = router;
