document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    if (expenseForm && expenseList) {
        expenseForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const clubName = document.getElementById('club-name').value;
            const eventAllocated = document.getElementById('event-allocated').value;
            const expenseName = document.getElementById('expense-name').value;
            const expenseAmount = document.getElementById('expense-amount').value;

            if (!clubName || !eventAllocated || !expenseName || !expenseAmount) {
                alert('Please fill in all fields.');
                return;
            }

            const expenseItem = document.createElement('li');
            expenseItem.innerHTML = `
                <strong>Club:</strong> ${clubName} <br>
                <strong>Event Allocated:</strong> ${eventAllocated} <br>
                <strong>Expense Name:</strong> ${expenseName} <br>
                <strong>Expense Amount:</strong> $${expenseAmount}
            `;

            expenseList.appendChild(expenseItem);

            expenseForm.reset();
        });
    }

    const createEventForm = document.getElementById('create-event-form');
    if (createEventForm) {
        createEventForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const venue = document.getElementById('venue').value;
            const description = document.getElementById('description').value;

            if (!title || !date || !time || !venue || !description) {
                alert('Please fill in all fields.');
                return;
            }

            const events = JSON.parse(localStorage.getItem('events')) || [];

            const conflict = events.some(event => event.date === date && event.time === time);
            if (conflict) {
                alert('An event already exists at the same date and time.');
                return;
            }

            const newEvent = { title, date, time, venue, description };
            events.push(newEvent);

            localStorage.setItem('events', JSON.stringify(events));

            window.location.href = 'events.html';
        });
    }

    const usernameDisplay = document.getElementById('username-display');
    const logoutButton = document.querySelector('.dropdown-content a');

    if (usernameDisplay && logoutButton) {
        const username = localStorage.getItem('username');

        if (username) {
            usernameDisplay.textContent = username;
        } else {
            window.location.href = 'signin.html';
        }

        usernameDisplay.addEventListener('click', function() {
            logoutButton.style.display = logoutButton.style.display === 'block' ? 'none' : 'block';
        });

        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('username');
            window.location.href = 'signin.html';
        });
    }

    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: JSON.parse(localStorage.getItem('events')) || [],
        });
        calendar.render();
    }

    const eventList = document.getElementById('event-list');
    if (eventList) {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event-card');
            eventItem.innerHTML = `
                <h3>${event.title}</h3>
                <p>${event.date} at ${event.time}</p>
                <p>${event.venue}</p>
                <p>${event.description}</p>
            `;
            eventList.appendChild(eventItem);
        });
    }

    const signUpForm = document.getElementById('signup-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            const username = usernameInput.value;
            const password = passwordInput.value;
            
            if (!username.trim() || !password.trim()) {
                alert('Please enter both username and password.');
                return;
            }

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            
            window.location.href = 'index.html';
        });
    }

    const signInForm = document.getElementById('signin-form');
    if (signInForm) {
        signInForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');
            if (username === storedUsername && password === storedPassword) {
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
});
