class OCamera extends THREE.OrthographicCamera {

    constructor(x, y, z) {
        super(window.innerWidth * -ZOOM,
              window.innerWidth * ZOOM,
              window.innerHeight * ZOOM,
              window.innerHeight * -ZOOM,
              1,
              1000)

        this.position.set(x, y, z)
        this.lookAt(scene.position)
        
        this.isOCamera = true
    }

}