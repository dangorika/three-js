const THREE = require('three');
import './GPUParticleSystem';

import Mouse from './Mouse';

export default (config) => {
  let container = document.querySelector(config.container);
  let canvas;

  let camera, scene, renderer;
  let particleSystem;

  let options, spawnerOptions;

  let tick = 0;
  let clock = new THREE.Clock();


  function init() {
    camera = new THREE.PerspectiveCamera(28, window.innerWidth/window.innerHeight, 1, 10000);
    camera.position.z = 100;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    canvas = container.querySelector('canvas');
    console.log(canvas);


    // let pos = new Mouse(canvas);

    particleSystem = new THREE.GPUParticleSystem({maxParticles: 250000});

    options = {
      position: new THREE.Vector3(),
      positionRandomness: 0.3,
      velocity: new THREE.Vector3(),
      velocityRandomness: 0.5,
      color: 0xaa88ff,
      colorRandomness: 0.2,
      turbulence: 0.5,
      lifetime: 2,
      size: 5,
      sizeRandomness: 1
    };

    spawnerOptions = {
      spawnRate: 15000,
      horizontalSpeed: 1.5,
      verticalSpeed: 1.33,
      timeScale: 1
    };
    scene.add(particleSystem);

    window.addEventListener('resize', onWindowResize, false);
  }


  init();

  let pos = new Mouse(canvas);


  function animate() {
    requestAnimationFrame(animate);



    let delta = clock.getDelta() * spawnerOptions.timeScale;

    tick += delta;

    if (tick < 0) tick = 0;

    if (delta > 0) {
      options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
      options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
      options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 10;
    }

    for (var i = 0; i < spawnerOptions.spawnRate * delta; i++) {
      particleSystem.spawnParticle(options);
    }

    particleSystem.update(tick);

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }


  animate();
};
