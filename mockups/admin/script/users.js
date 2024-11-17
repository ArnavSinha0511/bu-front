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
