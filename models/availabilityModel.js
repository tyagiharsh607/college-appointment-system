const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    timeSlots: { type: [String], required: true }, // e.g., ['10:00', '11:00']
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);
