const db = require("../config/db");

// Get all appointments
exports.getAllAppointments = (req, res) => {
  db.query("SELECT * FROM appointments ORDER BY date, time", (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(rows);
  });
};

// Get appointments for a specific doctor
exports.getDoctorAppointments = (req, res) => {
  const { doctor_id } = req.params;
  db.query(
    "SELECT * FROM appointments WHERE doctor_id = ? ORDER BY date, time",
    [doctor_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(rows);
    }
  );
};

// Get appointments for a specific patient
exports.getPatientAppointments = (req, res) => {
  const { patient_id } = req.params;
  db.query(
    "SELECT * FROM appointments WHERE patient_id = ? ORDER BY date, time",
    [patient_id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(rows);
    }
  );
};

// Create / book new appointment
exports.bookAppointment = (req, res) => {
  const {
    patient_id,
    doctor_id,
    patient_name,
    doctor_name,
    department,
    symptoms,
    notes,
    date,
    time,
  } = req.body;

  const status = "Pending";

  db.query(
    `INSERT INTO appointments 
    (patient_id, doctor_id, patient_name, doctor_name, department, symptoms, notes, date, time, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      patient_id,
      doctor_id,
      patient_name,
      doctor_name,
      department,
      symptoms,
      notes,
      date,
      time,
      status,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Appointment booked", appointment_id: result.insertId });
    }
  );
};

// Confirm appointment
exports.confirmAppointment = (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE appointments SET status = 'Confirmed' WHERE appointment_id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Appointment confirmed" });
    }
  );
};

// Reschedule appointment
exports.rescheduleAppointment = (req, res) => {
  const { id } = req.params;
  const { date, time, notes } = req.body;

  db.query(
    "UPDATE appointments SET date = ?, time = ?, notes = ? WHERE appointment_id = ?",
    [date, time, notes, id],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Appointment rescheduled" });
    }
  );
};

// Delete appointment
exports.deleteAppointment = (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM appointments WHERE appointment_id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Appointment deleted" });
    }
  );
};