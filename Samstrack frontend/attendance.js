window.onload = () => {
    loadStudents();
    loadSubjects();
    fetchAttendance();
  };
  
  async function loadStudents() {
    const res = await fetch("http://localhost:8080/students");
    const students = await res.json();
    const select = document.getElementById("studentSelect");
    select.innerHTML = "<option disabled selected>Select Student</option>";
    students.forEach(s => {
      select.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
  }
  
  async function loadSubjects() {
    const res = await fetch("http://localhost:8080/subjects");
    const subjects = await res.json();
    const select = document.getElementById("subjectSelect");
    select.innerHTML = "<option disabled selected>Select Subject</option>";
    subjects.forEach(s => {
      select.innerHTML += `<option value="${s.id}">${s.name}</option>`;
    });
  }
  
  document.getElementById("attendanceForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentId = document.getElementById("studentSelect").value;
    const subjectId = document.getElementById("subjectSelect").value;
    const status = document.getElementById("statusSelect").value;
  
    await fetch("http://localhost:8080/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, subjectId, status })
    });
  
    fetchAttendance();
  });
  
  async function fetchAttendance() {
    const res = await fetch("http://localhost:8080/attendance");
    const records = await res.json();
    const table = document.getElementById("attendanceTable");
    table.innerHTML = "<tr><th>ID</th><th>Student</th><th>Subject</th><th>Status</th></tr>";
    records.forEach(r => {
      table.innerHTML += `<tr>
        <td>${r.id}</td>
        <td>${r.student.name}</td>
        <td>${r.subject.name}</td>
        <td>${r.status}</td>
      </tr>`;
    });
  }
  
  function logout() {
    window.location.href = "index.html";
  }
  