import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useRef } from "react";
import thirdText from "/guess.png";
import firstText from "/ready.png";
import secondText from "/set.png";

const TextCount = ({ onComplete }) => {
  const firstTextRef = useRef();
  const secondTextRef = useRef();
  const thirdTextRef = useRef();

  useGSAP(() => {
    const timeline = gsap.timeline({ onComplete });

    // Sequential animations for each image
    timeline
      .to(firstText.current, {
        opacity: 1,
        y: 0, // if you want to animate from an offset, set the initial y in CSS
        duration: 1,
      })
      .to(firstText.current, {
        opacity: 0,
        duration: 1,
        delay: 1,
      })
      .to(
        secondText.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .to(secondText.current, {
        opacity: 0,
        duration: 1,
        delay: 1,
      })
      .to(
        thirdText.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .to(thirdText.current, {
        opacity: 0,
        duration: 1,
        delay: 1,
      });
  }, [onComplete]);

  return (
    <div>
      <img ref={firstTextRef} src="" alt="'ready' text" />
      <img ref={secondTextRef} src="" alt="'set' text" />
      <img ref={thirdTextRef} src="" alt="'go!' text" />
    </div>
  );
};

TextCount.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default TextCount;
