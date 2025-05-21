// need to start a whole new scene!


// getColorPixel(context, x, y) {
//     const imageData = context.getImageData(0, 0, x, y).data;
//     const colorArray = [];

//     for (let i = 0; i < imageData.length; i += 8) {
//         const rgbColor = [imageData[i], imageData[i + 1], imageData[i + 2]];
//         colorArray.push(rgbColor);
//     }

//     return colorArray;
// }

// // Create a grid of cubes based on texture colors
// function createGrid(img, scene, cubeSize, spacing) {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = require('@/assets/sunflower_small.png');
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;

//     console.log(img.width, img.height)

//     img.onload = () => {
//         console.log('Image loaded successfully');
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         const imgPixel = this.getColorPixel(ctx, img.width, img.height);
//         console.log(imgPixel)

//         const gridSize = Math.sqrt(imgPixel.length);
//         const spacing = 0.1;
//         const cubeSize = 0.1;

//         for (let i = 0; i < imgPixel.length; i + 2) {

//             const pixel = imgPixel[i];
//             const r = pixel[0] / 255;
//             const g = pixel[1] / 255;
//             const b = pixel[2] / 255;

//             console.log("[" + i + "]" + r + " " + g + " " + b + ", " + (r + g + b))

//             // Calculate x and y position from index
//             const x = i % gridSize;
//             const y = Math.floor(i / gridSize);

//             // Only create cube if pixel is not too dark
//             if (r + g + b > 0) {
//                 console.log("generating...", r, " ", g, " ", b)
//                 const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//                 const cubeMaterial = new THREE.MeshPhongMaterial({
//                     color: new THREE.Color(r, g, b),
//                     specular: 0x111111,
//                     shininess: 30
//                 });

//                 const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//                 cube.position.set(
//                     (x - gridSize / 2) * (cubeSize + spacing),
//                     (y - gridSize / 2) * (cubeSize + spacing),
//                     0
//                 );
//                 scene.add(cube);
//             }
//         }
//     };

//     img.onerror = () => {
//         console.error('Failed to load image');
//     };// Create a grid of cubes based on texture colors
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.src = require('@/assets/sunflower_small.png');
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;

//     console.log(img.width, img.height)

//     img.onload = () => {
//         console.log('Image loaded successfully');
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0, img.width, img.height);

//         const imgPixel = this.getColorPixel(ctx, img.width, img.height);
//         console.log(imgPixel)

//         const gridSize = Math.sqrt(imgPixel.length);
//         const spacing = 0.1;
//         const cubeSize = 0.1;

//         for (let i = 0; i < imgPixel.length; i + 2) {

//             const pixel = imgPixel[i];
//             const r = pixel[0] / 255;
//             const g = pixel[1] / 255;
//             const b = pixel[2] / 255;

//             console.log("[" + i + "]" + r + " " + g + " " + b + ", " + (r + g + b))

//             // Calculate x and y position from index
//             const x = i % gridSize;
//             const y = Math.floor(i / gridSize);

//             // Only create cube if pixel is not too dark
//             if (r + g + b > 0) {
//                 console.log("generating...", r, " ", g, " ", b)
//                 const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//                 const cubeMaterial = new THREE.MeshPhongMaterial({
//                     color: new THREE.Color(r, g, b),
//                     specular: 0x111111,
//                     shininess: 30
//                 });

//                 const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//                 cube.position.set(
//                     (x - gridSize / 2) * (cubeSize + spacing),
//                     (y - gridSize / 2) * (cubeSize + spacing),
//                     0
//                 );
//                 scene.add(cube);
//             }
//         }
//     };

//     img.onerror = () => {
//         console.error('Failed to load image');
//     };
// }