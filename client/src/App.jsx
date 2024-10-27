/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Selection } from "@react-three/postprocessing";
import Pokeball from "./models/Pokeball";

const App = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas
        shadow
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgb(20,20,20)",
        }}
      >
        {/* <OrbitControls enableZoom enableRotate /> */}
        <OrbitControls enableZoom={false} enableRotate={false} />
        <ambientLight intensity={0.15} color={"#fff"} />
        <rectAreaLight
          position={[-2.35, 3, -0.05]}
          // position={[-1.35, 1.07,-0.4]}
          rotation={[17, -38, 19]}
          color="blue"
          intensity={3}
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
        <pointLight
          position={[-4, -3, 5]}
          color="violet"
          intensity={60}
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
        <pointLight
          position={[-2, 2, -3]}
          color="red"
          intensity={0.5}
          castShadow
        />
        <directionalLight position={[1, 1, 1]} intensity={1} color={"blue"} />
        {/* <hemisphereLight
          intensity={10}
          position={[0, 15, 10]}
          color={"red"}
        /> */}
        <Selection>
          <Pokeball />
        </Selection>

        <EffectComposer>
          <Bloom intensity={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default App;
