import React, { useEffect } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
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

    let mixer;
    let modelReady = false;

    // Load our FBX model from the directory
    const loader = new FBXLoader();
    loader.load('Walking.fbx', function (object) {
      // Scale and position the model
      object.scale.set(0.007, 0.007, 0.007);
      object.position.set(0, 0, 0);

      // Start the default animation
      mixer = new THREE.AnimationMixer(object);
      const action = mixer.clipAction(object.animations[0]);
      action.play();

      // Add it to the scene
      scene.add(object);

      modelReady = true;
    });

    // Add animation routine
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);

      // Call the animate on the object
      if (modelReady) mixer.update(clock.getDelta());

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup on unmount
    return () => {
      container.removeChild(renderer.domElement);
      mixer = null;
      modelReady = false;
    };
  }, []);

  return <div id="canvas" style={{ width: '200px', height: '200px' }} />;
};

export default HumanAnimation;
