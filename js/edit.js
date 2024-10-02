var storeData = localStorage.getItem('users');
var usersArray = JSON.parse(storeData);
// select inputs
var userName = document.getElementById('username');
var uName = document.getElementById('name1')
var email = document.getElementById('email')
var pass = document.getElementById('pass')
var caste = document.getElementById('caste')
var locat = document.getElementById('locat')
var gender = document.getElementById('gender')

for (var prop in usersArray) {
    userName.innerHTML = usersArray[prop].name || 'Guest';
    uName.value = usersArray[prop].name || 'Guest';
    email.value = usersArray[prop].email || 'Guest@gmail.com';
    pass.value = usersArray[prop].password || 'Guest';
    caste.value = usersArray[prop].cast || 'No caste';
    locat.value = usersArray[prop].location || 'No Location';
    // gender.value = usersArray[prop].gender || 'No Location';
}

function update() {
    // if (validation()) {
    var updateData = [{
        name: uName.value, email: email.value, password: pass.value, caste: caste.value, location: locat.value,

    }];
    localStorage.setItem('users', JSON.stringify(updateData));

    if (updateData) {
        window.location.href = 'profile.html';
    }
    else {
        console.log('not succes')
    }
}