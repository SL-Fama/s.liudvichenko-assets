document.addEventListener('DOMContentLoaded', function () {
    // Content-editable fields
    const emailInput = document.querySelector('[chat-form="client-email-input"]');
    const nameInput = document.querySelector('[chat-form="client-name-input"]');
    const descriptionInput = document.querySelector('[chat-form="client-project-description-input"]');

    // Hidden form input fields (using the chat-form attribute)
    const emailHiddenInput = document.querySelector('[chat-form="form-email-input"]');
    const nameHiddenInput = document.querySelector('[chat-form="form-name-input"]');
    const descriptionHiddenInput = document.querySelector('[chat-form="form-project-description-input"]');

    // Span fields for showing real-time values in the chat feed
    const emailSpan = document.querySelector('[chat-form="client-email-message"]');
    const nameSpans = document.querySelectorAll('[chat-form="client-name-message"]');
    const descriptionSpan = document.querySelector('[chat-form="client-project-description-message"]');

    // Validation function for email
    function validateEmail(email) {
        return email.includes('@') && email.includes('.');
    }

    // Generic function to toggle buttons
    function toggleButton(wrapper, isValid) {
        const disabledButton = wrapper.querySelector('.message--button--disabled');
        const regularButton = wrapper.querySelector('.message--button');
        if (isValid) {
            disabledButton.style.display = 'none';
            regularButton.style.display = 'flex';
        } else {
            disabledButton.style.display = 'flex';
            regularButton.style.display = 'none';
        }
    }

    // Update the chat feed and hidden fields for email
    emailInput.addEventListener('input', function () {
        const email = emailInput.textContent.trim();
        emailSpan.textContent = email; // Update chat span
        emailHiddenInput.value = email; // Update hidden form field
        toggleButton(emailInput.closest('[chat-form="input-wrapper"]'), validateEmail(email)); // Toggle buttons
    });

    // Update the chat feed and hidden fields for name
    nameInput.addEventListener('input', function () {
        const name = nameInput.textContent.trim();
        nameSpans.forEach(span => {
            span.textContent = name; // Update all spans in the chat feed
        });
        nameHiddenInput.value = name; // Update hidden form field
        toggleButton(nameInput.closest('[chat-form="input-wrapper"]'), name.length > 0); // Toggle buttons
    });

    // Update the chat feed and hidden fields for project description
    descriptionInput.addEventListener('input', function () {
        const description = descriptionInput.textContent.trim();
        descriptionSpan.textContent = description; // Update chat span
        descriptionHiddenInput.value = description; // Update hidden form field
        toggleButton(descriptionInput.closest('[chat-form="input-wrapper"]'), description.length > 0); // Toggle buttons
    });
});
