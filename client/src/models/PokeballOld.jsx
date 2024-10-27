/* eslint-disable react/no-unknown-property */
// import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


const PokeballOld = () => {
  const topHalfRef = useRef();
  const bottomHalfRef = useRef();
  // const innerSphereRef = useRef();

  // const [isAnimating, setIsAnimating] = useState();

  return (
    <>
      <group ref={topHalfRef} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="red" side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      <group ref={bottomHalfRef} position={[0, 0.4, 0]} rotation={[0, 0, 0]}>
        <mesh>
          <sphereGeometry
            args={[1, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
          />
          <meshStandardMaterial color="white" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

export default PokeballOld;
