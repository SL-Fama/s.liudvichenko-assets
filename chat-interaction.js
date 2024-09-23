let previousScrollY; // To store the body scroll position before disabling
let isScrollDisabled = false; // To track whether scroll is disabled

// Function to disable body scrolling
function disableBodyScroll() {
    previousScrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
}

// Function to enable body scrolling
function enableBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';

    window.scrollTo(0, previousScrollY);
}

// Function to disable scrolling within the chat container
function disableContainerScroll() {
    isScrollDisabled = true; // Track that scroll is disabled
    chatContainer.style.pointerEvents = 'none'; // Disable all pointer events (blocks scrolling)
}

// Function to enable scrolling within the chat container
function enableContainerScroll() {
    isScrollDisabled = false;
    chatContainer.style.pointerEvents = ''; // Re-enable pointer events
}

// Add event listeners to the chat container
const chatContainer = document.querySelector('[chat-scroll="container"]');

// Disable body scroll when mouse enters the chat container
chatContainer.addEventListener('mouseenter', disableBodyScroll);

// Enable body scroll when mouse leaves the chat container
chatContainer.addEventListener('mouseleave', enableBodyScroll);

// Function to scroll the chat container to the bottom
function scrollToBottom() {
    if (!isScrollDisabled) {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth' // Smooth scrolling to the bottom
        });
    }
}

// Attach click event to the button with chat-scroll="reset"
document.querySelector('[chat-scroll="reset"]').addEventListener('click', function() {
    scrollToBottom();          // Scroll to the bottom when the button is clicked
    disableContainerScroll();   // Disable scrolling in the container after button click
});

// Re-enable chat container scrolling when the mouse leaves (optional)
chatContainer.addEventListener('mouseleave', enableContainerScroll);
