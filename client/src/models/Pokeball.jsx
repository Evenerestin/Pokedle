/* eslint-disable react/no-unknown-property */
// import { useFrame } from "@react-three/fiber";
// import { Select } from '@react-three/postprocessing'
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useState } from "react";
import * as THREE from "three";
import idleAnimation from "../animations/Idle.js";

gsap.registerPlugin(useGSAP);

const Pokeball = () => {
  const [isOpen, setIsOpen] = useState(false);

  const topHalfRef = useRef();
  const bottomHalfRef = useRef();
  const lightRef = useRef();
  const buttonRef = useRef();
  const pokeballRef = useRef();
  const innerSphereRef = useRef();

  const { nodes, materials } = useGLTF("/pokeball4.glb");

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("innerBackground.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const handleButtonClick = () => {
    // gsap.to(buttonRef.current.position, {
    //   z: 2.65,
    //   duration: 0.4,
    //   ease: "expo.in",
    // });
    setIsOpen(true);
  };

  useGSAP(() => {
    const timeline = gsap.timeline({
      defaults: { duration: 2, ease: "power2.out" },
    });

    if (isOpen) {
      const textureTimeline = gsap.timeline({ repeat: -1 });
      textureTimeline.to(texture.offset, {
        y: "+=1", // Adjust this to set the scroll speed
        duration: 5, // Set duration for one full scroll
        ease: "linear",
      });

      timeline.add(textureTimeline, "<");

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
          duration: 2,
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
      gsap.from(innerSphereRef.current.scale, {
        x: 0.01,
        y: 0.01,
        z: 0.01,
        duration: 2,
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
      return;
    }

    // pokeball throw
    timeline
      .from(pokeballRef.current.position, { z: -10, duration: 2.5 })
      .from(pokeballRef.current.scale, { x: 0, y: 0, z: 0 }, "<")
      .from(
        pokeballRef.current.position,
        { y: 4, ease: "bounce.out" },
        "<+=0.5"
      )
      .from(
        pokeballRef.current.rotation,
        {
          x: -Math.PI / 2,
          y: -Math.PI / 5,
          z: -Math.PI / 12,
          ease: "sine.out",
        },
        "<"
      )
      .to(
        pokeballRef.current.rotation,
        { x: Math.PI / 18, ease: "back.out" },
        "<+=1"
      );
    // timeline
    //   .to(pokeballRef.current.position, { z: 0, duration: 2.5 })
    //   .to(pokeballRef.current.scale, { x: 2, y: 2, z: 2 }, "<")
    //   .to(pokeballRef.current.position, { y: 0, ease: "bounce.out" }, "<+=0.5")
    //   .to(
    //     pokeballRef.current.rotation,
    //     { x: -Math.PI / 18, y: 0, z: -Math.PI / 12, ease: "ease" },
    //     "<"
    //   )
    //   .to(
    //     pokeballRef.current.rotation,
    //     { x: Math.PI / 18, ease: "back.out" },
    //     "<+=1"
    //   );

    // timeline.add(idleAnimation(pokeballRef.current));
    const idleTimeline = gsap.timeline({ repeat: -1 });
    idleTimeline.add(idleAnimation(pokeballRef.current));
    timeline.add(idleTimeline);

    // light pulse
    gsap.to(lightRef.current.material, {
      emissiveIntensity: 10,
      duration: 1.5,
      repeat: -1,
      yoyoEase: true,
      ease: "power2.inOut",
      delay: "3",
    });
  }, [pokeballRef.current, isOpen]);

  return (
    <group
      ref={pokeballRef}
      // position={[0, 4, -10]}
      // rotation={[-Math.PI / 6, -Math.PI / 4, 0]}
      // scale={0.1}
      position={[0, 0, 0]}
      rotation={[Math.PI / 18, 0, -Math.PI / 12]}
      scale={2}
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
            ref={lightRef}
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            // material={materials.Light}
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
      <mesh ref={innerSphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};

export default Pokeball;
