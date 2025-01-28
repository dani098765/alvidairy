
document.addEventListener("DOMContentLoaded", () => {
  const records = [];
  const contentArea = document.getElementById("stock-content-display-area");

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
      <th>Feed Name</th>
      <th>Quantity</th>
      <th>Supplier</th>
    </tr>
        </thead>
        <tbody>
          ${
            records
              .map(
                (record, index) =>
                  `<tr>
      <td>${record.feedName}</td>
      <td>${record.quantity}</td>
      <td>${record.supplier}</td>
    
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
      
      <label>Feed Name:</label><input type="text" id="stock-feed-name" class="form-control">
      <label>Quantity:</label><input type="number" id="stock-feed-quantity" class="form-control">
      <label>Supplier:</label><input type="text" id="stock-feed-supplier" class="form-control">
    
      <button id="save-record-btn" class="btn btn-primary btn-sm">Save Record</button>
    `;

    document.getElementById("save-record-btn").addEventListener("click", () => {
      const newRecord = {
        
      feedName: document.getElementById("stock-feed-name").value,
      quantity: document.getElementById("stock-feed-quantity").value,
      supplier: document.getElementById("stock-feed-supplier").value
    
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
      
      <label>Feed Name:</label><input type="text" id="stock-feed-name" class="form-control" value="${record.feedName}">
      <label>Quantity:</label><input type="number" id="stock-feed-quantity" class="form-control" value="${record.quantity}">
      <label>Supplier:</label><input type="text" id="stock-feed-supplier" class="form-control" value="${record.supplier}">
    
      <button id="update-record-btn" class="btn btn-success btn-sm">Update Record</button>
    `;

    document.getElementById("update-record-btn").addEventListener("click", () => {
      const updatedRecord = {
        
      feedName: document.getElementById("stock-feed-name").value,
      quantity: document.getElementById("stock-feed-quantity").value,
      supplier: document.getElementById("stock-feed-supplier").value
    
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
  document.getElementById("add-stock-btn").addEventListener("click", renderAddRecordForm);
  document.getElementById("show-stock-btn").addEventListener("click", renderAllRecords);

  // Initial Render
  renderAllRecords();
});
