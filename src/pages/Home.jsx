import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useState } from "react";
import { textTween } from "../assets/textTween";
import Form from "../components/Form";
import Scene from "../components/Scene";
import "../css/home.css";
import { usePokemon } from "../hooks/usePokemon";

const Home = () => {
  const { pokemon, loading, fetchRandomPokemon } = usePokemon();
  const [countdownHasRun, setCountdownHasRun] = useState(false);
  const [showCanvas, setShowCanvas] = useState(true);
  // const [fadeCompleted, setFadeCompleted] = useState(false);
  const [guessed, setGuessed] = useState(false);

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  const onGuess = useCallback((guessId) => {
    if (guessId && guessId === pokemon.id) setGuessed(true);
  });

  const countdown = useCallback(() => {
    if (countdownHasRun) return;
    const countdownTimeline = gsap.timeline({
      onComplete: () => {
        setShowCanvas(false);
      },
    });
    countdownTimeline.add(textTween("#first", 20), "+=1.5");
    countdownTimeline.add(textTween("#second", 20));
    countdownTimeline.add(textTween("#third", 30));
    setCountdownHasRun(true);
    return countdownTimeline;
  }, [countdownHasRun]);

  useGSAP(() => {
    if (!showCanvas) {
      const titleElement = document.querySelector("#title");
      gsap.fromTo(
        titleElement,
        {
          rotate: -720,
          translateX: "-50%",
          duration: 1,
          ease: "power4.out",
        },
        {
          translateX: "-50%",
        }
      );
      gsap.from(titleElement, {
        height: "5vh",
        duration: 0.8,
        ease: "back.out",
      });
      gsap.from(titleElement, {
        opacity: 0,
        duration: 0.5,
        ease: "sine.out",
        // onComplete: () => {
        //   gsap.delayedCall(0.5, () => {
        //     titleElement.classList.add("animateHover");
        //   });
        // },
        // onComplete: () => {
        //   titleElement.classList.add("animateHover");
        // },
      });
    }
  }, [showCanvas]);

  return (
    <div id="home">
      {/* <video autoPlay muted loop>
        <source src="/template.mp4" type="video/mp4" />
      </video> */}
      {!showCanvas && (
        <div className="mainContainer flex">
          <div className="imageContainer gridCenter">
            <img
              id="pokemonImage"
              className={guessed ? "" : "notGuessed"}
              // src={pokemonImage}
              // src={pokemon.sprites.front_default}
              src={pokemon.sprites.other.dream_world.front_default}
              alt="Pokemon image"
            />
          </div>
          <div className="formContainer flexColumn">
            <img id="title" src="/title.png" alt="Pokedle" />
            <Form onGuess={onGuess} />
          </div>
        </div>
      )}
      <Scene countdown={countdown} showCanvas={showCanvas} />
      {/* <div className="countdownContainer"> */}
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
    // </div>
  );
};

export default Home;
