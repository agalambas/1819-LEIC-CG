class PCamera extends THREE.PerspectiveCamera {

    constructor(target, x, y, z) {

        super(50,
              window.innerWidth / window.innerHeight,
              1,
              1000)
        
        this.position.set(x, y, z)
        this.lookAt(target)
        
        this.isPCamera = true
    }
}