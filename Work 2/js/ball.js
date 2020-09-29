class Ball extends THREE.Object3D {

    constructor(x, y, z, r, v, m, color) {
        super()
        
        this.radius = r
        this.velocity = v
        this.mass = m
        
        this.xVector = new THREE.Vector3(-1, 0, 0)
        this.zVector = new THREE.Vector3(0, 0, 1)

        this.color = color

        this.createBall(x, y, z)
    }

    createBall(x, y, z) {
        'use strict'
    
        geometry = new THREE.SphereGeometry(this.radius, 16, 12)
        material = new THREE.MeshBasicMaterial({ color: this.color, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)

        this.position.set(x, y+this.radius, z)
        this.add(mesh)

        this.addAxis()
    }

    addAxis() {
        this.axis = new THREE.AxisHelper(this.radius/2)
        this.add(this.axis)
    }

    totalVelocity() {
        return Math.sqrt( Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.z, 2) )
    }

    rotateVelocity(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) -
            velocity.z * Math.sin(angle),
            z: velocity.x * Math.sin(angle) +
            velocity.z * Math.cos(angle),
        }
        
        return rotatedVelocities
    }

    checkBallColision(ball) {
        const distX = this.position.x - ball.position.x
        const distZ = this.position.z - ball.position.z

        return Math.pow(distX, 2) + Math.pow(distZ, 2) <= Math.pow(this.radius*2, 2)
    }

    resolveBallColision(ball) {
        if(this.checkBallColision(ball)){

            const velDifX = this.velocity.x - ball.velocity.x
            const velDifZ = this.velocity.z - ball.velocity.z
            const distX = ball.position.x - this.position.x
            const distZ = ball.position.z - this.position.z

            // Prevenir sobreposiçãos
            if(velDifX*distX + velDifZ*distZ >= 0) {
                
                // Angulo entre colisões
                const angle = -Math.atan2(distZ, distX)

                // Velocidade 1D pré-colisão
                const u1 = this.rotateVelocity(this.velocity, angle)
                const u2 = this.rotateVelocity(ball.velocity, angle)

                // Velocidade 1D pós-colisão
                const v1 = {
                    x: u1.x - (u1.x-u2.x) * 2 * ball.mass / (this.mass+ball.mass), // Se m1=m2, x: u2.x 
                    z: u1.z
                }
                const v2 = {
                    x: u2.x - (u2.x-u1.x) * 2 * ball.mass / (this.mass+ball.mass), // Se m1=m2, x: u1.x
                    z: u2.z
                }

                // Velocidade Final
                this.velocity = this.rotateVelocity(v1, -angle)
                ball.velocity = this.rotateVelocity(v2, -angle)
            }
        }       
    }

    resolveWallColision() {
        if(Math.abs(this.position.x + this.velocity.x) >= FIELD_W/2-this.radius) {
            this.velocity.x = -this.velocity.x
        }
        if(Math.abs(this.position.z + this.velocity.z) >= FIELD_D/2-this.radius) {
            this.velocity.z = -this.velocity.z
        }
    }

    updatePosition() {
        this.position.x += this.velocity.x
        this.position.z += this.velocity.z

        let rotZ = -this.velocity.x / this.radius
        let rotX = -this.velocity.z / this.radius

        this.rotateOnAxis(this.xVector, rotX)
        this.zVector.applyAxisAngle(this.xVector, -rotX)

        this.rotateOnAxis(this.zVector, rotZ)
        this.xVector.applyAxisAngle(this.zVector, -rotZ)
    }
}