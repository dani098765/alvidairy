
document.addEventListener("DOMContentLoaded", () => {
  const records = [];
  const contentArea = document.getElementById("employee-content-display-area");

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
          <th>Name</th>
          <th>Role</th>
          <th>Contact</th>
        </tr>
        </thead>
        <tbody>
          ${
            records
              .map(
                (record, index) =>
                  `<tr>
          <td>${record.name}</td>
          <td>${record.role}</td>
          <td>${record.contact}</td>
        
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
      
          <label>Name:</label><input type="text" id="employee-name" class="form-control">
          <label>Role:</label><input type="text" id="employee-role" class="form-control">
          <label>Contact:</label><input type="text" id="employee-contact" class="form-control">
        
      <button id="save-record-btn" class="btn btn-primary btn-sm">Save Record</button>
    `;

    document.getElementById("save-record-btn").addEventListener("click", () => {
      const newRecord = {
        
          name: document.getElementById("employee-name").value,
          role: document.getElementById("employee-role").value,
          contact: document.getElementById("employee-contact").value
        
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
      
          <label>Name:</label><input type="text" id="employee-name" class="form-control" value="${record.name}">
          <label>Role:</label><input type="text" id="employee-role" class="form-control" value="${record.role}">
          <label>Contact:</label><input type="text" id="employee-contact" class="form-control" value="${record.contact}">
        
      <button id="update-record-btn" class="btn btn-success btn-sm">Update Record</button>
    `;

    document.getElementById("update-record-btn").addEventListener("click", () => {
      const updatedRecord = {
        
          name: document.getElementById("employee-name").value,
          role: document.getElementById("employee-role").value,
          contact: document.getElementById("employee-contact").value
        
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
  document.getElementById("add-employee-btn").addEventListener("click", renderAddRecordForm);
  document.getElementById("show-employees-btn").addEventListener("click", renderAllRecords);

  // Initial Render
  renderAllRecords();
});
