// Load all subjects on page load
window.onload = fetchSubjects;

async function fetchSubjects() {
  const res = await fetch("http://localhost:8080/subjects");
  const subjects = await res.json();
  const table = document.getElementById("subjectsTable");
  table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Action</th></tr>";
  subjects.forEach(sub => {
    table.innerHTML += `<tr>
      <td>${sub.id}</td>
      <td>${sub.name}</td>
      <td><button onclick="deleteSubject(${sub.id})">Delete</button></td>
    </tr>`;
  });
}

document.getElementById("subjectForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("subjectName").value;
  await fetch("http://localhost:8080/subjects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  document.getElementById("subjectName").value = "";
  fetchSubjects();
});

async function deleteSubject(id) {
  await fetch(`http://localhost:8080/subjects/${id}`, { method: "DELETE" });
  fetchSubjects();
}

function logout() {
  window.location.href = "index.html";
}
