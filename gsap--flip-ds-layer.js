window.addEventListener("DOMContentLoaded", (event) => {
  // SETUP PLUGINS
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.normalizeScroll(true);

  // DEBUG FUNCTION
  function debugLog(message) {
    console.log(`%c${message}`, 'background: #222; color: #bada55');
  }

  // SETUP ELEMENTS
  let zoneEl = $("[js-scrollflip-element='zone']"),
    targetEl = $("[js-scrollflip-element='target']"),
    positionEl = $("[js-scrollflip-element='position']");

  // SETUP TIMELINE
  let tl;
  function createTimeline() {
    debugLog("Creating Timeline");
    if (tl) {
      tl.kill();
      gsap.set(targetEl, { clearProps: "all" });
    }
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: positionEl,
        start: "top bottom+=20%",
        endTrigger: positionEl,
        end: "top+=50% bottom",
        scrub: true,
        onEnter: () => debugLog("Main Timeline: onEnter"),
        onLeave: () => debugLog("Main Timeline: onLeave"),
        onEnterBack: () => debugLog("Main Timeline: onEnterBack"),
        onLeaveBack: () => debugLog("Main Timeline: onLeaveBack"),
        onUpdate: (self) => debugLog(`Main Timeline: Progress ${self.progress.toFixed(2)}`)
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
        debugLog(`Added Flip animation for zone ${index + 1}`);
      }
    });
  }
  createTimeline();

  // SETUP RESIZE
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      debugLog("Window Resized - Recreating Timeline");
      createTimeline();
    }, 250);
  });

  // Trigger a function when the position element enters the viewport
  ScrollTrigger.create({
    trigger: positionEl,
    start: "top bottom+=20%",
    onEnter: function () {
      debugLog("Position Element Entered Viewport - Creating Timeline");
      createTimeline();
    },
    markers: true  // This will add visual markers to the trigger points
  });

  // Trigger a function when the position element enters back the viewport
  ScrollTrigger.create({
    trigger: positionEl,
    start: "bottom top+=20%",
    onEnterBack: function () {
      debugLog("Position Element Entered Viewport (backwards) - Creating Timeline");
      createTimeline();
    },
    markers: true  // This will add visual markers to the trigger points
  });

  // DEBUG: Log initial positions
  debugLog(`Position Element Top: ${positionEl.offset().top}`);
  debugLog(`Viewport Height: ${window.innerHeight}`);
  debugLog(`Trigger Point (5vh from bottom): ${window.innerHeight - (window.innerHeight * 0.05)}`);
});
