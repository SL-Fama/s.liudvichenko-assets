// Function to disable body scrolling
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
}

// Function to restore body scrolling
function enableBodyScroll() {
    document.body.style.overflow = '';
}

// Add event listeners to the chat container
const chatContainer = document.querySelector('[chat-scroll="container"]');

// Disable body scroll when mouse is over the chat container
chatContainer.addEventListener('mouseenter', disableBodyScroll);

// Enable body scroll when the mouse leaves the chat container
chatContainer.addEventListener('mouseleave', enableBodyScroll);

// Scroll to bottom functionality
function scrollToBottom() {
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
}

// Attach click event to the button with chat-scroll="reset"
document.querySelector('[chat-scroll="reset"]').addEventListener('click', scrollToBottom);
