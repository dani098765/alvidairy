
document.addEventListener("DOMContentLoaded", () => {
  const records = [];
  const contentArea = document.getElementById("milk-content-display-area");

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
          <th>Quantity (Liters)</th>
          <th>Shift</th>
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
          <td>${record.quantity}</td>
          <td>${record.shift}</td>
        
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
      
          <label>Date:</label><input type="date" id="milk-date" class="form-control">
          <label>Animal Name:</label><input type="text" id="milk-animal-name" class="form-control">
          <label>Quantity (Liters):</label><input type="number" id="milk-quantity" min="0" step="0.1" class="form-control">
          <label>Shift:</label>
          <select id="milk-shift" class="form-control">
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        
      <button id="save-record-btn" class="btn btn-primary btn-sm">Save Record</button>
    `;

    document.getElementById("save-record-btn").addEventListener("click", () => {
      const newRecord = {
        
          date: document.getElementById("milk-date").value,
          animalName: document.getElementById("milk-animal-name").value,
          quantity: parseFloat(document.getElementById("milk-quantity").value),
          shift: document.getElementById("milk-shift").value
        
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
      
          <label>Date:</label><input type="date" id="milk-date" class="form-control" value="${record.date}">
          <label>Animal Name:</label><input type="text" id="milk-animal-name" class="form-control" value="${record.animalName}">
          <label>Quantity (Liters):</label><input type="number" id="milk-quantity" min="0" step="0.1" class="form-control" value="${record.quantity}">
          <label>Shift:</label>
          <select id="milk-shift" class="form-control">
            <option value="Morning" ${record.shift === "Morning" ? "selected" : ""}>Morning</option>
            <option value="Evening" ${record.shift === "Evening" ? "selected" : ""}>Evening</option>
          </select>
        
      <button id="update-record-btn" class="btn btn-success btn-sm">Update Record</button>
    `;

    document.getElementById("update-record-btn").addEventListener("click", () => {
      const updatedRecord = {
        
          date: document.getElementById("milk-date").value,
          animalName: document.getElementById("milk-animal-name").value,
          quantity: parseFloat(document.getElementById("milk-quantity").value),
          shift: document.getElementById("milk-shift").value
        
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
  document.getElementById("add-milk-record-btn").addEventListener("click", renderAddRecordForm);
  document.getElementById("show-milk-records-btn").addEventListener("click", renderAllRecords);

  // Initial Render
  renderAllRecords();
});
