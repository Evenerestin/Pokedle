import gsap from "gsap";

export function throwTween(target) {
  const sequence = gsap.timeline();
  sequence
    .from(target.position, { z: -10, duration: 2.5, ease: "power2.out" })
    .fromTo(
      target.position,
      { y: 4, duration: 1, ease: "power1.out" },
      { y: 0, duration: 2.5, ease: "bounce.out" },
      "<"
    )
    .from(target.scale, { x: 0, y: 0, z: 0, duration: 1 }, "<")
    .from(
      target.rotation,
      {
        x: -Math.PI * 2.5,
        y: -Math.PI / 5,
        z: Math.PI * 1.5,
        duration: 3,
        ease: "sine.out",
        // ease: "back.out",
      },
      "<"
    )
    .to(target.position, {
      z: "+=0.01",
      duration: 0.5,
      ease: "sine.in",
      yoyo: true,
      repeat: 1,
    }, ">")
    .to(
      target.rotation,
      { x: "+=0.01", duration: 0.5, ease: "sine.in", yoyo: true, repeat: 1 },
      "<"
    );

  return sequence;
}

// import gsap from "gsap";

// export function throwTween() {
//   const sequence = gsap.timeline();

//   return sequence;
// }
