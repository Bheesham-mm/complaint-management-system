// Get form elements
var tit = document.getElementById('title');
var url = document.getElementById('url');
var desc = document.getElementById('desc');
var date = document.getElementById('date');

// Get existing complaints from LocalStorage or initialize an empty array
var complaint_data = JSON.parse(localStorage.getItem('complaints')) || [];

// Get the current logged-in user from LocalStorage
var currentUserData = JSON.parse(localStorage.getItem('currentUser')) || {};

// Validation function to check if fields are filled
function validation() {
    if (tit.value.trim() === '') {
        console.log('Title is empty');
        return false;
    } else if (url.value.trim() === '') {
        console.log('URL is empty');
        return false;
    } else if (desc.value.trim() === '') {
        console.log('Description is empty');
        return false;
    } else if (date.value.trim() === '') {
        console.log('Date is empty');
        return false;
    } else {
        console.log('No validation errors');
        return true;
    }
}

// Function to handle the complaint submission
function complaint() {

    // Check if the user is logged in
    if (!currentUserData || !currentUserData.name) {
        alert('You must be logged in to add a complaint.');
        window.location.href = '../index.html';
        return;
    }

    // If validation passes, add the complaint
    if (validation()) {
        // Set a default image if no URL is provided
        var imageURL = url.value.trim() !== '' ? url.value : '../img/logo.png';

        // Add the new complaint to the array
        complaint_data.push({
            tit: tit.value,
            url: imageURL,
            desc: desc.value,
            date: date.value,
            user: currentUserData.name // Use the current logged-in user's name
        });

        // Save the updated complaints array to LocalStorage
        localStorage.setItem('complaints', JSON.stringify(complaint_data));

        console.log('Complaint added:', complaint_data);

        // Redirect to the home page after adding the complaint
        window.location.href = '../pages/home.html';
    }
}
