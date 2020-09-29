var geometry, material, mesh, textureLoader, texture
var camera, scene, renderer

const ASPECT = 16 / 9

var currentCamera = 0
var cameras = []
var allMesh = new Array(3)
const ZOOM = 1.54

var width, height, scale

const BOARD_W = 200
const BOARD_H = 200
const BALL_R = 15
const CUBE_L = 40

var board, ball, cube, pause

var boardMaterial, cubeMaterial, ballMaterial, boardBasicMaterial, cubeBasicMaterial, ballBasicMaterial
var maxAnisotropy

var sunlight, pl
var SL_INT = 1
var PL_INT = 10
var PL_DISTANCE = 200
var PL_DECAY = 2

var isBasic = 0
var isPaused = false

var controls


// WIREFRAME TOGGLE

function wireframe() {
	board.wireframe()
	ball.wireframe()
	cube.wireframe()
}


// PAUSE

function pauseScreen() {
	isPaused = !isPaused
	pause.pause(cameras[0])
	controls.enabled = !controls.enabled;
}

function doPause() {
	'use strict'

	ball.pause()
	pauseScreen()
}


// RESET

function doReset() {
	'use strict'

	if (isPaused) {

		ball.reset()
		cameras[0].reset()
		pauseScreen()
	}
}


// LUZES

function createAmbientLight() {
	'use strict'

	scene.add(new THREE.AmbientLight(0x303030))
}

function createDirectionalLight() {
	'use strict'

	sunlight = new THREE.DirectionalLight(0xFFFFFF, SL_INT)
	sunlight.position.set(50, 300, 100)
	sunlight.shadow = new THREE.LightShadow(new OCamera(50, 300, 100))
	sunlight.shadow.bias = 0.0001
	sunlight.shadow.mapSize.width = 1024
	sunlight.shadow.mapSize.height = 1024
	sunlight.castShadow = true
	scene.add(sunlight)
}

function createPointLight() {
	'use strict'

	pl = new THREE.PointLight(0xFFFFFF, PL_INT, PL_DISTANCE, PL_DECAY)
	pl.position.set(0, 75, 0)
	pl.shadow = new THREE.LightShadow(new OCamera(0, 75, 0))
	pl.shadow.bias = 0.0001
	pl.shadow.mapSize.width = 1024
	pl.shadow.mapSize.height = 1024
	pl.castShadow = true
	scene.add(pl)
}


// ALTERACAO DE INTENSIDADE DAS LUZES

function changeDirectionalLight() {
	'use strict'

	if (sunlight.intensity != SL_INT) sunlight.intensity = SL_INT
	else sunlight.intensity = 0
}

function changePointLight() {
	'use strict'

	if (pl.intensity != PL_INT) pl.intensity = PL_INT
	else pl.intensity = 0
}


// ATIVAR E DESATIVAR CALCULO DA ILUMINACAO

function luminosityCalc() {
	'use strict'

	if (isBasic) {
		allMesh[0].material = boardMaterial
		allMesh[1].material = ballMaterial
		allMesh[2].material = cubeMaterial
	}
	else {
		allMesh[0].material = boardBasicMaterial
		allMesh[1].material = ballBasicMaterial
		allMesh[2].material = cubeBasicMaterial
	}

	isBasic = !isBasic
}


// SCENE

function createScene() {
	'use strict'

	scene = new THREE.Scene()
	scene.position.set(0, 0, 0)
	scene.add(new THREE.AxisHelper(10))

	textureLoader = new THREE.TextureLoader().setPath('textures/')

	board = new Board(0, 0, 0)
	ball = new Ball(0, 0, 75)
	cube = new Cube(0, 0, 0)
	pause = new Pause(0, CUBE_L + 1, 0)

	scene.add(board)
	scene.add(ball)
	scene.add(cube)
	scene.add(pause)

	createAmbientLight()
	createDirectionalLight()
	createPointLight()
}


// CAMERAS
function createcameras() {
	'use strict'

	screen = resize_Aux()
	cameras.push(new PCamera(scene.position, 150, 150, 150))
}


// EVENTS
function onResize() {
	'use strict'

	screen = resize_Aux()

	if (window.innerWidth > 0 && window.innerHeight > 0) {

		for (let i = 0; i < cameras.length; i++) {

			if (cameras[i].isPCamera)
				cameras[i].aspect = screen.w / screen.h

			else if (cameras[i].isOCamera) {
				cameras[i].left = screen.w * -ZOOM
				cameras[i].right = screen.w * ZOOM
				cameras[i].top = screen.h * ZOOM
				cameras[i].bottom = screen.h * -ZOOM
			}

			cameras[i].updateProjectionMatrix()
		}
	}

	renderer.setSize(window.innerWidth, window.innerHeight)
}

function resize_Aux() {
	'use strict'

	scale = window.innerWidth / window.innerHeight

	if (scale > ASPECT) { // higher width
		// height = window.innerHeight
		// width = height * ASPECT
		width = scale * 50
		height = 50
	}
	else { // higher height
		// width = window.innerWidth
		// height = width / ASPECT
		width = ASPECT * 50
		height = width / scale
	}

	return { w: width, h: height }
}

function onKeyDown(e) {
	'use strict'

	switch (e.keyCode) {
		// wirefram toggle
		case 87: //W
			wireframe()
			break
		// Ball Movement
		case 66: //B
			ball.changeMovement()
			break
		// Pause
		case 83: // S, pausar a visualizacao
			doPause()
			break
		case 80: // P, alternar intensidade de PointLight
			changePointLight()
			break
		case 76: // L, calculo da iluminacao
			luminosityCalc()
			break
		case 68: // D, alternar intensidade de DirectionalLigh
			changeDirectionalLight()
			break
		case 82: // R Reset
			doReset()
			break
	}
}


// CORE
function render() {
	'use strict'

	renderer.render(scene, cameras[currentCamera])
}

function init() {
	'use strict'

	renderer = new THREE.WebGLRenderer({ antialias: true })
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.Type = THREE.PCFShadow

	maxAnisotropy = renderer.getMaxAnisotropy()

	createScene()
	createcameras()
	render()

	window.addEventListener("keydown", onKeyDown)
	window.addEventListener("resize", onResize)

	controls = new THREE.OrbitControls(cameras[0], renderer.domElement)
}

function animate() {
	'use strict'

	ball.update()
	render()

	requestAnimationFrame(animate)
}