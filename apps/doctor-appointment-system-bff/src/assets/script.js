// Fetch and display doctor information
async function loadDoctorInfo() {
  try {
    const response = await fetch('/api/doctor');
    const doctor = await response.json();

    const doctorInfoElement = document.getElementById('doctorInfo');
    doctorInfoElement.innerHTML = `
            <h2>👨‍⚕️ Doctor Information</h2>
            <div class="doctor-card">
                <div class="doctor-stat">
                    <h3>${doctor.name}</h3>
                    <p>Doctor Name</p>
                </div>
                <div class="doctor-stat">
                    <h3>${doctor.workingDays}</h3>
                    <p>Working Days/Week</p>
                </div>
                <div class="doctor-stat">
                    <h3>${doctor.slotsPerDay}</h3>
                    <p>Slots Per Day</p>
                </div>
            </div>
        `;
  } catch (error) {
    document.getElementById('doctorInfo').innerHTML = `
            <h2>👨‍⚕️ Doctor Information</h2>
            <p style="color: #f56565;">Failed to load doctor information</p>
        `;
  }
}

// Load doctor info when page loads
document.addEventListener('DOMContentLoaded', loadDoctorInfo);
