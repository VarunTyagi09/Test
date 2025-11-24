-- CuraSync demo database schema & sample data

DROP DATABASE IF EXISTS curasync_db;
CREATE DATABASE curasync_db;
USE curasync_db;

-- Users table: doctors + patients
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('doctor','patient') NOT NULL,
  department VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients table (extra info)
CREATE TABLE patients (
  patient_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  age INT,
  gender VARCHAR(10),
  phone VARCHAR(20),
  address VARCHAR(255),
  medical_history TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Appointments (detailed)
CREATE TABLE appointments (
  appointment_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  doctor_id INT,
  patient_name VARCHAR(100),
  doctor_name VARCHAR(100),
  department VARCHAR(50),
  symptoms TEXT,
  notes TEXT,
  date DATE,
  time VARCHAR(20),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE SET NULL,
  FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Prescriptions
CREATE TABLE prescriptions (
  prescription_id INT PRIMARY KEY AUTO_INCREMENT,
  appointment_id INT,
  doctor_id INT,
  patient_id INT,
  medicines JSON,
  notes TEXT,
  date DATE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE SET NULL
);

-- Billing
CREATE TABLE billing (
  bill_id INT PRIMARY KEY AUTO_INCREMENT,
  patient_id INT,
  amount DECIMAL(10,2),
  items JSON,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE SET NULL
);

-- Demo password hashes (bcrypt for 'demo123')
-- You can regenerate hashes later if needed.
-- Here we use plain text for simplicity in a student project.

INSERT INTO users (name, email, password, role, department) VALUES
('Demo Doctor', 'clinic@curasync.com', 'demo123', 'doctor', 'General Medicine'),
('Demo Patient', 'patient@curasync.com', 'demo123', 'patient', NULL);

INSERT INTO patients (user_id, age, gender, phone, address, medical_history) VALUES
(2, 28, 'Male', '9876543210', 'New Delhi, India', 'No major past illnesses. Occasional headaches.');

INSERT INTO appointments (patient_id, doctor_id, patient_name, doctor_name, department, symptoms, notes, date, time, status) VALUES
(1, 1, 'Demo Patient', 'Demo Doctor', 'General Medicine', 'Fever, headache', 'Suspected viral infection', CURDATE(), '10:00 AM', 'Pending'),
(1, 1, 'Demo Patient', 'Demo Doctor', 'General Medicine', 'Regular checkup', 'Routine follow-up visit', DATE_ADD(CURDATE(), INTERVAL 2 DAY), '11:30 AM', 'Confirmed');

INSERT INTO prescriptions (appointment_id, doctor_id, patient_id, medicines, notes, date) VALUES
(1, 1, 1,
 '[{"name":"Paracetamol 500mg","dosage":"1 tablet","frequency":"3 times a day"},{"name":"ORS","dosage":"1 packet","frequency":"After loose stools"}]',
 'Stay hydrated and rest well.',
 CURDATE());

INSERT INTO billing (patient_id, amount, items, status) VALUES
(1, 800.00,
 '[{"item":"Consultation Fee","price":500},{"item":"Medicines","price":300}]',
 'Unpaid');