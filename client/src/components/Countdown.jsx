import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useRef } from "react";
// import thirdText from "/guess.png";
// import firstText from "/ready.png";
// import secondText from "/set.png";

const Countdown = ({ onComplete }) => {
  const firstTextRef = useRef();
  // const secondTextRef = useRef();
  // const thirdTextRef = useRef();

  useGSAP(() => {
    const timeline = gsap.timeline({ onComplete });
    timeline.to(firstTextRef.current, {
      y: 100,
      duration: 2,
      yoyoEase: "sine.out",
      repeat: 1,
    });
  }, [onComplete]);

  return (
    <div>
      <img
        ref={firstTextRef}
        className="countdownOverlay"
        src="/ready.png"
        alt="'ready' text"
      />
      <img className="countdownOverlay" src="/set.png" alt="'set' text" />
      <img className="countdownOverlay" src="/guess.png" alt="'go!' text" />
    </div>
  );
};

Countdown.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default Countdown;
