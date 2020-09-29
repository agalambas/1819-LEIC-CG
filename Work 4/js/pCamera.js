class PCamera extends THREE.PerspectiveCamera {

    constructor(target, x, y, z) {

        super(50,
              window.innerWidth / window.innerHeight,
              1,
              1000)

        this.defaultPosition = {x: x, y:y, z:z}
        this.target = target
        this.distance = Math.sqrt(Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2))

        this.position.set(x, y, z)
        this.lookAt(target)
        
        this.isPCamera = true
    }

    reset() {
        this.position.x = this.defaultPosition.x
        this.position.y = this.defaultPosition.y
        this.position.z = this.defaultPosition.z
        this.lookAt(this.target)
    }

    ratioX() {
        return this.position.x / this.distance
    }

    ratioY() {
        return this.position.y / this.distance
    }

    ratioZ() {
        return this.position.z / this.distance
    }
}