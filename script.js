// Same JavaScript as before

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

// Same JavaScript as before
