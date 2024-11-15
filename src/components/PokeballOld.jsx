/* eslint-disable react/no-unknown-property */
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import * as THREE from "three";
import { idleTween } from "../assets/idleTween.js";
import { lightTween } from "../assets/lightTween.js";
import { throwTween } from "../assets/throwTween.js";

const Pokeball = ({ onAnimationComplete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const topHalfRef = useRef();
  const bottomHalfRef = useRef();
  const buttonRef = useRef();
  const pokeballRef = useRef();
  const innerSphereRef = useRef();

  const { scene } = useThree();
  const q = (name) => scene.getObjectByName(name);

  const { nodes, materials } = useGLTF("/pokeball4.glb");

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("innerBackground.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.center.set(0.5, 0.5);

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: { duration: 2, ease: "power2.out" },
    });

    timeline.add(lightTween(q("lightHoop")));

    if (isOpen) {
      // timeline.kill(idleTween);
      // timeline.kill();
      gsap.to(buttonRef.current.position, {
        z: 2.65,
        duration: 0.4,
        ease: "expo.in",
      });

      gsap.to(pokeballRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "back.inOut",
      });
      gsap.to(
        pokeballRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.5,
          ease: "back.inOut",
        },
        "<"
      );
      gsap.to(pokeballRef.current.scale, {
        x: "-=0.3",
        y: "-=0.3",
        z: "-=0.3",
        duration: 1.5,
        ease: "bounce.out",
      });
      gsap.to(
        topHalfRef.current.position,
        {
          y: "+=0.4",
          // z: "-=0.1",
          duration: 3,
        },
        "<"
      );
      gsap.to(
        bottomHalfRef.current.position,
        {
          y: "-=0.4",
          z: "-=0.1",
          duration: 3,
        },
        "<"
      );
      gsap.to(
        topHalfRef.current.rotation,
        {
          x: "-=0.4",
          duration: 3,
        },
        "<"
      );
      gsap.to(
        bottomHalfRef.current.rotation,
        {
          x: "+=0.4",
          duration: 3,
        },
        "<"
      );
      gsap.to(
        innerSphereRef.current.scale,
        {
          x: 5,
          y: 5,
          z: 5,
          duration: 3,
          ease: "expo.in",
        },
        "<"
      );
      gsap.to(innerSphereRef.current.position, {
        z: 7,
        duration: 2,
        delay: 2,
      });
      gsap.to(innerSphereRef.current.material, {
        opacity: 0,
        duration: 2,
        delay: 2,
        onComplete: onAnimationComplete,
      });
      // gsap.to(pokeballRef.current.rotation, {
      //   x: 0,
      //   y: 0,
      //   z: 0,
      //   duration: 3,
      // });
      return;
    } else {
      timeline.add(throwTween(pokeballRef.current));
      timeline.add(idleTween(pokeballRef.current).repeat(-1));
    }
  }, [isOpen]);

  return (
    <group
      ref={pokeballRef}
      // rotation={[Math.PI / 18, 0, -Math.PI / 12]}
      position={[0, 0, 0]}
      rotation={[Math.PI / 8, 0, -Math.PI / 12]}
      // rotation={[0, 0, -Math.PI / 12]}
      scale={2}
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
            name="lightHoop"
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
            onClick={handleButtonClick}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
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
          // position={[0, 0.009, 0]}
          position={[0, 0.009, 0.01]}
          scale={0.918}
        />
      </group>
      <mesh ref={innerSphereRef} scale={[0, 0, 0]} position={[0, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
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
  onAnimationComplete: PropTypes.func.isRequired,
};

export default Pokeball;
