// Get input fields for email and password
var mail = document.getElementById('email');
var pass = document.getElementById('password');

// Retrieve the users' data from localStorage
var storData = localStorage.getItem('users');
var usersArrayData = JSON.parse(storData) || []; // Ensure it's an empty array if null

function login() {
    // Clear previous error messages
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('passError').innerHTML = '';

    // Email validation
    if (mail.value === '') {
        document.getElementById('emailError').innerHTML = 'User email cannot be empty';
    } else if (!validateEmail(mail.value)) {
        document.getElementById('emailError').innerHTML = 'Please enter a valid email';
    }
    // Password validation
    else if (pass.value === '') {
        document.getElementById('passError').innerHTML = 'User password cannot be empty';
    } else if (pass.value.length < 6) {
        document.getElementById('passError').innerHTML = 'Password must be at least 6 characters long';
    }
    // If validation passes, check user credentials
    else {
        // Find the user in the stored data
        var user = usersArrayData.find(function (user) {
            return user.email === mail.value && user.password === pass.value;
        });

        // If user is found, login is successful
        if (user) {
            // Store the current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));

            // Redirect to home page after successful login
            window.location.href = 'pages/home.html';
        } else {
            // If user credentials don't match, show an error message
            alert('Account not found. Please create an account.');
        }
    }
}

// Email validation function using regex
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
