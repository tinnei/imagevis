<template>
  <div class="fullScreen">
    <canvas id="canvas"></canvas> 
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: 'BasicScene',
  props: {
    msg: String
  },
  mounted() {
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas'),
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Create axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create texture loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load the image texture
    const texture = textureLoader.load(require('@/assets/wiki_sunflower.jpg'));

    // // Create a grid of cubes based on texture colors
    // const imageData = texture.image;
    // const imgcanvas = document.createElement('imgcanvas');
    // imgcanvas.width = imageData.width;
    // imgcanvas.height = imageData.height;
    // const ctx = imgcanvas.getContext('2d');
    // ctx.drawImage(imageData, 0, 0);
    // const imageDataArray = ctx.getImageData(0, 0, imageData.width, imageData.height).data;

    // const gridSize = 32; // Reduce resolution for better performance
    // const spacing = 0.1;
    // const cubeSize = 0.1;

    // for (let y = 0; y < gridSize; y++) {
    //   for (let x = 0; x < gridSize; x++) {
    //     const pixelX = Math.floor((x / gridSize) * imageData.width);
    //     const pixelY = Math.floor((y / gridSize) * imageData.height);
    //     const pixelIndex = (pixelY * imageData.width + pixelX) * 4;
        
    //     const r = imageDataArray[pixelIndex] / 255;
    //     const g = imageDataArray[pixelIndex + 1] / 255;
    //     const b = imageDataArray[pixelIndex + 2] / 255;
        
    //     // Only create cube if pixel is not too dark
    //     if (r + g + b > 0.3) {
    //       const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    //       const cubeMaterial = new THREE.MeshPhongMaterial({ 
    //         color: new THREE.Color(r, g, b),
    //         specular: 0x111111,
    //         shininess: 30
    //       });
          
    //       const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    //       cube.position.set(
    //         (x - gridSize/2) * (cubeSize + spacing),
    //         (y - gridSize/2) * (cubeSize + spacing),
    //         0
    //       );
    //       scene.add(cube);
    //     }
    //   }
    // }
    
    // Create plane geometry
    const planeGeometry = new THREE.PlaneGeometry(4, 4);
    
    // Create material with the texture
    const planeMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    
    // Create mesh
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    
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
