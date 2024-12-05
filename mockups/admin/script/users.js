let usersData = []; // Store fetched users globally

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
    usersData = data; // Save fetched data globally
    displayUsers(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// Display the table body with user data
function displayUsers(users) {
  const userTable = document.getElementById("user-list");
  userTable.innerHTML = ""; // Clear the table before re-rendering

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
        <button class="delete-btn" onclick="deleteUser(${index})">
          🗑️
        </button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// Add a new user
function addNewUser() {
  const newUser = {
    username: prompt("Enter Username:"),
    name: prompt("Enter Name:"),
    email: prompt("Enter Email:"),
    role: prompt("Enter Role:"),
    favourites: prompt("Enter Favourites:"),
    last_login: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  if (newUser.username && newUser.name && newUser.email) {
    usersData.unshift(newUser); // Add the new user to the beginning of the array
    displayUsers(usersData); // Re-render the table
  } else {
    alert("All fields are required to add a new user!");
  }
}

// Search by username
function searchByUsername() {
  const searchInput = document.getElementById("search").value.toLowerCase();

  const filteredUsers = usersData.filter((user) =>
    user.username.toLowerCase().includes(searchInput)
  );

  displayUsers(filteredUsers); // Display filtered users
}

// Formats the ISO dates
function formatDate(isoString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
}

// Delete user
function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    usersData.splice(index, 1); // Remove the user from the array
    displayUsers(usersData); // Re-render the table
  }
}

// Edit user
function editUser(index) {
  const user = usersData[index];

  const updatedUser = {
    username: prompt("Edit Username:", user.username),
    name: prompt("Edit Name:", user.name),
    email: prompt("Edit Email:", user.email),
    role: prompt("Edit Role:", user.role),
    favourites: prompt("Edit Favourites:", user.favourites),
    last_login: user.last_login,
    created_at: user.created_at,
  };

  if (updatedUser.username && updatedUser.name && updatedUser.email) {
    usersData[index] = updatedUser; // Update user in the array
    displayUsers(usersData); // Re-render the table
  } else {
    alert("All fields are required to edit the user!");
  }
}

// Attach event listeners
document.getElementById("add-user-btn").addEventListener("click", addNewUser);
document.getElementById("search").addEventListener("input", searchByUsername);

// Call fetchUsers to load the initial data
fetchUsers();
