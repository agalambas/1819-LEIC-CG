var geometry, material, mesh;

var camera, scene, renderer;

var cameraPosition = 150;
var cameraZoom = 0.1;
var currentCamera = 1;
var cameraList = [];
var ASP = 16/9
var chair;


// CAMERA
function createOrthographicCamera(x, y, z) {
    'use strict';

    camera = new THREE.OrthographicCamera(window.innerWidth * -cameraZoom,
                                          window.innerWidth * cameraZoom,
                                          window.innerHeight * cameraZoom,
                                          window.innerHeight * -cameraZoom,
                                          1,
                                          1000);
    camera.position.set(x, y, z);
    camera.lookAt(scene.position);
    cameraList.push(camera);
}

function createPerspectiveCamera() {
    'use strict';

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(cameraPosition, cameraPosition, cameraPosition);
    camera.lookAt(scene.position);
    cameraList.push(camera);
}

function createCameraList() {
    'use strict';

    createOrthographicCamera(150, 0, 0)
    createOrthographicCamera(0, 150, 0)
    createOrthographicCamera(0, 0, 150)
    createPerspectiveCamera();
}

// SCENE
function createScene() {
    'use strict';

    scene = new THREE.Scene();
    scene.position.set(0, 0, 0);

    var group = new THREE.Group();
    group.position.set(0, -50, 0);
    
    var axis = new THREE.AxisHelper(10);
    axis.position.set(0, 0, 0);
    group.add(axis);
    
    group.add(new Floor(0, 0, 0));
    group.add(new Table(0, 0, 0));
    group.add(new Lamp(-65, 0, -15));
    chair = new Chair(0, 0, 40);
    group.add(chair);
    
    scene.add(group);
}

// EVENTS
function onResize() {
    'use strict';
    
    
    var aspect = window.innerWidth/window.innerHeight;
    
    if ( aspect > ASP ){
        var width = aspect * 50;
        var height = 50;
    }
    else{
        var width = ASP * 50;
        var height = width / aspect;
    }
    
    if (window.innerWidth > 0 && window.innerHeight > 0) {
        for (let i=0; i<cameraList.length; i++) {
            if (i==3)
                cameraList[i].aspect = width / height;
            else {
                cameraList[i].left = width * -1.585;
                cameraList[i].right = width * 1.585;
                cameraList[i].top = height * 1.585;
                cameraList[i].bottom = height * -1.585;
            }

            cameraList[i].updateProjectionMatrix();
        }
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    // wirefram toggle
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    // camera swap
    case 49: // 1
        currentCamera = 0;
        break;
    case 50: // 2
        currentCamera = 1;
        break;
    case 51: // 3
        currentCamera = 2;
        break;
    case 52: // 4
        currentCamera = 3;
        break;
    // arrows
    case 37: // left
        chair.setTurnLeft(1);
        break;
    case 39: // right
        chair.setTurnRight(1);
        break;
    case 38: // up
        chair.setMoveUp(1);
        break;
    case 40: // down
        chair.setMoveDown(1);
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    // arrows
    case 37: // left
        chair.setTurnLeft(0);
        break;
    case 39: // right
        chair.setTurnRight(0);
        break;
    case 38: // up
        chair.setMoveUp(0);
        break;
    case 40: // down
        chair.setMoveDown(0);
        break;
}
}

// CORE
function render() {
    'use strict';

    renderer.render(scene, cameraList[currentCamera]);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCameraList();
    render();
    
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    chair.updatePosition();
    render();
    
    requestAnimationFrame(animate);
}