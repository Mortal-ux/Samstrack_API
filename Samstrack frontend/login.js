document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").innerText = "Invalid credentials. Please try again.";
    }
  });
  