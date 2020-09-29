class OCamera extends THREE.OrthographicCamera {

    
    constructor(width, height, x, y, z) {
        super(width * -ZOOM,
              width * ZOOM,
              height * ZOOM,
              height * -ZOOM,
              1,
              1000)

        this.position.set(x, y, z)
        this.lookAt(scene.position)
        
        this.isOCamera = true
    }

}