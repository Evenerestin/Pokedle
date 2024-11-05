// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
import Scene from "../components/Scene";
import "../css/home.css";

const Home = () => {
  return (
    <div id="home">
      <video autoPlay muted loop>
        <source src="/template.mp4" type="video/mp4" />
      </video>
      <img className="title" src="/title.png" alt="Pokedle" />
      <Scene/>
    </div>
  );
};

export default Home;
