// Scroll smoother function
(function() {
    let scrollSpeed = 2; // Default scroll speed

    // Adjust scroll speed
    function setScrollSpeed(speed) {
        scrollSpeed = speed;
    }

    // Smooth scrolling function
    function smoothScroll() {
        const currentScroll = window.scrollY;
        const targetScroll = currentScroll + (scrollDelta * scrollSpeed);
        
        // Scroll the window smoothly to the target position
        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });

        // Reset scroll delta after scrolling
        scrollDelta = 0;
    }

    let scrollDelta = 0;

    // Listen for the scroll event
    window.addEventListener('wheel', function(e) {
        // Prevent the default scroll behavior
        e.preventDefault();

        // Calculate the scroll delta based on wheel event deltaY
        scrollDelta = e.deltaY;

        // Call smooth scroll function
        smoothScroll();
    }, { passive: false });

    // Expose setScrollSpeed function to adjust scroll speed
    window.setScrollSpeed = setScrollSpeed;
})();

// Example usage:
// Adjust scroll speed by calling the setScrollSpeed function
setScrollSpeed(1); // Higher values for faster scroll, lower values for slower scroll
