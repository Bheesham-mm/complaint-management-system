// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close Menu on Link Click (except dropdowns)
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(link => {
    link.addEventListener("click", function (event) {
        if (!link.classList.contains("dropdown-toggle")) {
            if (hamburger.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            }
        }
    });
});

// Fetch and display the current logged-in user
var currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
var user_name = document.getElementById('user_name');

if (currentUser && currentUser.name) {
    user_name.innerHTML = currentUser.name; // Display logged-in user's name
} else {
    user_name.innerHTML = 'Guest'; // If no user is logged in, display 'Guest'
}

// Logout functionality
// function logout() {
//     localStorage.removeItem('currentUser'); // Only remove current user, not all users
//     window.location.href = '../index.html'; // Redirect to login page
// }

// Attach logout event if the button exists
// var logoutBtn = document.getElementById('logoutButton');
// if (logoutBtn) {
//     logoutBtn.addEventListener('click', logout);
// }
