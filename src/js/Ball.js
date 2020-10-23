class Ball extends Component {
	constructor(radius, poolTable, x, y,material,velocity) {
		super();
		this.radius = radius;
        this.position.set(x, y, this.radius);
        this.velocity = velocity;

        this.mass = 1;
		this.poolTable = poolTable;
        this.addSphere(material,0,0,0,this.radius);

        this.hasAxis = false;
        this.axis = new THREE.AxesHelper(3);
        this.isFalling = false;
    }
    
    //adds a axis to a ball
    addBallAxis() {
        this.hasAxis = !this.hasAxis;
        if (this.hasAxis)
            this.add(this.axis);
        else
            this.remove(this.axis);
    }

    //distance between two balls
    distanceToBall(ball_x, ball_y) {
        let xDistance = ball_x - this.position.x;
        let yDistance = ball_y - this.position.y;
    
        return Math.sqrt(Math.pow(xDistance,2) + Math.pow(yDistance,2));
    }

    //motion function of balls through time
	move(timeDelta) {
		this.velocity.x *= this.poolTable.drag;
		this.velocity.y *= this.poolTable.drag;
		let velocityX = this.velocity.x * timeDelta;
        let velocityY = this.velocity.y * timeDelta;
        let velocityZ = this.velocity.z * timeDelta;

        if (!this.isFalling) {
            this.poolTable.holes.forEach(hole => {
                // Each hole has 4 equidistant points from the path used to create the hole
                // The first point has its y at the center and the second its x
                let centerX = hole[1].x;
                let centerY = hole[0].y;
                if (Math.abs(this.position.x - centerX) < this.radius * 1.5 && Math.abs(this.position.y - centerY) < this.radius * 1.5) {
                    this.velocity.z -= 10;
                    this.isFalling = true;
                    return;
                }
            });
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
    
            if (hasCollided) {
                return;
            }
        }
        else { //ball fell in tho the hole
            this.position.z += velocityZ;
            this.velocity.z -= 10;
           
        }
        //update position of balls
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

    dot_product(ball,other){

        //The other_ball is the referential

        //Velocity vector from ball (direction that the ball is moving), seen from other_ball referential
        let xVelocityDelta = ball.velocity.x - other.velocity.x;
        let yVelocityDelta = ball.velocity.y - other.velocity.y;
        
        //Direction vector from other_ball to ball 
        let xDistance = other.position.x - ball.position.x;
        let yDistance = other.position.y - ball.position.y;

        //If Distance vector points in the same direction as the Velocity vector, this value will be positive and we will have to resolve the collision
        return xVelocityDelta * xDistance + yVelocityDelta * yDistance;
    }
    
    resolveCollision(ball, other) {

        let xDistance = other.position.x - ball.position.x;
        let yDistance = other.position.y - ball.position.y;
        
        let dot_product = this.dot_product(ball,other);
    
        //The dot product will be positive if the angle between both vectors is smaller than 90 degrees (if velocity vector points somewhat in the same direction of distance vector) and negative otherwise.

        //Resolve collision if the balls are moving towards each other
        //See the end of the page for further explanation

           if (dot_product >= 0) { 

            // Angle between two balls
            let angle = -Math.atan2(yDistance, xDistance);
    
            let mBall = ball.mass;
            let mOther = other.mass;
                
            //Rotates the velocity vectors to compute in 1D
            let initialVelocity_Ball = this.rotate(ball.velocity, angle);
            let initialVelocity_Other = this.rotate(other.velocity, angle);
    
            //Final velocity in 1D - Ball
            let finalVelocity_Ball = { 
                x: initialVelocity_Ball.x * (mBall - mOther) / (mBall + mOther) + initialVelocity_Other.x * 2 * mOther / (mBall + mOther), 

                y: initialVelocity_Ball.y };
            

            //Final velocity in 1D - Other
            let finalVelocity_Other = {
                x: initialVelocity_Other.x * (mBall - mOther) / (mBall + mOther) + initialVelocity_Ball.x * 2 * mBall / (mBall + mOther), //fixed here m1, instead of m2 
                y: initialVelocity_Other.y };
    

            //Final velocity in 2D
            finalVelocity_Ball = this.rotate(finalVelocity_Ball, -angle);
            finalVelocity_Other = this.rotate(finalVelocity_Other, -angle);
            
    
            // Set final result
            ball.velocity.x = finalVelocity_Ball.x;
            ball.velocity.y = finalVelocity_Ball.y;

            other.velocity.x =  finalVelocity_Other.x;
            other.velocity.y =  finalVelocity_Other.y;
       }
    }

	update(timeDelta, balls, size) {

        this.move(timeDelta);

        for (let i = 0; i < size; i++)
        {

            if (this == balls[i])
            {
                continue;   
            }
         
            if(this.distanceToBall(balls[i].position.x,balls[i].position.y)  <= this.radius * 2) 
            /*two balls have colided*/
            {
                this.resolveCollision(this,balls[i]);

                let velocityX = this.velocity.x * timeDelta;
                let velocityY = this.velocity.y * timeDelta;
                this.position.x += velocityX ;
                this.rotateY(velocityX / this.radius);
                this.position.y += velocityY;
                this.rotateX(-velocityY / this.radius);
                
            }
        }


       
        
	}

}

//Collisions :

//If the balls are colliding but not moving towards each other, the collision will resolve itself. If we do something in that case, the collision will not resolve itself and we will make it worst (we keep changing v1 and v2 - that's what makes the balls rotate with one another).

//This is only a problem when we are in a 2D space, because, in 1D space, if the balls collide with each other, the balls are necessarily moving towards each other.

