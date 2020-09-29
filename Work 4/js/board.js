class Board extends THREE.Object3D {

    constructor(x, y, z) {
        super()

        this.width = BOARD_W
        this.height = 5
        this.depth = BOARD_H

        this.wSegments = Math.ceil(this.width/7)
        this.hSegments = Math.ceil(this.height/7)
        this.dSegments = Math.ceil(this.depth/7)

        this.texture = textureLoader.load('chess.png') // or chess_brown.png
        this.color = 0xffffff

        this.createBoard(x, y, z)
    }

    createBoard(x, y, z) {
        'use strict'
        
        geometry = new THREE.BoxGeometry(this.width, this.height, this.depth, this.wSegments, this.hSegments, this.dSegments)
        this.setMaterial()

        mesh = new THREE.Mesh(geometry, material)
        mesh.receiveShadow = true
        allMesh[0] = mesh

        this.position.set(x, y-this.height/2, z)
        this.add(mesh)
    }

    setMaterial() {
        'use strict'

        this.boardFaces = [
            new THREE.MeshLambertMaterial({ color: this.color }),
            new THREE.MeshLambertMaterial({ color: this.color }),
            new THREE.MeshLambertMaterial({ map: this.texture }),
            new THREE.MeshLambertMaterial({ color: this.color }),
            new THREE.MeshLambertMaterial({ color: this.color }),
            new THREE.MeshLambertMaterial({ color: this.color })
        ]

        this.boardBasicFaces = [
            new THREE.MeshBasicMaterial({ color: this.color }),
            new THREE.MeshBasicMaterial({ color: this.color }),
            new THREE.MeshBasicMaterial({ map: this.texture }),
            new THREE.MeshBasicMaterial({ color: this.color }),
            new THREE.MeshBasicMaterial({ color: this.color }),
            new THREE.MeshBasicMaterial({ color: this.color })
        ]
        
        this.boardFaces[2].map.anisotropy = maxAnisotropy
        // this.boardFaces[2].map.wrapS = this.boardFaces[2].map.wrapT = THREE.RepeatWrapping
        // this.boardFaces[2].map.repeat.set(2, 2)

        boardMaterial = new THREE.MeshFaceMaterial(this.boardFaces)
        boardBasicMaterial = new THREE.MeshFaceMaterial(this.boardBasicFaces)
        material = boardMaterial
    }

    wireframe() {
        for (let i=0; i<6; i++)
            this.boardFaces[i].wireframe = !this.boardFaces[i].wireframe
        for (let i=0; i<6; i++)
            this.boardBasicFaces[i].wireframe = !this.boardBasicFaces[i].wireframe
    }
}