document.addEventListener("DOMContentLoaded", function() {

    // Dummy user data for demonstration
    const dummyStudent = {
        id: 'UCET2311169',
        name: 'Yashwant',
        type: 'Student',
    };

    const dummyStaff = {
        id: 'vbuucet@gmail.com',
        name: 'Admin',
        type: 'Staff',
    };

    const studentForm = document.querySelector('#pills-student form');
    const staffForm = document.querySelector('#pills-staff form');

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        // Save user data to the browser's session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(dummyStudent));

        // Redirect to the home page
        window.location.href = 'index.html';
    });

    staffForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        // Save user data to the browser's session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(dummyStaff));
        
        // Redirect to the home page
        window.location.href = 'index.html';
    });
});