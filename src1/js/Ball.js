class Ball extends Component{
    constructor(x, y, z,raio,material) {
        super(x, y, z);
        this.ball_mesh = this.addSphere(material,0,0,0,raio);
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.mass = 1;
        this.axis = new THREE.AxesHelper(3);
        this.hasAxis = false;
        this.velocity ={
            x: Math.random() -0.7 ,
            y: Math.random() -0.7
        };

        this.radius = raio


        /*this.update = balls => {
            
            for(let i =0;i<balls.length;i++)
            {
                     if(this===balls[i]) continue;
                     if(distance(this.position.x,this.position.y,balls[i].position.x,
                        balls[i].position.y) - this.radius*2<0)
                        {
                            /*Ha colisao!!*/
                    /*        console.log("colision");
                        }	
                }
                if(this.x-this.radius < )
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
            }*/
            
        
        

        }
        
        
        
        
       
        

    addBallAxis() {
        this.hasAxis = !this.hasAxis;
        if (this.hasAxis)
            this.add(this.axis);
        else
            this.remove(this.axis);
    }











}