document.addEventListener('DOMContentLoaded', () => {
    const signupButton = document.getElementById('register');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('container');
    
    signupButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    loginButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(signupForm);
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Handle successful response
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(loginForm);
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Handle successful response
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
