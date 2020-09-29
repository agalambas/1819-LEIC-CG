class Floor extends THREE.Object3D {

    constructor(x, y, z) {
        super();

        this.width = 200;
        this.length = 200;

        this.color = 0x777777;
        // this.texture = "textures/woodFloor.png";

        this.createFloor(x, y, z);
    }

    createFloor(x, y, z) {
        'use strict';
    
        geometry = new THREE.PlaneGeometry(this.width, this.length);
        // var texture = new THREE.TextureLoader().load( this.texture );
        material = new THREE.MeshBasicMaterial({ /*map: texture*/color: this.color, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        this.add(mesh);
        this.rotation.x = -Math.PI/2;
        this.position.set(x, y, z);
    }
}