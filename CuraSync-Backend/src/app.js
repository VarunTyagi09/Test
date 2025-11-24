const express = require("express");
const cors = require("cors");
require("dotenv").config();

const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const billingRoutes = require("./routes/billingRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/", (req, res) => {
  res.json({ message: "CuraSync Backend API running" });
});

app.use("/api/appointments", appointmentRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/ai", aiRoutes);

module.exports = app;