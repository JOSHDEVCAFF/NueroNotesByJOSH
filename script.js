document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.btn-toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the .person-card parent of the button
            const personCard = button.closest('.person-card');
            if (!personCard) {
                console.error('Could not find parent .person-card for button:', button);
                return;
            }

            // Get the ID of the content to toggle from the button's aria-controls attribute
            const contentId = button.getAttribute('aria-controls');
            if (!contentId) {
                console.error('Button is missing aria-controls attribute:', button);
                return;
            }

            // Find the .person-details-content element by its ID
            const detailsContent = document.getElementById(contentId);

            if (!detailsContent) {
                console.error('Could not find details content with ID:', contentId);
                return;
            }

            // Ensure the detailsContent is a child of the current personCard,
            // to prevent a button from one card affecting another if IDs were misused.
            if (!personCard.contains(detailsContent)) {
                console.error('Details content is not within the same card as the button.');
                return;
            }

            // Toggle the 'active' class on the details content
            const isActive = detailsContent.classList.toggle('active');

            // Update ARIA attribute for accessibility
            button.setAttribute('aria-expanded', isActive);

            // Change button text (optional, but good UX)
            if (isActive) {
                // You might want to customize this text based on the button's original text
                if (button.textContent.includes('ChatGPT')) {
                    button.textContent = 'Show less about ChatGPT';
                } else if (button.textContent.includes('Game')) {
                    button.textContent = 'Hide Game Details';
                } else {
                    button.textContent = 'Show less';
                }
            } else {
                // Restore original text (this is a simple way, might need refinement for multiple button types)
                if (button.getAttribute('aria-controls') === 'chatgpt-details') {
                    button.textContent = 'Read more about ChatGPT';
                } else if (button.getAttribute('aria-controls') === 'game-details') {
                    button.textContent = 'View Game Details';
                } else {
                     button.textContent = 'Read More'; // A generic fallback
                }
            }
        });
    });
});

// In script.js

// --- Code for "Read More" buttons (you already have this) ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.btn-toggle-details');
    // ... (your existing code for .btn-toggle-details) ...
});


// --- Code for Mobile Menu Toggle (Add this or ensure it's correct) ---
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#nav-menu'); // Ensure your <ul> has id="nav-menu"

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active'); // This is the key part for showing/hiding
        });
    } else {
        if (!menuToggle) console.error("Mobile menu toggle button (.menu-toggle) not found.");
        if (!navMenu) console.error("Mobile navigation menu (#nav-menu) not found.");
    }
});
// --- Code for Navigation Dropdown Toggle ---
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const dropdownLi = toggle.parentElement; // Get the parent <li>
            
            if (dropdownLi && dropdownLi.classList.contains('dropdown')) {
                dropdownLi.classList.toggle('open');
            }
        });
    });

    // Optional: Close dropdown if clicking outside of it
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown.open').forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('open');
            }
        });
    });