class Cue extends Component{

    constructor(x, y, z,material,vector) {

        baseD = 3
        baseU = 5
        height = 10

        super(x, y, z);

        this.addCylinderHorizontal(material,0,0,0,baseD,baseU,height);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.direction = vector;
    }

}