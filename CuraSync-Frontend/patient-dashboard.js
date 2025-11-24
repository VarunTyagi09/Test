
// Integrated Patient Dashboard JS
const API = "http://localhost:5000";

async function loadPatientDashboard() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const appts = await fetch(API + "/api/appointments/patient/" + user.user_id, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    const bills = await fetch(API + "/api/billing/patient/" + user.user_id, {
        headers: { "Authorization": "Bearer " + token }
    }).then(r=>r.json());

    console.log("My Appointments:", appts);
    console.log("My Bills:", bills);
}

document.addEventListener("DOMContentLoaded", loadPatientDashboard);
