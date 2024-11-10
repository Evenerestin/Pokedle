import gsap from "gsap";

export function textTween(target) {
  const sequence = gsap.timeline();
  sequence.to(target, {
    y: -700,
    duration: 1,
    // yoyoEase: "power4.out",
    yoyoEase: "back.in",
    repeat: 1,
  });

  return sequence;
}
