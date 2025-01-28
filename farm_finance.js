
document.addEventListener("DOMContentLoaded", () => {
  const records = [];
  const contentArea = document.getElementById("finance-content-display-area");

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
          <th>Type</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
          ${
            records
              .map(
                (record, index) =>
                  `<tr>
          <td>${record.date}</td>
          <td>${record.type}</td>
          <td>${record.description}</td>
          <td>${record.amount}</td>
        
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
          <label>Type:</label>
          <select id="record-type" class="form-control">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <label>Description:</label><input type="text" id="record-description" class="form-control">
          <label>Amount:</label><input type="number" id="record-amount" class="form-control">
        
      <button id="save-record-btn" class="btn btn-primary btn-sm">Save Record</button>
    `;

    document.getElementById("save-record-btn").addEventListener("click", () => {
      const newRecord = {
        
          date: document.getElementById("record-date").value,
          type: document.getElementById("record-type").value,
          description: document.getElementById("record-description").value,
          amount: parseFloat(document.getElementById("record-amount").value)
        
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
          <label>Type:</label>
          <select id="record-type" class="form-control">
            <option value="Income" ${record.type === "Income" ? "selected" : ""}>Income</option>
            <option value="Expense" ${record.type === "Expense" ? "selected" : ""}>Expense</option>
          </select>
          <label>Description:</label><input type="text" id="record-description" class="form-control" value="${record.description}">
          <label>Amount:</label><input type="number" id="record-amount" class="form-control" value="${record.amount}">
        
      <button id="update-record-btn" class="btn btn-success btn-sm">Update Record</button>
    `;

    document.getElementById("update-record-btn").addEventListener("click", () => {
      const updatedRecord = {
        
          date: document.getElementById("record-date").value,
          type: document.getElementById("record-type").value,
          description: document.getElementById("record-description").value,
          amount: parseFloat(document.getElementById("record-amount").value)
        
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
  document.getElementById("add-finance-record-btn").addEventListener("click", renderAddRecordForm);
  document.getElementById("show-finance-records-btn").addEventListener("click", renderAllRecords);

  // Initial Render
  renderAllRecords();
});
