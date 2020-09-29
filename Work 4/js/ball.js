class Ball extends THREE.Object3D {

    constructor(x, y, z) {
		super()
		
		this.radius = BALL_R
		this.wSegments = Math.ceil(this.radius/7)*8 // defualt = 8
		this.hSegments = Math.ceil(this.radius/7)*6 // default = 6
		this.texture = textureLoader.load('8pool.png')

		this.SPEED_INC = 25
		this.MAX_SPEED = 4000
		
		this.createBall(x, y, z)
		this.initMovement()
    }

    createBall(x, y, z) {
        'use strict'
    
        geometry = new THREE.SphereGeometry(this.radius, this.wSegments, this.hSegments)
        this.setMaterial()

        mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        allMesh[1] = mesh

        this.position.set(0, this.radius, 0)
        mesh.position.set(x, y, z)
        this.ball = mesh

        this.add(mesh)
        this.addAxis()
    }

    setMaterial() {
        'use strict'

        ballMaterial = new THREE.MeshPhongMaterial({ specular:0xffffff, map: this.texture, shininess: 150 })
        ballBasicMaterial = new THREE.MeshBasicMaterial({ map: this.texture })
        
        material = ballMaterial
        material.map.anisotropy = maxAnisotropy
    }

    addAxis() {
        'use strict'

        this.axis = new THREE.AxisHelper(this.radius/2)
        this.add(this.axis)
        this.ballAxis = new THREE.AxisHelper(this.radius/2)
        this.ball.add(this.ballAxis)
    }

    wireframe() {
        ballMaterial.wireframe = !ballMaterial.wireframe
        ballBasicMaterial.wireframe = !ballBasicMaterial.wireframe
    }

    initMovement() {
		'use strict'

		this.clock = new THREE.Clock()
		
		this.a = 0
		this.move = false
    }

    changeMovement() {
        'use strict'
        if(!isPaused) ball.move = !ball.move
    }

    pause() {
        'use strict'
        
        if(this.clock.running) this.clock.stop()
        else this.clock.start()
    }

    updateMovement() {
        'use strict'

        let force = this.SPEED_INC
        let lim = this.MAX_SPEED

        if (this.move && this.a < lim) this.a += force
        if (!this.move && this.a > 0) this.a -= force

        // v = at
        // x = x0 + vt + (1/2)at^2
        // x - x0 = at^2 + (1/2)at^2
        //        = at^2 + (1/2)at^2
        //        = (3/2)at^2
        let deltaT = this.clock.getDelta()
        return 3/2 * this.a * Math.pow(deltaT, 2)
    }

    updatePosition(distance) {
        'use strict'
        let rotation = distance / this.ball.position.z
        this.rotation.y += rotation
    }

    updateRotation(distance) {
        'use strict'
        let rotation = - distance / this.radius
        this.ball.rotation.z += rotation
    }
    
    update() {
        'use strict'
        
        if (!isPaused) {
            let distance = this.updateMovement()
            this.updatePosition(distance)
            this.updateRotation(distance)
        }
    }
    
    reset() {
        'use strict'
        
        this.rotation.y = 0
        this.ball.rotation.z = 0
        this.initMovement()
    }
}