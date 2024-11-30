// Fetch user data from API
async function fetchUsers() {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/buildingu/Mock_Admin_Panel_Data/main/api/v1/users/users.json`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await res.json();
    displayUsers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// displaying the table body w data
function displayUsers(users) {
  const userTable = document.getElementById("user-list");

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.username}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.favourites}</td>
      <td>${formatDate(user.last_login)}</td>
      <td>${formatDate(user.created_at)}</td>
      <td>
        <button class="edit-btn" onclick="editUser(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Formats the (iso) dates
function formatDate(isoString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
}

// Call fetchUsers
fetchUsers();

let columnHeaders = document.querySelectorAll("th")

// Loop through each header and add event listener
for(let i = 0; i < columnHeaders.length-1; i++) {
  columnHeaders[i].addEventListener('click', headerClick);
}

function headerClick() {
  const column = this;
  let order = this.dataset.order;
  console.log(column.textContent); //logs the header title
  console.log('click to', order);

  // switch asc/desc
  if(order == "desc"){
    this.dataset.order = "asc";
  }else{
    this.dataset.order = "desc";
  }
  
  const arrow = column.querySelector('.icon-arrow');
  arrow.classList.toggle('down');

  sortColumn(column, column.dataset.order);
}

function sortColumn(column, order){
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  const columnIndex = Array.from(column.parentElement.children).indexOf(column);

  rows.sort((rowA, rowB) => {
    const cellA = rowA.cells[columnIndex].textContent; 
    const cellB = rowB.cells[columnIndex].textContent; 
    
    const a = isNaN(cellA) ? cellA : parseFloat(cellA);
    const b = isNaN(cellB) ? cellB : parseFloat(cellB);

    if (order == 'asc') {
      return a > b ? 1 : (a < b ? -1 : 0);
    } else {
      return a < b ? 1 : (a > b ? -1 : 0); 
    }
  });

   // rebuild the table with the sorted rows
   const tbody = document.getElementById("user-list");

   // append rows in sorted order
   for(let i = 0; i < rows.length; i++) {
    tbody.appendChild(rows[i]);
} 
}