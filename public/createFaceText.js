var face_textures = [];
function createFaceTextures() {
  var i;
  for(i = 0; i < 6; i++) {
    var dynamictexture = new THREEx.DynamicTexture(512, 512);
    dynamictexture.context.font = "bolder 90px verdana";
    dynamictexture.texture.needsUpdate = true;
    dynamictexture.clear('#d35400').drawText(i.toString(), undefined, 256, 'green');
    face_textures.push(dynamictexture);
  }
}
createFaceTextures();

// var scene = new THREE.Scene();
// scene.background = new THREE.Color('white');
// var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000);
// camera.position.set(4, 4, 4);
// camera.lookAt(0, 0, 0);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('display').appendChild(renderer.domElement);
// var controls = new THREE.OrbitControls(camera);
var dynamictexture = new THREEx.DynamicTexture(512, 512);
dynamictexture.context.font = "bolder 90px verdana";
dynamictexture.texture.needsUpdate = true;
dynamictexture.clear('#d35400').drawText('Text', undefined, 256, 'green');
var geometry = new THREE.BoxGeometry(2, 2, 2,);
var material = new THREE.MeshBasicMaterial({color: 0xffffff, map: dynamictexture.texture, opacity:1, transparent: true});

var materials = [
  new THREE.MeshBasicMaterial({map: face_textures[0].texture}),
  new THREE.MeshBasicMaterial({map: face_textures[1].texture}),
  new THREE.MeshBasicMaterial({map: face_textures[2].texture}),
  new THREE.MeshBasicMaterial({map: face_textures[3].texture}),
  new THREE.MeshBasicMaterial({map: face_textures[4].texture}),
  new THREE.MeshBasicMaterial({map: face_textures[5].texture})
];

var cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    dynamictexture.texture
    renderer.render(scene, camera);
}
animate();