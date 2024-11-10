// src/assets/pokeballTimeline.js
import gsap from "gsap";
import { idleTween } from "./idleTween";
import { lightTween } from "./lightTween";
import { throwTween } from "./throwTween";

// Function to create and return the timeline
export const createPokeballTimeline = (
  pokeballRef,
  topHalfRef,
  bottomHalfRef,
  lightHoopRef,
  buttonRef,
  innerSphereRef,
  isOpen,
  countdown,
  //   onAnimationStart,
  onAnimationComplete
) => {
  const timeline = gsap.timeline({
    defaults: { duration: 2, ease: "power2.out" },
  });

  timeline.add(lightTween(lightHoopRef.current));

  if (isOpen) {
    gsap.to(buttonRef.current.position, {
      z: 2.65,
      duration: 0.4,
      ease: "expo.in",
    });

    gsap.to(pokeballRef.current.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "back.inOut",
    });
    gsap.fromTo(
      pokeballRef.current.rotation,
      {
        x: Math.PI / 8,
        y: 0,
        z: -Math.PI / 12,
      },
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "back.inOut",
      },
      "<"
    );
    gsap.to(pokeballRef.current.scale, {
      x: "-=0.3",
      y: "-=0.3",
      z: "-=0.3",
      duration: 1.5,
      ease: "bounce.out",
    });
    gsap.to(
      topHalfRef.current.position,
      {
        y: "+=0.4",
        duration: 3,
      },
      "+=0.5"
    );
    gsap.to(
      bottomHalfRef.current.position,
      {
        y: "-=0.4",
        z: "-=0.1",
        duration: 3,
      },
      "<"
    );
    gsap.to(
      topHalfRef.current.rotation,
      {
        x: "-=0.4",
        duration: 3,
      },
      "<"
    );
    gsap.to(
      bottomHalfRef.current.rotation,
      {
        x: "+=0.4",
        duration: 3,
      },
      "<"
    );
    gsap.to(
      innerSphereRef.current.scale,
      {
        x: 5,
        y: 5,
        z: 5,
        duration: 3,
        ease: "expo.in",
        onStart: () => countdown(),
        // onStart: onAnimationStart,
      },
      "<"
    );
    gsap.to(topHalfRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1,
      delay: 4,
    });
    gsap.to(
      bottomHalfRef.current.scale,
      {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
      },
      "<"
    );
    gsap.to(innerSphereRef.current.position, {
      z: 5,
      duration: 4,
      delay: 2,
      onComplete: onAnimationComplete,
    });
    gsap.to(innerSphereRef.current.material, {
      opacity: 0,
      duration: 4,
      delay: 2,
      //   onComplete: onAnimationComplete,
    });

    return timeline;
  } else {
    timeline.add(throwTween(pokeballRef.current));
    timeline.add(idleTween(pokeballRef.current).repeat(-1));
  }
};
