import * as THREE from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';


let container;

const gui = new GUI({ width: 300 })
const scene = new THREE.Scene()
let pointer = new THREE.Vector2();
const light = new THREE.DirectionalLight(0xffffff, 1);
const worldAxis = new THREE.AxesHelper(10);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
const raycaster = new THREE.Raycaster();
const renderer = new THREE.WebGLRenderer()
const controls = new OrbitControls(camera, renderer.domElement)
const stats = Stats();

let cube
let INTERSECTED;
let theta = 0;
// const radius = 100;

light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(worldAxis);

camera.position.z = 5

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

CreateCubeColor();

window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        animate();//render()
    },
    false
)

document.body.appendChild(stats.dom);

document.addEventListener('mousemove', onPointerMove);

ControlGUI();

function onPointerMove(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

function ControlGUI() {

    const params = {
        options: 10,
        boolean: true,
        string: 'lil-gui',
        number: 0,
        scale: 0.5,
        color: '#aa00ff',
        function() { alert( 'hi' ) }
    };

    gui.add( params, 'options', { Small: 1, Medium: 10, Large: 100 } );
    gui.add( params, 'boolean' );
    gui.add( params, 'string' );
    gui.add( params, 'number' );
    gui.addColor( params, 'color' );
    gui.add( params, 'function' ).name( 'Custom Name' );
    
    const cubeFolder = gui.addFolder('Cube')
    cubeFolder.add(cube.scale, 'x', -5, 5)
    cubeFolder.add(cube.scale, 'y', -5, 5)
    cubeFolder.add(cube.scale, 'z', -5, 5)
    cubeFolder.open()
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'z', 0, 10)
    cameraFolder.open()

    const folder = gui.addFolder( 'Folder' );

    const folderParams = {
        number: 0.5,
    };

    folder.add( folderParams, 'number', 0, 1 );
}

function animate() {
    requestAnimationFrame(animate)
    //cube.rotation.x += 0.01
    //cube.rotation.y += 0.01
    controls.update()
    render()
    stats.update()
}

function render() {
    // theta += 0;// 0.1;

    // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    // camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object && intersects[0].object.type == "Mesh") {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);

        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
        INTERSECTED = null;
    }
    renderer.render(scene, camera)

}

function CreateCubeColor() {
    const piece = new THREE.BoxGeometry(1, 1, 1).toNonIndexed();
    const material = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff , vertexColors: true})
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

animate()