const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true }, // e.g., '10:00'
    status: { type: String, enum: ["Booked", "Canceled"], default: "Booked" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
