class Floor extends THREE.Object3D {

    constructor(x, y, z) {
        super()
        this.color = 0x2C7DA9
        this.createFloor(x, y, z)
    }

    createFloor(x, y, z) {
        'use strict'
    
        geometry = new THREE.PlaneGeometry(FIELD_W, FIELD_D)
        material = new THREE.MeshBasicMaterial({ color: this.color, wireframe: true, side: THREE.DoubleSide })
        mesh = new THREE.Mesh(geometry, material)
    
        this.rotation.x = -Math.PI/2
        this.position.set(x, y, z)
        this.add(mesh)
    }
}