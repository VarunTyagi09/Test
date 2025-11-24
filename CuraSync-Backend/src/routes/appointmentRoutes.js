const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getAllAppointments);
router.get("/doctor/:doctor_id", auth, controller.getDoctorAppointments);
router.get("/patient/:patient_id", auth, controller.getPatientAppointments);
router.post("/", auth, controller.bookAppointment);
router.put("/:id/confirm", auth, controller.confirmAppointment);
router.put("/:id/reschedule", auth, controller.rescheduleAppointment);
router.delete("/:id", auth, controller.deleteAppointment);

module.exports = router;