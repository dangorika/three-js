const THREE = require('three');
const TrackballControls = require('three-trackballcontrols');

export default class Sphere {
  constructor(config) {
    this.container = document.querySelector(config.container);
    this.init();
  }

  init() {
    let scene, camera, renderer;
    let geometry, material;
    let sphere;
    let controls;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 2.2;
    controls.panSpeed = 1;
    controls.dynamicDampingFactor = 0.3;

    console.log(controls);

    geometry = new THREE.SphereGeometry(5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2);
    material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    sphere = new THREE.Mesh(geometry, material);



    scene.add(sphere);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      // console.log(renderer);

      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      sphere.rotation.z += 0.003;

      controls.update();
    }

    animate();
  }




}
