class Spotlight extends THREE.Object3D {

    constructor(x, y, z, rot) {
        super()

        this.color = 0x222222
        this.bulbColor = 0xFFFAAD

        this.createSpotlight(x, y, z)
        this.rotation.y = rot
    }
    
    createSpotlight(x, y, z) {
        'use strict'

        this.addSupport(0, 0, 0)
        this.addsphereSupport(0, 0, 0)
        this.addLightProtector(0, 0, 0)
        this.addLight(0, 0, 0)
        
        this.position.set(x, y, z)
        
    }
    
    addSupport(x, y, z){
        geometry = new THREE.CylinderGeometry(2, 2, 130, 12)
        material = new THREE.MeshLambertMaterial({ color: this.color })
        mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(x, y, z)
        // mesh.receiveShadow = true
        mesh.castShadow = true

        this.add(mesh)
    }
    
    addsphereSupport(x, y, z){
        geometry = new THREE.SphereGeometry(2, 20, 20)
        material = new THREE.MeshLambertMaterial({ color: this.color })
        mesh = new THREE.Mesh(geometry, material)

        mesh.position.set(x, y+65.5, z)
        // mesh.receiveShadow = true
        mesh.castShadow = true

        this.add(mesh)
    }
    
    addLightProtector(x, y, z){
        geometry = new THREE.ConeGeometry(10, 10, 20, 20)
        material = new THREE.MeshLambertMaterial({ color: this.color })
        mesh = new THREE.Mesh(geometry, material)
        
        mesh.position.set(x+3, y+64, z+2)
        mesh.rotation.x -= Math.PI/4
        mesh.rotation.z += Math.PI/4
        
        // mesh.receiveShadow = true
        mesh.castShadow = true
        this.add(mesh)
    }
    
    addLight(x, y, z){
        geometry = new THREE.SphereGeometry(5, 20, 20)
        material = new THREE.MeshLambertMaterial({ color: this.bulbColor })
        mesh = new THREE.Mesh(geometry, material)

        spotlight = new THREE.SpotLight(0xffffff, 0, 1000, Math.PI/3.5, 0.1)
        spotlight.castShadow = true
        spotlight.shadow.bias = 0.0001
        spotlight.shadow.mapSize.width=2048
        spotlight.shadow.mapSize.height=2048

        mesh.position.set(x+7, y+62, z+5)
        spotlight.position.set(x+7, y+62, z+5)

        this.light = mesh
        this.add(mesh)
        this.add(spotlight)
        spotlightsLight.push(spotlight)
    }
}