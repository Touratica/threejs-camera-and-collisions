import * as THREE from "three";

export default class Component extends THREE.Object3D {
  addCuboid(material, x, y, z, w, h, d) {
    let geometry = new THREE.BoxGeometry(d, h, w);
    let mesh = new THREE.Mesh(geometry, material);
    this.material = material;
    // this.material.wireframe = true;
    this.add(mesh);
    mesh.position.set(x, y, z);
    return mesh;
  }

  addCylinderHorizontal(material, x, y, z, baseD, baseU, height) {
    let geometry = new THREE.CylinderGeometry(
      baseD / 2,
      baseU / 2,
      height,
      16,
      1
    );
    let mesh = new THREE.Mesh(geometry, material);
    this.material = material;
    this.material.wireframe = true;
    this.add(mesh);
    mesh.position.set(x, y, z);
    return mesh;
  }

  addSphere(material, x, y, z, radius) {
    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var mesh = new THREE.Mesh(geometry, material);
    this.material = material;
    this.material.wireframe = true;
    this.add(mesh);
    mesh.position.set(x, y, z);
    return mesh;
  }

  addComponent(comp, x, y, z) {
    this.add(comp);
    comp.position.set(x, y, z);
  }

  position_set(x, y, z) {
    this.position.set(x, y, z);
  }
}
