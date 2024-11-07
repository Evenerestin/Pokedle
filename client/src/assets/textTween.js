import gsap from "gsap";

export function textTween(target) {
  const sequence = gsap.timeline();
  sequence
    .to(target.position, {
        y: 100
    })

  return sequence;
}
