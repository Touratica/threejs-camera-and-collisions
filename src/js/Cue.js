class Cue extends Component{

    selected = new THREE.MeshBasicMaterial({color: 0x66ff33, wireframe: true});
    unselected = new THREE.MeshBasicMaterial({color: 0xcc9966, wireframe: true});

    constructor(x, y, z,angle,baseD,baseU,height,BallRadius,wall_thickness,poolTable) {

        super(x, y, z);

        this.ball_radius = BallRadius;
        
        var cue_x, cue_y;

        if (Math.abs(angle) == Math.PI || angle == 0) 
        { 
            console.log("inverted");
            cue_x = - Math.sin(angle) * ((height + ballRadius)/2 + wall_thickness);
            cue_y = - Math.cos(angle) * ((height + ballRadius)/2 + wall_thickness);
        }

        else {
            cue_x = Math.sin(angle) * ((height + ballRadius)/2 + wall_thickness);
            cue_y = Math.cos(angle) * ((height + ballRadius)/2 + wall_thickness);
        }

        

        this.cue_mesh = this.addCylinderHorizontal(this.unselected,cue_x,cue_y,0,baseD,baseU,height);

        this.cue_mesh.rotateZ(angle);
        this.steady_ball = new Ball(this.ball_radius, poolTable, x, y,this.unselected,new THREE.Vector3( 0, 0, 0 ));

        this.shooted_ball = this.steady_ball;

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.pool = poolTable;
        
        this.initial_angle = angle;
        this.angle = 0;

        this.rotation_Z = "Stop";

        this.shoot = false;


        
    }

    shoot_ball(){

        var center = new THREE.Vector2(0,0);
        var vector = new THREE.Vector2( 0, 1 );

        vector.rotateAround (center, this.angle + this.initial_angle); 

        this.shooted_ball = new Ball(this.steady_ball.radius,this.pool,this.steady_ball.position.x, this.steady_ball.position.y,new THREE.MeshBasicMaterial({color: "red"}), new THREE.Vector3( vector.x * 10, vector.y * 10, 0 ));

        this.shooted_ball.addBallAxis();
        this.shooted_ball;
        this.shoot = false;

        return this.shooted_ball;
    }

    get_steady_ball(){
        return this.steady_ball;
    }

    get_ball_shooted(){
        return this.shooted_ball;
    }

    unselect(){
        this.cue_mesh.material = this.unselected;
    }
    
    select(){
        this.cue_mesh.material = this.selected;
    }

    get_rotation(){
        return this.rotation_Z;
    }

    set_rotation(rotation){
        this.rotation_Z = rotation;
        
    }

    set_shoot(flag){
        this.shoot = flag;
    }

    get_shoot(){
        return this.shoot;
    }

    rotate_z(angle){

        if (this.angle >= (Math.PI)/3 && this.rotate_z == "Left"){
            return;
        }

        if (this.angle >= -(Math.PI)/3 && this.rotate_z == "Right"){
            return;
        }

        var a = this.angle + angle;

        if (a >= Math.PI/3){
            this.angle = (Math.PI)/3;
            return;
        }

        else if (a <= -(Math.PI)/3){
            this.angle = - (Math.PI)/3;
            return;
        }
        
        this.angle = a;
        this.rotateZ(angle);

    }

}