let scene = new THREE.Scene();
let perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let ortographicCamera = new THREE.OrthographicCamera(window.innerWidth / -30, window.innerWidth / 30, window.innerHeight / 30, window.innerHeight / -30, 0.1, 1000);
let camera = perspectiveCamera;
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

let controls;
addTrackballControl();

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    controls.update(1 / 60);
    renderer.render(scene, camera);
}
animate();

/***************************************DOM Manipulation*****************************************/

function addTrackballControl() {
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
}

function addFlyControl() {
    controls = new THREE.FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 10;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = 1;
    controls.autoForward = false;
    controls.dragToLook = false;
}

let trackballRadio = document.getElementById('Trackball');
let flyRadio = document.getElementById('Fly');
let perspectiveRadio = document.getElementById('Perspective');
let ortographicRadio = document.getElementById('Ortographic');

trackballRadio.addEventListener('change', function () {
    if (trackballRadio.checked) {
        addTrackballControl();
    }
});

flyRadio.addEventListener('change', function () {
    if (flyRadio.checked) {
        addFlyControl();
    }
});

perspectiveRadio.addEventListener('change', function () {
    if (perspectiveRadio.checked) {
        camera = perspectiveCamera;
    }
});

ortographicRadio.addEventListener('change', function () {
    if (ortographicRadio.checked) {
        camera = ortographicCamera;
    }
});


function toggleCameraControl(event) {
    if (event.key === 'z' || event.key === 'Z') {
        if (trackballRadio.checked) {
            flyRadio.checked = true;
            addFlyControl();
        } else {
            trackballRadio.checked = true;
            addTrackballControl();
        }
    } else if (event.key === 'x' || event.key === 'X') {
        if (perspectiveRadio.checked) {
            ortographicRadio.checked = true;
            camera = ortographicCamera;
        } else {
            perspectiveRadio.checked = true;
            camera = perspectiveCamera;
        }
    }
}

document.addEventListener('keypress', toggleCameraControl);

