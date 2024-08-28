// SETUP PLUGINS
gsap.registerPlugin(ScrollTrigger, Flip);

// Use with caution and test thoroughly
ScrollTrigger.normalizeScroll(true);

// SETUP ELEMENTS
const zoneEl = document.querySelectorAll("[js-scrollflip-element='zone']");
const targetEl = document.querySelector("[js-scrollflip-element='target']");
const positionEl = document.querySelector("[js-scrollflip-element='position']");

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
      start: "top bottom-=20%",
      endTrigger: positionEl,
      end: "top+=50% bottom",
      scrub: true,
      onEnter: createTimeline,
      onEnterBack: createTimeline
    }
  });

  zoneEl.forEach((zone, index) => {
    const nextZone = zoneEl[index + 1];
    if (nextZone) {
      const nextZoneDistance = nextZone.offsetTop + nextZone.offsetHeight / 2;
      const thisZoneDistance = zone.offsetTop + zone.offsetHeight / 2;
      const zoneDifference = nextZoneDistance - thisZoneDistance;

      tl.add(
        Flip.fit(targetEl, nextZone, {
          duration: zoneDifference,
          ease: "power2.inOut"
        })
      );
    }
  });
}

// Initial creation
createTimeline();

// SETUP RESIZE
let resizeRAF;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRAF);
  resizeRAF = requestAnimationFrame(createTimeline);
});
