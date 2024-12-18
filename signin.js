document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from submitting to a server

    const userType = document.getElementById("user-type").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Prepare the data to send to the server
    const userData = {
        email,
        password,
        userType
    };

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});
