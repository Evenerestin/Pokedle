/* eslint-disable react/no-unknown-property */
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import PropTypes from "prop-types";
// import { useState } from "react";
// import * as THREE from "three";
import Pokeball from "./Pokeball";

const Scene = ({ toggleOverlay, countdown, showCanvas }) => {
  // const [showCanvas, setShowCanvas] = useState(true);
  // const handleAnimationStart = () => {
  //   countdown();
  // };

  const handleAnimationComplete = () => {
    toggleOverlay();
    // setShowCanvas(false);
  };

  if (!showCanvas) return null;
  return (
    <Canvas
      style={{
        position: "absolute",
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
      <ambientLight intensity={0.15} color={"blue"} />
      <rectAreaLight
        position={[-1.35, 3, -0.3]}
        rotation={[17, -38, 19]}
        color="yellow"
        intensity={20}
        height={4}
        width={4}
        castShadow
      />
      <rectAreaLight
        position={[4, 5, 1]}
        rotation={[17, -38, 19]}
        color="blue"
        intensity={100}
        height={2}
        width={2}
        castShadow
      />
      <spotLight
        position={[4, 5, 1]}
        rotation={[17, -38, 19]}
        color="blue"
        intensity={100}
        castShadow
      />
      <rectAreaLight
        position={[4, -5, 7]}
        rotation={[-31, 51, 1]}
        color="blue"
        intensity={60}
        height={2}
        width={2}
        castShadow
      />
      <directionalLight
        color={"white"}
        position={[-2.35, 3, 2]}
        rotation={[17, -38, 19]}
      />

      <Pokeball
        onAnimationComplete={handleAnimationComplete}
        // onAnimationStart={handleAnimationStart}
        countdown={countdown}
      />

      <EffectComposer>
        <Bloom intensity={0.2} />
      </EffectComposer>
    </Canvas>
  );
};

Scene.propTypes = {
  toggleOverlay: PropTypes.func.isRequired,
  countdown: PropTypes.func.isRequired,
  showCanvas: PropTypes.bool.isRequired,
};

export default Scene;
