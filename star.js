// Set up scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.body.insertBefore(renderer.domElement, document.body.firstChild);

// Create star geometry
function createStarGeometry(innerRadius, outerRadius, points) {
    const shape = new THREE.Shape();
    const angleStep = (Math.PI * 2) / (points * 2);

    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = i * angleStep - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();

    const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.2,
        bevelSegments: 3
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

// Create star material with gradient
const gradientTexture = new THREE.CanvasTexture((() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.5, '#ffa500');
    gradient.addColorStop(1, '#ff4500');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return canvas;
})());

const starMaterial = new THREE.MeshPhongMaterial({
    map: gradientTexture,
    shininess: 100,
    side: THREE.DoubleSide
});

// Create star mesh
const starGeometry = createStarGeometry(1, 2, 5);
const star = new THREE.Mesh(starGeometry, starMaterial);
scene.add(star);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add point light
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Position camera
camera.position.z = 7;

// Add stars background
const starsGeometry = new THREE.BufferGeometry();
const starVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
});

function animate() {
    requestAnimationFrame(animate);

    // Rotate star
    star.rotation.x += 0.005;
    star.rotation.y += 0.01;

    // Add subtle mouse-based movement
    star.rotation.x += (mouseY - star.rotation.x) * 0.05;
    star.rotation.y += (mouseX - star.rotation.y) * 0.05;

    // Rotate star field
    starField.rotation.x += 0.0002;
    starField.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

animate(); 