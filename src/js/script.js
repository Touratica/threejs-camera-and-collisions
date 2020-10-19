/*global THREE*/

let camera, TopCamera/*1*/, PerspectiveCamera /*2*/ , MobileCamera /*3*/;

let scene, renderer;
let clock = new THREE.Clock();
let cameraRatio = 24;

let cueThickness = 0.6;
let baseFront = 0.3;
let baseBack = 0.5;
let cueHeight = 10;
let numbCues = 6;
let cue;

let tableDepth = 20;
let tableWidth = 40;
let tableHeight = 10;
let wallThickness = 0.5;

let ballRadius = 1;
let numbBalls = 15;

let balls = [];
let cues = [];

let time = clock.getDelta();

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

let ballMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});

function randFloat(low, high) {
	return low + Math.random() * ( high - low );
}

function createCues() {
	if (i >= 1) {
		let x = 0;
		let y = -tableWidth / 2 - cueHeight / 2 - wallThickness;
		let z = ballRadius/2;
		let angle = 0;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	if (i >= 2) {
		let x = -tableDepth / 2 - cueHeight / 2 - wallThickness;
		let y = -tableWidth / 4;
		let z = ballRadius / 2;
		let angle = -Math.PI / 2;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	if (i >= 3) {
		let x = -tableDepth / 2 - cueHeight / 2 - wallThickness;
		let y = tableWidth / 4;
		let z = ballRadius / 2;
		let angle = -Math.PI / 2;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	if (i >= 4) {
		let x = 0;
		let y = tableWidth / 2 + cueHeight / 2 + wallThickness;
		let z = ballRadius / 2;
		let angle = Math.PI;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	if (i >= 5) {
		let x = tableDepth / 2 + cueHeight / 2 + wallThickness;
		let y = tableWidth / 4;
		let z = ballRadius / 2;
		let angle = Math.PI / 2;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	if (i >= 6) {
		let x = tableDepth / 2 + cueHeight / 2 + wallThickness;
		let y = -tableWidth / 4;
		let z = ballRadius / 2;
		let angle = Math.PI / 2;

		let new_cue = new Cue(x, y, z, angle, baseFront, baseBack, cueHeight);

		scene.add(new_cue);
		cues.push(new_cue);
	}
	cue = cues[0];
}


function createPoolTable() {
	let poolTable = new PoolTable(0, 0, 0, tableDepth, tableWidth, tableHeight, wallThickness, ballRadius);
	scene.add(poolTable);
}

function select_cue(n) {
	cue.unselect();
	cue = cues[n];
	cue.select();
}

function rotate(velocity, angle) {
    return {
    	x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
		y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}

function resolveCollision(ball, otherBall) {
    let xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
    let yVelocityDiff = ball.velocity.y - otherBall.velocity.y;

    let xDist = otherBall.x - ball.x;
    let yDist = otherBall.y - ball.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Angle between two balls
        let angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);

        // Store mass in let for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(ball.velocity, angle);
        const u2 = rotate(otherBall.velocity, angle);

        // Velocity after 1d collision equation
       const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
       const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

        // Final velocity after rotating axis back to original location
       	const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        ball.velocity.x = vFinal1.x;
       	ball.velocity.y = vFinal1.y;

        otherBall.velocity.x = vFinal2.x;
        otherBall.velocity.y = vFinal2.y;
    }
}

function updateBalls() {
	for (let i = 0; i < balls.length; i++) {
		for (let j = 0; j < balls.length; j++) {
			 if (balls[i] === balls[j]) {
			 	continue;
			 }
			 if (distance(balls[i].position.x, balls[i].position.y, balls[j].position.x,
				 balls[j].position.y) - ballRadius * 2 < 0) {
			 	// There's collision!!
				 resolveCollision(balls[i], balls[j]);
			 }
		}
		if (balls[i].position.x - ballRadius < -tableDepth / 2 || balls[i].position.x + ballRadius > tableDepth / 2) {
			balls[i].velocity.x = -balls[i].velocity.x;
		}
		if (balls[i].position.y - ballRadius < -tableWidth / 2 || balls[i].position.y + ballRadius > tableWidth / 2) {
			balls[i].velocity.y = -balls[i].velocity.y;
		}
		balls[i].position.x += balls[i].velocity.x * 0.1;
		balls[i].position.y += balls[i].velocity.y * 0.1;
	}
}

function distance(x1, y1, x2, y2) {
	let xDistance = x2 - x1;
	let yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
}

function createInitialBalls() {
	let positionX;
	let positionY;
	let velocity;
	let direction; // ..? 
	let ball;
	for (i = 0; i < numbBalls; i++) {
		positionY = randFloat(-tableWidth / 2 + wallThickness + ballRadius / 2,
			tableWidth / 2 - wallThickness - ballRadius / 2);
		positionX = randFloat(-tableDepth / 2 + wallThickness + ballRadius / 2,
			tableDepth / 2 - wallThickness - ballRadius / 2);
		velocity = randFloat(0,100);
		if (i != 0) {
			//ciclo para comparar se a nova posicao da bola nao coincide com a
			//posicao de outra bola
			for (let j = 0; j < balls.length; j++) {
				if (distance(positionX, positionY, balls[j].position.x, balls[j].position.y) - ballRadius * 2 < 0) {
					positionY = randFloat(-tableWidth / 2 + wallThickness + ballRadius / 2,
						tableWidth / 2 - wallThickness - ballRadius / 2);
					positionX = randFloat(-tableDepth / 2 + wallThickness + ballRadius / 2,
								tableDepth / 2 - wallThickness - ballRadius / 2);
					j = -1; //renolet o ciclo para confirmar novamente
				}
			}
		}
		balls[i]= new Ball(positionX, positionY, wallThickness, ballRadius, ballMaterial);
		
		scene.add(balls[i]);
		balls[i].addBallAxis();
	}
}

function createCameraTop(x, y, z) {
	// Adjusts camera ratio so the mobile is totally visible in its starting position
	if (window.innerWidth / window.innerHeight > 2.64) {
		cameraRatio = window.innerHeight / 25;
	}
	else {
		cameraRatio = window.innerWidth / 60;
	}
	camera = new THREE.OrthographicCamera(window.innerWidth / -(2 * cameraRatio),
		window.innerWidth / (2 * cameraRatio), window.innerHeight / (2 * cameraRatio),
		window.innerHeight / -(2 * cameraRatio), 0, 1000);
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	camera.lookAt(scene.position);
	return camera;
}

function createPerspectiveCamera(x,y,z){
	if (window.innerWidth / window.innerHeight > 2.64) {
		cameraRatio = window.innerHeight / 25;
	}
	else {
		cameraRatio = window.innerWidth / 60;
	}
	/*camera = new THREE.PerspectiveCamera( window.innerWidth / -(2 * cameraRatio),
	window.innerWidth / (2 * cameraRatio), window.innerHeight / (2 * cameraRatio),
	window.innerHeight / -(2 * cameraRatio), 0, 1000 );*/

	camera = new THREE.PerspectiveCamera(60,innerWidth / innerHeight,1,2000);
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	camera.lookAt(scene.position);
	return camera;
}

function createMobileCamera(){
	if (window.innerWidth / window.innerHeight > 2.64) {  //...
		cameraRatio = window.innerHeight / 25;
	}
	else {
		cameraRatio = window.innerWidth / 60;
	}
	camera = new THREE.PerspectiveCamera( window.innerWidth / -(2 * cameraRatio),
	window.innerWidth / (2 * cameraRatio), window.innerHeight / (2 * cameraRatio),
	window.innerHeight / -(2 * cameraRatio), 0, 1000 );

    /*camera.position.set(currentBall.position.x, currentBall.position.y, currentBall.position.z);*/
    //camera.lookAt();
	
	return camera;
}

function createScene() {
	scene = new THREE.Scene();

	// Adds axes to the scene: x-axis is red, y-axis is green, z-axis is blue
	scene.add(new THREE.AxesHelper(20));

	createPoolTable();

	createCues();
	createInitialBalls();
	//createBallsFixed();
}

function animate() {
	//  animation functions
	let speed = 5;
	let angSpeed = 1;
	
	requestAnimationFrame(animate);
	/*balls.forEach(ball => {
		ball.update(balls);
	});*/
	updateBalls();

	
	renderer.render(scene, camera);
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Adjusts camera ratio so the mobile would be totally visible in its starting position
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (window.innerWidth / window.innerHeight > 2.64) {
			cameraRatio = window.innerHeight / 25;
		}
		else {
			cameraRatio = window.innerWidth / 60;
		}
		camera.left = window.innerWidth / -(2 * cameraRatio);
		camera.right = window.innerWidth / (2 * cameraRatio);
		camera.top = window.innerHeight / (2 * cameraRatio);
		camera.bottom = window.innerHeight / -(2 * cameraRatio);
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
			/*switchAngleCueR(currentCue)*/
			break;
		case "ArrowLeft":
			/*switchAngleCueL(currentCue)*/
			break;
	}
}

function onKeyUp(e) {
	switch (e.key) {
		case "ArrowRight":
		case "ArrowLeft":
			/*parar o moviemento do currentCue*/
			/*currentCue.setRotation("stop");*/
			break;
	}
}

function __init__() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor("#FFFFFF");
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	TopCamera = createCameraTop(0, 0, 100);        //view from z

	PerspectiveCamera = createPerspectiveCamera(20, 5, 20); 
	MobileCamera = createMobileCamera();    //view from ball

	window.addEventListener("resize", onResize)
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}