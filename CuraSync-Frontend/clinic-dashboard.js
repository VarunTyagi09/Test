
// Integrated Clinic Dashboard JS
const API = "http://localhost:5000";

async function loadDashboard() {
    const token = localStorage.getItem("token");

    const appts = await fetch(API + "/api/appointments/doctor/1", {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    const patients = await fetch(API + "/api/patients", {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    console.log("Appointments:", appts);
    console.log("Patients:", patients);
}

document.addEventListener("DOMContentLoaded", loadDashboard);
