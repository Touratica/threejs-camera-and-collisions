class Cue extends Component{

    selected = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
    unselected = new THREE.MeshBasicMaterial({color: 0x00F000, wireframe: true});

    constructor(x, y, z,angle,baseD,baseU,height) {

        super(x, y, z);

        this.addCylinderHorizontal(this.selected,0,0,0,baseD,baseU,height);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
       // this.material = mat;
        this.rotateZ(angle);

        
    }

    unselect(){
        this.material = this.selected;
    }
    
    select(){
        this.material = this.unselected;
    }

}