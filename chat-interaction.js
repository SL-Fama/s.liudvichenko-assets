let previousScrollY; // To store the body scroll position before disabling

// Function to disable body scrolling
function disableBodyScroll() {
    // Store the current scroll position
    previousScrollY = window.scrollY;

    // Add a fixed position to the body to prevent scrolling, while keeping the page "in place"
    document.body.style.position = 'fixed';
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden'; // Stronger way to prevent scrolling
}

// Function to enable body scrolling (restore original state)
function enableBodyScroll() {
    // Restore body's scroll position and default styling
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';

    // Restore the scroll position to where it was before disabling scroll
    window.scrollTo(0, previousScrollY);
}

// Add event listeners to the chat container
const chatContainer = document.querySelector('[chat-scroll="container"]');

// Disable body scroll when mouse enters the chat container
chatContainer.addEventListener('mouseenter', disableBodyScroll);

// Enable body scroll when mouse leaves the chat container
chatContainer.addEventListener('mouseleave', enableBodyScroll);

// Function to scroll the chat container to the bottom
function scrollToBottom() {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth' // Smooth scrolling to the bottom
    });
}

// Attach click event to the button with chat-scroll="reset"
document.querySelector('[chat-scroll="reset"]').addEventListener('click', scrollToBottom);
