class Lamp extends THREE.Object3D {

    constructor(x, y, z) {
        super();

        this.baseHeight = 2;
        this.botSupportHeight = 65;
        this.topSupportHeight = 45;
        this.lightProtectorHeight = 15;
        this.lightSupportHeight = 10;

        this.baseColor = 0x333333;
        this.supportColor = 0xef6f00;
        this.junctionColor = 0x333333;
        this.protectorColor = 0xef6f00;
        this.lightColor = 0xffee00;

        this.createLamp(x, y, z);
    }

    createLamp(x, y, z) {
        'use strict';

        this.addBase(0, 0, 0);
        this.addBotSupport(0, 0, 0);
        this.addTopSupport(0, 0, 0);
        this.addLightProtector(0, 0, 0);
        this.addLightSupport(0, 0, 0);
        this.addLight(0, 0, 0);
        this.rotateLamp();
        
        this.position.set(x, y, z);
    }

    addBase(x, y, z) {
        'use strict';
    
        geometry = new THREE.CylinderGeometry(8, 8, this.baseHeight, 12);
        material = new THREE.MeshBasicMaterial({ color: this.baseColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y+this.baseHeight/2, z);
    
        this.baseJunction = new THREE.Group();
    
        mesh.add(this.baseJunction);
        this.add(mesh);
    }

    addBotSupport(x, y, z) {
        'use strict';
        
        geometry = new THREE.CylinderGeometry(1, 1, this.botSupportHeight);
        material = new THREE.MeshBasicMaterial({ color: this.supportColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y+this.botSupportHeight/2, z);
    
        geometry = new THREE.SphereGeometry(1.2);
        material = new THREE.MeshBasicMaterial({ color: this.junctionColor, wireframe: true });
        this.botSupportJunction = new THREE.Mesh(geometry, material);
        this.botSupportJunction.position.set(x, y+this.botSupportHeight/2, z);
    
        mesh.add(this.botSupportJunction);
        this.baseJunction.add(mesh);
    }

    addTopSupport(x, y, z) {
        'use strict';
        
        geometry = new THREE.CylinderGeometry(1, 1, this.topSupportHeight);
        material = new THREE.MeshBasicMaterial({ color: this.supportColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y+this.topSupportHeight/2, z);
    
        geometry = new THREE.SphereGeometry(1.2);
        material = new THREE.MeshBasicMaterial({ color: this.junctionColor, wireframe: true });
        this.topSupportJunction = new THREE.Mesh(geometry, material);
        this.topSupportJunction.position.set(x, y+this.topSupportHeight/2, z);
    
        mesh.add(this.topSupportJunction);
        this.botSupportJunction.add(mesh);
    }
    
    addLightProtector(x, y, z){
        'use strict';
        
        geometry = new THREE.ConeGeometry(this.lightProtectorHeight/2, this.lightProtectorHeight, 8, 1, 1);
        material = new THREE.MeshBasicMaterial({ color: this.protectorColor, wireframe: true, side: THREE.DoubleSide });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y+this.lightProtectorHeight/2, z);
        mesh.rotation.x = Math.PI;
    
        this.topSupportJunction.add(mesh);
    }
    
    addLightSupport(x, y, z){
        'use strict';
    
        geometry = new THREE.ConeGeometry(this.lightSupportHeight/2, this.lightSupportHeight);
        material = new THREE.MeshBasicMaterial({ color: this.protectorColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y+this.lightSupportHeight/2, z);
    
        mesh.rotation.x = Math.PI;
        this.topSupportJunction.add(mesh);
    }
    
    addLight(x, y, z){
        'use strict';
    
        geometry = new THREE.SphereGeometry(3, 8, 6, 0, Math.PI*2, 0, Math.PI/2);
        material = new THREE.MeshBasicMaterial({ color: this.lightColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(x, y+this.lightSupportHeight, z);
        this.topSupportJunction.add(mesh);
    }
        
    rotateLamp(supp1, supp2, light) {
        'use strict';
    
        this.baseJunction.rotation.x = -Math.PI/48;
        this.baseJunction.rotation.z = Math.PI/48;
    
        this.botSupportJunction.rotation.x = Math.PI/24;
        this.botSupportJunction.rotation.z = -Math.PI/6;
        
        this.topSupportJunction.rotation.x = -Math.PI/3;
        this.topSupportJunction.rotation.z = -5*Math.PI/8;
    }
}