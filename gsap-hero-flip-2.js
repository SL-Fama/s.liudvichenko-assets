// SCROLL FLIP POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // Attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, Flip);

  // SCOPED NORMALIZATION: Target sections using a custom attribute
  ScrollTrigger.normalizeScroll({
    // Target only elements that have gsap-scroll-normalize="true" attribute
    targets: "[gsap-scroll-normalize='true']"
  });

  // Scrollflip component
  $("[tr-scrollflip-element='component']").each(function (index) {
    let componentEl = $(this),
      originEl = componentEl.find("[tr-scrollflip-element='origin']"),
      targetEl = componentEl.find("[tr-scrollflip-element='target']"),
      scrubStartEl = componentEl.find("[tr-scrollflip-scrubstart]"),
      scrubEndEl = componentEl.find("[tr-scrollflip-scrubend]");
    
    let startSetting = attr("top top", scrubStartEl.attr("tr-scrollflip-scrubstart")),
      endSetting = attr("bottom bottom", scrubEndEl.attr("tr-scrollflip-scrubend")),
      staggerSpeedSetting = attr(0, componentEl.attr("tr-scrollflip-staggerspeed")),
      staggerDirectionSetting = attr("start", componentEl.attr("tr-scrollflip-staggerdirection")),
      scaleSetting = attr(false, componentEl.attr("tr-scrollflip-scale")),
      breakpointSetting = attr(0, componentEl.attr("tr-scrollflip-breakpoint"));

    let componentIndex = index,
      timeline,
      resizeTimer;

    // Assign matching data flip IDs
    originEl.each(function (index) {
      let flipId = `${componentIndex}-${index}`;
      $(this).attr("data-flip-id", flipId);
      targetEl.eq(index).attr("data-flip-id", flipId);
    });

    // Create timeline for animations
    function createTimeline() {
      if (timeline) {
        timeline.kill();
        gsap.set(targetEl, { clearProps: "all" });
      }
      $("body").addClass("scrollflip-relative");
      gsap.matchMedia().add(`(min-width: ${breakpointSetting}px)`, () => {
        const state = Flip.getState(originEl);
        timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scrubStartEl,
            endTrigger: scrubEndEl,
            start: startSetting,
            end: endSetting,
            scrub: true
          }
        });
        timeline.add(Flip.from(state, {
          targets: targetEl,
          scale: scaleSetting,
          stagger: {
            amount: staggerSpeedSetting,
            from: staggerDirectionSetting
          }
        }));
      });
      $("body").removeClass("scrollflip-relative");
    }

    createTimeline();

    // Update timeline on window resize
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        createTimeline();
      }, 250);
    });
  });

  // Fix for chat-feed scroll
  const chatFeed = document.querySelector('.chat-feed');
  
  // Function to keep chat-feed scrolled to the bottom
  function scrollToBottom() {
    chatFeed.scrollTop = chatFeed.scrollHeight;
  }

  // Add new message and scroll to bottom after adding
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
