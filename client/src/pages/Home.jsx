// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Countdown from "../components/CountDown";
import Scene from "../components/Scene";
import "../css/home.css";
// import { throwTween } from "../assets/throwTween";

const Home = () => {
  useGSAP(() => {
    const masterTimeline = gsap.timeline({
      defaults: { duration: 2, ease: "power2.out" },
    });
  });

  return (
    <div id="home">
      <video autoPlay muted loop>
        <source src="/template.mp4" type="video/mp4" />
      </video>
      <img className="title" src="/title.png" alt="Pokedle" />
      <Scene />
      <Countdown />
    </div>
  );
};

export default Home;
