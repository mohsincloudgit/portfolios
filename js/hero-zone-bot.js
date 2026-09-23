/**
 * ANTIGRAVITY HERO ZONE 3D BOT — Dedicated Canvas Renderer
 * Mounts a full 3D AI Chatbot Agent into the #heroZoneCanvas canvas inside #avatarInteractiveZone.
 * Completely independent of the full-screen background bot in three-scene.js.
 * Features:
 *  - Real-time mouse gaze tracking (head yaw / pitch / roll)
 *  - Organic 60fps floating hover bob
 *  - Blinking glowing cyan eyes
 *  - Pulsing Arc Reactor with light emission
 *  - Dual holographic counter-rotating orbital rings
 *  - Floating energy particles
 */

(function initHeroZoneBot() {
  const canvas = document.getElementById('heroZoneCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const zone = document.getElementById('avatarInteractiveZone');

  function getSize() {
    return {
      width: zone ? zone.clientWidth : canvas.clientWidth || 460,
      height: zone ? zone.clientHeight : canvas.clientHeight || 380
    };
  }

  let { width, height } = getSize();

  // --- Scene, Camera, Renderer ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0, 11);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;

  // --- Lighting ---
  scene.add(new THREE.AmbientLight(0x0c1322, 2.2));

  const keyLight = new THREE.DirectionalLight(0x0066ff, 4.2);
  keyLight.position.set(-8, 10, 12);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xff2a54, 4.8);
  rimLight.position.set(10, 6, -8);
  scene.add(rimLight);

  const topLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
  topLight.position.set(0, 8, 8);
  scene.add(topLight);

  const cursorPtLight = new THREE.PointLight(0x00f0ff, 3.2, 20);
  cursorPtLight.position.set(0, 0, 6);
  scene.add(cursorPtLight);

  // --- Materials ---
  const whiteArmor = new THREE.MeshPhysicalMaterial({
    color: 0xebf2ff, metalness: 0.18, roughness: 0.16,
    clearcoat: 1.0, clearcoatRoughness: 0.08
  });
  const darkChassie = new THREE.MeshStandardMaterial({
    color: 0x090d18, metalness: 0.9, roughness: 0.25
  });
  const visorGlass = new THREE.MeshPhysicalMaterial({
    color: 0x02050c, metalness: 0.95, roughness: 0.05,
    transmission: 0.25, transparent: true, opacity: 0.95,
    reflectivity: 1.0, clearcoat: 1.0, clearcoatRoughness: 0.05
  });
  const cyanGlow = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const redGlow  = new THREE.MeshBasicMaterial({ color: 0xff2a54 });
  const blueGlow = new THREE.MeshBasicMaterial({ color: 0x0066ff });

  // --- Bot Root ---
  const botRoot = new THREE.Group();
  scene.add(botRoot);

  // HEAD
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.72, 0);
  botRoot.add(headGroup);

  const skullGeo = new THREE.SphereGeometry(1.85, 32, 28);
  skullGeo.scale(1.0, 1.15, 1.05);
  const skull = new THREE.Mesh(skullGeo, whiteArmor);
  headGroup.add(skull);

  const visorGeo = new THREE.SphereGeometry(1.65, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.44);
  visorGeo.scale(0.96, 0.9, 1.12);
  visorGeo.rotateX(Math.PI / 2);
  const visor = new THREE.Mesh(visorGeo, visorGlass);
  visor.position.set(0, 0, 0.4);
  headGroup.add(visor);

  // Eyes
  const eyesGroup = new THREE.Group();
  eyesGroup.position.set(0, 0.05, 1.6);
  headGroup.add(eyesGroup);

  const eyeGeo = THREE.CapsuleGeometry
    ? new THREE.CapsuleGeometry(0.18, 0.45, 8, 16)
    : new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16);
  eyeGeo.rotateZ(Math.PI / 2);

  const leftEye = new THREE.Mesh(eyeGeo, cyanGlow);
  leftEye.position.set(-0.55, 0, 0); leftEye.scale.set(1, 1, 0.3);
  eyesGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, cyanGlow);
  rightEye.position.set(0.55, 0, 0); rightEye.scale.set(1, 1, 0.3);
  eyesGroup.add(rightEye);

  const eyeLight = new THREE.PointLight(0x00f0ff, 1.6, 4);
  eyeLight.position.set(0, 0, 0.2);
  eyesGroup.add(eyeLight);

  // Ears
  const earGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.35, 20);
  earGeo.rotateZ(Math.PI / 2);

  const leftEar = new THREE.Mesh(earGeo, darkChassie);
  leftEar.position.set(-1.85, 0, 0);
  headGroup.add(leftEar);

  const rightEar = new THREE.Mesh(earGeo, darkChassie);
  rightEar.position.set(1.85, 0, 0);
  headGroup.add(rightEar);

  const earRingGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 24);
  earRingGeo.rotateY(Math.PI / 2);
  const lRing = new THREE.Mesh(earRingGeo, redGlow);
  lRing.position.set(-2.04, 0, 0);
  headGroup.add(lRing);
  const rRing = new THREE.Mesh(earRingGeo, blueGlow);
  rRing.position.set(2.04, 0, 0);
  headGroup.add(rRing);

  // Crest
  const crest = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 1.6), blueGlow);
  crest.position.set(0, 1.85, -0.2);
  headGroup.add(crest);

  // Antenna
  const antGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2, 8);
  antGeo.rotateZ(0.25);
  const ant = new THREE.Mesh(antGeo, darkChassie);
  ant.position.set(-1.8, 0.8, -0.2);
  headGroup.add(ant);
  const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), redGlow);
  antTip.position.set(-1.95, 1.35, -0.2);
  headGroup.add(antTip);

  // TORSO
  const bodyGroup = new THREE.Group();
  bodyGroup.position.set(0, -1.8, 0);
  botRoot.add(bodyGroup);

  bodyGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(1.4, 0.9, 2.2, 24), whiteArmor));

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.95, 0.6, 16), darkChassie);
  neck.position.set(0, 1.3, 0);
  bodyGroup.add(neck);

  // Arc Reactor
  const reactorRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.06, 12, 32), darkChassie);
  reactorRing.position.set(0, 0.25, 1.15);
  bodyGroup.add(reactorRing);

  const reactorCore = new THREE.Mesh(new THREE.CircleGeometry(0.4, 24), cyanGlow);
  reactorCore.position.set(0, 0.25, 1.17);
  bodyGroup.add(reactorCore);

  const reactorLight = new THREE.PointLight(0x00f0ff, 2.4, 6);
  reactorLight.position.set(0, 0.25, 1.4);
  bodyGroup.add(reactorLight);

  // Hands
  const handGeo = new THREE.SphereGeometry(0.45, 16, 16);
  handGeo.scale(1.2, 0.6, 0.9);

  const leftHand = new THREE.Mesh(handGeo, whiteArmor);
  leftHand.position.set(-2.2, 0, 0.4);
  bodyGroup.add(leftHand);

  const rightHand = new THREE.Mesh(handGeo, whiteArmor);
  rightHand.position.set(2.2, 0, 0.4);
  bodyGroup.add(rightHand);

  // Orbital Rings
  const ring1Geo = new THREE.RingGeometry(2.8, 2.88, 64);
  ring1Geo.rotateX(Math.PI / 2.3);
  const ring1 = new THREE.Mesh(ring1Geo, new THREE.MeshBasicMaterial({
    color: 0x0066ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6
  }));
  botRoot.add(ring1);

  const ring2Geo = new THREE.RingGeometry(3.4, 3.48, 64);
  ring2Geo.rotateX(Math.PI / 1.7);
  const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({
    color: 0xff2a54, side: THREE.DoubleSide, transparent: true, opacity: 0.45
  }));
  botRoot.add(ring2);

  // Particles
  const pCount = 35;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: 0x00f0ff, size: 0.18, transparent: true, opacity: 0.7,
    blending: THREE.AdditiveBlending
  }));
  botRoot.add(particles);

  // --- Mouse Tracking ---
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth)  * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth)  * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    const s = getSize();
    camera.aspect = s.width / s.height;
    camera.updateProjectionMatrix();
    renderer.setSize(s.width, s.height);
  });

  // --- Animation Loop ---
  const clock = new THREE.Clock();
  let blinkTimer = 0;

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Float / Hover
    botRoot.position.y = Math.sin(time * 2.5) * 0.18;
    leftHand.position.y  = Math.sin(time * 2.5 + 0.6) * 0.12;
    rightHand.position.y = Math.sin(time * 2.5 - 0.6) * 0.12;

    // Arc Reactor Pulse
    const pulse = 2.0 + Math.sin(time * 6.0) * 0.6;
    reactorLight.intensity = pulse;
    reactorCore.scale.set(
      1 + Math.sin(time * 6.0) * 0.09,
      1 + Math.sin(time * 6.0) * 0.09,
      1
    );

    // Rings spin
    ring1.rotation.z = time * 0.55;
    ring2.rotation.z = -time * 0.4;
    particles.rotation.y = time * 0.1;

    // Blink
    blinkTimer += 0.016;
    if (blinkTimer > 3.8) {
      leftEye.scale.y  = 0.05;
      rightEye.scale.y = 0.05;
      if (blinkTimer > 4.0) {
        leftEye.scale.y  = 1.0;
        rightEye.scale.y = 1.0;
        blinkTimer = 0;
      }
    }

    // Gaze Tracking
    const targetRotY = mouseX * 0.85;
    const targetRotX = -mouseY * 0.6;
    const targetRotZ = -mouseX * 0.15;

    headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.09;
    headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.09;
    headGroup.rotation.z += (targetRotZ - headGroup.rotation.z) * 0.09;

    eyesGroup.position.x = headGroup.rotation.y * 0.45;
    eyesGroup.position.y = -headGroup.rotation.x * 0.35;

    bodyGroup.rotation.y += (targetRotY * 0.3 - bodyGroup.rotation.y) * 0.05;
    bodyGroup.rotation.x += (targetRotX * 0.2 - bodyGroup.rotation.x) * 0.05;

    // Cursor light
    cursorPtLight.position.x = mouseX * 6;
    cursorPtLight.position.y = mouseY * 5;

    renderer.render(scene, camera);
  }

  animate();
})();
