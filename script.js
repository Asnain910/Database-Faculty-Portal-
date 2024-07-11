document.addEventListener("DOMContentLoaded", () => {
  const subjectForm = document.getElementById("subjectForm");
  const facultyList = document.getElementById("facultyList");
  const generateBtn = document.getElementById("generateBtn");
  const randomFacultyDisplay = document.getElementById("randomFaculty"); // Get the element to display the randomly selected faculty

  subjectForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subject = document.getElementById("subject").value;

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/faculty?subject=${encodeURIComponent(subject)}`
      );
      const data = await response.json();
      renderFacultyList(data);
    } catch (err) {
      console.error("Error fetching faculty:", err);
    }
  });

  generateBtn.addEventListener("click", async () => {
    const selectedFacultyIds = Array.from(
      document.querySelectorAll(".facultyCheckbox:checked")
    ).map((checkbox) => checkbox.value);

    if (selectedFacultyIds.length < 3) {
      alert("Please select at least 3 faculty members.");
      return;
    }

    // Display randomly selected faculty before sending email
    const randomFacultyIndex = Math.floor(
      Math.random() * selectedFacultyIds.length
    );
    const randomFacultyId = selectedFacultyIds[randomFacultyIndex];
    const randomFaculty = document.querySelector(
      `.facultyCheckbox[value="${randomFacultyId}"] + label`
    ).innerText;
    randomFacultyDisplay.textContent = `Randomly selected faculty: ${randomFaculty}`;

    try {
      const response = await fetch(`http://127.0.0.1:3000/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ facultyIds: selectedFacultyIds }),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message);
      } else {
        console.error("Error sending email:", responseData.error);
        alert("An error occurred while sending email");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      alert("An error occurred while sending email");
    }
  });

  function renderFacultyList(faculty) {
    let html = "";
    faculty.forEach((member) => {
      html += `
        <div>
          <input type="checkbox" class="facultyCheckbox" value="${member._id}">
          <label>${member.name} (${member.subject})</label>
        </div>
      `;
    });
    facultyList.innerHTML = html;
  }
});
