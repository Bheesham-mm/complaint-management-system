// Select input fields
var userName = document.getElementById('name');
var userEmail = document.getElementById('email');
var userPass = document.getElementById('password');

// Retrieve users data from localStorage or initialize an empty array
var users_data = JSON.parse(localStorage.getItem('users')) || [];

function submitForm() {
    // Clear previous error messages
    document.getElementById('paraError').innerHTML = '';
    document.getElementById('paraError1').innerHTML = '';
    document.getElementById('paraError2').innerHTML = '';

    // Validation flag
    let valid = true;

    // Validate username
    if (userName.value === '') {
        document.getElementById('paraError').innerHTML = 'Username cannot be empty';
        valid = false;
    }

    // Validate email
    if (userEmail.value === '') {
        document.getElementById('paraError1').innerHTML = 'Email cannot be empty';
        valid = false;
    } else if (!validateEmail(userEmail.value)) {
        document.getElementById('paraError1').innerHTML = 'Please enter a valid email';
        valid = false;
    }

    // Validate password
    if (userPass.value === '') {
        document.getElementById('paraError2').innerHTML = 'Password cannot be empty';
        valid = false;
    } else if (userPass.value.length < 6) {
        document.getElementById('paraError2').innerHTML = 'Password must be at least 6 characters long';
        valid = false;
    }

    // Proceed if all fields are valid
    if (valid) {
        // Check if email already exists
        var existingUser = users_data.find(function (user) {
            return user.email === userEmail.value;
        });

        if (existingUser) {
            alert('Your account has already been registered.');
        } else {
            // Add new user to users_data array
            users_data.push({
                name: userName.value,
                email: userEmail.value,
                password: userPass.value
            });

            // Save the updated users array to localStorage
            localStorage.setItem('users', JSON.stringify(users_data));

            // Set the current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify({
                name: userName.value,
                email: userEmail.value
            }));

            // Clear the input fields
            userName.value = '';
            userEmail.value = '';
            userPass.value = '';

            // Redirect to the login page
            window.location.href = '../index.html';
        }
    }
}

// Function to validate email format
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
