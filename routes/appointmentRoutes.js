const express = require("express");
const {
  bookAppointment,
  getStudentAppointments,
  getProfessorAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, bookAppointment);
router.get("/student", protect, getStudentAppointments);
router.get("/professor", protect, getProfessorAppointments);
router.delete("/:id", protect, cancelAppointment); // Appointment can be cancelled by the professor only

module.exports = router;
