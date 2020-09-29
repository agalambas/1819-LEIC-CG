class Wall extends THREE.Object3D {

    constructor(x, y, z) {
        super()
        this.color = 0x7F180C
        this.createWall(x, y, z)
    }

    createWall(x, y, z) {
        'use strict'
    
        this.addBigWall(0, 0, FIELD_D/2)
        this.addBigWall(0, 0, -FIELD_D/2)
        this.addSmallWall(FIELD_W/2, 0, 0)
        this.addSmallWall(-FIELD_W/2, 0, 0)
        
        this.position.set(x, y + FIELD_H/2, z)
    }

    addBigWall(x, y, z) {
        'use strict'

        geometry = new THREE.PlaneGeometry(FIELD_W, FIELD_H)
        material = new THREE.MeshBasicMaterial({ color: this.color, wireframe: true, side: THREE.DoubleSide })
        mesh = new THREE.Mesh(geometry, material)
    
        mesh.position.set(x, y, z)
        this.add(mesh)
    }

    addSmallWall(x, y, z) {
        'use strict'

        geometry = new THREE.PlaneGeometry(FIELD_D, FIELD_H)
        material = new THREE.MeshBasicMaterial({ color: this.color, wireframe: true, side: THREE.DoubleSide })
        mesh = new THREE.Mesh(geometry, material)
        
        mesh.position.set(x, y, z)
        mesh.rotation.y = Math.PI/2
        this.add(mesh)
    }
}