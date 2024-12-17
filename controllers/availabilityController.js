const Availability = require("../models/availabilityModel");

// Create or update professor availability
const createAvailability = async (req, res) => {
  const { date, timeSlots } = req.body;

  try {
    // Ensure only professors can set availability
    if (req.user.role !== "Professor") {
      return res
        .status(403)
        .json({ message: "Only professors can set availability" });
    }

    // Check if availability already exists for the professor on the given date
    const existingAvailability = await Availability.findOne({
      professorId: req.user._id,
      date,
    });

    if (existingAvailability) {
      // Update existing availability
      existingAvailability.timeSlots = timeSlots;
      await existingAvailability.save();
      return res.status(200).json({
        message: "Availability updated",
        availability: existingAvailability,
      });
    }

    // Create new availability
    const availability = await Availability.create({
      professorId: req.user._id,
      date,
      timeSlots,
    });

    res.status(201).json({ message: "Availability created", availability });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get availability for a specific professor
const getAvailability = async (req, res) => {
  const { professorId } = req.params;

  try {
    const availability = await Availability.find({ professorId });

    if (!availability.length) {
      return res
        .status(404)
        .json({ message: "No availability found for this professor" });
    }

    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the functions as module
module.exports = {
  createAvailability,
  getAvailability,
};
