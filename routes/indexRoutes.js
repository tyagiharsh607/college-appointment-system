const express = require("express");
const userRoutes = require("./userRoutes");
const availabilityRoutes = require("./availabilityRoutes");
const appointmentRoutes = require("./appointmentRoutes");

const router = express.Router();

// Combine all routes into one
router.use("/users", userRoutes);
router.use("/availability", availabilityRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;
