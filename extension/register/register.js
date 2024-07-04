document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5172/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, age, email, password })
    });

    const result = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Registration successful!';
        setTimeout(() => {
            window.location.href = '../popup/popup.html';
        }, 2000); // Redirect after 2 seconds to show the success message
    } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Registration failed: ' + result.message;
    }
});
