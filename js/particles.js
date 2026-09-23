document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-particles');
  if (!container) return;

  // 1. Escena, cámara y renderizador WebGL
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5.5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. Construcción matemática de la nube de partículas (Foco / Bombilla 3D)
  const particleCount = 18000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Gradiente institucional: blanco, rojo principal y rojo oscuro.
  const colorTop = new THREE.Color(0xffffff);
  const colorBottom = new THREE.Color(0xba2a33);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Distribución esférica y cónica para silueta de bombilla/cerebro
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 1.8;

    let x = r * Math.sin(phi) * Math.cos(theta);
    let y = r * Math.sin(phi) * Math.sin(theta);
    let z = r * Math.cos(phi);

    // Deformar la geometría hacia abajo para crear la base
    if (y < 0) {
      x *= 0.65;
      z *= 0.65;
      y *= 1.35;
    }

    positions[i3] = x;
    positions[i3 + 1] = y + 0.3;
    positions[i3 + 2] = z;

    // Gradiente vertical de color
    const mixedColor = colorBottom.clone().lerp(colorTop, Math.min(1, Math.max(0, (y + 1.8) / 3.2)));
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // 3. Material con puntos aditivos brillantes
  const material = new THREE.PointsMaterial({
    size: 0.028,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleMesh = new THREE.Points(geometry, material);
  scene.add(particleMesh);

  // 4. Interacción reactiva con el cursor
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  // 5. Ciclo de animación (render loop)
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Rotación continua suave
    particleMesh.rotation.y = elapsedTime * 0.08;

    // Seguimiento elástico al mouse
    targetX = mouseX * 0.8;
    targetY = mouseY * 0.8;
    particleMesh.rotation.y += 0.05 * (targetX - particleMesh.rotation.y);
    particleMesh.rotation.x += 0.05 * (targetY - particleMesh.rotation.x);

    renderer.render(scene, camera);
  }
  animate();

  // 6. Ajuste responsive al redimensionar ventana
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});