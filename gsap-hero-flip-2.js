ScrollTrigger.normalizeScroll({
  allowNestedScroll: true,
  lockAxis: false,
  momentum: self => Math.min(3, self.velocityY / 1000), // dynamically control the duration of the momentum when flick-scrolling
  type: "touch,wheel,pointer", // now the page will be drag-scrollable on desktop because "pointer" is in the list
});
