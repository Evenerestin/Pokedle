/* eslint-disable react/no-unknown-property */
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
// import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Pokeball from "./Pokeball";

const Scene = ({ countdown, showCanvas }) => {
  const [fadeCompleted, setFadeCompleted] = useState(false);
  const spotlightRef = useRef();
  // const [cursorIn, setCursorIn ] = useState(false);

  useGSAP(() => {
    if (!showCanvas) {
      return gsap.to("#threeCanvas", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => setFadeCompleted(true),
      });
    }
  }, [showCanvas]);

  const handleCursorIn = () => {
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        // intensity: 1.5,
        intensity: 50,
        duration: 0.3,
        ease: "power4.out",
      });
    }
    // console.log("in");
  };

  const handleCursorOut = () => {
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        intensity: 0,
        duration: 0.3,
        ease: "power4.in",
      });
    }
    // console.log("out");
  };

  if (fadeCompleted) return null;
  // if (!showCanvas) return null;
  return (
    <Canvas
      id="threeCanvas"
      style={{
        position: "absolute",
        opacity: 1,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#092C50",
        // background: "rgb(20,20,20)",
      }}
    >
      <PerspectiveCamera position={[0, 0, 7]} makeDefault />
      {/* <OrbitControls enableZoom enableRotate /> */}
      <OrbitControls enableZoom={false} enableRotate={false} />
      <ambientLight intensity={3} color={"#004AC9"} />
      <rectAreaLight
        position={[-1.35, 3, -0.3]}
        rotation={[17, -38, 19]}
        color="yellow"
        // color="blue"
        intensity={20}
        height={4}
        width={4}
        castShadow
      />
      <rectAreaLight
        position={[4, 5, 1]}
        rotation={[17, -38, 19]}
        color="red"
        // color="red"
        intensity={10}
        height={2}
        width={2}
        castShadow
      />
      <spotLight
        position={[4, 5, 1]}
        rotation={[17, -38, 19]}
        color="white"
        intensity={10}
        castShadow
      />
      <rectAreaLight
        position={[4, -5, 7]}
        rotation={[-31, 51, 1]}
        color="white"
        intensity={25}
        height={2}
        width={2}
        castShadow
      />
      <directionalLight
        color={"white"}
        intensity={5}
        position={[-2, 10, 0]}
        rotation={[17, -38, 19]}
      />
      <directionalLight
        ref={spotlightRef}
        // color={"white"}
        color={"blue"}
        position={[0, -10, 10]}
        rotation={[-Math.PI / 18, 0, 0]}
        intensity={0}
      />
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshPhongMaterial color="#092C50" />
      </mesh> */}

      {/* <directionalLight
        color={"yellow"}
        position={[0, 0, 10]}
        rotation={[-Math.PI / 9, 0, 0]}
        intensity={5}
      /> */}

      <Pokeball
        countdown={countdown}
        handleCursorIn={handleCursorIn}
        handleCursorOut={handleCursorOut}
      />

      <EffectComposer>
        <Bloom intensity={0.4} />
      </EffectComposer>
    </Canvas>
  );
};

Scene.propTypes = {
  countdown: PropTypes.func.isRequired,
  showCanvas: PropTypes.bool.isRequired,
};

export default Scene;
