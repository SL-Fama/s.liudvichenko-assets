document.addEventListener('DOMContentLoaded', function () {
    // Input fields
    const emailInput = document.querySelector('[chat-form="client-email-input"]');
    const nameInput = document.querySelector('[chat-form="client-name-input"]');
    const descriptionInput = document.querySelector('[chat-form="client-project-description-input"]');

    // Buttons inside wrappers
    const emailWrapper = document.querySelector('[chat-form="client-email-input"]').parentElement;
    const nameWrapper = document.querySelector('[chat-form="client-name-input"]').parentElement;
    const descriptionWrapper = document.querySelector('[chat-form="client-project-description-input"]').parentElement;

    // Corresponding span fields
    const emailSpan = document.querySelector('[chat-form="client-email-message"]');
    const nameSpan = document.querySelectorAll('[chat-form="client-name-message"]'); // Multiple spans
    const descriptionSpan = document.querySelector('[chat-form="client-project-description-message"]');

    // Email validation function
    function validateEmail(email) {
        return email.includes('@') && email.includes('.');
    }

    // Generic function to handle button swap
    function toggleButton(wrapper, isValid) {
        const disabledButton = wrapper.querySelector('.message--button--disabled');
        const regularButton = wrapper.querySelector('.message--button');
        if (isValid) {
            disabledButton.style.display = 'none';
            regularButton.style.display = 'block';
        } else {
            disabledButton.style.display = 'block';
            regularButton.style.display = 'none';
        }
    }

    // Update span content and validate email
    emailInput.addEventListener('input', function () {
        const email = emailInput.value;
        emailSpan.textContent = email; // Update chat span
        toggleButton(emailWrapper, validateEmail(email)); // Toggle buttons
    });

    // Update span content and validate name (not empty)
    nameInput.addEventListener('input', function () {
        const name = nameInput.value;
        nameSpan.forEach(span => {
            span.textContent = name; // Update all chat spans
        });
        toggleButton(nameWrapper, name.length > 0); // Toggle buttons
    });

    // Update span content and validate project description (not empty)
    descriptionInput.addEventListener('input', function () {
        const description = descriptionInput.value;
        descriptionSpan.textContent = description; // Update chat span
        toggleButton(descriptionWrapper, description.length > 0); // Toggle buttons
    });
});
