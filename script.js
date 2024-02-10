const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "teacher", password: "teacher123", role: "teacher" },
  { username: "student", password: "student123", role: "student" }
];

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    document.getElementById("error-message").textContent = "";
    login(user);
  } else {
    document.getElementById("error-message").textContent = "Invalid username or password";
  }
});

function login(user) {
  if (user.role === "admin" || user.role === "teacher") {
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("login-form").classList.add("hidden");
    showDashboard();
  } else {
    alert("You do not have permission to access the dashboard.");
  }
}

function showDashboard() {
  document.getElementById("log").classList.add("active");
}

document.getElementById("incident-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const studentName = document.getElementById("student-name").value;
  const staffInvolved = document.getElementById("staff-involved").value;
  const description = document.getElementById("incident-description").value;
  const severity = document.getElementById("severity").value;
  logIncident(studentName, staffInvolved, description, severity);
  clearFormFields();
});

function logIncident(studentName, staffInvolved, description, severity) {
  const incident = {
    studentName,
    staffInvolved,
    description,
    severity,
    timestamp: new Date().toLocaleString()
  };
  displayIncident(incident);
}

function clearFormFields() {
  document.getElementById("student-name").value = "";
  document.getElementById("staff-involved").value = "";
  document.getElementById("incident-description").value = "";
  document.getElementById("severity").value = "";
}

function displayIncident(incident) {
  const incidentItem = document.createElement("li");
  incidentItem.textContent = `${incident.timestamp}: ${incident.description}`;
  document.getElementById("incident-items").appendChild(incidentItem);
}
