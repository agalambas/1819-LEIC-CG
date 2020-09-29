var geometry, material, mesh
var camera, scene, renderer
var plane, floor, sunlight, spotlight

const ASPECT = 16/9

const SUN_INTENSITY = 1.5
const SL_INTENSITY = 1

var lambertMaterial
var phongMaterial 
var basicMaterial
var currentMaterial
var isBasic = 0

var SHADING = 1 // 1 corresponde a Lambert e 2 a Phong
var meshs = []
var spotlights = []
var spotlightsLight = []
var camera
const ZOOM = 1.54

var width, height, scale;


// CRIACAO DE LUZES

function createDirectionalLight(){
    sunlight = new THREE.DirectionalLight(0xFFFFFF, SUN_INTENSITY)
    sunlight.position.set(200, 400, 200)
    sunlight.shadow = new THREE.LightShadow(new OCamera(window.innerWidth/10, window.innerHeight/10, 200, 400, 200));
    sunlight.shadow.bias = 0.0001
    sunlight.shadow.mapSize.width=2048
    sunlight.shadow.mapSize.height=2048
    sunlight.castShadow=true
    scene.add(sunlight)

    var ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( ambient );
    
}

function createSpotLights() {
	'use strict'

	spotlights.push(new Spotlight(-100, 5, -50, 0))
	spotlights.push(new Spotlight(-100, 5, 50, Math.PI/2))
	spotlights.push(new Spotlight(100, 5, -50, 3*Math.PI/2))
    spotlights.push(new Spotlight(100, 5, 50, Math.PI))
    
    for(let i=0; i<4; i++){
        scene.add(spotlights[i])
    }
}

// ALTERACAO DE INTENSIDADE DAS LUZES

function changeDirectionalLight(){
    if(sunlight.intensity != SUN_INTENSITY)
        sunlight.intensity = SUN_INTENSITY
    else
        sunlight.intensity = 0
}

function changeSpotLight(i){
    if(spotlightsLight[i].intensity != SL_INTENSITY)
        spotlightsLight[i].intensity = SL_INTENSITY
    else
        spotlightsLight[i].intensity = 0
}

// ALTERNAR ENTRE PHONG E GOURAD

function transformPhongLambert(){
    if(currentMaterial == phongMaterial)
        currentMaterial = lambertMaterial
    else
        currentMaterial = phongMaterial
    for(let i=0; i<meshs.length; i++){
        meshs[i].material = currentMaterial
    }
}

// ATIVAR E DESATIVAR CALCULO DA ILUMINACAO

function luminosityCalc(){
    if(isBasic)
        for(let i=0; i<meshs.length; i++)
            meshs[i].material = currentMaterial
    else
        for(let i=0; i<meshs.length; i++)
            meshs[i].material = basicMaterial
    isBasic = !isBasic
}

// CAMERAS
function createcameras() {
    'use strict'

    screen = resize_Aux()
    camera = new PCamera(scene.position, 150, 150, 150)
}

// SCENE

function createScene() {
    'use strict'

    lambertMaterial = new THREE.MeshLambertMaterial({ vertexColors: THREE.VertexColors})
    phongMaterial = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors})
    basicMaterial = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors})
    currentMaterial = lambertMaterial
    scene = new THREE.Scene()
    scene.position.set(0, 0, 0)
    scene.add(new THREE.AxisHelper(10))
    scene.add(new Floor(0, 0, 0))
    plane = new Plane(0, 0, 0, currentMaterial)
    scene.add(plane)
    createDirectionalLight()
    createSpotLights()
    
}

// EVENTS
function onResize() {
    'use strict'

    screen = resize_Aux()

    if (window.innerWidth > 0 && window.innerHeight > 0) {

        camera.aspect = screen.w / screen.h
        camera.updateProjectionMatrix()
    }

    renderer.setSize(window.innerWidth, window.innerHeight)
}

function resize_Aux() {
    'use strict'

    scale = window.innerWidth / window.innerHeight

    if(scale > ASPECT) { // higher width
        width = scale * 50;
        height = 50;
    }
    else { // higher height
        width = ASPECT * 50;
        height = width / scale;
    }

    return {w: width, h: height}
}

function onKeyDown(e) {
    'use strict'
    
    switch (e.keyCode) {
    // wirefram toggle
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe
            }
        })
        break
    // camera swap
    case 49: // 1
        changeSpotLight(0)
        break
    case 50: // 2
        changeSpotLight(1)
        break
    case 51: // 3
        changeSpotLight(2)
        break
    case 52: // 4
        changeSpotLight(3)
        break
    // arrows
    case 37: // left
        plane.setTurnLeft(1);
        break;
    case 39: // right
        plane.setTurnRight(1);
        break;
    case 38: // up
        plane.setTurnUp(1);
        break;
    case 40: // down
        plane.setTurnDown(1);
        break;
    case 71: // G, alternar entre phong e lambert
        transformPhongLambert()
        break;
    case 76: // L, calculo da iluminacao
        luminosityCalc()
        break;
    case 78: // N, alternar entre dia e noite
        changeDirectionalLight()
        break;
    }
}

function onKeyUp(e) {
    'use strict';
    
    switch (e.keyCode) {
    // arrows
    case 37: // left
        plane.setTurnLeft(0);
        break;
    case 39: // right
        plane.setTurnRight(0);
        break;
    case 38: // up
        plane.setTurnUp(0);
        break;
    case 40: // down
        plane.setTurnDown(0);
        break;
    }
}

// CORE
function render() {
    'use strict'

    renderer.render(scene, camera)
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement)
   
    createScene()
    createcameras()
    render()
    
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("resize", onResize)
        
    var controls = new THREE.OrbitControls(camera, renderer.domElement)
}

function animate() {
    'use strict'

    plane.updateTurn()
    render()
    requestAnimationFrame(animate)
}