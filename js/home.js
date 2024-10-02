// Retrieve complaints from LocalStorage
var getComplaints = localStorage.getItem('complaints');
var setComplaints = JSON.parse(getComplaints) || [];

// Get the current logged-in user from LocalStorage
var currentUserData = JSON.parse(localStorage.getItem('currentUser')) || {};

// If no current user is found, redirect to login
if (!currentUserData || !currentUserData.email) {
    alert('You must be logged in to view this page.');
    window.location.href = '../index.html';
}

// Filter complaints based on the current user
var userComplaints = setComplaints.filter(function (complaint) {
    return complaint.user === currentUserData.name;
});

// Display complaints if available
if (setComplaints.length > 0) {
    var container = document.getElementById('complaintSection');

    for (var i = 0; i < setComplaints.length; i++) {
        var complaint = setComplaints[i];

        // Create the complaint block
        var complaintDiv = document.createElement('div');
        complaintDiv.classList.add('complaint', 'row', 'border', 'my-4', 'p-3');
        complaintDiv.style.border = '1px solid gray';

        var imageDiv = document.createElement('div');
        imageDiv.classList.add('col-md-2', 'col-12', 'mb-3', 'd-flex', 'justify-content-center', 'align-items-center');
        var img = document.createElement('img');
        img.src = complaint.url;
        img.classList.add('img-fluid', 'rounded');
        img.alt = '';
        imageDiv.appendChild(img);

        var descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('col-md-10', 'col-12');

        var descriptionText = document.createElement('p');
        descriptionText.textContent = complaint.desc;
        descriptionText.style.wordWrap = 'break-word';
        descriptionText.style.whiteSpace = 'normal';
        descriptionText.style.overflow = 'hidden';
        descriptionText.style.textOverflow = 'ellipsis';
        descriptionDiv.appendChild(descriptionText);

        var bottomDiv = document.createElement('div');
        bottomDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mt-3');

        var h4 = document.createElement('h4');
        h4.innerHTML = `<span>${complaint.user}</span> || <span>${complaint.date}</span>`;
        h4.classList.add('h6', 'text-muted');
        bottomDiv.appendChild(h4);

        // Show Edit/Delete buttons only for current user complaints
        if (complaint.user === currentUserData.name) {
            var editBtn = document.createElement('button');
            editBtn.classList.add('btn', 'btn-success', 'px-3', 'py-2', 'editBtn');
            editBtn.setAttribute('data-index', i);
            editBtn.setAttribute('data-bs-toggle', 'modal');
            editBtn.setAttribute('data-bs-target', '#editModal');
            editBtn.textContent = 'Edit';

            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'px-3', 'py-2', 'deleteBtn');
            deleteBtn.setAttribute('data-index', i);
            deleteBtn.textContent = 'Delete';

            var btnDiv = document.createElement('div');
            btnDiv.classList.add('d-flex', 'gap-2');
            btnDiv.appendChild(editBtn);
            btnDiv.appendChild(deleteBtn);

            bottomDiv.appendChild(btnDiv);
        }

        descriptionDiv.appendChild(bottomDiv);
        complaintDiv.appendChild(imageDiv);
        complaintDiv.appendChild(descriptionDiv);
        container.appendChild(complaintDiv);
    }

    // Handle editing complaints
    var editTitle = document.getElementById('editTitle');
    var editUrl = document.getElementById('editUrl');
    var editDesc = document.getElementById('editDesc');
    var editDate = document.getElementById('editDate');
    var currentEditIndex;

    document.getElementById('saveEdit').addEventListener('click', function () {
        var editForm = document.getElementById('editComplaintForm');
        if (!editForm.checkValidity()) {
            editForm.classList.add('was-validated');
            return;
        }

        // Update the complaint data in LocalStorage
        setComplaints[currentEditIndex].tit = editTitle.value;
        setComplaints[currentEditIndex].url = editUrl.value;
        setComplaints[currentEditIndex].desc = editDesc.value;
        setComplaints[currentEditIndex].date = editDate.value;
        localStorage.setItem('complaints', JSON.stringify(setComplaints));

        // Reload the page to reflect changes
        location.reload();
    });

    var editButtons = document.getElementsByClassName('editBtn');
    for (var j = 0; j < editButtons.length; j++) {
        editButtons[j].addEventListener('click', function () {
            currentEditIndex = this.getAttribute('data-index');
            editTitle.value = setComplaints[currentEditIndex].tit;
            editUrl.value = setComplaints[currentEditIndex].url;
            editDesc.value = setComplaints[currentEditIndex].desc;
            editDate.value = setComplaints[currentEditIndex].date;
        });
    }

    // Handle deleting complaints
    var deleteButtons = document.getElementsByClassName('deleteBtn');
    for (var k = 0; k < deleteButtons.length; k++) {
        deleteButtons[k].addEventListener('click', function () {
            var deleteIndex = this.getAttribute('data-index');
            if (confirm('Are you sure you want to delete this complaint?')) {
                // Remove the complaint from the array and LocalStorage
                setComplaints.splice(deleteIndex, 1);
                localStorage.setItem('complaints', JSON.stringify(setComplaints));

                // Reload the page to reflect changes
                location.reload();
            }
        });
    }
}
