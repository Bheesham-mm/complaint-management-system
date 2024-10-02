var tit = document.getElementById('title');
var url = document.getElementById('url');
var desc = document.getElementById('desc');
var date = document.getElementById('date');

var complaint_data = JSON.parse(localStorage.getItem('complaints')) || [];

var currentUserData = JSON.parse(localStorage.getItem('currentUser')) || {};

function validation() {
    if (tit.value === '') {
        console.log('Title is empty');
        return false;
    } else if (url.value === '') {
        console.log('URL is empty');
        return false;
    } else if (desc.value === '') {
        console.log('Description is empty');
        return false;
    } else if (date.value === '') {
        console.log('Date is empty');
        return false;
    } else {
        console.log('No validation errors');
        return true;
    }
}

function complaint() {

    if (!currentUserData || !currentUserData.name) {
        alert('You must be logged in to add a complaint.');
        window.location.href = '../index.html';
        return;
    }

    if (validation()) {

        var imageURL = url.value !== '' ? url.value : '../img/logo.png';

        complaint_data.push({
            tit: tit.value,
            url: imageURL,
            desc: desc.value,
            date: date.value,
            user: currentUserData.name
        });

        localStorage.setItem('complaints', JSON.stringify(complaint_data));

        console.log(complaint_data);

        window.location.href = '../pages/home.html';
    }
}
