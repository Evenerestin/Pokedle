import gsap from "gsap";

function swing(target) {
  return gsap
    .timeline()
    .to(target.position, {
      x: "-=0.7",
      ease: "back.outIn",
      yoyo: true,
      duration: 0.4,
    })
    .to(
        target.rotation,
      {
        z: Math.PI / 9,
        x: "-=0.25",
        ease: "power1.out",
        duration: 0.4,
    },
    "<"
)
.to(target.position, {
      x: "+=1.3",
      ease: "back.outIn",
      yoyo: true,
      duration: 0.5,
    })
    .to(
        target.rotation,
        {
        z: -Math.PI / 6,
        x: "+=0.3",
        ease: "power1.out",
        yoyo: true,
        duration: 0.5,
    },
    "<"
)
.to(target.rotation, {
    x: "-=0.1",
    z: -Math.PI / 18,
    ease: "back.out",
    duration: 2.5,
})
.to(target.position, { x: 0, ease: "back.out", duration: 2.5 }, "<");
}

function bounce(target) {
    return gsap
    .timeline()
    .to(target.position, { y: "+=0.05", duration: 0.5, ease: "expo.out" })
    .to(
        target.rotation,
        {
            z: "-=0.05",
            duration: 0.25,
            ease: "expo.in",
            yoyoEase: true,
            repeat: 1,
        },
        "<"
    )
    .to(target.position, { y: "-=0.05", duration: 0.5, ease: "bounce.out" });
}

function bounceReversed(target) {
    return gsap
    .timeline()
    .to(target.position, { y: "+=0.05", duration: 0.5, ease: "expo.out" })
    .to(
        target.rotation,
        {
            z: "+=0.05",
            duration: 0.25,
            ease: "expo.in",
            yoyoEase: true,
            repeat: 1,
        },
        "<"
    )
    .to(target.position, { y: "-=0.05", duration: 0.5, ease: "bounce.out" });
}


export function idleTween(target) {
  const sequence = gsap.timeline({ defaults: "+=3" });
  sequence
    .add(swing(target), "+=3")
    .add(bounce(target), "+=3")
    .add(bounceReversed(target), "+=3")
    .add(bounce(target), "+=3")
    .add(
      gsap.to(
        target.position,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: "back.inOut",
        },
        "+=1"
      )
    )
    .add(
      gsap.to(
        target.rotation,
        {
          x: Math.PI / 18,
          y: 0,
          z: -Math.PI / 12,
          duration: 1.5,
          ease: "back.inOut",
        },
        "<"
      )
    );

  return sequence;
}