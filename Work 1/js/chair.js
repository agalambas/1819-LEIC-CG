class Chair extends THREE.Object3D {

    constructor(x, y, z) {
        super();

        this.legs = 5;
        this.legHeight = 20;
        this.wheelSupportHeight = 3;
        this.supportHeight = 35;
        this.chairWidth = 30;
        this.chairThickness = 4;
        this.backHeight = 50;
        this.armHeight = 15;

        this.legColor = 0x333333;
        this.wheelSupportColor = 0x333333;
        this.wheelColor = 0xef6f00;
        this.supportColor = 0x333333;
        this.sitColor = 0xef6f00;
        this.backColor = 0xef6f00;
        this.armColor = 0x333333;

        this.createChair(x, y, z);
        this.initMovement();
    }

    createChair(x, y, z) {
        'use strict';

        this.addBase(0, 0, 0);
        this.addSupport(0, 0, 0);
        this.addRotationPivot(0, this.supportHeight, 0);
        this.addBack(0, 0, this.chairWidth/2);
        this.addSit(0, 0, 0);
        this.addArm(this.chairWidth/2, 0, 0);
        this.addArm(-this.chairWidth/2, 0, 0);

        // y + altura da base (raio do suporte + altura da roda)
        this.position.set(x, y+3.8, z);
    }

    addBase(x, y, z) {
        this.base = new THREE.Group();
        
        this.wheel = Array(this.legs);
        this.wheelStartingRotation = Array(this.legs);

        for(let i=0; i<this.legs; i++) {
            this.legRotation = 2*i*Math.PI/this.legs;
            this.wheelStartingRotation[i] = -this.legRotation - Math.PI/2;
            this.addLeg(i, 0, 0, 0);
        }

        this.base.rotation.x = Math.PI/2;
        this.base.position.set(x, y, z);
        this.add(this.base);
    }

    addLeg(i, x, y, z) {
        'use strict';

        var pivot = new THREE.Group();

        // leg
        geometry = new THREE.CylinderGeometry(1, 1, this.legHeight);
        material = new THREE.MeshBasicMaterial({ color: this.legColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y+this.legHeight/2, z);
        pivot.add(mesh);

        // wheel support
        geometry = new THREE.CylinderGeometry(0.7, 0.7, this.wheelSupportHeight);
        material = new THREE.MeshBasicMaterial({ color: this.wheelSupportColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = Math.PI/2;
        mesh.position.set(x, y+this.legHeight-2, z+this.wheelSupportHeight/2);
        pivot.add(mesh);

        // wheel
        geometry = new THREE.TorusGeometry(1, 0.4, 8, 16);
        material = new THREE.MeshBasicMaterial({ color: this.wheelColor, wireframe: true });
        this.wheel[i] = new THREE.Mesh(geometry, material);

        this.wheel[i].rotation.x = Math.PI/2;
        this.wheel[i].rotation.y = this.wheelStartingRotation[i];
        this.wheel[i].position.set(x, y+this.legHeight-2, z+2.4);
        pivot.add(this.wheel[i]);

        pivot.rotation.z = this.legRotation;
        this.base.add(pivot);
    }

    addSupport(x, y, z) {
        'use strict';
        
        geometry = new THREE.CylinderGeometry(2, 2, this.supportHeight);
        material = new THREE.MeshBasicMaterial({ color: this.supportColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(x, y+this.supportHeight/2, z);
        this.add(mesh);
    }

    addRotationPivot(x, y, z) {
        'use strict';
        
        this.rotationPivot = new THREE.Group();
        this.rotationPivot.position.set(x, y, z);
        this.add(this.rotationPivot);
    }

    addSit(x, y, z) {
        'use strict';
        geometry = new THREE.CubeGeometry(this.chairWidth, this.chairThickness, this.chairWidth);
        
        material = new THREE.MeshBasicMaterial({ color: this.sitColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
    
        mesh.position.set(x, y+this.chairThickness/2, z);
        this.rotationPivot.add(mesh);
    }

    addBack(x, y, z) {
        'use strict';
    
        var pivot = new THREE.Group();
        
        geometry = new THREE.CubeGeometry(this.chairWidth, this.backHeight, this.chairThickness);
        material = new THREE.MeshBasicMaterial({ color: this.backColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(0, this.backHeight/2, -this.chairThickness/2);

        pivot.position.set(x, y, z);
        pivot.rotation.x = Math.PI/32;
    
        pivot.add(mesh);
        this.rotationPivot.add(pivot);
    }

    addArm(x, y, z) {
        'use strict';

        var arm = new THREE.Group();
        var radius = 1;
        
        // support
        geometry = new THREE.CylinderGeometry(radius, radius, this.armHeight);
        material = new THREE.MeshBasicMaterial({ color: this.armColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, this.armHeight/2, 0);
        arm.add(mesh);
    
        // arm
        geometry = new THREE.CubeGeometry(4, 1, this.chairWidth);
        material = new THREE.MeshBasicMaterial({ color: this.armColor, wireframe: true });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, this.armHeight+radius/2, this.chairWidth/3);
        arm.add(mesh);
    
        arm.position.set(x, y, z-this.chairWidth/3);
        this.rotationPivot.add(arm);
    }

    initMovement() {
        'use strict';

        this.clock = new THREE.Clock(0);
        
        this.turnLeft = 0;
        this.turnRight = 0;
        this.moveUp = 0;
        this.moveDown = 0;

        this.a = 0;
    }

    setTurnLeft(value) {
        'use strict';

        this.turnLeft = value;
    }

    setTurnRight(value) {
        'use strict';

        this.turnRight = value;
    }

    setMoveUp(value) {
        'use strict';

        this.moveUp = value;
        if (value) this.clock.start();
    }

    setMoveDown(value) {
        'use strict';

        this.moveDown = value;
        if (value) this.clock.start();
    }
    
    updatePosition() {
        'use strict';
    
        this.updateTurn();
        this.updateMovement();
    }
    
    updateTurn() {
        'use strict';

        var rotation = Math.PI/96;
        if (this.turnLeft) this.rotationPivot.rotation.y += rotation;
        if (this.turnRight) this.rotationPivot.rotation.y -= rotation;
    }
    
    updateMovement() {
        'use strict';

        var force = 40;
        var friction = 2/3 * force;
        var lim = 2500;
    
        if (this.moveUp && this.a > -lim) this.a -= force;
        if (this.moveDown && this.a < lim) this.a += force;
        
        if (this.moveUp == this.moveDown) {
            if (this.a >= friction) this.a -= friction;
            else if (this.a <= -friction) this.a += friction;
            else this.a = 0;
        }
        
        // v = at
        // x = x0 + vt + (1/2)at^2
        // x - x0 = x0 + at^2 + (1/2)at^2
        //        = x0 + at^2 + (1/2)at^2
        //        = x0 + (3/2)at^2
        var deltaT = this.clock.getDelta();
        var distance = 3/2 * this.a * Math.pow(deltaT, 2);

        chair.position.x += distance * Math.sin(this.rotationPivot.rotation.y);
        chair.position.z += distance * Math.cos(this.rotationPivot.rotation.y);

        if (this.a != 0)
            for(let i=0; i<this.legs; i++) {
                this.wheel[i].rotation.z -= distance/1.4;
                this.wheel[i].rotation.y = this.wheelStartingRotation[i] - this.rotationPivot.rotation.y;
            }
    }
}