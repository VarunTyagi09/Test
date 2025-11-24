const db = require("../config/db");

// Get billing for patient
exports.getBillsByPatient = (req, res) => {
  const { patient_id } = req.params;
  db.query(
    "SELECT * FROM billing WHERE patient_id = ? ORDER BY created_at DESC",
    [patient_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(rows);
    }
  );
};

// Create bill
exports.createBill = (req, res) => {
  const { patient_id, amount, items, status } = req.body;
  db.query(
    "INSERT INTO billing (patient_id, amount, items, status) VALUES (?, ?, ?, ?)",
    [patient_id, amount, JSON.stringify(items), status || "Unpaid"],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Bill created", bill_id: result.insertId });
    }
  );
};