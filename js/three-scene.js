/**
 * ANTIGRAVITY 3D AUTONOMOUS AI CHATBOT AGENT ENGINE (Three.js)
 * High-Performance Sticky 3D AI Assistant with Real-Time Mouse Gaze Tracking.
 * 
 * Features:
 * - Mounted in full-screen WebGL background layer (#webgl-container)
 * - Mathematically aligns with Hero HUD Station (#avatarInteractiveZone) on initial load
 * - Functions as a smooth, sticky 3D AI companion as user scrolls through sections
 * - 60FPS Kinematic Look-At: Head yaw/pitch/roll follows mouse cursor anywhere on screen
 * - Expressive glowing cyan eyes that lead the gaze and blink organically
 * - Pulsing Arc Reactor power core with dynamic specular light emission
 * - Dual counter-spinning holographic orbital rings (electric blue & crimson red)
 * - Floating data energy particles + cosmic starry depth field
 * - Multi-tier responsive positioning for 1700px ultrawide down to mobile
 */

(function initAntigravityAIAgent() {
  const container = document.getElementById('webgl-container');
  if (!container || typeof THREE === 'undefined') return;

  container.innerHTML = '';

  // 1. Scene, Camera & WebGL Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 22);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);

  // 2. Futuristic Studio Lighting
  const ambientLight = new THREE.AmbientLight(0x0c1322, 2.0);
  scene.add(ambientLight);

  // Key Light (Electric Blue from front-left)
  const keyLight = new THREE.DirectionalLight(0x0066ff, 4.0);
  keyLight.position.set(-10, 12, 14);
  scene.add(keyLight);

  // Rim Light (Crimson Red from back-right for high-contrast cyberpunk edge)
  const rimLight = new THREE.DirectionalLight(0xff2a54, 4.6);
  rimLight.position.set(14, 10, -10);
  scene.add(rimLight);

  // Top Soft Fill (Cyan Glow)
  const topLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
  topLight.position.set(0, 14, 8);
  scene.add(topLight);

  // Mouse-Linked Dynamic Point Light (Casts real-time specular highlights as cursor moves)
  const cursorLight = new THREE.PointLight(0x00f0ff, 3.2, 28);
  cursorLight.position.set(0, 0, 10);
  scene.add(cursorLight);

  // 3. Materials Library
  const whiteArmorMat = new THREE.MeshPhysicalMaterial({
    color: 0xebf2ff,
    metalness: 0.18,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08
  });

  const darkChassisMat = new THREE.MeshStandardMaterial({
    color: 0x090d18,
    metalness: 0.9,
    roughness: 0.25
  });

  const visorGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x02050c,
    metalness: 0.95,
    roughness: 0.05,
    transmission: 0.25,
    transparent: true,
    opacity: 0.95,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  });

  const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
  const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xff2a54 });
  const blueGlowMat = new THREE.MeshBasicMaterial({ color: 0x0066ff });

  // 4. Constructing the 3D AI Chatbot Agent
  const botRoot = new THREE.Group();
  scene.add(botRoot);

  // --- A. HEAD GROUP (Kinematic Look-At / Gaze Unit) ---
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.75, 0);
  botRoot.add(headGroup);

  // Helmet Dome / Shell
  const skullGeo = new THREE.SphereGeometry(1.85, 32, 28);
  skullGeo.scale(1.0, 1.15, 1.05);
  const skullMesh = new THREE.Mesh(skullGeo, whiteArmorMat);
  headGroup.add(skullMesh);

  // Curved Face Visor (Glossy Black Cyber Shield)
  const visorGeo = new THREE.SphereGeometry(1.65, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.44);
  visorGeo.scale(0.96, 0.9, 1.12);
  visorGeo.rotateX(Math.PI / 2);
  const visorMesh = new THREE.Mesh(visorGeo, visorGlassMat);
  visorMesh.position.set(0, 0, 0.4);
  headGroup.add(visorMesh);

  // Expressive Glowing Cyan Eyes
  const eyesGroup = new THREE.Group();
  eyesGroup.position.set(0, 0.05, 1.6);
  headGroup.add(eyesGroup);

  const eyeGeo = new THREE.CapsuleGeometry
    ? new THREE.CapsuleGeometry(0.18, 0.45, 8, 16)
    : new THREE.CylinderGeometry(0.18, 0.18, 0.6, 16);
  eyeGeo.rotateZ(Math.PI / 2);

  const leftEye = new THREE.Mesh(eyeGeo, cyanGlowMat);
  leftEye.position.set(-0.55, 0, 0);
  leftEye.scale.set(1, 1, 0.3);
  eyesGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, cyanGlowMat);
  rightEye.position.set(0.55, 0, 0);
  rightEye.scale.set(1, 1, 0.3);
  eyesGroup.add(rightEye);

  const eyeLight = new THREE.PointLight(0x00f0ff, 1.6, 4);
  eyeLight.position.set(0, 0, 0.2);
  eyesGroup.add(eyeLight);

  // Comms Ears & Headset
  const earGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.35, 20);
  earGeo.rotateZ(Math.PI / 2);

  const leftEar = new THREE.Mesh(earGeo, darkChassisMat);
  leftEar.position.set(-1.85, 0, 0);
  headGroup.add(leftEar);

  const rightEar = new THREE.Mesh(earGeo, darkChassisMat);
  rightEar.position.set(1.85, 0, 0);
  headGroup.add(rightEar);

  // Glowing Ear Rings
  const earRingGeo = new THREE.TorusGeometry(0.38, 0.04, 8, 24);
  earRingGeo.rotateY(Math.PI / 2);

  const leftRing = new THREE.Mesh(earRingGeo, redGlowMat);
  leftRing.position.set(-2.04, 0, 0);
  headGroup.add(leftRing);

  const rightRing = new THREE.Mesh(earRingGeo, blueGlowMat);
  rightRing.position.set(2.04, 0, 0);
  headGroup.add(rightRing);

  // Antenna Sensor Fins
  const antennaGeo = new THREE.CylinderGeometry(0.04, 0.06, 1.2, 8);
  antennaGeo.rotateZ(0.25);
  const leftAntenna = new THREE.Mesh(antennaGeo, darkChassisMat);
  leftAntenna.position.set(-1.8, 0.8, -0.2);
  headGroup.add(leftAntenna);

  const antennaTipGeo = new THREE.SphereGeometry(0.09, 8, 8);
  const leftTip = new THREE.Mesh(antennaTipGeo, redGlowMat);
  leftTip.position.set(-1.95, 1.35, -0.2);
  headGroup.add(leftTip);

  // Top Head Crest Fin
  const crestGeo = new THREE.BoxGeometry(0.18, 0.35, 1.6);
  const crestMesh = new THREE.Mesh(crestGeo, blueGlowMat);
  crestMesh.position.set(0, 1.85, -0.2);
  headGroup.add(crestMesh);

  // --- B. FLOATING TORSO & ARC REACTOR ---
  const bodyGroup = new THREE.Group();
  bodyGroup.position.set(0, -1.8, 0);
  botRoot.add(bodyGroup);

  // Torso Pod
  const bodyGeo = new THREE.CylinderGeometry(1.4, 0.9, 2.2, 24);
  const bodyMesh = new THREE.Mesh(bodyGeo, whiteArmorMat);
  bodyGroup.add(bodyMesh);

  // Dark Collar
  const neckGeo = new THREE.CylinderGeometry(0.75, 0.95, 0.6, 16);
  const neckMesh = new THREE.Mesh(neckGeo, darkChassisMat);
  neckMesh.position.set(0, 1.3, 0);
  bodyGroup.add(neckMesh);

  // Arc Reactor Power Core
  const reactorRingGeo = new THREE.TorusGeometry(0.48, 0.06, 12, 32);
  const reactorRing = new THREE.Mesh(reactorRingGeo, darkChassisMat);
  reactorRing.position.set(0, 0.25, 1.15);
  bodyGroup.add(reactorRing);

  const reactorCoreGeo = new THREE.CircleGeometry(0.4, 24);
  const reactorCore = new THREE.Mesh(reactorCoreGeo, cyanGlowMat);
  reactorCore.position.set(0, 0.25, 1.17);
  bodyGroup.add(reactorCore);

  const reactorLight = new THREE.PointLight(0x00f0ff, 2.4, 6);
  reactorLight.position.set(0, 0.25, 1.4);
  bodyGroup.add(reactorLight);

  // Floating Cybernetic Hands
  const handGeo = new THREE.SphereGeometry(0.45, 16, 16);
  handGeo.scale(1.2, 0.6, 0.9);

  const leftHand = new THREE.Mesh(handGeo, whiteArmorMat);
  leftHand.position.set(-2.2, 0, 0.4);
  bodyGroup.add(leftHand);

  const rightHand = new THREE.Mesh(handGeo, whiteArmorMat);
  rightHand.position.set(2.2, 0, 0.4);
  bodyGroup.add(rightHand);

  // --- C. HOLOGRAPHIC ORBITAL RINGS & DATA FIELD ---
  const ring1Geo = new THREE.RingGeometry(2.8, 2.88, 64);
  ring1Geo.rotateX(Math.PI / 2.3);
  const ring1 = new THREE.Mesh(ring1Geo, new THREE.MeshBasicMaterial({
    color: 0x0066ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  }));
  botRoot.add(ring1);

  const ring2Geo = new THREE.RingGeometry(3.4, 3.48, 64);
  ring2Geo.rotateX(Math.PI / 1.7);
  const ring2 = new THREE.Mesh(ring2Geo, new THREE.MeshBasicMaterial({
    color: 0xff2a54,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45
  }));
  botRoot.add(ring2);

  // Ambient Floating Energy Particles
  const pCount = 45;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 9;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 9;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.18,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });
  const particles = new THREE.Points(pGeo, pMat);
  botRoot.add(particles);

  // --- D. AMBIENT BACKGROUND CYBER STARS ---
  const starCount = 350;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 60;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
    starPos[i * 3 + 2] = -5 - Math.random() * 25;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0x88bbff,
    size: 0.16,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const backgroundStars = new THREE.Points(starGeo, starMat);
  scene.add(backgroundStars);

  // 5. Dynamic Mathematical World-Space Alignment Engine
  // Projects the DOM position of #avatarInteractiveZone directly into 3D camera coordinates
  const heroZone = document.getElementById('avatarInteractiveZone');
  let currentTargetX = 0;
  let currentTargetY = 0;
  let currentTargetScale = 1.0;

  function calculateTargetPosition() {
    const dist = camera.position.z; // Distance to target Z=0 plane
    const vFov = (camera.fov * Math.PI) / 180;
    const planeH = 2 * Math.tan(vFov / 2) * dist;
    const planeW = planeH * (window.innerWidth / window.innerHeight);

    const isSmallScreen = window.innerWidth < 992;
    const isMobile = window.innerWidth < 576;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    if (heroZone && scrollY < 150) {
      // Top of page: Align directly inside the Hero HUD Interactive Zone
      const rect = heroZone.getBoundingClientRect();
      const screenX = rect.left + rect.width / 2;
      const screenY = rect.top + rect.height / 2;

      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;

      currentTargetX = (ndcX * planeW) / 2;
      currentTargetY = (ndcY * planeH) / 2;
      currentTargetScale = isMobile ? 0.72 : (isSmallScreen ? 0.85 : 1.0);
    } else {
      // Scrolled down: Maintain smooth sticky background position
      if (isSmallScreen) {
        // On tablets/mobile: Center the bot in background
        currentTargetX = 0;
        currentTargetY = -1.2;
        currentTargetScale = isMobile ? 0.65 : 0.78;
      } else {
        // On desktop/ultrawide (1700px): Hover gracefully on the right margin
        currentTargetX = planeW * 0.28;
        currentTargetY = -0.4;
        currentTargetScale = window.innerWidth >= 1700 ? 1.05 : 0.95;
      }
    }
  }

  // Initial calculation
  calculateTargetPosition();
  botRoot.position.x = currentTargetX;
  botRoot.position.y = currentTargetY;
  botRoot.scale.set(currentTargetScale, currentTargetScale, currentTargetScale);

  // 6. Real-Time Mouse Movement & Gaze Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotY = 0;
  let targetRotX = 0;
  let targetRotZ = 0;

  const hudCoords = document.getElementById('hudCoords');
  const cursorDot = document.getElementById('cursorDot');
  const cursorAura = document.getElementById('cursorAura');

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    // Custom Interactive Cursor
    if (cursorDot) {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }
    if (cursorAura) {
      cursorAura.style.left = `${e.clientX}px`;
      cursorAura.style.top = `${e.clientY}px`;
    }

    // Dynamic 3D Card tilt specular highlights
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    if (hudCoords) {
      hudCoords.textContent = `AGENT GAZE X: ${mouseX.toFixed(2)} | Y: ${mouseY.toFixed(2)}`;
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    calculateTargetPosition();
  }, { passive: true });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    calculateTargetPosition();
  });

  // 7. Animation Loop (60FPS Organic Floating, Gaze Kinematics & Blinking)
  const clock = new THREE.Clock();
  let blinkTimer = 0;

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Natural Organic Floating Bob
    const hoverY = Math.sin(time * 2.5) * 0.18;

    // Smooth Lerp toward target screen position (Hero HUD or Sticky Background)
    botRoot.position.x += (currentTargetX - botRoot.position.x) * 0.08;
    botRoot.position.y += (currentTargetY + hoverY - botRoot.position.y) * 0.08;

    const curScale = botRoot.scale.x;
    const newScale = curScale + (currentTargetScale - curScale) * 0.08;
    botRoot.scale.set(newScale, newScale, newScale);

    // Hand floating dynamics
    leftHand.position.y = Math.sin(time * 2.5 + 0.6) * 0.12;
    rightHand.position.y = Math.sin(time * 2.5 - 0.6) * 0.12;

    // Arc Reactor Core Pulse
    const pulse = 2.0 + Math.sin(time * 6.0) * 0.6;
    reactorLight.intensity = pulse;
    reactorCore.scale.set(
      1 + Math.sin(time * 6.0) * 0.09,
      1 + Math.sin(time * 6.0) * 0.09,
      1
    );

    // Holographic Orbital Rings Counter-Spin
    ring1.rotation.z = time * 0.55;
    ring2.rotation.z = -time * 0.4;
    particles.rotation.y = time * 0.1;

    // Subtle background stars drift
    backgroundStars.rotation.y = time * 0.02;
    backgroundStars.position.x = -mouseX * 1.5;
    backgroundStars.position.y = -mouseY * 1.2;

    // Periodic AI Eye Blinking
    blinkTimer += 0.016;
    if (blinkTimer > 3.8) {
      leftEye.scale.y = 0.05;
      rightEye.scale.y = 0.05;
      if (blinkTimer > 4.0) {
        leftEye.scale.y = 1.0;
        rightEye.scale.y = 1.0;
        blinkTimer = 0;
      }
    }

    // --- KINEMATIC LOOK-AT / GAZE ENGINE ---
    targetRotY = mouseX * 0.85; // Up to ~48 degrees head turn
    targetRotX = -mouseY * 0.6; // Up to ~34 degrees head tilt
    targetRotZ = -mouseX * 0.15; // Subtle natural roll

    // Smooth Lerp Easing for Organic Head Tracking
    headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.09;
    headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.09;
    headGroup.rotation.z += (targetRotZ - headGroup.rotation.z) * 0.09;

    // Eyes lead the gaze inside the visor
    eyesGroup.position.x = headGroup.rotation.y * 0.45;
    eyesGroup.position.y = -headGroup.rotation.x * 0.35;

    // Torso subtly follows head
    bodyGroup.rotation.y += (targetRotY * 0.3 - bodyGroup.rotation.y) * 0.05;
    bodyGroup.rotation.x += (targetRotX * 0.2 - bodyGroup.rotation.x) * 0.05;

    // Whole Bot tilts and drifts slightly toward cursor
    botRoot.rotation.y = mouseX * 0.12;

    // Cursor Point Light tracks the cursor in 3D
    cursorLight.position.x = mouseX * 12;
    cursorLight.position.y = mouseY * 10;

    renderer.render(scene, camera);
  }

  animate();
})();
