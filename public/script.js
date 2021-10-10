let x = 0
let y = 0;
let z = 0;


let acl = new Accelerometer({ frequency: 60 });
acl.addEventListener('reading', () => {
    
    let gravity = 9.8;
    let coefficient = 0.05;

    x = x + ((acl.x - x) * coefficient);
    y = y + ((acl.y - y) * coefficient);
    z = z + ((acl.z - z) * coefficient);

    document.getElementById("myRangeX").value = Math.round(x * 10) / 10/gravity;
    document.getElementById("myRangeY").value = Math.round(y * 10) / 10/gravity;
    document.getElementById("myRangeZ").value = Math.round(z * 10) / 10/gravity;
   
    document.getElementById("vx").innerHTML = Math.round(x/gravity*10)/10;
    document.getElementById("vy").innerHTML = Math.round(y/gravity*10)/10;
    document.getElementById("vz").innerHTML = Math.round(z/gravity*10)/10;

});

acl.start();

// three.js webgl - cube
// from https://webglfundamentals.org/webgl/lessons/resources/three-js-cube-with-lights.html


var camera, scene, renderer;
var mesh;

init();
animate();

function init() {
  // Setup
  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("#canvas")});

  // Make and setup a camera.
  camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
  camera.position.z = 400;

  // Make a scene
  scene = new THREE.Scene();

  // Make a cube.
  var geometry = new THREE.BoxGeometry(200, 200, 200);

  // Make a material
  var material = new THREE.MeshPhongMaterial({
    ambient: 0x00505f,
    color: 0xFFC90,
    specular: 0xffffff,
    shininess: 50,
    shading: THREE.SmoothShading
  });

  // Create a mesh based on the geometry and material
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Add 2 lights.
  var light1 = new THREE.PointLight(0xff0040, 2, 0);
  light1.position.set(200, 100, 300);
  scene.add(light1);

  var light2 = new THREE.PointLight(0x0040ff, 2, 0);
  light2.position.set(-200, 100, 300);
  scene.add(light2);

}

function resize() {
  var width = renderer.domElement.clientWidth;
  var height = renderer.domElement.clientHeight;
  if (renderer.domElement.width !== width || renderer.domElement.height !== height) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
}

function animate() {
  resize();
  //mesh.rotation.x += 0.005;
  //mesh.rotation.y += 0.01;

  mesh.rotation.x = document.getElementById('myRangeX').value*Math.PI;
  //mesh.rotation.y = document.getElementById('myRangeZ').value*Math.PI;
  //mesh.rotation.z = document.getElementById('myRangeX').value*Math.PI;

  //xyz no
  //xzy no
  //yxz no
  //yzx
  //zxy
  //zyx


  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

