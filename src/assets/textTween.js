import gsap from "gsap";

export function textTween(target, heighValue) {
  const sequence = gsap.timeline();
  sequence
    .to(target, {
      bottom: "50%",
      height: `${heighValue}%`,
      duration: 1,
      yoyoEase: "back.in",
      repeat: 1,
    })
    .to(
      target,
      {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        yoyoEase: "power4.in",
        repeat: 1,
      },
      "<"
    );

  return sequence;
}
