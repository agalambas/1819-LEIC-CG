class Cube extends THREE.Object3D {

    constructor(x, y, z) {
        super()
        
        this.width = CUBE_L
        this.segments = Math.ceil(this.width/7)
        this.bumpMap = textureLoader.load('rubikBump.png')
        this.textureTop = textureLoader.load('rubik1.png')
        this.textureFront = textureLoader.load('rubik2.png')
        this.textureRight = textureLoader.load('rubik3.png')
        this.textureBack = textureLoader.load('rubik4.png')
        this.textureLeft = textureLoader.load('rubik5.png')
        this.textureBot = textureLoader.load('rubik6.png')

        this.createCube(x, y, z)
    }

    createCube(x, y, z) {
        'use strict'
    
        geometry = new THREE.BoxGeometry(this.width, this.width, this.width, this.segments, this.segments, this.segments)
        this.setMaterial()

        mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        allMesh[2] = mesh

        this.position.set(x, y+this.width/2, z)
        this.add(mesh)
    }

    setMaterial() {
        'use strict'

        this.cubeFaces = [
            new THREE.MeshPhongMaterial({ map: this.textureRight, bumpMap: this.bumpMap }),
            new THREE.MeshPhongMaterial({ map: this.textureLeft, bumpMap: this.bumpMap }),
            new THREE.MeshPhongMaterial({ map: this.textureTop, bumpMap: this.bumpMap }),
            new THREE.MeshPhongMaterial({ map: this.textureBot, bumpMap: this.bumpMap }),
            new THREE.MeshPhongMaterial({ map: this.textureFront, bumpMap: this.bumpMap }),
            new THREE.MeshPhongMaterial({ map: this.textureBack, bumpMap: this.bumpMap })
        ]

        this.cubeBasicFaces = [
            new THREE.MeshBasicMaterial({ map: this.textureRight }),
            new THREE.MeshBasicMaterial({ map: this.textureLeft }),
            new THREE.MeshBasicMaterial({ map: this.textureTop }),
            new THREE.MeshBasicMaterial({ map: this.textureBot }),
            new THREE.MeshBasicMaterial({ map: this.textureFront }),
            new THREE.MeshBasicMaterial({ map: this.textureBack })
        ]
        
        for(let i=0; i<6; i++) {
            this.cubeFaces[i].map.anisotropy = maxAnisotropy
        }

        cubeMaterial = new THREE.MeshFaceMaterial(this.cubeFaces)
        cubeBasicMaterial = new THREE.MeshFaceMaterial(this.cubeBasicFaces)
        material = cubeMaterial
    }

    wireframe() {
        for (let i=0; i<6; i++)
            this.cubeFaces[i].wireframe = !this.cubeFaces[i].wireframe
        for (let i=0; i<6; i++)
            this.cubeBasicFaces[i].wireframe = !this.cubeBasicFaces[i].wireframe
    }
}