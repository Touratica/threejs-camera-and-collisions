let camera, TopCamera/*1*/, PerspectiveCamera /*2*/, MobileCamera /*3*/;

let scene, renderer;
let clock = new THREE.Clock();
let cameraRatio = 20;

let cueThickness = 0.6;
let baseFront = .5;
let baseBack = 1;
let cueHeight = 50;
let numbCues = 6;
let cue;

let poolTable;
let tableDepth = 35, tableWidth = 70, tableHeight = 3;
let wallThickness = 5;


let ballRadius = 1;
let numbBalls = 15;

let balls = [];
let cues = [];

let time = clock.getDelta();

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

let ballMaterial = new THREE.MeshBasicMaterial({color: "red"});

// Generates a random number within a range
function randFloat(low, high) {
	return low + Math.random() * (high - low);
}

// Gets distance between two points
function distance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

function createCues() {
	for (let i = 1; i <= numbCues; i++) {
		let x, y, z;
		let angle;

		if (i === 1) {
			x = 0;
			y = -tableWidth / 2 + (4 / 3) * ballRadius ; // (4/3) so the ball wont stay right next to the wall
			z = ballRadius;
			angle = 0;
		}
		else if (i === 2) {
			x = -tableDepth / 2  + (4 / 3) * ballRadius;
			y = -tableWidth / 4;
			z = ballRadius;
			angle = -Math.PI / 2;
		}
		else if (i === 3) {
			x = -tableDepth / 2 + (4 / 3) * ballRadius;
			y = tableWidth / 4;
			z = ballRadius;
			angle = -Math.PI / 2;
		}
		else if (i === 4) {
			x = 0;
			y = tableWidth / 2 - (4 / 3) * ballRadius;
			z = ballRadius;
			angle = Math.PI;
		}
		else if (i === 5) {
			x = tableDepth / 2 - (4 / 3) * ballRadius;
			y = tableWidth / 4;
			z = ballRadius;
			angle = Math.PI / 2;
		}
		else if (i === 6) {
			x = tableDepth / 2 - (4 / 3) * ballRadius
			y = -tableWidth / 4;
			z = ballRadius;
			angle = Math.PI / 2;
		}

		let new_cue = new Cue(x, y, z,angle,baseFront,baseBack,cueHeight,ballRadius,wallThickness,poolTable);
		
		// scene.add(new_cue.get_steady_ball());
		scene.add(new_cue);
		cues.push(new_cue);
	}

	cue = cues[0];
	cue.select();
}


function createTable() {
	return new PoolTable(0, 0, 0, tableDepth, tableWidth, tableHeight, wallThickness, ballRadius);
}

function select_cue(n) {
	cue.unselect();
	cue = cues[n];
	cue.select();
}

function createInitialBalls() {
	let positionX;
	let positionY;

	for (let i = 0; i < numbBalls; i++) {
		/*random position in the table pool*/
		positionY = randFloat(-tableWidth / 2 + ballRadius / 2,
			tableWidth / 2  - ballRadius / 2);
		positionX = randFloat(-tableDepth / 2  + ballRadius / 2,
			tableDepth / 2  - ballRadius / 2);

			if (i !== 0) {
			// For loop to compare if the new position of the ball is not the same as other ball
			for (let j = 0; j < balls.length; j++) {
				if (distance(positionX, positionY, balls[j].position.x, balls[j].position.y) < ballRadius * 2) {
					positionY = randFloat(-tableWidth / 2 + wallThickness + ballRadius / 2,
						tableWidth / 2 - wallThickness - ballRadius / 2);
					positionX = randFloat(-tableDepth / 2 + wallThickness + ballRadius / 2,
								tableDepth / 2 - wallThickness - ballRadius / 2);
					j --; //does the cicle again to check again the new positions
				}
			}
		}
		
		balls[i] = new Ball(ballRadius, poolTable, positionX, positionY, ballMaterial, new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20), 0);
		scene.add(balls[i]);
		balls[i].addBallAxis();
		poolTable.add(balls[i]);
	}
}

function createCameraTop(x, y, z) {
	// Adjusts camera ratio so the pool is totally visible 
	if (window.innerWidth / window.innerHeight > 1.2725) {
		cameraRatio = window.innerHeight / 150;
	}
	else {
		cameraRatio = window.innerWidth / 190;
	}
	/*OrthographicCamera( left, right, top, bottom, near, far )*/
	camera = new THREE.OrthographicCamera(window.innerWidth / -(2 * cameraRatio),
		window.innerWidth / (2 * cameraRatio), window.innerHeight / (2 * cameraRatio),
		window.innerHeight / -(2 * cameraRatio), 0, 1000);

	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	camera.lookAt(scene.position);
	return camera;
}

function createPerspectiveCamera(x, y, z) {
	/* PerspectiveCamera(fov, aspect, near, far)
	fov — Camera frustum vertical field of view. 
	aspect — Camera frustum aspect ratio.*/
	camera = new THREE.PerspectiveCamera(70,innerWidth / innerHeight, 1, 2000);
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	camera.lookAt(scene.position);
	return camera;
}

function createMobileCamera(){
	if (window.innerWidth / window.innerHeight > 2.64) {
		cameraRatio = window.innerHeight / 25;
	}
	else {
		cameraRatio = window.innerWidth / 120;
	}

	camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 1, 2000);
	/* PerspectiveCamera(fov, aspect, near, far)
	fov — Camera frustum vertical field of view. 
	aspect — Camera frustum aspect ratio.*/
	
	return camera;
}
// Movable camera that follows shooted ball
function updateMobileCamera(){
	camera.position.x = cue.get_ball_shooted().position.x - ballRadius;
	camera.position.y = cue.get_ball_shooted().position.y - ballRadius;
	camera.position.z = cue.get_ball_shooted().position.z + ballRadius / 2;

    camera.lookAt(cue.get_ball_shooted().position);
}


function createScene() {
	scene = new THREE.Scene();
	
	// Adds axes to the scene: x-axis is red, y-axis is green, z-axis is blue
	// scene.add(new THREE.AxesHelper(30));
	poolTable = createTable();
	scene.add(poolTable);

	createCues();
	createInitialBalls();
}

function animate() {
	//  animation functions

	let angSpeed = 1;

	let timeDelta = clock.getDelta();

	if (cue.get_rotation() === "Left") {
		cue.rotate_z(angSpeed * timeDelta);
	}

	if (cue.get_rotation() === "Right") {
		cue.rotate_z(-angSpeed * timeDelta);
	}

	if (cue.get_shoot()) {
		let e = cue.shoot_ball();
		scene.add(e);
		balls.push(e);
	}
	
	balls.forEach(ball => ball.update(timeDelta, balls, balls.length));
	
	if (camera === MobileCamera) {
		updateMobileCamera();
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (camera === TopCamera) {
		// Adjusts camera ratio so the pool would be totally visible
			if (window.innerWidth / window.innerHeight > 1.2725) {
				cameraRatio = window.innerHeight / 150;
			}
			else {
				cameraRatio = window.innerWidth / 190;
			}
			camera.left = window.innerWidth / -(2 * cameraRatio);
			camera.right = window.innerWidth / (2 * cameraRatio);
			camera.top = window.innerHeight / (2 * cameraRatio);
			camera.bottom = window.innerHeight / -(2 * cameraRatio);
		}
		else {
			camera.aspect = renderer.getSize(new THREE.Vector2()).width / renderer.getSize(new THREE.Vector2()).height;
		}
	}
	camera.updateProjectionMatrix();
}

function onKeyDown(e) {
	switch (e.key) {
		case "1":
			camera = TopCamera;
			onResize();
			break;
		case "2":
			camera = PerspectiveCamera;
			onResize();
			break;
		case "3":
			camera = MobileCamera;
			onResize();
			break;
		case "4":
			select_cue(0);
			break;
		case "5":
			select_cue(1);
			break;
		case "6":
			select_cue(2);
			break;
		case "7":
			select_cue(3);
			break;
		case "8":
			select_cue(4);
			break;
		case "9":
			select_cue(5);
			break;

		case "ArrowRight":
			cue.set_rotation("Right");
			break;

		case "ArrowLeft":
			cue.set_rotation("Left");
			break;

		case " ":	// Space character
			cue.set_shoot(true);
			break;
	}
}

function onKeyUp(e) {
	switch (e.key) {
		case "ArrowRight":
		case "ArrowLeft":
			cue.set_rotation("Stop");
			break;
	}
}

function __init__() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();

	PerspectiveCamera = createPerspectiveCamera(40, 40, 40); //perspective view
	MobileCamera = createMobileCamera();    //view from ball
	TopCamera = createCameraTop(0, 0, 100);        //view from z	
	
	window.addEventListener("resize", onResize)
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}