const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "teacher", password: "teacher123", role: "teacher" },
  { username: "student", password: "student123", role: "student" }
];

const incidentList = [];

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
    showDashboard();
  } else {
    alert("You do not have permission to access the dashboard.");
  }
}

function showDashboard() {
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("login-form").classList.add("hidden");
  loadIncidents();
}

document.getElementById("incident-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const incidentDescription = document.getElementById("incident-description").value;
  logIncident(incidentDescription);
  document.getElementById("incident-description").value = "";
});

function logIncident(description) {
  const incident = {
    description,
    timestamp: new Date().toLocaleString()
  };
  incidentList.push(incident);
  displayIncident(incident);
}

function displayIncident(incident) {
  const incidentItem = document.createElement("li");
  incidentItem.textContent = `${incident.timestamp}: ${incident.description}`;
  document.getElementById("incident-items").appendChild(incidentItem);
}

function loadIncidents() {
  incidentList.forEach(incident => {
    displayIncident(incident);
  });
}
