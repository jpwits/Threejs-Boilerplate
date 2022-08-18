import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'

const scene = new THREE.Scene()
let cube

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


//CreateCubeBasic();
CreateCubeColor();

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.scale, 'x', -5, 5)
cubeFolder.add(cube.scale, 'y', -5, 5)
cubeFolder.add(cube.scale, 'z', -5, 5)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
        //cube.rotation.x += 0.01
        //cube.rotation.y += 0.01
    controls.update()
    render()
        //stats.update()
}

function render() {
    renderer.render(scene, camera)
}

function CreateCubeColor() {
    const piece = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
    const material = new THREE.MeshBasicMaterial({
        vertexColors: true
    });
    const positionAttribute = piece.getAttribute('position');
    const colors = [];

    const color = new THREE.Color();

    for (let i = 0; i < positionAttribute.count; i += 6) {

        color.setHex(0xffffff * Math.random());

        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);

        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
    } // for

    // define the new attribute
    piece.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    cube = new THREE.Mesh(piece, material);
    scene.add(cube)
}


function CreateCubeBasic() {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: false,
    })

    //const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })

    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
}
animate()