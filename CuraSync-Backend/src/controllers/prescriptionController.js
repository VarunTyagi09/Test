const db = require("../config/db");

// Get prescriptions for a patient
exports.getPrescriptionsByPatient = (req, res) => {
  const { patient_id } = req.params;
  db.query(
    "SELECT * FROM prescriptions WHERE patient_id = ? ORDER BY date DESC",
    [patient_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(rows);
    }
  );
};

// Create prescription
exports.createPrescription = (req, res) => {
  const { appointment_id, doctor_id, patient_id, medicines, notes, date } =
    req.body;

  db.query(
    `INSERT INTO prescriptions 
    (appointment_id, doctor_id, patient_id, medicines, notes, date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [appointment_id, doctor_id, patient_id, JSON.stringify(medicines), notes, date],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Prescription created", prescription_id: result.insertId });
    }
  );
};