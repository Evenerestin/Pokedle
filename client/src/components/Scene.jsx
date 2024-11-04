/* eslint-disable react/no-unknown-property */
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useState } from "react";
import * as THREE from "three";
import Pokeball from "../components/Pokeball";

const Scene = () => {
  const [showCanvas, setShowCanvas] = useState(true);
  const handleAnimationComplete = () => {
    setShowCanvas(false);
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
        background: "rgb(20,20,20)",
      }}
    >
      <PerspectiveCamera position={[0, 0, 7]} makeDefault />
      {/* <OrbitControls enableZoom enableRotate /> */}
      <OrbitControls enableZoom={false} enableRotate={false} />
      <ambientLight intensity={0.15} color={"blue"} />
      <rectAreaLight
        position={[-1.35, 3, -0.3]}
        // position={[-1.35, 1.07,-0.4]}
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
      {/* <pointLight
      position={[-4, -3, 5]}
      color="violet"
      intensity={60}
      castShadow
    /> */}
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
      {/* <directionalLight position={[1, 1, 1]} intensity={1} color={"blue"} /> */}
      <Pokeball onAnimationComplete={handleAnimationComplete} />

      <Environment background>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial side={THREE.BackSide} color={"#092C50"} />
        </mesh>
      </Environment>

      <EffectComposer>
        <Bloom intensity={0.2} />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
