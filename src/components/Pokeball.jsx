/* eslint-disable react/no-unknown-property */
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";
import { createPokeballTimeline } from "../assets/pokeballTween";

const Pokeball = ({ countdown, handleCursorIn, handleCursorOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const topHalfRef = useRef();
  const lightHoopRef = useRef();
  const bottomHalfRef = useRef();
  const buttonRef = useRef();
  const pokeballRef = useRef();
  const innerSphereRef = useRef();

  const { nodes, materials } = useGLTF("/pokeball4.glb");

  useGSAP(
    () =>
      createPokeballTimeline(
        pokeballRef,
        topHalfRef,
        bottomHalfRef,
        lightHoopRef,
        buttonRef,
        innerSphereRef,
        isOpen,
        countdown
      ),
    [isOpen]
  );

  return (
    <group
      ref={pokeballRef}
      position={[0, 0, 0]}
      rotation={[Math.PI / 8, 0, -Math.PI / 12]}
      scale={2.2}
      castShadow
      receiveShadow
    >
      <group ref={topHalfRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials.Metal}
          position={[0, 0, -0.973]}
          scale={0.744}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials.White}
            position={[0, 0, 2.838]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.32}
          />
          <mesh
            ref={lightHoopRef}
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: "white",
                emissive: "green",
                emissiveIntensity: 0,
              })
            }
            position={[0, 0, 2.85]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.25}
          />
          <mesh
            ref={buttonRef}
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003.geometry}
            material={materials.Metal}
            position={[0, 0, 2.72]}
            // position={[0, 0, 2.65]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.25}
            // onClick={handleButtonClick}
            onClick={() => {
              setIsOpen(true);
            }}
            onPointerOver={() => {
              document.body.style.cursor = "pointer";
              handleCursorIn();
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              isOpen ? "" : handleCursorOut();
            }}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={materials.Red}
            position={[0, 0, 1.309]}
            scale={1.345}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere003.geometry}
            material={materials.Black}
            // position={[0, -0.019, 1.309]}
            position={[0, -0.019, 1.315]}
            scale={1.235}
          />
        </mesh>
      </group>
      <group ref={bottomHalfRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.White}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials.Black}
          position={[0, 0.009, 0.01]}
          scale={0.918}
        />
      </group>
      <mesh ref={innerSphereRef} scale={[0, 0, 0]} position={[0, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color={"#FFF2BC"}
          emissive={new THREE.Color("yellow")}
          emissiveIntensity={5}
          side={THREE.DoubleSide}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

Pokeball.propTypes = {
  countdown: PropTypes.func.isRequired,
  handleCursorIn: PropTypes.func.isRequired,
  handleCursorOut: PropTypes.func.isRequired,
};

export default Pokeball;
