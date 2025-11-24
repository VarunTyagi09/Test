
// Integrated Patient Appointments JS
const API = "http://localhost:5000";

async function loadMyAppointments() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const data = await fetch(API + "/api/appointments/patient/" + user.user_id, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    console.log("Appointments:", data);
}

async function bookAppointment() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const body = {
        patient_id: user.user_id,
        doctor_id: 1,
        patient_name: user.name,
        doctor_name: "Demo Doctor",
        department: "General Medicine",
        symptoms: "Fever",
        notes: "Auto",
        date: "2025-01-30",
        time: "12:00 PM"
    };

    await fetch(API + "/api/appointments", {
        method: "POST",
        headers: { 
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    alert("Appointment booked!");
}

document.addEventListener("DOMContentLoaded", loadMyAppointments);
