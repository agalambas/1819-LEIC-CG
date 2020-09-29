var geometry, material, mesh
var camera, scene, renderer

const ASPECT = 16/9

var currentCamera = 0
var cameras = []
const ZOOM = 0.1

var balls = []
var timer
    
// DATA

const BALL_COUNT = 10

const LEVEL_UP_TIME = 30 // in seconds
const LEVEL_UP_INC = 1.4 // % of new velocity
const LAST_LEVEL = 5
var currentLevel = 1

const FIELD_W = 200
const FIELD_D = FIELD_W/2
const FIELD_H = Math.sqrt( Math.pow(FIELD_W, 2) + Math.pow(FIELD_D, 2) ) /10

//UTILITY
function randFloat(min, max) {
    return Math.random()*(max-min) + min
}

// MOVEMENT
function updateBallPosition() {

    for(var i in balls) {

        balls[i].resolveWallColision()
        for(let j in balls) {
            if(i==j) continue
            balls[i].resolveBallColision(balls[j])
        }
        
        balls[i].updatePosition()
    }
}

function updateCameraPosition() {
    cameras[2].position.x = balls[0].position.x -
                            balls[0].velocity.x/balls[0].totalVelocity() * balls[0].radius*4
    cameras[2].position.z = balls[0].position.z -
                            balls[0].velocity.z/balls[0].totalVelocity() * balls[0].radius*4
    cameras[2].lookAt(balls[0].position)
}

function checkLevel() {
    if(currentLevel < LAST_LEVEL) {

        let time = timer.getElapsedTime()

        if ( time / LEVEL_UP_TIME >= 1) {
            for(i in balls) {
                balls[i].velocity.x *= LEVEL_UP_INC
                balls[i].velocity.z *= LEVEL_UP_INC
            }
            timer = new THREE.Clock()
            if(++currentLevel == LAST_LEVEL) timer.stop()
        }
    }
}

// CAMERAS
function createcameras() {
    'use strict'

    // depois de meter as bolas a andar
    var x = balls[0].position.x + FIELD_H*2
    var y = balls[0].position.y + FIELD_H/2
    var z = balls[0].position.z

    cameras.push(new OCamera(0, 150, 0))
    cameras.push(new PCamera(scene.position, 150, 150, 150))
    cameras.push(new PCamera(balls[0].position, x, y, z))
}

// SCENE
function spawnBall(i) {
        
    const velocity = {
        x: randFloat(-0.5, 0.5),
        z: randFloat(-0.5, 0.5)
    }

    const radius = FIELD_H/2
    
    const limX = FIELD_W/2 - radius
    const limZ = FIELD_D/2 - radius
    let x = randFloat(-limX, limX)
    let z = randFloat(-limZ, limZ)

    let color = 0xFFFFFF
    if(i!=0) color *= Math.random()

    let ball = new Ball(x, 0, z, radius, velocity, 1, color)

    for(let j=0; j<i; j++)
        if(ball.checkBallColision(balls[j])) {
            x = randFloat(-limX, limX)
            z = randFloat(-limZ, limZ)
            ball.position.x = x
            ball.position.z = z
            j = -1
        }

    balls.push(ball)
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.position.set(0, 0, 0)
    scene.add(new THREE.AxisHelper(10))

    scene.add(new Floor(0, 0, 0))
    scene.add(new Wall(0, 0, 0))

    for(let i=0; i<BALL_COUNT; i++) {
        spawnBall(i)
        scene.add(balls[i])
    }
}

// EVENTS
function onResize() {
    'use strict'

    screen = calcResize()

    if (window.innerWidth > 0 && window.innerHeight > 0) {

        for (let i=0; i<cameras.length; i++) {

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

function calcResize() {
    'use strict'

    let width, height

    let scale = window.innerWidth / window.innerHeight

    if(scale > ASPECT) { // higher width
        // height = window.innerHeight
        // width = height * ASPECT
        width = scale * 50;
        height = 50;
    }
    else { // higher height
        // width = window.innerWidth
        // height = width / ASPECT
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
    // ball axis toggle
    case 69: // E
    case 101: // e
        for(let i in balls) balls[i].axis.visible = !balls[i].axis.visible
        break
    // camera swap
    case 49: // 1
        currentCamera = 0
        break
    case 50: // 2
        currentCamera = 1
        break
    case 51: // 3
        currentCamera = 2
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
   
    createScene()
    createcameras()
    render()
    
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("resize", onResize)
    
    timer = new THREE.Clock();
    
    var controls = new THREE.OrbitControls(cameras[1], renderer.domElement)
}

function animate() {
    'use strict'

    updateBallPosition()
    updateCameraPosition()
    checkLevel()
    render()
    
    requestAnimationFrame(animate)
}