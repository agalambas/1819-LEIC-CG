class Table extends THREE.Object3D {

    constructor(x, y, z) {
        super();

        this.legHeight = 60;
        this.legRadius = 2;
        this.topHeight = 4;
        this.topWidth = 70;
        this.topLength = 120;

        this.topColor = 0xffffff;
        this.legColor = 0x333333;

        this.createTable(x, y, z);
    }

    createTable(x, y, z) {
        'use strict';

        this.addTop(0, this.legHeight, 0);
        this.addLeg(-(this.topLength/2-4), 0, -(this.topWidth/2-4));
        this.addLeg(-(this.topLength/2-4), 0, (this.topWidth/2-4));
        this.addLeg((this.topLength/2-4), 0, (this.topWidth/2-4));
        this.addLeg((this.topLength/2-4), 0, -(this.topWidth/2-4));

        this.position.set(x, y, z);
    }

    addTop(x, y, z) {
        'use strict';
    
        geometry = new THREE.CubeGeometry(this.topLength, this.topHeight, this.topWidth);
        material = new THREE.MeshBasicMaterial({ color: this.topColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(x, y+this.topHeight/2, z);
        this.add(mesh);
    }

    addLeg(x, y, z) {
        'use strict';
        
        geometry = new THREE.CylinderGeometry(this.legRadius, this.legRadius, this.legHeight);
        material = new THREE.MeshBasicMaterial({ color: this.legColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(x, y+this.legHeight/2, z);
        this.add(mesh);
    }
}