import { useEffect } from 'react';
import * as THREE from 'three'
import Scene from './components/Scene';
import Planet from './components/Planet';
import Rotation from './components/Rotation';

function App() {

  useEffect(() => {
    let test = new Scene()
    test.animate()

    //const sunGeometry = new THREE.BoxGeometry(8, 8, 8)
    //const sunMaterial = new THREE.MeshNormalMaterial()
    //const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    //const solarSystem = new THREE.Group()
    //solarSystem.add(sunMesh)
    //test.scene.add(solarSystem)

    const sunGeometry = new THREE.SphereGeometry(10)
    const sunTexture = new THREE.TextureLoader().load('sunn.jpg')
    const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    const solarSystem = new THREE.Group()
    solarSystem.add(sunMesh)
    test.scene.add(solarSystem)

    //const mercury = new Planet(2, 'mercury.jpg')
    //const mercuryMesh = mercury.mesh
    //mercuryMesh.position.x = 16;
    //let mercurySystem = new THREE.Group()
    //mercurySystem.add(mercuryMesh)
    //solarSystem.add(mercuryMesh)

    //const venus = new Planet(3, 'venus.jpg')
    //const venusMesh = venus.mesh
    //venusMesh.position.x = 32
    //solarSystem.add(venusMesh)

    //const earth = new Planet(4, 'earth.jpg')
    //const earthMesh = earth.mesh
    //earthMesh.position.x = 48
    //solarSystem.add(earthMesh)

    //const mars = new Planet(3, 'mars.jpg')
    //const marsMesh = mars.mesh
    //marsMesh.position.x = 64
    //solarSystem.add(marsMesh)

    //const jupiter = new Planet(6, 'jupiter.jpg')
    //const jupiterMesh = jupiter.mesh
    //jupiterMesh.position.x = 80
    //solarSystem.add(jupiterMesh)

    const planets = [
      { name: 'Mercury', radius: 2, texture: 'mercury.jpg', orbitalSpeed: 0.02, posX: 16 },
      { name: 'Venus', radius: 3, texture: 'venus.jpg', orbitalSpeed: 0.015, posX: 32 },
      { name: 'Earth', radius: 4, texture: 'earth.jpg', orbitalSpeed: 0.01, posX: 48 },
      { name: 'Mars', radius: 3, texture: 'mars.jpg', orbitalSpeed: 0.008, posX: 64 },
      { name: 'Jupiter', radius: 6, texture: 'jupiter.jpg', orbitalSpeed: 0.005, posX: 80 }
    ]

    const planetMeshes = []

    planets.forEach(planetInfo => {
      const planet = new Planet(planetInfo.radius, planetInfo.texture)
      const planetMesh = planet.mesh
      planetMesh.position.set(planetInfo.posX, 0, 0)
      solarSystem.add(planetMesh)
      planetMeshes.push({ mesh: planetMesh, orbitalSpeed: planetInfo.orbitalSpeed })
    })

    const animate = () => {
      sunMesh.rotation.y += 0.001
      planetMeshes.forEach(planetData => {
          const { mesh, orbitalSpeed } = planetData
          mesh.rotation.y += orbitalSpeed
          mesh.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitalSpeed)
      })
      test.renderer.render(test.scene, test.camera)
      requestAnimationFrame(animate)
    }

    animate()

  }, [])

  return (
    <canvas id='TJSCanvas'></canvas>
  )
}
export default App;
