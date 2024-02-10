// Same JavaScript as before

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
  incidentList.push(incident);
  displayIncident(incident);
  updateIncidentCount();
}

function clearFormFields() {
  document.getElementById("student-name").value = "";
  document.getElementById("staff-involved").value = "";
  document.getElementById("incident-description").value = "";
  document.getElementById("severity").value = "";
}

// Function to open specific tab
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
