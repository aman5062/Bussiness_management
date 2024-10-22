document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.login-container')) {
        document.querySelector('form').addEventListener('submit', handleLogin);
    }

    if (document.querySelector('.account-container')) {
        document.querySelector('form').addEventListener('submit', handleCreateAccount);
    }

    if (document.querySelector('.dashboard-container')) {
        populateDashboard();
        document.querySelector('.btn-danger').addEventListener('click', handleLogout);
    }
});

function saveUserData(username, password, email, phone, pincode) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password, email, phone, pincode });
    localStorage.setItem('users', JSON.stringify(users));
}

function handleCreateAccount(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const pincode = document.getElementById('pincode').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists!');
        return;
    }

    // Save new user
    saveUserData(username, password, email, phone, pincode);
    alert('Account created successfully!');
    window.location.href = 'login.html'; 
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert('Invalid username or password!');
        return;
    }

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'dashbord.html'; // Redirect to dashboard
}

function handleLogout() {
    sessionStorage.removeItem('loggedInUser'); // Remove user session
    window.location.href = 'login.html'; // Redirect to login page
}

function populateDashboard() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('You need to log in first!');
        window.location.href = 'login.html'; 
        return;
    }

    document.querySelector('.header h2').textContent = `Welcome, ${loggedInUser.username}!`;
    document.querySelector('.user-info').innerHTML = `
        <p><strong>Email:</strong> ${loggedInUser.email}</p>
        <p><strong>Phone:</strong> ${loggedInUser.phone}</p>
        <p><strong>Pincode:</strong> ${loggedInUser.pincode}</p>
    `;
}
