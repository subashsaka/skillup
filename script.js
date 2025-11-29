const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle between Sign In and Sign Up
if (registerBtn && loginBtn && container) {
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

// Authentication Logic (Client-Side Simulation)
// Note: In a real full-stack app, these functions would make fetch() calls to your backend API.

const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simulate Backend Registration
        if (localStorage.getItem('user_' + email)) {
            alert('User already exists with this email!');
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password // In a real app, NEVER store passwords in plain text!
        };

        localStorage.setItem('user_' + email, JSON.stringify(user));
        alert('Account created successfully! Please sign in.');
        container.classList.remove("active"); // Switch to sign in view
        signupForm.reset();
    });
}

if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Simulate Backend Login
        const storedUser = localStorage.getItem('user_' + email);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === password) {
                alert('Login Successful! Welcome back, ' + user.name);
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html'; // Redirect to home
            } else {
                alert('Invalid password!');
            }
        } else {
            alert('User not found! Please register first.');
        }
    });
}

// Check if user is logged in (can be used on other pages)
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        // Update UI to show user is logged in, e.g., change "Login" button to "Logout"
        const loginButtons = document.querySelectorAll('.loginbutton');
        loginButtons.forEach(btn => {
            btn.textContent = 'Logout';
            btn.href = '#';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        });
    }
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', checkAuth);
