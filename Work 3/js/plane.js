class Plane extends THREE.Object3D {

	constructor(x, y, z, m) {
		super()
		
		this.material = m

		this.createPlane(x, y, z)
		this.initTurn()
	}

	createPlane(x, y, z) {
		'use strict'

		this.addFuselage(0, 0, 0)
		this.addCockPit(45, 2, 0)
		this.addWings(0, 0, 0)
		this.addHorizontalStabilizer(-35, 5, 0)
		this.addVerticalStabilizer(-35, 5, 0)

		this.position.set(x, y, z)
	}
	
	addFuselage(x, y, z) {
		'use strict'
		
		geometry = new THREE.Geometry()
		
		geometry.vertices.push( new THREE.Vector3(-70, 5, -5),
								new THREE.Vector3(-70, 5, 5),
								new THREE.Vector3(-35, 0, -10),
								new THREE.Vector3(-35, 5, -5),
								new THREE.Vector3(-35, 5, 5),
								new THREE.Vector3(-35, 0, 10),
								new THREE.Vector3(45, 0, -10),
								new THREE.Vector3(45, 5, -5),
								new THREE.Vector3(45, 5, 5),
								new THREE.Vector3(45, 0, 10),
								new THREE.Vector3(60, 2, -5),
								new THREE.Vector3(60, 2, 5),
								new THREE.Vector3(-35, -5, -5),
								new THREE.Vector3(-35, -5, 5),
								new THREE.Vector3(45, -5, -5),
								new THREE.Vector3(45, -5, 5),
								new THREE.Vector3(60, -2, -5),
								new THREE.Vector3(60, -2, 5),
								new THREE.Vector3(-70, 3, -5),
								new THREE.Vector3(-70, 3, 5)
								)
		
		geometry.faces.push( new THREE.Face3(0, 1, 4),
							 new THREE.Face3(4, 3, 0),
							 new THREE.Face3(2, 0, 3),
							 new THREE.Face3(4, 1, 5),

							 new THREE.Face3(2, 3, 7),
							 new THREE.Face3(7, 6, 2),
							 new THREE.Face3(3, 4, 8),
							 new THREE.Face3(8, 7, 3),
							 new THREE.Face3(4, 5, 9),
							 new THREE.Face3(9, 8, 4),

							 new THREE.Face3(6, 7, 10),
							 new THREE.Face3(11, 10, 7),
							 new THREE.Face3(7, 8, 11),
							 new THREE.Face3(8, 9, 11),

							 new THREE.Face3(10, 11, 17),
							 new THREE.Face3(17, 16, 10),

							 new THREE.Face3(17, 11, 9),
							 new THREE.Face3(10, 16, 6),

							 new THREE.Face3(1, 0, 18),
							 new THREE.Face3(18, 19, 1),

							 new THREE.Face3(19, 18, 13),
							 new THREE.Face3(18, 12, 13),
							 new THREE.Face3(18, 2, 12),
							 new THREE.Face3(19, 13, 5),
							 new THREE.Face3(1, 19, 5),
							 new THREE.Face3(0, 18, 2),

							 new THREE.Face3(12, 2, 6),
							 new THREE.Face3(6, 14, 12),
							 new THREE.Face3(13, 12, 14),
							 new THREE.Face3(14, 15, 13),
							 new THREE.Face3(5, 13, 15),
							 new THREE.Face3(15, 9, 5),

							 new THREE.Face3(14, 6, 16),
							 new THREE.Face3(14, 16, 17),
							 new THREE.Face3(17, 15, 14),
							 new THREE.Face3(9, 15, 17)
							 )
							 
		geometry.computeVertexNormals()
		geometry.computeFaceNormals()
		
		for(let i in geometry.faces){
			var face = geometry.faces[i]
			face.vertexColors[0] = new THREE.Color(0x003399)
			face.vertexColors[1] = new THREE.Color(0x003399)
			face.vertexColors[2] = new THREE.Color(0x003399)
		}
		
		mesh = new THREE.Mesh(geometry, this.material)
		mesh.castShadow = true
		// mesh.receiveShadow = true
		
		mesh.position.set(x, y, z)
		meshs.push(mesh)
		this.add(mesh)
	}
	
	addCockPit(x, y, z) {
		'use strict'
		
		geometry = new THREE.Geometry()
		
		geometry.vertices.push( new THREE.Vector3(0, 3, -5),
								new THREE.Vector3(0, 3, 5),
								new THREE.Vector3(8, 3, -5),
								new THREE.Vector3(8, 3, 5),
								new THREE.Vector3(15, 0, -5),
								new THREE.Vector3(15, 0, 5),
								new THREE.Vector3(0, 0, -5),
								new THREE.Vector3(0, 0, 5)
							  )
		
		geometry.faces.push( new THREE.Face3(0, 1, 3),
							 new THREE.Face3(3, 2, 0),
							 new THREE.Face3(2, 3, 5),
							 new THREE.Face3(5, 4, 2),
							 new THREE.Face3(0, 2, 4),
							 new THREE.Face3(4, 6, 0),
							 new THREE.Face3(1, 7, 5),
							 new THREE.Face3(5, 3, 1)
							 )
							 
		geometry.computeVertexNormals()
		geometry.computeFaceNormals()
		
		for(let i in geometry.faces){
			var face = geometry.faces[i]
			face.vertexColors[0] = new THREE.Color(0x000000)
			face.vertexColors[1] = new THREE.Color(0x000000)
			face.vertexColors[2] = new THREE.Color(0x000000)
		}
		
		mesh = new THREE.Mesh(geometry, this.material)
		mesh.castShadow = true
		// mesh.receiveShadow = true
		
		mesh.position.set(x, y, z)
		meshs.push(mesh)
		this.add(mesh)
	}
	
	addWings(x, y, z) {
		'use strict'
		
		geometry = new THREE.Geometry()
		
		geometry.vertices.push(
								// cima da asa esquerda
								new THREE.Vector3(-40, 1, -60),
								new THREE.Vector3(-30, 1, -60),
								new THREE.Vector3(-7, 1, -20),
								new THREE.Vector3(-7, 1, -9),
								new THREE.Vector3(5, 1, -25),
								new THREE.Vector3(20, 1, -9),
								
								// cima da asa direita
								new THREE.Vector3(-40, 1, 60),
								new THREE.Vector3(-7, 1, 9),
								new THREE.Vector3(-7, 1, 20),
								new THREE.Vector3(-30, 1, 60),
								new THREE.Vector3(5, 1, 25),
								new THREE.Vector3(20, 1, 9),
							   
								// baixo da asa esquerda
								new THREE.Vector3(-40, -1, -60),
								new THREE.Vector3(-30, -1, -60),
								new THREE.Vector3(-7, -1, -20),
								new THREE.Vector3(-7, -1, -9),
								new THREE.Vector3(5, -1, -25),
								new THREE.Vector3(20, -1, -9),
			
								// baixo da asa direita
								new THREE.Vector3(-40, -1, 60),
								new THREE.Vector3(-7, -1, 9),
								new THREE.Vector3(-7, -1, 20),
								new THREE.Vector3(-30, -1, 60),
								new THREE.Vector3(5, -1, 25),
								new THREE.Vector3(20, -1, 9)   
							  )
		
		geometry.faces.push(
							 // cima da asa esquerda
							 new THREE.Face3(2, 1, 0),
							 new THREE.Face3(1, 2, 4),
							 new THREE.Face3(2, 3, 5),
							 new THREE.Face3(5, 4, 2),
							 // baixo da asa esquerda
							 new THREE.Face3(12, 13, 14),
							 new THREE.Face3(13, 16, 14),
							 new THREE.Face3(14, 16, 17),
							 new THREE.Face3(17, 15, 14),
							 // lateral da asa esquerda
							 new THREE.Face3(2, 0, 14),
							 new THREE.Face3(12, 14, 0),
							 new THREE.Face3(0, 1, 13),
							 new THREE.Face3(13, 12, 0),
							 new THREE.Face3(1, 4, 16),
							 new THREE.Face3(16, 13, 1),
							 new THREE.Face3(4, 5, 17),
							 new THREE.Face3(17, 16, 4),
							 new THREE.Face3(3, 2, 15),
							 new THREE.Face3(14, 15, 2),
			
							 // cima da asa direita
							 new THREE.Face3(9, 8, 6),
							 new THREE.Face3(8, 9, 10),
							 new THREE.Face3(8, 10, 11),
							 new THREE.Face3(7, 8, 11),
							 // baixo da asa direita
							 new THREE.Face3(18, 20, 21),
							 new THREE.Face3(20, 22, 21),
							 new THREE.Face3(20, 23, 22),
							 new THREE.Face3(20, 19, 23),
							 // lateral da asa direita
							 new THREE.Face3(9, 6, 21),
							 new THREE.Face3(18, 21, 6),
							 new THREE.Face3(6, 8, 20),
							 new THREE.Face3(20, 18, 6),
							 new THREE.Face3(8, 7, 19),
							 new THREE.Face3(19, 20, 8),
							 new THREE.Face3(11, 10, 22),
							 new THREE.Face3(22, 23, 11),
							 new THREE.Face3(10, 9, 21),
							 new THREE.Face3(21, 22, 10),
							 )
				 
		geometry.computeVertexNormals()
		geometry.computeFaceNormals()
		
		for(let i in geometry.faces){
			var face = geometry.faces[i]
			face.vertexColors[0] = new THREE.Color(0xBBFFFF)
			face.vertexColors[1] = new THREE.Color(0xBBFFFF)
			face.vertexColors[2] = new THREE.Color(0xBBFFFF)
		}
		
		mesh = new THREE.Mesh(geometry, this.material)
		mesh.castShadow = true
		// mesh.receiveShadow = true
		
		mesh.position.set(x, y, z)
		meshs.push(mesh)
		this.add(mesh)
	}
	
	addHorizontalStabilizer(x, y, z) {
		'use strict'
		var dim = {h: 15, d: 35, w: 2}

		geometry = new THREE.Geometry()
		
		geometry.vertices.push( // Right
								new THREE.Vector3(-dim.d, 0, 5),
								new THREE.Vector3(-dim.d-3, 0, 5+dim.h),
								new THREE.Vector3(0, 0, 5),
								new THREE.Vector3(-dim.d, -dim.w, 5),
								new THREE.Vector3(-dim.d-3, -dim.w, 5+dim.h),
								new THREE.Vector3(0, -dim.w, 5),
								
								// Left
								new THREE.Vector3(-dim.d, 0, -5),
								new THREE.Vector3(-dim.d-3, 0, -5-dim.h),
								new THREE.Vector3(0, 0, -5),
								new THREE.Vector3(-dim.d, -dim.w, -5),
								new THREE.Vector3(-dim.d-3, -dim.w, -5-dim.h),
								new THREE.Vector3(0, -dim.w, -5),
								)
		
		geometry.faces.push( // Right
							 new THREE.Face3(0, 1, 2),
							 new THREE.Face3(3, 5, 4),
							 new THREE.Face3(1, 0, 3),
							 new THREE.Face3(3, 4, 1),
							 new THREE.Face3(5, 2, 1),
							 new THREE.Face3(1, 4, 5),

							 //Left
							 new THREE.Face3(6, 8, 7),
							 new THREE.Face3(11, 9, 10),
							 new THREE.Face3(6, 7, 10),
							 new THREE.Face3(10, 9, 6),
							 new THREE.Face3(7, 8, 11),
							 new THREE.Face3(11, 10, 7),
							 )
							 
		geometry.computeVertexNormals()
		geometry.computeFaceNormals()
		
		for(let i in geometry.faces){
			var face = geometry.faces[i]
			face.vertexColors[0] = new THREE.Color(0xBBFFFF)
			face.vertexColors[1] = new THREE.Color(0xBBFFFF)
			face.vertexColors[2] = new THREE.Color(0xBBFFFF)
		}
		
		mesh = new THREE.Mesh(geometry, this.material)
		mesh.castShadow = true
		// mesh.receiveShadow = true
		
		mesh.position.set(x, y, z)
		meshs.push(mesh)
		this.add(mesh)
	}
	
	addVerticalStabilizer(x, y, z) {
		'use strict'
		var dim = {h: 15, d: 35, w: 2}
		
		geometry = new THREE.Geometry()
		
		geometry.vertices.push( new THREE.Vector3(0, 0, -dim.w/2),
								new THREE.Vector3(0, 0, dim.w/2),
								new THREE.Vector3(-dim.d, dim.h, -dim.w/2),
								new THREE.Vector3(-dim.d, dim.h, dim.w/2),
								new THREE.Vector3(-dim.d, 0, -dim.w/2),
								new THREE.Vector3(-dim.d, 0, dim.w/2)
								)
		
		geometry.faces.push( new THREE.Face3(1, 0, 3),
							 new THREE.Face3(0, 2, 3),
							 new THREE.Face3(2, 0, 4),
							 new THREE.Face3(5, 1, 3),
							 new THREE.Face3(3, 2, 5),
							 new THREE.Face3(4, 5, 2)
							 )
							 
		geometry.computeVertexNormals()
		// geometry.computeFaceNormals()
		
		for(let i in geometry.faces){
			var face = geometry.faces[i]
			face.vertexColors[0] = new THREE.Color(0xBBFFFF)
			face.vertexColors[1] = new THREE.Color(0xBBFFFF)
			face.vertexColors[2] = new THREE.Color(0xBBFFFF)
		}
		
		mesh = new THREE.Mesh(geometry, this.material)
		mesh.castShadow = true
		// mesh.receiveShadow = true
		
		mesh.position.set(x, y, z)
		meshs.push(mesh)
		this.add(mesh)
	}
	
	initTurn() {
		'use strict'
		
		this.turnLeft = 0
		this.turnRight = 0
		this.turnUp = 0
		this.turnDown = 0

		this.axisX = new THREE.Vector3(1,0,0)
		this.axisY = new THREE.Vector3(0,1,0)
		this.axisZ = new THREE.Vector3(0,0,1)
	}
	
	setTurnLeft(value) {
		'use strict'
		this.turnLeft = value
	}

	setTurnRight(value) {
		'use strict'
		this.turnRight = value
	}
	
	setTurnUp(value) {
		'use strict'
		this.turnUp = value
	}
	
	setTurnDown(value) {
		'use strict'
		this.turnDown = value
	}

	updateTurn() {
		'use strict'

		var rotation = Math.PI/96
		if (this.turnUp) this.rotateOnAxis(this.axisZ, -rotation)
		if (this.turnDown) this.rotateOnAxis(this.axisZ, rotation)
		if (this.turnLeft) this.rotateOnAxis(this.axisY, rotation)
		if (this.turnRight) this.rotateOnAxis(this.axisY, -rotation)
		
		// if (this.turnUp) {
		//     this.rotateOnAxis(this.axisZ, -rotation)
		//     this.axisY.applyAxisAngle(this.axisZ, rotation)
		// }
		// if (this.turnDown) {
		//     this.rotateOnAxis(this.axisZ, rotation)
		//     this.axisY.applyAxisAngle(this.axisZ, -rotation)
		// }
		// if (this.turnLeft) {
		//     this.rotateOnAxis(this.axisY, rotation)
		//     this.axisX.applyAxisAngle(this.axisY, -rotation)
		// }
		// if (this.turnRight) {
		//     this.rotateOnAxis(this.axisY, -rotation)
		//     this.axisX.applyAxisAngle(this.axisY, rotation)
		// }
	}
}
