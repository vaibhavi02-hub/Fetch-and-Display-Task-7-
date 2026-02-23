const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const themeToggle = document.getElementById("themeToggle");

// Async function to fetch users
async function fetchUsers() {
    userContainer.innerHTML = "Loading...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const users = await response.json();
        displayUsers(users);

    } catch (error) {
        userContainer.innerHTML = "Error fetching data. Please try again.";
        console.error("Error:", error);
    }
}

// Display users
function displayUsers(users) {
    userContainer.innerHTML = "";

    users.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("user-card");

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        userContainer.appendChild(card);
    });
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }
}

// Event listeners
reloadBtn.addEventListener("click", fetchUsers);
themeToggle.addEventListener("click", toggleTheme);

// Initial load
loadTheme();
fetchUsers();