class Ball extends Component{
    constructor(x, y, z,raio,material) {
        super(x, y, z);
        this.addSphere(material,0,0,0,raio)
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}