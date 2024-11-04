import gsap from "gsap";

const swingAnimation = (target) => {
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
};

const bounceAnimation = (target) => {
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
};

const bounceAnimationReversed = (target) => {
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
};

const idleAnimation = (target) => {
  const sequenceTimeline = gsap.timeline();

  sequenceTimeline
    .add(swingAnimation(target), "+=3")
    .add(bounceAnimation(target), "+=3")
    .add(bounceAnimationReversed(target), "+=3")
    .add(bounceAnimation(target), "+=3")
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
  // .add(
  //   gsap.to(
  //     target.position,
  //     {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //       duration: 0.5,
  //       ease: "back.inOut",
  //     },
  //     "<"
  //   )
  // );

  return sequenceTimeline;
};

export default idleAnimation;
