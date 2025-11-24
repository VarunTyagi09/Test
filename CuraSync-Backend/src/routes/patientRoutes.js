const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getAllPatients);
router.get("/:id", auth, controller.getPatientById);
router.post("/", auth, controller.createPatient);
router.put("/:id", auth, controller.updatePatient);
router.delete("/:id", auth, controller.deletePatient);

module.exports = router;