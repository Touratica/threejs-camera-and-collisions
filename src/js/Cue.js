class Cue extends Component{

    selected = new THREE.MeshBasicMaterial({color: 0x66ff33, wireframe: true});
    unselected = new THREE.MeshBasicMaterial({color: 0xcc9966, wireframe: true});

    constructor(x, y, z,angle,baseD,baseU,height) {

        super(x, y, z);

        this.cue_mesh = this.addCylinderHorizontal(this.unselected,0,0,0,baseD,baseU,height);

        this.position.x = x;
        this.position.y = y;
        this.position.z = z;

        this.rotateZ(angle);

        
    }

    unselect(){
        this.cue_mesh.material = this.unselected;
    }
    
    select(){
        this.cue_mesh.material = this.selected;
    }

}