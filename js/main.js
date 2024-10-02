const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

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

var storData = localStorage.getItem('users');
var usersArray = JSON.parse(storData) || [];
var user_name = document.getElementById('user_name');

if (usersArray.length > 0) {
    user_name.innerHTML = usersArray[0].name;
} else {
    user_name.innerHTML = 'Guest';
}

function logout() {
    localStorage.removeItem('users');

    window.location.href = '../index.html';
}

var logoutBtn = document.getElementById('logoutButton');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
