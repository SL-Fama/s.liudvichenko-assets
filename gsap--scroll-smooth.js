// Import necessary GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create a wrapper around your content
  const contentWrapper = document.querySelector("#smooth-content");
  
  // If the content wrapper doesn't exist, create it and wrap the body content
  if (!contentWrapper) {
    const wrapper = document.createElement("div");
    wrapper.id = "smooth-content";
    document.body.appendChild(wrapper);
    
    while (document.body.firstChild !== wrapper) {
      wrapper.appendChild(document.body.firstChild);
    }
  }

  // Initialize ScrollSmoother
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5, // Adjust this value to change the smoothness (lower = smoother)
    effects: true, // Enables built-in effects for elements with data-speed and data-lag attributes
    normalizeScroll: true, // Prevents page jumping when browser's native smooth scrolling is enabled
    ignoreMobileResize: true, // Helps avoid issues on mobile devices
  });

  // Optional: Add parallax effect to elements
  gsap.utils.toArray("[data-speed]").forEach(el => {
    const speed = parseFloat(el.getAttribute("data-speed")) || 0;
    
    gsap.to(el, {
      y: (i, target) => (1 - speed) * ScrollTrigger.maxScroll(window),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "max",
        invalidateOnRefresh: true,
        scrub: true
      }
    });
  });
});
