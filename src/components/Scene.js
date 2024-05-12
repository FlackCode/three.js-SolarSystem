import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

export default class Scene {
    constructor() {
        this.fov = 40
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000)
        this.camera.position.z = 200
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('TJSCanvas'),
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.stats = new Stats()

        document.body.appendChild(this.renderer.domElement)
        document.body.appendChild(this.stats.dom)

        window.addEventListener("resize", () => this.onWindowResize(), false)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate() {
        this.stats.update()
        this.renderer.render(this.scene, this.camera)
        this.controls.update()
        requestAnimationFrame(() => this.animate())
    }
}
