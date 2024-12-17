const express = require("express");
const {
  createAvailability,
  getAvailability,
} = require("../controllers/availabilityController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createAvailability);
router.get("/:professorId", getAvailability);

module.exports = router;
