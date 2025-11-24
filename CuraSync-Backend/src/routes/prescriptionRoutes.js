const express = require("express");
const router = express.Router();
const controller = require("../controllers/prescriptionController");
const auth = require("../middleware/authMiddleware");

router.get("/patient/:patient_id", auth, controller.getPrescriptionsByPatient);
router.post("/", auth, controller.createPrescription);

module.exports = router;