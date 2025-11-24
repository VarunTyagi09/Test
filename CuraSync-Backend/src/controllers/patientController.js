const db = require("../config/db");

// Get all patients (joined with users)
exports.getAllPatients = (req, res) => {
  const sql = `
    SELECT p.*, u.name AS user_name, u.email 
    FROM patients p
    LEFT JOIN users u ON p.user_id = u.user_id
    ORDER BY u.name
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(rows);
  });
};

// Get single patient by id
exports.getPatientById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT p.*, u.name AS user_name, u.email 
    FROM patients p
    LEFT JOIN users u ON p.user_id = u.user_id
    WHERE p.patient_id = ?
  `;
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    if (!rows.length) return res.status(404).json({ message: "Patient not found" });
    res.json(rows[0]);
  });
};

// Create patient
exports.createPatient = (req, res) => {
  const { user_id, age, gender, phone, address, medical_history } = req.body;

  db.query(
    "INSERT INTO patients (user_id, age, gender, phone, address, medical_history) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, age, gender, phone, address, medical_history],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Patient created", patient_id: result.insertId });
    }
  );
};

// Update patient
exports.updatePatient = (req, res) => {
  const { id } = req.params;
  const { age, gender, phone, address, medical_history } = req.body;

  db.query(
    "UPDATE patients SET age=?, gender=?, phone=?, address=?, medical_history=? WHERE patient_id=?",
    [age, gender, phone, address, medical_history, id],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Patient updated" });
    }
  );
};

// Delete patient
exports.deletePatient = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM patients WHERE patient_id=?", [id], (err) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json({ message: "Patient deleted" });
  });
};