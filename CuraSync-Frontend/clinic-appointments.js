
// Integrated Clinic Appointments JS
const API = "http://localhost:5000";

async function loadAppointments() {
    const token = localStorage.getItem("token");

    const data = await fetch(API + "/api/appointments/doctor/1", {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    console.log("Doctor Appointments:", data);
}

async function confirmAppointment(id) {
    const token = localStorage.getItem("token");
    await fetch(API + "/api/appointments/" + id + "/confirm", {
        method: "PUT",
        headers: { "Authorization": "Bearer " + token }
    });
    alert("Appointment confirmed");
}

document.addEventListener("DOMContentLoaded", loadAppointments);
