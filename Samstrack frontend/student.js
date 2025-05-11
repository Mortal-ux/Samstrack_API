// Load students on page load
window.onload = fetchStudents;

async function fetchStudents() {
  const res = await fetch("http://localhost:8080/students");
  const students = await res.json();
  const table = document.getElementById("studentsTable");
  table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Email</th><th>Action</th></tr>";
  students.forEach(s => {
    table.innerHTML += `<tr>
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.email}</td>
      <td><button onclick="deleteStudent(${s.id})">Delete</button></td>
    </tr>`;
  });
}

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  await fetch("http://localhost:8080/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email })
  });
  fetchStudents();
});

async function deleteStudent(id) {
  await fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });
  fetchStudents();
}

function logout() {
  window.location.href = "index.html";
}
