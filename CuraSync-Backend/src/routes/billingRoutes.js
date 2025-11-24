const express = require("express");
const router = express.Router();
const controller = require("../controllers/billingController");
const auth = require("../middleware/authMiddleware");

router.get("/patient/:patient_id", auth, controller.getBillsByPatient);
router.post("/", auth, controller.createBill);

module.exports = router;