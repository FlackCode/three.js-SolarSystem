import * as THREE from 'three';

export default class Planet {
    constructor(radius, textureFile) {
        this.radius = radius;
        this.textureFile = textureFile;
        this.mesh = this.createMesh();
    }

    createMesh() {
        const geometry = new THREE.SphereGeometry(this.radius);
        const texture = new THREE.TextureLoader().load(this.textureFile);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        return new THREE.Mesh(geometry, material);
    }
}
