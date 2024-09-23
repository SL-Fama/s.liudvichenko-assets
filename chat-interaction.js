// Function to scroll the chat container to the bottom
function scrollToBottom() {
    const chatContainer = document.querySelector('[chat-scroll="container"]');
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth' // Smooth scrolling to the bottom
    });
}

// Attach click event to the button with chat-scroll="reset"
document.querySelector('[chat-scroll="reset"]').addEventListener('click', scrollToBottom);
