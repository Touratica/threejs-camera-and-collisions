class PoolTable extends Component{
    constructor(x, y, z,width, height,radius,material,wall_thickness) {
        super(x, y, z);
        this.walls = [];
        this.receptacles = []
        
        var floor_material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
        this.addCuboid(floor_material,0,0,-2*radius + wall_thickness/2 ,wall_thickness,width + 2*wall_thickness,height+ 2*wall_thickness);

        this.create_walls(width, height, radius, material,wall_thickness);
        this.create_receptacles(width, height, radius, material);


        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.direction = new THREE.Vector2(0, 0);
    }
   
    create_walls(width, height,radius,material,wall_thickness){

        var wall_Left = new Component();
        wall_Left.addCuboid(material, 0, 0, 0, 2*radius, wall_thickness, height+ 2*wall_thickness); 
        this.addComponent(wall_Left, 0, -width/2 -wall_thickness/2 , -Ballradius+wall_thickness);

        var wall_Right = new Component();
        wall_Right.addCuboid(material, 0, 0, 0, 2*radius, wall_thickness, height+ 2*wall_thickness);
        this.addComponent(wall_Right, 0, width/2 + wall_thickness/2, -Ballradius+wall_thickness);

        var wall_Up = new Component();
        wall_Up.addCuboid(material, 0, 0, 0, 2*radius, width, wall_thickness);
        this.addComponent(wall_Up, -height/2 - wall_thickness/2, 0, -Ballradius+wall_thickness);

        var wall_Down = new Component();
        wall_Down.addCuboid(material, 0, 0, 0, 2*radius, width, wall_thickness);
        this.addComponent(wall_Down, height/2 + wall_thickness/2, 0, -Ballradius+wall_thickness);


        this.walls.push(wall_Left); //parede esquerda
        this.walls.push(wall_Up); //parede cima
        this.walls.push(wall_Right); //parede direita
        this.walls.push(wall_Down); //parede baixo
    }

    create_receptacles(width, height, radius, material){

         //Parte de baixo
        //NCSS library
    }

}