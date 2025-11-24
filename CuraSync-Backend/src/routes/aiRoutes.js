const express = require("express");
const router = express.Router();
const controller = require("../controllers/aiController");

router.post("/summary", controller.summary);
router.post("/predict-risk", controller.predictRisk);

module.exports = router;