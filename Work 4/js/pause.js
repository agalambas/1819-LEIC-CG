class Pause extends THREE.Object3D {

    constructor(x, y, z) {
        super()

        this.width = 100
        this.height = 100
        this.texture = textureLoader.load('pause.png')

        this.createPause(x, y, z)
    }

    createPause(x, y, z) {
        'use strict'
        
        geometry = new THREE.PlaneGeometry(this.width, this.height)
        this.material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true, visible: false })
        this.material.map.anisotropy = maxAnisotropy

        mesh = new THREE.Mesh(geometry, this.material)
        mesh.receiveShadow = true

        this.position.set(x, y, z)
        this.add(mesh)
    }

    setMaterial() {
        'use strict'
    }

    pause(camera) {
        'use strict'
        
        var distance = Math.sqrt(Math.pow(BOARD_H/2,2) + Math.pow(BOARD_W/2,2)) + 1
        
        this.position.x = camera.ratioX() * distance
        this.position.y = camera.ratioY() * distance
        this.position.z = camera.ratioZ() * distance

        this.lookAt(camera.position)

        this.material.visible = !this.material.visible
    }
}