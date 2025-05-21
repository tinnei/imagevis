<template>
  <div class="fullScreen">
    <canvas id="canvas"></canvas> 
    <ControlPanel />
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import ControlPanel from './controlPanel.vue';

// scene need to be accessible from the control panels
// should the scene be a prop? or a store? 

export default {
  name: 'BasicScene',
  props: {
    msg: String
  },
  components: {
    ControlPanel
  },
  mounted() {
    // Create scene
    const scene = new THREE.Scene();

    // Set up camera position to view all cubes
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // set up renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // set up controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;


    // should be ablee to add objects to the scene from another component,
    // which means scene should be a global object
    
    // Create grid of cubes
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const dataWidth = 10;
    const dataHeight = 10;
    for (let x = -dataWidth / 2; x <= dataWidth / 2; x++) {
      for (let y = -dataHeight / 2; y <= dataHeight / 2; y++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, 0);
        scene.add(cube);
      }
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
</script>

<style scoped>
.fullScreen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
