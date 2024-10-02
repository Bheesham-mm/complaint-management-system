// Get current user data from LocalStorage
var currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// Fallback for when user data is missing
var defaultUser = {
    name: 'Guest',
    email: 'guest@gmail.com',
    password: '******',
    caste: 'No caste',
    location: 'No Location',
    gender: 'Not specified'
};

// Use currentUser data or fallback to default values
document.getElementById('username').innerHTML = currentUser.name || defaultUser.name;
document.getElementById('getUserName').innerHTML = currentUser.name || defaultUser.name;
document.getElementById('email').innerHTML = currentUser.email || defaultUser.email;
document.getElementById('pass').innerHTML = currentUser.password || defaultUser.password;
document.getElementById('caste').innerHTML = currentUser.caste || defaultUser.caste;
document.getElementById('locat').innerHTML = currentUser.location || defaultUser.location;
document.getElementById('gender').innerHTML = currentUser.gender || defaultUser.gender;
