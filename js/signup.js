// Select fields
var userName = document.getElementById('name');
var userEmail = document.getElementById('email');
var userPass = document.getElementById('password');

var users_data = JSON.parse(localStorage.getItem('users')) || [];

function submitForm() {
    document.getElementById('paraError').innerHTML = '';
    document.getElementById('paraError1').innerHTML = '';
    document.getElementById('paraError2').innerHTML = '';

    // Validation flags
    let valid = true;

    if (userName.value === '') {
        document.getElementById('paraError').innerHTML = 'Username cannot be empty';
        valid = false;
    }

    if (userEmail.value === '') {
        document.getElementById('paraError1').innerHTML = 'Email cannot be empty';
        valid = false;
    } else if (!validateEmail(userEmail.value)) {
        document.getElementById('paraError1').innerHTML = 'Please enter a valid email';
        valid = false;
    }

    if (userPass.value === '') {
        document.getElementById('paraError2').innerHTML = 'Password cannot be empty';
        valid = false;
    } else if (userPass.value.length < 6) {
        document.getElementById('paraError2').innerHTML = 'Password must be at least 6 characters long';
        valid = false;
    }

    if (valid) {
        // Check if email is already registered
        var existingUser = users_data.find(function (user) {
            return user.email === userEmail.value;
        });

        if (existingUser) {
            alert('Your account has already been registered.');
        } else {
            users_data.push({ name: userName.value, email: userEmail.value, password: userPass.value });

            localStorage.setItem('users', JSON.stringify(users_data));

            localStorage.setItem('currentUser', JSON.stringify({ name: userName.value, email: userEmail.value }));

            userName.value = '';
            userEmail.value = '';
            userPass.value = '';

            // Redirect to login page
            window.location.href = '../index.html';
        }
    }
}

// Email validation function
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}