const Appointment = require("../models/appointmentModel");
const Availability = require("../models/availabilityModel");

// Book an appointment
const bookAppointment = async (req, res) => {
  const { professorId, date, time } = req.body;

  try {
    const studentId = req.user._id;

    // Check if professor availability exists
    const availability = await Availability.findOne({ professorId, date });
    if (!availability || !availability.timeSlots.includes(time)) {
      return res
        .status(400)
        .json({ message: "Selected time slot is not available" });
    }

    // Check if appointment already exists
    const existingAppointment = await Appointment.findOne({
      professorId,
      studentId,
      date,
      time,
    });
    if (existingAppointment) {
      return res
        .status(400)
        .json({ message: "Appointment already booked for this time slot" });
    }

    // Create appointment
    const appointment = await Appointment.create({
      studentId,
      professorId,
      date,
      time,
      status: "Booked",
    });

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all appointments for the logged-in student
const getStudentAppointments = async (req, res) => {
  try {
    const studentId = req.user._id;
    const appointments = await Appointment.find({ studentId });

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all appointments for the logged-in professor
const getProfessorAppointments = async (req, res) => {
  try {
    const professorId = req.user._id;
    const appointments = await Appointment.find({ professorId });

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure only professors can cancel appointments
    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.professorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the professor can cancel the appointment" });
    }

    appointment.status = "Canceled";
    await appointment.save();

    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export functions as module
module.exports = {
  bookAppointment,
  getStudentAppointments,
  getProfessorAppointments,
  cancelAppointment,
};
