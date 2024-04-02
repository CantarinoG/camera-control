let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.GLTFLoader();
loader.load('./assets/jet.gltf', function (gltf) {
    const model = gltf.scene;
    const material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    model.traverse(function (child) {
        if (child.isMesh) {
            child.material = material;
        }
    });
    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();