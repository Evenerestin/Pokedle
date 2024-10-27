/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Select } from '@react-three/postprocessing'

const Pokeball = () => {
  const topHalfRef = useRef();
  const bottomHalfRef = useRef();

  const { nodes, materials } = useGLTF("/pokeball4.glb");
  return (
    <>
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
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials.Light}
            // material={new THREE.MeshStandardMaterial({
            //   color: 'white',       
            //   emissive: 'green',     
            //   emissiveIntensity: 7,     
            // })}
            position={[0, 0, 2.85]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.25}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003.geometry}
            material={materials.Metal}
            position={[0, 0, 2.7]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={1.25}
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
            position={[0, -0.019, 1.309]}
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
          position={[0, 0.009, 0]}
          scale={0.918}
        />
      </group>
      {/* <group ref={bottomHalfRef}>
        <mesh geometry={nodes.Sphere.geometry}>
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh geometry={nodes.Sphere001.geometry} scale={0.925}>
          <meshStandardMaterial color="black" side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={topHalfRef}>
        <mesh
          geometry={nodes.Cylinder001.geometry}
          position={[0, 0, -1]}
          scale={0.77}
        >
          <meshStandardMaterial color="grey" />
          <mesh
            castShadow
            geometry={nodes.Cylinder.geometry}
            position={[0, 0, 2.76]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.3}
          >
            <meshStandardMaterial color="white" metalness={0.5} />
          </mesh>
          <mesh
            geometry={nodes.Sphere002.geometry}
            position={[0, 0, 1.3]}
            scale={1.3}
          >
            <meshStandardMaterial color="red" />
          </mesh>
          <mesh
            geometry={nodes.Sphere003.geometry}
            position={[0, 0, 1.3]}
            scale={1.2}
          >
            <meshStandardMaterial color="black" side={THREE.DoubleSide} />
          </mesh>
        </mesh>
      </group> */}
    </>
  );
};

useGLTF.preload("/pokeball4.glb");

export default Pokeball;
