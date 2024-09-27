window.addEventListener("DOMContentLoaded", (event) => {
  // SETUP PLUGINS
  gsap.registerPlugin(ScrollTrigger, Flip);

  // SCOPED NORMALIZATION: Target sections using a custom attribute
  ScrollTrigger.normalizeScroll({
    // Target only elements that have gsap-scroll-normalize="true" attribute
    targets: "[gsap-scroll-normalize='true']"
  });

  // SETUP ELEMENTS
  let zoneEl = $("[js-scrollflip-element='zone']"),
      targetEl = $("[js-scrollflip-element='target']"),
      positionEl = $("[js-scrollflip-element='position']");

  // SETUP TIMELINE
  let tl;
  function createTimeline() {
    if (tl) {
      tl.kill(); // Kill the previous timeline if it exists
      gsap.set(targetEl, { clearProps: "all" }); // Clear any applied properties
    }

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: positionEl,
        start: "top bottom+=20%",
        endTrigger: positionEl,
        end: "top+=50% bottom",
        scrub: true
      }
    });

    zoneEl.each(function (index) {
      let nextZoneEl = zoneEl.eq(index + 1);
      if (nextZoneEl.length) {
        let nextZoneDistance =
          nextZoneEl.offset().top + nextZoneEl.innerHeight() / 2;
        let thisZoneDistance = $(this).offset().top + $(this).innerHeight() / 2;
        let zoneDifference = nextZoneDistance - thisZoneDistance;

        tl.add(
          Flip.fit(targetEl[0], nextZoneEl[0], {
            duration: zoneDifference,
            ease: "power2.inOut"
          })
        );
      }
    });
  }

  createTimeline();

  // SETUP RESIZE HANDLER
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      createTimeline();
    }, 250);
  });

  // Trigger a function when the position element enters the viewport
  ScrollTrigger.create({
    trigger: positionEl,
    start: "top bottom+=20%",
    onEnter: function () {
      // Execute the createTimeline function when positionEl enters the viewport
      createTimeline();
    },
  });

  // Trigger a function when the position element enters back into the viewport
  ScrollTrigger.create({
    trigger: positionEl,
    start: "bottom top-=20%",
    onEnterBack: function () {
      // Execute the createTimeline function when positionEl enters the viewport
      createTimeline();
    },
  });

  // FIX FOR CHAT-FEED SCROLLING
  const chatFeed = document.querySelector('.chat-feed');
  
  // Function to keep the chat-feed scrolled to the bottom
  function scrollToBottom() {
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  // Add a message and scroll to the bottom after the message is added
  document.getElementById('add-message').addEventListener('click', function () {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.textContent = 'New message';
    chatFeed.appendChild(newMessage);
    
    // Scroll to the bottom after adding new message
    scrollToBottom();
  });

  // Initial scroll to bottom if content overflows
  scrollToBottom();
});
