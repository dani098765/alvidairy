let animalRecords = [
  {
    id: 1,
    name: "Red Bull",
    type: "Bull",
    earTag: "ZW-111",
    breed: "Hereford",
    color: "Black and White",
    birthDate: "2010-01-15",
    age: "13 years",
  },
  {
    id: 2,
    name: "Majorie",
    type: "Cow",
    earTag: "ZW-222",
    breed: "Angus",
    color: "Brown",
    birthDate: "2015-06-01",
    age: "8 years",
  },
];

const contentDisplayArea = document.getElementById("content-display-area");

document.getElementById("add-animal-btn").addEventListener("click", displayAddAnimalForm);
document.getElementById("show-profile-btn").addEventListener("click", displayAnimalProfileSelection);
document.getElementById("show-all-btn").addEventListener("click", displayAllAnimals);

function displayAddAnimalForm() {
  contentDisplayArea.innerHTML = `
    <h3>Add New Animal</h3>
    <form id="add-animal-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" class="form-control" placeholder="Enter animal name" required>
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <input type="text" id="type" class="form-control" placeholder="Enter animal type" required>
      </div>
      <div class="form-group">
        <label for="earTag">Ear Tag</label>
        <input type="text" id="earTag" class="form-control" placeholder="Enter ear tag" required>
      </div>
      <div class="form-group">
        <label for="breed">Breed</label>
        <input type="text" id="breed" class="form-control" placeholder="Enter breed" required>
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input type="text" id="color" class="form-control" placeholder="Enter color" required>
      </div>
      <div class="form-group">
        <label for="birthDate">Birth Date</label>
        <input type="date" id="birthDate" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Add Animal</button>
    </form>
  `;

  document.getElementById("add-animal-form").addEventListener("submit", addAnimal);
}

function addAnimal(event) {
  event.preventDefault();

  const newAnimal = {
    id: animalRecords.length + 1,
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    earTag: document.getElementById("earTag").value,
    breed: document.getElementById("breed").value,
    color: document.getElementById("color").value,
    birthDate: document.getElementById("birthDate").value,
    age: calculateAge(document.getElementById("birthDate").value),
  };

  animalRecords.push(newAnimal);

  alert("Animal added successfully!");
  displayAllAnimals();
}

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  const diff = now - birth;
  const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return `${ageInYears} years`;
}

function displayAllAnimals() {
  if (animalRecords.length === 0) {
    contentDisplayArea.innerHTML = "<h3>No animals available!</h3>";
    return;
  }

  let tableHTML = `
    <h3>All Animals</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Ear Tag</th>
          <th>Breed</th>
          <th>Color</th>
          <th>Birth Date</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
  `;

  animalRecords.forEach((animal) => {
    tableHTML += `
      <tr>
        <td>${animal.id}</td>
        <td>${animal.name}</td>
        <td>${animal.type}</td>
        <td>${animal.earTag}</td>
        <td>${animal.breed}</td>
        <td>${animal.color}</td>
        <td>${animal.birthDate}</td>
        <td>${animal.age}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  contentDisplayArea.innerHTML = tableHTML;
}

function displayAnimalProfileSelection() {
  if (animalRecords.length === 0) {
    contentDisplayArea.innerHTML = "<h3>No animals available for profile selection!</h3>";
    return;
  }

  let dropdownHTML = `
    <h3>Select an Animal to View Profile</h3>
    <div class="form-group">
      <label for="animal-select">Choose Animal:</label>
      <select id="animal-select" class="form-control">
        <option value="">-- Select an Animal --</option>
  `;

  animalRecords.forEach((animal) => {
    dropdownHTML += `<option value="${animal.id}">${animal.name}</option>`;
  });

  dropdownHTML += `
      </select>
    </div>
    <button id="view-profile-btn" class="btn btn-primary">View Profile</button>
    <div id="profile-details"></div>
  `;

  contentDisplayArea.innerHTML = dropdownHTML;

  document.getElementById("view-profile-btn").addEventListener("click", displaySelectedAnimalProfile);
}

function displaySelectedAnimalProfile() {
  const selectedAnimalId = parseInt(document.getElementById("animal-select").value);

  if (!selectedAnimalId) {
    alert("Please select an animal!");
    return;
  }

  const selectedAnimal = animalRecords.find((animal) => animal.id === selectedAnimalId);

  const profileDetails = `
    <h4>Animal Profile</h4>
    <p><strong>ID:</strong> ${selectedAnimal.id}</p>
    <p><strong>Name:</strong> ${selectedAnimal.name}</p>
    <p><strong>Type:</strong> ${selectedAnimal.type}</p>
    <p><strong>Ear Tag:</strong> ${selectedAnimal.earTag}</p>
    <p><strong>Breed:</strong> ${selectedAnimal.breed}</p>
    <p><strong>Color:</strong> ${selectedAnimal.color}</p>
    <p><strong>Birth Date:</strong> ${selectedAnimal.birthDate}</p>
    <p><strong>Age:</strong> ${selectedAnimal.age}</p>
  `;

  document.getElementById("profile-details").innerHTML = profileDetails;
}

// Initialize by displaying all animals
displayAllAnimals();
