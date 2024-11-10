import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useRef } from "react";
import { useCallback, useState } from "react";
// import Countdown from "../components/CountDown";
import { textTween } from "../assets/textTween";
import Scene from "../components/Scene";
import "../css/home.css";

const Home = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [countdownHasRun, setCountdownHasRun] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);

  const toggleOverlay = () => {
    setShowOverlay(true);
  };

  const countdown = useCallback(() => {
    if (countdownHasRun) return;
    const countdownTimeline = gsap.timeline({
      onComplete: () => {
        setShowCanvas(false);
      },
    });
    countdownTimeline.add(textTween("#first"));
    countdownTimeline.add(textTween("#second"), "+=0.5");
    countdownTimeline.add(textTween("#third"), "+=0.5");
    setCountdownHasRun(true);
    return countdownTimeline;
  }, [countdownHasRun]);

  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 2, ease: "power2.out" },
    });
    // masterTimeline.add(countdown());
    // countdown();
    if (showOverlay) {
      masterTimeline
        .add(countdown())
        // const overlayTimeline = gsap.timeline();
        // overlayTimeline
        // .add(countdown())
        // .add(textTween("#first"))
        // .add(textTween("#second"))
        // .add(textTween("#third"))
        .to(".overlay", {
          backgroundColor: "#fff9df",
          duration: 8,
        })
        .from(
          ".overlay",
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 2,
          },
          "<"
        );

      // return () => overlayAnimation.kill();
    }
  }, [showOverlay]);

  return (
    <div id="home">
      <video autoPlay muted loop>
        <source src="/template.mp4" type="video/mp4" />
      </video>
      <img className="title" src="/title.png" alt="Pokedle" />
      <Scene
        toggleOverlay={toggleOverlay}
        countdown={countdown}
        showCanvas={showCanvas}
      />
      {showOverlay && <div className="overlay"></div>}
      {/* <Countdown /> */}

      <img
        id="first"
        className="countdownOverlay"
        src="/ready.png"
        alt="'ready' text"
      />
      <img
        id="second"
        className="countdownOverlay"
        src="/set.png"
        alt="'set' text"
      />
      <img
        id="third"
        className="countdownOverlay"
        src="/guess.png"
        alt="'go!' text"
      />
    </div>
  );
};

export default Home;
