class OCamera extends THREE.OrthographicCamera {

    
    constructor(x, y, z) {
        super(window.innerWidth/10 * -ZOOM,
              window.innerWidth/10 * ZOOM,
              window.innerHeight/10 * ZOOM,
              window.innerHeight/10 * -ZOOM,
              1,
              1000)

        this.position.set(x, y, z)
        this.lookAt(scene.position)
        
        this.isOCamera = true
    }

}