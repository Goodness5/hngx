import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const HumanAnimation = () => {
  useEffect(() => {
    // Create Scene
    const scene = new THREE.Scene();
    scene.background = null;
    scene.add(new THREE.AxesHelper(5));

    // Add a light
    const light = new THREE.PointLight(0xffffff, 1000);
    light.position.set(2.5, 7.5, 15);
    scene.add(light);

    // Add a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0.8, 1.4, 1.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(200, 200);

    const container = document.getElementById('canvas');
    container.appendChild(renderer.domElement);

    // Add the orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load('../blue-smurf-cat.glb', (gltf) => {
      gltf.scene.scale.set(0.007, 0.007, 0.007);
      gltf.scene.position.set(0, 0, 0);
      scene.add(gltf.scene);
    });

    // Add animation routine
    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup on unmount
    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div id="canvas" style={{ width: '200px', height: '200px', backgroundColor: "transparent" }} />;
};

export default HumanAnimation;
