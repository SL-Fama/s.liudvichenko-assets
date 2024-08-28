window.addEventListener("DOMContentLoaded", (event) => {
  // SETUP PLUGINS
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.normalizeScroll(true);
  // SETUP ELEMENTS
  let zoneEl = $("[js-scrollflip-element='zone']"),
    targetEl = $("[js-scrollflip-element='target']"),
    positionEl = $("[js-scrollflip-element='position']");
  // SETUP TIMELINE
  let tl;
  function createTimeline() {
    if (tl) {
      tl.kill();
      gsap.set(targetEl, { clearProps: "all" });
    }
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: positionEl,
        start: "top bottom-=50vh", // Modified this line
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
  // SETUP RESIZE
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
    start: "top bottom-=50vh", // Modified this line
    onEnter: function () {
      // Execute the createTimeline function when positionEl enters the viewport
      createTimeline();
    },
  });
  // Trigger a function when the position element enters back the viewport
  ScrollTrigger.create({
    trigger: positionEl,
    start: "bottom top+=50vh", // Modified this line
    onEnterBack: function () {
      // Execute the createTimeline function when positionEl enters the viewport
      createTimeline();
    },
  });
});
