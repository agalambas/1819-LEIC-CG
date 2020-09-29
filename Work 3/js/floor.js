class Floor extends THREE.Object3D {

    constructor(x, y, z) {
        super()

        this.width = 250
        this.depth = 500
        this.color = 0x888877

        this.createFloor(x, y-60, z)
    }

    createFloor(x, y, z) {
        'use strict'
    
        geometry = new THREE.PlaneGeometry(this.depth, this.width)
        material = new THREE.MeshPhongMaterial({ color: this.color})
        mesh = new THREE.Mesh(geometry, material)
        mesh.receiveShadow = true
        
        this.rotation.x = -Math.PI/2
        this.position.set(x, y, z)
        this.add(mesh)
    }
}