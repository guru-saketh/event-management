document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('loginModal');

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // When the page loads, open the modal
    modal.style.display = 'block';

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission for login (optional)
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // Add your login logic here
        alert('Login form submitted');
    });

    // Handle form submission for signup (optional)
    document.getElementById('signup-form')?.addEventListener('submit', function(event) {
        event.preventDefault();
        // Add your signup logic here
        alert('Signup form submitted');
    });
});
