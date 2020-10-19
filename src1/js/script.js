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
let tableMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});

function randFloat( low, high ) {

	return low + Math.random() * ( high - low );

}

function createCues(){
	for (i=1; i<=numbCues; i++){
		var x,y,z;
		var angle;

		if(i==1){
			x = 0;
			y = -tableWidth/2 -cueHeight/2 - wallThickness ;
			z = ballRadius/2;
			angle = 0;
		}

		else if (i==2){
			x = -tableDepth/2 -cueHeight/2 - wallThickness;
			y = -tableWidth/4;
			z = ballRadius/2;
			angle = -Math.PI/2;
		}

		else if (i==3){
			x = -tableDepth/2 -cueHeight/2 - wallThickness;
			y = tableWidth/4;
			z = ballRadius/2;
			angle = -Math.PI/2;
		}

		else if (i==4){
			x = 0;
			y = tableWidth/2 +cueHeight/2 + wallThickness ;
			z = ballRadius/2;
			angle = Math.PI;
		}

		else if (i==5){
			x = tableDepth/2 +cueHeight/2 + wallThickness;
			y = tableWidth/4;
			z = ballRadius/2;
			angle = Math.PI/2;
		}

		else if (i==6){
			x = tableDepth/2 + cueHeight/2 + wallThickness;
			y = -tableWidth/4;
			z = ballRadius/2;
			angle = Math.PI/2;
			
		}

		var cue = new Cue(x, y, z,angle,baseFront,baseBack,cueHeight);
		
		scene.add(cue);
		cues.push(cue);
	}

	cue = cues[0];
}


function createPool() {
	pool = new PoolTable(0, 0, 0, tableDepth, tableWidth, tableHeight, wallThickness, ballRadius);
	scene.add(pool);
}

function select_cue(){
//	cue.select();
}
/*function updateBalls()
{
	for(let i =0;i<balls.length;i++)
	{
		if()
	}
}*/

function distance(x1,y1,x2,y2)
{
	var xDistance= x2-x1;
	var yDistance = y2-y1;
	return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
}

function createInitialBalls() {
	var position_x;
	var position_y;
	var velocity;
	var direction; // ..? 
	var ball;
	for(i=0; i<numbBalls; i++)
	{
		position_y = randFloat(-tableWidth/2+wallThickness+ballRadius/2, tableWidth/2-wallThickness-ballRadius/2)
		position_x = randFloat(-tableDepth/2+wallThickness+ballRadius/2, tableDepth/2-wallThickness -ballRadius/2)
		velocity = randFloat(0,100)
		if(i!=0)
		{ //ciclo para comparar se a nova posicao da bola nao coincide com a 
			//posicao de outra bola
			for(var j=0 ; j<balls.length;j++)
			{
				if(distance(position_x,position_y,balls[j].position.x,balls[j].position.y) 
					- ballRadius*2 <0)
				{
					position_y = randFloat(-tableWidth/2+wallThickness+ballRadius/2, 
								tableWidth/2-wallThickness-ballRadius/2)

					position_x = randFloat(-tableDepth/2+wallThickness+ballRadius/2, 
								tableDepth/2-wallThickness -ballRadius/2)
					j=-1 //renovar o ciclo para confirmar novamente
		
				}
			}
		} //testar! 
		
		balls[i]= new Ball(position_x,position_y,wallThickness,ballRadius,ballMaterial,velocity)
		
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

	camera = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,1,2000);
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

	createCues();
	createInitialBalls();
	//createBallsFixed();
	
}

function animate() {
	//  animation functions
	let speed = 5;
	let angSpeed = 1;

	select_cue();
/*	for (var i = 0; i < balls.length; i++) {
        var aux = balls[i];
        if (aux.getMovement()) {
            aux.updatePosition();
            


        if (aux.position.x > 165 && (!aux.getMoving() || aux.getXVelocity() > 0)) {
            if (i == 3)
                specialBall = cannon[0];

            balls.splice(i, 1);
            scene.remove(aux);
            var x = balls[currentCannon].position.x
            var y = balls[currentCannon].position.y
            var z = balls[currentCannon].position.z
            camera[2] = createCamera(x + 60, y + 4, z + 10, 1);
        }

*/
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
			cue.unselect();
			cue = cue[0];
			break;

		case "5":
			cue.unselect();
			cue = cue[1];
			break;
		
		case "6":
			cue.unselect();
			cue = cue[2];
			break;
		case "7":
			cue.unselect();
			cue = cue[3];
			break;
		case "8":
			cue.unselect();
			cue = cue[4];
			break;
		case "9":
			cue.unselect();ret
			cue = cue[5];
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