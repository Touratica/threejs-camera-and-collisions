class PoolTable extends Component {
	constructor(x, y, z, innerDepth, innerWidth, innerHeight, outerHeight, wallThickness, holeRadius) {
		super();
		this.innerDepth = innerDepth;
		this.innerWidth = innerWidth;
		this.innerHeight = innerHeight;
		this.outerDepth = innerDepth + wallThickness;
		this.outerWidth = innerWidth + wallThickness;
		this.outerHeight = outerHeight;
		this.holeRadius = holeRadius;
		
		this.position.set(x, y, z);
	}

	addBase() {
		let base = new Component();

		// Create a table shape
		let table = new THREE.Shape();
		table.moveTo(-this.innerDepth / 2, -this.innerWidth / 2);
		table.lineTo(-this.innerDepth / 2, this.innerWidth / 2);
		table.lineTo(this.innerDepth / 2, this.innerWidth / 2);
		table.lineTo(this.innerDepth / 2, -this.innerWidth / 2);

		// Adds top left hole
		let hole = new THREE.Path();
		hole.moveTo(-this.innerDepth / 2, -this.innerWidth / 2 + this.holeRadius);
		hole.absarc(-this.innerDepth / 2 + this.holeRadius, -this.innerWidth / 2 + this.holeRadius, this.holeRadius, 0, 2 * Math.PI, false);
		table.holes.push(hole);

		// Adds top center hole
		hole = new THREE.Path();
		hole.moveTo(-this.innerDepth / 2, 0);
		hole.absarc(-this.innerDepth / 2 + this.holeRadius, 0, this.holeRadius, 0, 2 * Math.PI, false);
		table.holes.push(hole);

		// Adds top right hole
		hole = new THREE.Path();
		hole.moveTo(-this.innerDepth / 2 + this.holeRadius, this.innerWidth / 2);
		hole.absarc(-this.innerDepth / 2 + this.holeRadius, this.innerWidth / 2 - this.holeRadius, this.holeRadius, 0, 2 * Math.PI, false);
		table.holes.push(hole);

		// Adds bottom right hole
		hole = new THREE.Path();
		hole.moveTo(this.innerDepth / 2 - this.holeRadius, this.innerWidth / 2);
		hole.absarc(this.innerDepth / 2 - this.holeRadius, this.innerWidth / 2 - this.holeRadius, this.holeRadius, 0, 2 * Math.PI, false);
		table.holes.push(hole);

		// Adds bottom center hole
		hole = new THREE.Path();
		hole.moveTo(this.innerDepth / 2, 0);
		hole.absarc(this.innerDepth / 2 - this.holeRadius, 0, this.holeRadius, 0, 2 * Math.PI, false);
		table.holes.push(hole);

		// Adds bottom left hole
		hole = new THREE.Path();
		hole.moveTo(this.innerDepth / 2, -this.innerWidth / 2 + this.holeRadius);
		hole.absarc( this.innerDepth / 2 - this.holeRadius, -this.innerWidth / 2 + this.holeRadius, this.holeRadius, 0, 2 * Math.PI, false );
		table.holes.push(hole);

		// Extrude the shape into a geometry, and create a mesh from it:
		let extrudeSettings = {
			steps: 1,
			depth: innerHeight,
			bevelEnabled: false,
		};
		let geom = new THREE.ExtrudeGeometry(table, extrudeSettings);
		let mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: "green" }));
		mesh.position.set(0, 0, -thistory.innerHeight / 2);
		base.add(mesh);
		this.addComponent(base, 0, 0, -this.outerHeight + this.innerHeight / 2);
	}

	addFrame() {
		// Create a table shape
		let frame = new THREE.Shape();
		frame.moveTo(-this.outerDepth / 2, -this.outerWidth / 2);
		frame.lineTo(-this.OuterDepth / 2, this.outerWidth / 2);
		frame.lineTo(this.OuterDepth / 2, this.outerWidth / 2);
		frame.lineTo(this.outerDepth / 2, -this.outerWidth / 2);
		
		// Adds top left hole
		let hole = new THREE.Path();
		hole.moveTo(-this.innerDepth / 2, -this.innerWidth / 2);
		hole.lineTo(-this.innerDepth / 2, this.innerWidth / 2);
		hole.lineTo(this.innerDepth / 2, this.innerWidth / 2);
		hole.lineTo(this.innerDepth / 2, -this.innerWidth / 2);
		frame.holes.push(hole);
		
		// Extrude the shape into a geometry, and create a mesh from it:
		let extrudeSettings = {
			steps: 1,
			depth: this.outerHeight,
			bevelEnabled: false,
		};
		let geom = new THREE.ExtrudeGeometry(frame, extrudeSettings);
		let mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: "brown" }))
		mesh.position.set(0, 0, -this.outerHeight / 2);

		let outerFrame = new Component();		
		outerFrame.add(mesh);
		this.addComponent(outerFrame, 0, 0, 0);
	}
}