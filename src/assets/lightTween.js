import gsap from "gsap";

export function lightTween(target) {
  const sequence = gsap.timeline({ repeat: -1 });
  sequence;
  gsap.to(target.material, {
    emissiveIntensity: 50,
    duration: 1.5,
    repeat: -1,
    yoyoEase: true,
    ease: "power2.inOut",
    delay: "1",
  });

  return sequence;
}
