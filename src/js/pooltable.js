class PoolTable extends Component{
    constructor(x, y, z,material) {
        super(x, y, z);
        this.walls = [];
        //this.direction = new THREE.Vector2(0, 0);
        this.create(this, x, y, z,material);
    }
    //var sizeB = 17; //comprimento do retangulo de baixo/cima
    //sizeS = 8 //comprimento do pequeno 
    create(pool, x, y, z ,sizeB, sizeS,raio,material) {
        
        this.walls.push(pool.addCuboid(material, -sizeB/2, 0, 0, 1, 2*raio, sizeS)); //parede esquerda
        this.walls.push(pool.addCuboid(material, 0, sizeS/2, 0, sizeB, 2*raio, 1)); //parede cima
        this.walls.push(pool.addCuboid(material, sizeB/2, 0, 0, 1, 2*raio, sizeS)); //parede direita
        this.walls.push(pool.addCuboid(material, 0, sizeS/2, 0, sizeB, 2*raio, 1)); //parede baixo
        

       /* this.walls[0].direction = new THREE.Vector2(1 , 0); 
        this.walls[1].direction = new THREE.Vector2(0 , -1);
        this.walls[2].direction = new THREE.Vector2(1 , 0);
        this.walls[2].direction = new THREE.Vector2(0 , -1);*/

        scene.add(pool);

        pool.position.x = x;
        pool.position.y = y;
        pool.position.z = z;

        //necessario depois confirmar contas , e possivel que w e d estejam trocados
    }

}