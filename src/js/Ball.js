class Ball extends Component {
	constructor(radius, poolTable, x, y,material,velocity) {
		super();
		this.radius = radius;
        this.position.set(x, y, this.radius); //fix balls z ; they are swimming
            //in the pool
        this.velocity = velocity;

        this.mass = 1;
		this.poolTable = poolTable;
        this.ball = this.addSphere(material,0,0,0,this.radius);
 
		//this.axes = new THREE.AxesHelper(this.radius * 5);
        //this.add(this.axes);
        this.hasAxis = false;
        this.axis = new THREE.AxesHelper(3);
    }
    
    addBallAxis() {
        this.hasAxis = !this.hasAxis;
        if (this.hasAxis)
            this.add(this.axis);
        else
            this.remove(this.axis);
    }

	addShape() {

		/*let ball = new Component();
		ball.addSphere(new THREE.MeshBasicMaterial({color: "red"}),0,0,0, this.radius);
		this.addComponent(ball,0, 0, 0);*/
    }
    distanceToBall(ball_x, ball_y) {
        let xDistance = ball_x - this.position.x;
        let yDistance = ball_y - this.position.y;
    
        return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
    }
	move(timeDelta) {
		let velocityX = this.velocity.x * timeDelta;
		let velocityY = this.velocity.y * timeDelta;

		let hasCollided = false;
		let distance = this.poolTable.innerDepth / 2 - (Math.abs(this.position.x) + this.radius);
		if (distance <= Math.abs(velocityX) && Math.sign(this.position.x) === Math.sign(velocityX)) {
			// TODO: #2 Second condition can't be the way it is: if this.velocity.x > poolTable.innerDepth / 2, it fails
			hasCollided = true;
			this.position.x = Math.sign(this.position.x) * (this.poolTable.innerDepth / 2 - this.radius - (velocityX - distance) * this.poolTable.wallCOR);
			this.rotateY((2 * distance - velocityX) / this.radius);
			this.velocity.x = -this.velocity.x * this.poolTable.wallCOR;
		}
		distance = this.poolTable.innerWidth / 2 - (Math.abs(this.position.y) + this.radius);
		if (distance <= Math.abs(velocityY) && Math.sign(this.position.y) === Math.sign(velocityY)) {
			// TODO: #1 Second condition can't be the way it is: if this.velocity.y > poolTable.innerWidth / 2, it fails
			hasCollided = true;
			this.position.y = Math.sign(this.position.y) * (this.poolTable.innerWidth / 2 - this.radius - (velocityY - distance) * this.poolTable.wallCOR);
			this.rotateX(-(2 * distance - velocityY) / this.radius);
			this.velocity.y = -this.velocity.y * this.poolTable.wallCOR;
        }
        if(Math.abs(velocityX) < 0.01 && Math.abs(velocityY) < 0.01)
        {
            this.velocity.x = 0;
            this.velocity.y =0;
        }
        
        

		if (hasCollided) {
			return;
		}
       

		this.position.x += velocityX ;
		this.rotateY(velocityX / this.radius);
		this.position.y += velocityY;
		this.rotateX(-velocityY / this.radius);
	}

    rotate(velocity, angle) {
        return {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
    }
    
    resolveCollision(ball, otherBall) {
    
        
       let xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
        let yVelocityDiff = ball.velocity.y - otherBall.velocity.y;
        
    
        let xDist = otherBall.position.x - ball.position.x;
        let yDist = otherBall.position.y - ball.position.y;

        
    
            if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
                console.log("ok");
    
            // Angle between two balls
            let angle = -Math.atan2(otherBall.position.y - ball.position.y, otherBall.position.x - ball.position.x);
    
            // Store mass in let for better readability in collision equation
            const m1 = ball.mass;
            const m2 = otherBall.mass;
    
            // Velocity before equation
            const u1 = this.rotate(ball.velocity, angle);
            const u2 = this.rotate(otherBall.velocity, angle);
    
            // Velocity after 1d collision equation
           const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
           const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};
    
            // Final velocity after rotating axis back to original location
               const vFinal1 = this.rotate(v1, -angle);
            const vFinal2 = this.rotate(v2, -angle);
    
            // Swap particle velocities for realistic bounce effect
            ball.velocity.x = vFinal1.x;
            ball.velocity.y = vFinal1.y;
    
    
            otherBall.velocity.x = vFinal2.x;
            otherBall.velocity.y = vFinal2.y;
       }
    }
	update(timeDelta,balls,size) {
        this.move(timeDelta);
       for(i=0;i<size;i++)
        {
           // console.log("for");
            if(this == balls[i])
            {
                console.log("tou aqui");
                continue;
                
            }
         
            if(this.distanceToBall(balls[i].position.x,balls[i].position.y) - this.radius * 2 <= 0) /*two balls have colided*/
           {
                console.log("colision!!");
                this.resolveCollision(this,balls[i]);
                
            }
        }


       
        
	}

	set_velocity(px,py){
        this.velocity.x = px;
        this.velocity.y = py;
    }
}