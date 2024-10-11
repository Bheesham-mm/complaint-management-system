// Select input fields

// Retrieve users data from localStorage or initialize an empty array
var users_data = JSON.parse(localStorage.getItem("users")) || [];

function submitForm() {
  var userName = document.getElementById("name").value;
  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  // Clear previous error messages
  // document.getElementById('paraError').innerHTML = '';
  // document.getElementById('paraError1').innerHTML = '';
  // document.getElementById('paraError2').innerHTML = '';

  // Validation flag
  let valid = true;

  // Validate username
  if (userName === "") {
    document.getElementById("paraError").innerHTML = "Username cannot be empty";
    valid = false;
  }

  // Validate email
  if (userEmail === "") {
    document.getElementById("paraError1").innerHTML = "Email cannot be empty";
    valid = false;
  } else if (!validateEmail(userEmail)) {
    document.getElementById("paraError1").innerHTML =
      "Please enter a valid email";
    valid = false;
  }

  // Validate password
  if (userPass === "") {
    document.getElementById("paraError2").innerHTML =
      "Password cannot be empty";
    valid = false;
  }
  // Proceed if all fields are valid
  if (valid) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPass)
      .then((userCredential) => {
        var user = userCredential.user;
        user
          .updateProfile({
            displayName: userName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
          .then((res) => {
            console.log("profile updated");
          })
          .catch((err) => {
            document.getElementById("firebaseErr").innerHTML = err.message;
          });
          window.location.href="./home.html"

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("firebaseErr").innerHTML = errorMessage;


        // ..
      });
    // Check if email already exists
    // var existingUser = users_data.find(function (user) {
    //     return user.email === userEmail.value;
    // });

    // if (existingUser) {
    //     alert('Your account has already been registered.');
    // } else {
    //     // Add new user to users_data array
    //     users_data.push({
    //         name: userName.value,
    //         email: userEmail.value,
    //         password: userPass.value
    //     });

    //     // Save the updated users array to localStorage
    //     localStorage.setItem('users', JSON.stringify(users_data));

    //     // Set the current user in localStorage
    //     localStorage.setItem('currentUser', JSON.stringify({
    //         name: userName.value,
    //         email: userEmail.value
    //     }));

    //     // Clear the input fields
    //     userName.value = '';
    //     userEmail.value = '';
    //     userPass.value = '';

    //     // Redirect to the login page
    //     window.location.href = '../index.html';
    // }
  }
}

// Function to validate email format
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
