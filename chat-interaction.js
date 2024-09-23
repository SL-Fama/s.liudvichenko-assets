// Disable body scroll, allow chat container to scroll
function disableBodyScroll() {
    // Prevent scrolling on the body by setting fixed positioning
    document.body.style.overflow = 'hidden';
}

// Enable body scroll by removing the override
function enableBodyScroll() {
    document.body.style.overflow = '';
}

// Attach event listeners for mouse enter/leave to the chat container
const chatContainer = document.querySelector('[chat-scroll="container"]');

// Disable body scroll when the mouse enters the chat container
chatContainer.addEventListener('mouseenter', disableBodyScroll);

// Restore body scroll when the mouse leaves the chat container
chatContainer.addEventListener('mouseleave', enableBodyScroll);

// Function to scroll the chat container to the bottom
function scrollToBottom() {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'  // Smooth scrolling effect
    });
}

// Attach click event to the button with chat-scroll="reset"
document.querySelector('[chat-scroll="reset"]').addEventListener('click', scrollToBottom);
