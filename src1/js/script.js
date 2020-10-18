/*global THREE*/
let camera, TopCamera/*1*/, PerspectiveCamera /*2*/ , MobileCamera /*3*/;

let scene, renderer;
let clock = new THREE.Clock();
let cueThickness = 0.6;
let cameraRatio = 24;
let Tableheight = 10;
let Tablewidth = 20;
let Ballradius = 1;
let wall_thickness = 0.5;

// Sets the z-axis as the top pointing one
THREE.Object3D.DefaultUp.set(0, 0, 1);

let ballMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
let cueMaterial = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
let tableMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});


function createPool() {

	pool = new PoolTable(0, 0, 2*Ballradius,Tablewidth, Tableheight,Ballradius,tableMaterial,wall_thickness);
	scene.add(pool);

	//createCues();
	//createBallsFixed();
	//createBallsMoving();
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

	camera = new THREE.PerspectiveCamera(45,innerWidth/innerHeight,1,100);
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

	createPool();	
}

function animate() {
	//  animation functions
	let speed = 5;
	let time = clock.getDelta();
	let angSpeed = 1;


	requestAnimationFrame(animate);
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
			/* shootCueOn(1)*/
			break;

		case "5":
			/* shootCue(2)*/
			break;
		
		case "6":
			/* shootCue(3)*/
			break;
		case "7":
			/* shootCue(4)*/
			break;
		case "8":
			/* shootCue(5)*/
			break;
		case "9":
			/* shootCue(6)*/
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