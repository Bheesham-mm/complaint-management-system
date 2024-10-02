var storeData = localStorage.getItem('users');
var usersArray = JSON.parse(storeData);
for (var prop in usersArray) {
    document.getElementById('username').innerHTML = usersArray[prop].name || 'Guest';
    document.getElementById('getUserName').innerHTML = usersArray[prop].name || 'Guest';
    document.getElementById('email').innerHTML = usersArray[prop].email || 'Guest@gmail.com';
    document.getElementById('pass').innerHTML = usersArray[prop].password || 'Guest';
    document.getElementById('caste').innerHTML = usersArray[prop].caste || 'No caste';
    document.getElementById('locat').innerHTML = usersArray[prop].location || 'No Location';
    document.getElementById('gender').innerHTML = usersArray[prop].gender || 'Mail';
}