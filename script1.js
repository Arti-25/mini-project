document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Basic form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const userType = document.getElementById('user-type').value;
    const phone = document.getElementById('phone').value;
    const terms = document.getElementById('terms').checked;

    if (!name || !email || !password || !confirmPassword || !terms) {
        alert("Please fill out all fields and agree to the terms.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Send the data to the backend
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, userType, phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            if (data.message === 'User signed up successfully') {
                // Redirect to sign-in page
                window.location.href = 'signin.html';
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
