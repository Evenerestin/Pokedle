import gsap from "gsap";

export function openTween(outerTarget, upperTarget, lowerTarget) {
  const sequence = gsap.timeline();
  sequence
    .add(centerOut(outerTarget))
    .add(openUpper(upperTarget), "<")
    .add(openLower(lowerTarget), "<");
  return sequence;
}

function openUpper(target) {
  return gsap
    .timeline()
    .to(
      target.position,
      {
        y: "+=0.4",
        // z: "-=0.1",
        duration: 3,
      },
      "<"
    )
    .to(
      target.rotation,
      {
        x: "-=0.4",
        duration: 3,
      },
      "<"
    )
    .to(target.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      delay: 2,
    });
}

function openLower(target) {
  return gsap
    .timeline()
    .to(
      target.position,
      {
        y: "-=0.4",
        z: "-=0.1",
        duration: 3,
      },
      "<"
    )
    .to(
      target.rotation,
      {
        x: "+=0.4",
        duration: 3,
      },
      "<"
    )
    .to(target.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      delay: 2,
    });
}

function centerOut(target) {
  return gsap
    .timeline()
    .to(target.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "back.inOut",
    })
    .to(
      target.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "back.inOut",
      },
      "<"
    )
    .to(target.scale, {
      x: "-=0.3",
      y: "-=0.3",
      z: "-=0.3",
      duration: 1.5,
      ease: "bounce.out",
    });
}
