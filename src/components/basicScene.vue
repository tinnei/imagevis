<template>
  <div class="fullScreen">
    <DataPanel />
    <canvas id="canvas"></canvas> 
    <ControlPanel />
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ControlPanel from './controlPanel.vue';
import DataPanel from './dataPanel.vue';
import Stats from 'stats.js';

// REFACTOR: move these functions into a separate file
// Function to read pixel data from ImageData
function getPixelColor(imageData, x, y) {
  const { width, data } = imageData;
  const index = (y * width + x) * 4;
  
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3]
  };
}

// Function to create planes with colors from image
async function createColoredPlanes(scene, imgSrc) {
  try {
    console.log("I'm here----[createColoredPlanes]");
    const img = new Image();
    img.src = imgSrc;
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const { width, height } = imageData;
    
    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixel = getPixelColor(imageData, x, y);
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(pixel.r/255, pixel.g/255, pixel.b/255),
          side: THREE.FrontSide,
        });
        
        const plane = new THREE.Mesh(geometry, material);
        plane.position.set(x - width/2, -y + height/2, 0);
        scene.add(plane);
      }
    }
  } catch (error) {
    console.error('Error loading image:', error);
  }
}

// scene need to be accessible from the control panels
// should the scene be a prop? or a store? 
export default {
  name: 'BasicScene',
  props: {
    msg: String
  },
  components: {
    ControlPanel,
    DataPanel
  },
  data() {
    return {
      isPerspectiveView: true,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      stats: null
    }
  },
  mounted() {
    // Create scene
    const scene = new THREE.Scene();

    // Set up camera position to view all cubes
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
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

    // Add stats.js
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.dom.style.left = 'auto';
    stats.dom.style.right = '0px';

    // REFACTOR: display sample image - this should be triggered by button intead
    createColoredPlanes(scene, require("@/assets/data/sample/24p.png"));
    
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
      stats.update();
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle keyboard events for camera switching
    window.addEventListener('keydown', (event) => {
      switch(event.key) {
        case '1':
          camera.position.set(0, 0, 20);
          camera.lookAt(0, 0, 0);
          break;
        case '2':
          camera.position.set(20, 0, 20);
          camera.lookAt(0, 0, 0);
          break;
      }
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
