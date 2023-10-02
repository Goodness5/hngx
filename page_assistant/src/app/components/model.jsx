import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import { Html } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D"; //Object3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; //Animation types

const Model = () => {
  /* Refs */
  const groupRef = useRef();
  const actionsRef = useRef();

  /* State */
  const [model, setModel] = useState(null);
  const [animation, setAnimation] = useState(null);

  /* Mixer */
  const mixer = new THREE.AnimationMixer(null);

  /* Load model */
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");
      setModel(nodes[0]);
      setAnimation(animations);
    });
  }, []);

  /* Set animation */
  useEffect(() => {
    if (animation && typeof groupRef.current !== "undefined") {
      actionsRef.current = {
        idle: mixer.clipAction(animation[0], groupRef.current),
      };
      actionsRef.current.idle.play();
      return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    }
  }, [animation]);

  /* Animation update */
  useFrame((_, delta) => mixer.update(delta));

  /* Rotation */
  useFrame(() => {
    if (typeof groupRef.current !== "undefined")
      return (groupRef.current.rotation.y += 0.01);
  });

  return (
    <>
      {model ? (
        <group ref={groupRef} position={[0, -150, 0]} dispose={null}>
          <primitive ref={groupRef} name="Object_0" object={model} />
        </group>
      ) : (
        <Html>Loading...</Html>
      )}
    </>
  );
};

export default Model;
