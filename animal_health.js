
document.addEventListener("DOMContentLoaded", () => {
  const records = [];
  const contentArea = document.getElementById("health-content-display-area");

  // Render All Records
  function renderAllRecords() {
    if (records.length === 0) {
      contentArea.innerHTML = `<h3>No Records Found</h3>`;
      return;
    }

    contentArea.innerHTML = `
      <h3>All Records</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
          <th>Date</th>
          <th>Animal Name</th>
          <th>Health Condition</th>
          <th>Treatment</th>
          <th>Veterinarian</th>
        </tr>
        </thead>
        <tbody>
          ${
            records
              .map(
                (record, index) =>
                  `<tr>
          <td>${record.date}</td>
          <td>${record.animalName}</td>
          <td>${record.condition}</td>
          <td>${record.treatment}</td>
          <td>${record.vetName}</td>
        
                    <td>
                      <button class="edit-btn btn btn-warning btn-sm" data-index="${index}">Edit</button>
                      <button class="delete-btn btn btn-danger btn-sm" data-index="${index}">Delete</button>
                    </td>
                  </tr>`
              )
              .join("")
          }
        </tbody>
      </table>
    `;

    // Add event listeners for Edit and Delete buttons
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        renderEditRecord(index);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        records.splice(index, 1);
        alert("Record deleted successfully!");
        renderAllRecords(); // Refresh the table
      });
    });
  }

  // Render Add Record Form
  function renderAddRecordForm() {
    contentArea.innerHTML = `
      <h3>Add Record</h3>
      
          <label>Date:</label><input type="date" id="record-date" class="form-control">
          <label>Animal Name:</label><input type="text" id="record-animal-name" class="form-control">
          <label>Health Condition:</label><input type="text" id="record-condition" class="form-control">
          <label>Treatment:</label><input type="text" id="record-treatment" class="form-control">
          <label>Veterinarian:</label><input type="text" id="record-vet" class="form-control">
        
      <button id="save-record-btn" class="btn btn-primary btn-sm">Save Record</button>
    `;

    document.getElementById("save-record-btn").addEventListener("click", () => {
      const newRecord = {
        
          date: document.getElementById("record-date").value,
          animalName: document.getElementById("record-animal-name").value,
          condition: document.getElementById("record-condition").value,
          treatment: document.getElementById("record-treatment").value,
          vetName: document.getElementById("record-vet").value
        
      };

      if (Object.values(newRecord).some((value) => !value)) {
        alert("Please fill in all fields!");
        return;
      }

      records.push(newRecord);
      alert("Record added successfully!");
      renderAllRecords(); // Refresh the table with new records
    });
  }

  // Render Edit Record Form
  function renderEditRecord(index) {
    const record = records[index];

    contentArea.innerHTML = `
      <h3>Edit Record</h3>
      
          <label>Date:</label><input type="date" id="record-date" class="form-control" value="${record.date}">
          <label>Animal Name:</label><input type="text" id="record-animal-name" class="form-control" value="${record.animalName}">
          <label>Health Condition:</label><input type="text" id="record-condition" class="form-control" value="${record.condition}">
          <label>Treatment:</label><input type="text" id="record-treatment" class="form-control" value="${record.treatment}">
          <label>Veterinarian:</label><input type="text" id="record-vet" class="form-control" value="${record.vetName}">
        
      <button id="update-record-btn" class="btn btn-success btn-sm">Update Record</button>
    `;

    document.getElementById("update-record-btn").addEventListener("click", () => {
      const updatedRecord = {
        
          date: document.getElementById("record-date").value,
          animalName: document.getElementById("record-animal-name").value,
          condition: document.getElementById("record-condition").value,
          treatment: document.getElementById("record-treatment").value,
          vetName: document.getElementById("record-vet").value
        
      };

      if (Object.values(updatedRecord).some((value) => !value)) {
        alert("Please fill in all fields!");
        return;
      }

      records[index] = updatedRecord;
      alert("Record updated successfully!");
      renderAllRecords(); // Refresh the table with updated records
    });
  }

  // Event Listeners for Buttons
  document.getElementById("add-health-record-btn").addEventListener("click", renderAddRecordForm);
  document.getElementById("show-health-records-btn").addEventListener("click", renderAllRecords);

  // Initial Render
  renderAllRecords();
});
