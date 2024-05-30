gsap.registerPlugin(Draggable);

Draggable.create("[gsap-drag='draggable']", {
 type: "x,y",
 edgeResistance: 0.65,
 bounds: "[gsap-drag='container']",
 inertia: true,
 onDrag: function() {
  console.log("Dragging");
 },
 onDragEnd: function() {
  console.log("Drag Ended");
 }
});