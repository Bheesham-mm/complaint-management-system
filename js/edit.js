// Fetch user data from localStorage
var storeData = localStorage.getItem('users');
var usersArray = JSON.parse(storeData) || [];
var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// Select inputs
var userName = document.getElementById('username');
var uName = document.getElementById('name1');
var email = document.getElementById('email');
var pass = document.getElementById('pass');
var caste = document.getElementById('caste');
var locat = document.getElementById('locat');
var gender = document.getElementById('gender');

// Find current logged-in user in usersArray
var currentUserIndex = usersArray.findIndex(user => user.email === currentUser.email);

// Populate form fields with current user's data
if (currentUserIndex !== -1) {
    var user = usersArray[currentUserIndex];
    userName.innerHTML = user.name || 'Guest';
    uName.value = user.name || 'Guest';
    email.value = user.email || 'Guest@gmail.com';
    pass.value = user.password || 'Guest';
    caste.value = user.caste || 'No caste';
    locat.value = user.location || 'No Location';
    gender.value = user.gender || 'Not specified';
}

// Update user information function
function update() {
    // Validate input fields (optional, but recommended)
    if (uName.value === '' || email.value === '' || pass.value === '') {
        alert('Please fill in all the required fields.');
        return;
    }

    // Update user data in the array
    usersArray[currentUserIndex] = {
        name: uName.value,
        email: email.value,
        password: pass.value,
        caste: caste.value,
        location: locat.value,
        // gender: gender.value
    };

    // Update localStorage with the modified usersArray
    localStorage.setItem('users', JSON.stringify(usersArray));

    // Update currentUser data in localStorage as well
    localStorage.setItem('currentUser', JSON.stringify({
        name: uName.value,
        email: email.value
    }));

    // Redirect to the profile page after saving
    window.location.href = 'profile.html';
}
