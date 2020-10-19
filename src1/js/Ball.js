class Ball extends Component{
    constructor(x, y, z,raio,material,v) {
        super(x, y, z);
        this.addSphere(material,0,0,0,raio)
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.axis = new THREE.AxesHelper(3);
        this.hasAxis = false;
        this.movement = true;
        this.rotationDirection = new THREE.Vector2(-1, 0);
        this.degrees = 0;
      /*  this.update = Balls => {
            
            for(let i =0;i<balls.length;i++)
            {
                if()

            }
        
*/
        }

    addBallAxis() {
        this.hasAxis = !this.hasAxis;
        if (this.hasAxis)
            this.add(this.axis);
        else
            this.remove(this.axis);
    }











    setMovement(m) {
        this.movement = m;
    }

    setVelocity(speed) {
        this.rotationDirection.x = speed;
    }

    getMovement() {
        return this.movement;
    }


    getXSpeed() {
        return this.rotationDirection.x;
    }

    getYSpeed() {
        return this.rotationDirection.y;
    }

    setSpeed(speed) {
        this.rotateDirection.x = speed;
    }

    rotateBall(angle) {
        this.rotationDirection.y += angle;
        this.degrees += angle;
    }

    updatePosition() {
        //velocidade muito baixa
        if(this.rotationDirection.x>0)
        {
            if(this.rotationDirection.x<0.1)
            {
                this.movement = false;
            }
        }
         
        if(this.rotationDirection.x <0)
        {
            if(this.rotationDirection.x>-0.1)
            {
                this.moving = false;
            }
        }
        if (this.rotateDirection.x < 0) {
            if (this.rotateDirection.x > -0.1) {
                this.moving = false;
            }
        }

        this.position.x += this.rotatationDirection.x;
        this.position.z += this.rotatationDirection.y;

        this.rotateOnWorldAxis(new THREE.Vector3(this.rotatationDirection.y, 0, -this.rotationDirection.x), Math.PI / 180);
    }



}