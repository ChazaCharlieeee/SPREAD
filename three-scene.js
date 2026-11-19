import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const FLAVOR_COLORS = {
  hazelnut: 0x8b4e24,
  "salted-caramel": 0xd28a2e,
  "strawberry-jam": 0xb8334c,
  "pistachio-cream": 0x769f54,
  "golden-truffle": 0xdba938,
  "cosmic-honey": 0xf0b23a,
  "matcha-swirl": 0x5c8942,
  "spiced-chai": 0xa76432,
  "diamond-glaze": 0x9bd7ea,
  "nebula-butter": 0x9d6fe6
};

const THEME_PALETTES = {
  warm: {
    bg: 0xf4eadb,
    fog: 0xf4eadb,
    pedestal: 0xf8f1e6,
    mat: 0xc27732,
    sky: 0xe6f0ff,
    ground: 0xb68d65,
    key: 0xfff0d6,
    rim: 0xffc978
  },
  espresso: {
    bg: 0x160e09,
    fog: 0x160e09,
    pedestal: 0x2c1d14,
    mat: 0x8f4e1f,
    sky: 0x455875,
    ground: 0x3b2214,
    key: 0xffe4bc,
    rim: 0xf29f46
  },
  matcha: {
    bg: 0xe9f1e4,
    fog: 0xe9f1e4,
    pedestal: 0xf4f9ef,
    mat: 0x557b3e,
    sky: 0xe3f6ed,
    ground: 0x7c976b,
    key: 0xfff8e6,
    rim: 0xa2d67c
  }
};

const CAMERA_PRESETS = {
  studio: { pos: [0.0, 2.55, 7.6], target: [0.0, 1.0, 0.0] },
  jar: { pos: [-1.75, 1.85, 3.65], target: [-1.45, 0.92, 0.15] },
  gymnast: { pos: [1.75, 1.72, 3.35], target: [1.55, 1.05, 0.05] },
  hero: { pos: [0.0, 2.05, 4.9], target: [0.0, 0.96, 0.0] }
};

function detectSoftwareGl() {
  try {
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") || probe.getContext("webgl");
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || "");
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createMarbleTexture(maxAnisotropy) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f5ede0";
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 28; i++) {
    ctx.strokeStyle = i % 2 === 0 ? "rgba(182, 138, 92, 0.14)" : "rgba(255, 255, 255, 0.42)";
    ctx.lineWidth = 1 + (i % 4) * 1.4;
    ctx.beginPath();
    let x = (i * 47) % 512;
    let y = 0;
    ctx.moveTo(x, y);
    for (let s = 1; s <= 8; s++) {
      x += Math.sin(i * 1.7 + s * 0.9) * 34;
      y = (s / 8) * 512;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = 256;
  bumpCanvas.height = 256;
  const bctx = bumpCanvas.getContext("2d");
  bctx.fillStyle = "#808080";
  bctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1400; i++) {
    const shade = 116 + Math.floor(Math.random() * 28);
    bctx.fillStyle = `rgb(${shade},${shade},${shade})`;
    bctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.repeat.set(2, 2);
  albedo.anisotropy = maxAnisotropy;

  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = THREE.RepeatWrapping;
  bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(3, 3);
  bump.anisotropy = maxAnisotropy;

  return { albedo, bump };
}

function createMatWeaveTexture(maxAnisotropy) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e6dcd0";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(70, 45, 25, 0.14)";
  ctx.lineWidth = 2;
  for (let p = 0; p < 256; p += 16) {
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, 256);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(256, p);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  tex.anisotropy = maxAnisotropy;
  return tex;
}

function createContactShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 124);
  grad.addColorStop(0, "rgba(24, 14, 6, 0.55)");
  grad.addColorStop(0.55, "rgba(24, 14, 6, 0.22)");
  grad.addColorStop(1, "rgba(24, 14, 6, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildCompositeSpreadJar(isSoftwareGl, shadowTex, textures) {
  const group = new THREE.Group();
  group.name = "SpreadJarHero";

  // 1. Contact shadow plane flush with pedestal y = 0
  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 2.4),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.44 })
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.006;
  group.add(contactShadow);

  // 2. Sculpted inner spread core (LatheGeometry, creamy PBR)
  const corePoints = [
    new THREE.Vector2(0.0, 0.09),
    new THREE.Vector2(0.62, 0.09),
    new THREE.Vector2(0.7, 0.24),
    new THREE.Vector2(0.71, 0.92),
    new THREE.Vector2(0.58, 1.15),
    new THREE.Vector2(0.42, 1.24),
    new THREE.Vector2(0.0, 1.26)
  ];
  const spreadMat = new THREE.MeshStandardMaterial({
    color: FLAVOR_COLORS.hazelnut,
    roughness: 0.34,
    metalness: 0.04,
    bumpMap: textures.bump,
    bumpScale: 0.015
  });
  const spreadCore = new THREE.Mesh(new THREE.LatheGeometry(corePoints, 40), spreadMat);
  spreadCore.castShadow = !isSoftwareGl;
  spreadCore.receiveShadow = !isSoftwareGl;
  spreadCore.renderOrder = 1;
  group.add(spreadCore);

  // 3. Whipped swirl ribbon (TubeGeometry along 3D helix)
  const swirlPoints = [];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const angle = t * Math.PI * 3.8;
    const rad = (1 - t * 0.78) * 0.38;
    swirlPoints.push(new THREE.Vector3(Math.cos(angle) * rad, 1.24 + t * 0.44, Math.sin(angle) * rad));
  }
  const swirlCurve = new THREE.CatmullRomCurve3(swirlPoints);
  const swirlMat = new THREE.MeshPhysicalMaterial({
    color: 0xe3a857,
    roughness: 0.16,
    metalness: 0.02,
    clearcoat: 0.85,
    clearcoatRoughness: 0.12
  });
  const swirlMesh = new THREE.Mesh(new THREE.TubeGeometry(swirlCurve, 56, 0.075, 14, false), swirlMat);
  swirlMesh.castShadow = !isSoftwareGl;
  swirlMesh.renderOrder = 2;
  group.add(swirlMesh);

  // 4. Outer sculpted crystal glass jar (LatheGeometry)
  const jarPoints = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.68, 0.0),
    new THREE.Vector2(0.79, 0.14),
    new THREE.Vector2(0.81, 0.98),
    new THREE.Vector2(0.67, 1.22),
    new THREE.Vector2(0.56, 1.32),
    new THREE.Vector2(0.62, 1.37),
    new THREE.Vector2(0.52, 1.42)
  ];
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.08,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    ior: 1.52,
    thickness: 1.1,
    transmission: isSoftwareGl ? 0 : 0.86,
    transparent: true,
    opacity: isSoftwareGl ? 0.34 : 0.96,
    depthWrite: false
  });
  const jarGlass = new THREE.Mesh(new THREE.LatheGeometry(jarPoints, 48), glassMat);
  jarGlass.renderOrder = 4;
  group.add(jarGlass);

  // 5. Brushed gold base bezel ring
  const goldMat = new THREE.MeshPhysicalMaterial({
    color: 0xdfb15b,
    metalness: 0.94,
    roughness: 0.22,
    anisotropy: 0.8
  });
  const baseRing = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.04, 16, 48), goldMat);
  baseRing.rotation.x = Math.PI / 2;
  baseRing.position.y = 0.05;
  baseRing.castShadow = !isSoftwareGl;
  group.add(baseRing);

  // 6. Brushed gold neck collar
  const neckCollar = new THREE.Mesh(new THREE.TorusGeometry(0.57, 0.045, 16, 48), goldMat);
  neckCollar.rotation.x = Math.PI / 2;
  neckCollar.position.y = 1.31;
  neckCollar.castShadow = !isSoftwareGl;
  group.add(neckCollar);

  // 7. Front beveled nameplate medallion (ExtrudeGeometry)
  const badgeShape = new THREE.Shape();
  badgeShape.moveTo(-0.34, -0.18);
  badgeShape.lineTo(0.34, -0.18);
  badgeShape.quadraticCurveTo(0.4, -0.18, 0.4, -0.12);
  badgeShape.lineTo(0.4, 0.12);
  badgeShape.quadraticCurveTo(0.4, 0.18, 0.34, 0.18);
  badgeShape.lineTo(-0.34, 0.18);
  badgeShape.quadraticCurveTo(-0.4, 0.18, -0.4, 0.12);
  badgeShape.lineTo(-0.4, -0.12);
  badgeShape.quadraticCurveTo(-0.4, -0.18, -0.34, -0.18);
  const badgeGeo = new THREE.ExtrudeGeometry(badgeShape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  badgeGeo.center();
  const badge = new THREE.Mesh(badgeGeo, goldMat);
  badge.position.set(0, 0.62, 0.8);
  badge.castShadow = !isSoftwareGl;
  badge.renderOrder = 5;
  group.add(badge);

  // 8 & 9. Resting wooden/copper tasting spoon propped beside the jar
  const spoonGroup = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x6b3e21,
    roughness: 0.68,
    metalness: 0.04,
    bumpMap: textures.bump,
    bumpScale: 0.01
  });
  const handlePoints = [
    new THREE.Vector2(0.02, 0),
    new THREE.Vector2(0.032, 0.45),
    new THREE.Vector2(0.025, 0.9),
    new THREE.Vector2(0.038, 1.05),
    new THREE.Vector2(0.01, 1.08)
  ];
  const handle = new THREE.Mesh(new THREE.LatheGeometry(handlePoints, 16), woodMat);
  spoonGroup.add(handle);

  const bowlShape = new THREE.Shape();
  bowlShape.ellipse(0, 0, 0.14, 0.21, 0, Math.PI * 2, false, 0);
  const bowlGeo = new THREE.ExtrudeGeometry(bowlShape, {
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 3
  });
  bowlGeo.center();
  const copperMat = new THREE.MeshPhysicalMaterial({ color: 0xcf8347, metalness: 0.88, roughness: 0.24 });
  const spoonBowl = new THREE.Mesh(bowlGeo, copperMat);
  spoonBowl.position.set(0, -0.12, 0);
  spoonGroup.add(spoonBowl);

  spoonGroup.position.set(0.86, 0.22, 0.45);
  spoonGroup.rotation.set(-0.22, -0.3, -0.62);
  group.add(spoonGroup);

  return { group, spreadMat, swirlMat };
}

function buildCompositeHandstandGymnast(isSoftwareGl, shadowTex, matTex) {
  const root = new THREE.Group();
  root.name = "HandstandGymnastHero";

  // 1. Contact shadow flush at y = 0
  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.5, 1.6),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.4 })
  );
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.006;
  root.add(contactShadow);

  // 2. Beveled gymnastics mat (ExtrudeGeometry, grounded at y = 0)
  const matShape = new THREE.Shape();
  matShape.moveTo(-0.88, -0.44);
  matShape.lineTo(0.88, -0.44);
  matShape.quadraticCurveTo(0.96, -0.44, 0.96, -0.36);
  matShape.lineTo(0.96, 0.36);
  matShape.quadraticCurveTo(0.96, 0.44, 0.88, 0.44);
  matShape.lineTo(-0.88, 0.44);
  matShape.quadraticCurveTo(-0.96, 0.44, -0.96, 0.36);
  matShape.lineTo(-0.96, -0.36);
  matShape.quadraticCurveTo(-0.96, -0.44, -0.88, -0.44);
  const matGeo = new THREE.ExtrudeGeometry(matShape, {
    depth: 0.075,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3
  });
  matGeo.rotateX(-Math.PI / 2);
  matGeo.computeBoundingBox();
  matGeo.translate(0, -matGeo.boundingBox.min.y, 0);

  const matMaterial = new THREE.MeshStandardMaterial({
    color: THEME_PALETTES.warm.mat,
    map: matTex,
    roughness: 0.86,
    metalness: 0.04
  });
  const matMesh = new THREE.Mesh(matGeo, matMaterial);
  matMesh.castShadow = !isSoftwareGl;
  matMesh.receiveShadow = !isSoftwareGl;
  root.add(matMesh);

  // Mat top surface height is ~0.125
  const matTopY = matGeo.boundingBox.max.y;
  const actorGroup = new THREE.Group();
  actorGroup.position.set(0, matTopY, 0);
  root.add(actorGroup);

  const ceramicMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7efe4,
    roughness: 0.36,
    metalness: 0.08,
    clearcoat: 0.45
  });
  const bronzeGoldMat = new THREE.MeshPhysicalMaterial({
    color: 0xdba148,
    metalness: 0.88,
    roughness: 0.22,
    anisotropy: 0.75
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x5c361d,
    roughness: 0.5,
    metalness: 0.25
  });

  // 3 & 4. Hands grounded on mat + angled arms supporting shoulders
  const handGeo = new THREE.CylinderGeometry(0.075, 0.085, 0.035, 18);
  const armCurveL = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.24, 0.02, 0),
    new THREE.Vector3(-0.18, 0.28, 0.01),
    new THREE.Vector3(-0.14, 0.56, 0)
  ]);
  const armCurveR = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 0.02, 0),
    new THREE.Vector3(0.18, 0.28, 0.01),
    new THREE.Vector3(0.14, 0.56, 0)
  ]);

  const handL = new THREE.Mesh(handGeo, bronzeGoldMat);
  handL.position.set(-0.24, 0.017, 0);
  const handR = new THREE.Mesh(handGeo, bronzeGoldMat);
  handR.position.set(0.24, 0.017, 0);
  const armL = new THREE.Mesh(new THREE.TubeGeometry(armCurveL, 18, 0.055, 12, false), ceramicMat);
  const armR = new THREE.Mesh(new THREE.TubeGeometry(armCurveR, 18, 0.055, 12, false), ceramicMat);
  [handL, handR, armL, armR].forEach((m) => { m.castShadow = !isSoftwareGl; });
  actorGroup.add(handL, handR, armL, armR);

  // 5. Animated upper body cushion group (drops slightly as legs split)
  const bodyGroup = new THREE.Group();
  actorGroup.add(bodyGroup);

  // Sculpted inverted athletic torso (LatheGeometry)
  const torsoPts = [
    new THREE.Vector2(0.0, 0.54),
    new THREE.Vector2(0.16, 0.56),
    new THREE.Vector2(0.14, 0.72),
    new THREE.Vector2(0.095, 0.9),
    new THREE.Vector2(0.115, 1.06),
    new THREE.Vector2(0.0, 1.09)
  ];
  const torso = new THREE.Mesh(new THREE.LatheGeometry(torsoPts, 24), ceramicMat);
  torso.castShadow = !isSoftwareGl;
  bodyGroup.add(torso);

  // 6. Head + headband ring tucked between arms
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.115, 22, 18), bronzeGoldMat);
  head.position.set(0, 0.39, 0.05);
  head.castShadow = !isSoftwareGl;
  const headband = new THREE.Mesh(new THREE.TorusGeometry(0.112, 0.018, 10, 24), accentMat);
  headband.position.copy(head.position);
  headband.rotation.x = Math.PI / 2 - 0.15;
  bodyGroup.add(head, headband);

  // 7. Brass hip collar joint at y = 1.08
  const hipPivotY = 1.08;
  const hipCollar = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.026, 12, 24), accentMat);
  hipCollar.rotation.x = Math.PI / 2;
  hipCollar.position.set(0, hipPivotY, 0);
  bodyGroup.add(hipCollar);

  // 8 & 9. Articulated left & right legs pivoting at hip origin
  function makeLeg(sideSign) {
    const legPivot = new THREE.Group();
    legPivot.position.set(sideSign * 0.055, hipPivotY, 0);

    const legPts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.068, 0.05),
      new THREE.Vector2(0.058, 0.36),
      new THREE.Vector2(0.044, 0.62),
      new THREE.Vector2(0.036, 0.86),
      new THREE.Vector2(0.016, 0.94),
      new THREE.Vector2(0.0, 0.96)
    ];
    const legMesh = new THREE.Mesh(new THREE.LatheGeometry(legPts, 20), bronzeGoldMat);
    legMesh.castShadow = !isSoftwareGl;
    legPivot.add(legMesh);

    const slipper = new THREE.Mesh(new THREE.ConeGeometry(0.042, 0.14, 14), accentMat);
    slipper.position.set(sideSign * 0.03, 0.95, 0);
    slipper.rotation.z = -sideSign * 0.45;
    legPivot.add(slipper);

    return legPivot;
  }

  const legL = makeLeg(-1);
  const legR = makeLeg(1);
  bodyGroup.add(legL, legR);

  return { root, actorGroup, bodyGroup, legL, legR, matMaterial };
}

function initSpread3D() {
  const mount = document.getElementById("three-bg-mount");
  if (!mount) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSoftwareGl = detectSoftwareGl();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: "high-performance",
      alpha: false
    });
  } catch (err) {
    console.warn("WebGL unavailable; continuing with styled canvas fallback.", err);
    return;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  mount.replaceChildren(renderer.domElement);

  const scene = new THREE.Scene();
  const initialPalette = THEME_PALETTES.warm;
  scene.background = new THREE.Color(initialPalette.bg);
  scene.fog = new THREE.FogExp2(initialPalette.fog, 0.038);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envRenderTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRenderTarget.texture;
  pmremGenerator.dispose();

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.set(...CAMERA_PRESETS.studio.pos);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.minDistance = 2.4;
  controls.maxDistance = 12.5;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minPolarAngle = 0.25;
  controls.target.set(...CAMERA_PRESETS.studio.target);
  controls.enabled = false;

  // Lighting rig (warm key vs cool fill + rim + dynamic spark point)
  const hemiLight = new THREE.HemisphereLight(initialPalette.sky, initialPalette.ground, 0.88);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(initialPalette.key, 2.05);
  keyLight.position.set(4.5, 7.2, 5.0);
  keyLight.castShadow = !isSoftwareGl;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.camera.left = -6.5;
  keyLight.shadow.camera.right = 6.5;
  keyLight.shadow.camera.top = 6.5;
  keyLight.shadow.camera.bottom = -6.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(initialPalette.rim, 0.95);
  rimLight.position.set(-4.5, 4.2, -5.0);
  scene.add(rimLight);

  const sparkLight = new THREE.PointLight(0xffbe55, 0.8, 9, 2);
  sparkLight.position.set(0, 2.2, 1.5);
  scene.add(sparkLight);

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const marbleTextures = createMarbleTexture(maxAnisotropy);
  const matTexture = createMatWeaveTexture(maxAnisotropy);
  const shadowTex = createContactShadowTexture();

  // Studio floor + marble turntable pedestal (y = 0 top surface)
  const studioGroup = new THREE.Group();
  const floorMat = new THREE.MeshStandardMaterial({
    color: initialPalette.bg,
    roughness: 0.92,
    metalness: 0.02
  });
  const floorMesh = new THREE.Mesh(new THREE.CircleGeometry(36, 48), floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.y = -0.34;
  floorMesh.receiveShadow = !isSoftwareGl;
  studioGroup.add(floorMesh);

  const pedestalMat = new THREE.MeshStandardMaterial({
    color: initialPalette.pedestal,
    map: marbleTextures.albedo,
    bumpMap: marbleTextures.bump,
    bumpScale: 0.015,
    roughness: 0.42,
    metalness: 0.05
  });
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(3.45, 3.68, 0.34, 64), pedestalMat);
  pedestal.position.y = -0.17;
  pedestal.receiveShadow = !isSoftwareGl;
  studioGroup.add(pedestal);

  const pedestalRim = new THREE.Mesh(
    new THREE.TorusGeometry(3.46, 0.032, 14, 72),
    new THREE.MeshPhysicalMaterial({ color: 0xd9a84f, metalness: 0.92, roughness: 0.2 })
  );
  pedestalRim.rotation.x = Math.PI / 2;
  pedestalRim.position.y = -0.015;
  studioGroup.add(pedestalRim);
  scene.add(studioGroup);

  // Hero #1: Spread Jar
  const jarRig = buildCompositeSpreadJar(isSoftwareGl, shadowTex, marbleTextures);
  jarRig.group.position.set(-1.45, 0, 0.15);
  jarRig.group.rotation.y = 0.28;
  scene.add(jarRig.group);

  // Hero #2: Handstand-to-Split Gymnast
  const gymnastRig = buildCompositeHandstandGymnast(isSoftwareGl, shadowTex, matTexture);
  gymnastRig.root.position.set(1.55, 0, 0.05);
  gymnastRig.root.rotation.y = -0.25;
  scene.add(gymnastRig.root);

  // Instanced floating golden sparkles (52 octahedrons)
  const SPARK_COUNT = 52;
  const sparkGeo = new THREE.OctahedronGeometry(0.055, 0);
  const sparkMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.72,
    roughness: 0.2,
    emissive: 0xc47d2e,
    emissiveIntensity: 0.28
  });
  const sparks = new THREE.InstancedMesh(sparkGeo, sparkMat, SPARK_COUNT);
  sparks.frustumCulled = false;

  const sparkSeeds = [];
  const _dummy = new THREE.Object3D();
  const _color = new THREE.Color();
  const _targetBg = new THREE.Color(initialPalette.bg);
  const _targetPedestal = new THREE.Color(initialPalette.pedestal);
  const _targetMat = new THREE.Color(initialPalette.mat);
  const _targetSpread = new THREE.Color(FLAVOR_COLORS.hazelnut);
  const _camTargetPos = new THREE.Vector3(...CAMERA_PRESETS.studio.pos);
  const _camTargetLook = new THREE.Vector3(...CAMERA_PRESETS.studio.target);

  for (let i = 0; i < SPARK_COUNT; i++) {
    const radius = 1.9 + (i % 7) * 0.48 + Math.random() * 0.35;
    const angle = (i / SPARK_COUNT) * Math.PI * 2;
    const baseY = 0.35 + (i % 9) * 0.34;
    const speed = 0.16 + (i % 5) * 0.06;
    const scale = 0.65 + (i % 4) * 0.25;
    sparkSeeds.push({ radius, angle, baseY, speed, scale, phase: i * 0.7 });
    _color.setHSL(0.09 + (i % 4) * 0.025, 0.78, 0.62);
    sparks.setColorAt(i, _color);
    _dummy.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius);
    _dummy.scale.setScalar(scale);
    _dummy.updateMatrix();
    sparks.setMatrixAt(i, _dummy.matrix);
  }
  sparks.instanceMatrix.needsUpdate = true;
  if (sparks.instanceColor) sparks.instanceColor.needsUpdate = true;
  sparks.computeBoundingSphere();
  scene.add(sparks);

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  let clickPulse = 0;
  let extraSplitKick = 0;
  let isFrenzy = false;
  let isFever = false;
  let splitAngle = 45;
  let cameraTransitionActive = false;
  let activePreset = "studio";
  let zenMode = false;
  let contextLost = false;
  let frameId = 0;
  let elapsed = 0;
  let prevNow = performance.now();

  controls.addEventListener("start", () => {
    cameraTransitionActive = false;
  });

  function applyPreset(presetId) {
    activePreset = presetId;
    if (presetId === "orbit") {
      controls.enabled = zenMode;
      cameraTransitionActive = false;
      return;
    }
    const p = CAMERA_PRESETS[presetId] || CAMERA_PRESETS.studio;
    _camTargetPos.set(...p.pos);
    _camTargetLook.set(...p.target);
    cameraTransitionActive = true;
    controls.enabled = zenMode;
  }

  function setZenMode(enabled) {
    zenMode = Boolean(enabled);
    document.body.classList.toggle("zen-3d-mode", zenMode);
    controls.enabled = zenMode;
    if (!zenMode) {
      applyPreset("studio");
    } else if (activePreset === "studio") {
      applyPreset("hero");
    }
    const toggleBtn = document.getElementById("dock-zen-btn");
    const topBtn = document.getElementById("top-zen-btn");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(zenMode));
      toggleBtn.textContent = zenMode ? "▾ Back to Game" : "🎬 3D Studio View";
    }
    if (topBtn) {
      topBtn.setAttribute("aria-pressed", String(zenMode));
      topBtn.textContent = zenMode ? "🎮 Game View" : "🎬 3D Studio";
    }
  }

  function afterDraw(cb) {
    const gl = renderer.getContext();
    const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
    if (!sync) {
      frameId = window.setTimeout(cb, 80);
      return;
    }
    gl.flush();
    const poll = () => {
      const status = gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (status === gl.UNSIGNALED) {
        frameId = window.setTimeout(poll, 5);
      } else {
        gl.deleteSync(sync);
        frameId = window.setTimeout(cb, 80);
      }
    };
    frameId = window.setTimeout(poll, 5);
  }

  function tick(now) {
    if (contextLost) return;
    const rawDt = (now - prevNow) / 1000;
    prevNow = now;
    const dt = Math.min(0.08, Math.max(0.001, rawDt || 0.016));
    if (!prefersReducedMotion) elapsed += dt;

    clickPulse = THREE.MathUtils.damp(clickPulse, 0, 8.5, dt);
    extraSplitKick = THREE.MathUtils.damp(extraSplitKick, 0, 4.5, dt);

    // Smooth color transitions
    scene.background.lerp(_targetBg, 1 - Math.exp(-5 * dt));
    scene.fog.color.copy(scene.background);
    floorMat.color.lerp(_targetBg, 1 - Math.exp(-5 * dt));
    pedestalMat.color.lerp(_targetPedestal, 1 - Math.exp(-5 * dt));
    gymnastRig.matMaterial.color.lerp(_targetMat, 1 - Math.exp(-5 * dt));
    jarRig.spreadMat.color.lerp(_targetSpread, 1 - Math.exp(-5 * dt));

    // 3D Jar pulse & rotation
    const jarSquashY = 1 - clickPulse * 0.14;
    const jarSquashXZ = 1 + clickPulse * 0.09;
    jarRig.group.scale.set(jarSquashXZ, jarSquashY, jarSquashXZ);
    jarRig.group.rotation.y = 0.28 + Math.sin(elapsed * 0.45) * 0.16 + (isFrenzy ? elapsed * 0.8 : 0);

    // Handstand straight-to-split repeating loop (2.6s period)
    const cycle = (elapsed % 2.6) / 2.6;
    const rawBell = Math.sin(cycle * Math.PI);
    const smoothBell = Math.pow(Math.max(0, rawBell), 1.35);
    const maxSpreadRad = THREE.MathUtils.degToRad(Math.min(100, 68 + (splitAngle - 45) * 0.14 + extraSplitKick * 12));
    const legAngle = smoothBell * maxSpreadRad;
    gymnastRig.legL.rotation.z = legAngle;
    gymnastRig.legR.rotation.z = -legAngle;
    gymnastRig.bodyGroup.position.y = -smoothBell * 0.035;
    gymnastRig.root.rotation.y = -0.25 + Math.sin(elapsed * 0.38) * 0.2;

    // Spark point light energy
    const targetSparkIntensity = isFrenzy ? 2.8 : isFever ? 1.9 : 0.8 + clickPulse * 1.4;
    sparkLight.intensity = THREE.MathUtils.damp(sparkLight.intensity, targetSparkIntensity, 7, dt);

    // Instanced orbiting sparkles (zero allocations)
    const orbitMult = isFrenzy ? 2.4 : isFever ? 1.65 : 1.0 + clickPulse * 0.8;
    for (let i = 0; i < SPARK_COUNT; i++) {
      const s = sparkSeeds[i];
      const a = s.angle + elapsed * s.speed * orbitMult;
      const r = s.radius + Math.sin(elapsed * 1.1 + s.phase) * 0.18;
      const y = s.baseY + Math.sin(elapsed * 1.4 + s.phase) * 0.22;
      _dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
      _dummy.rotation.set(elapsed * 0.9 + s.phase, elapsed * 1.2, 0);
      _dummy.scale.setScalar(s.scale * (1 + clickPulse * 0.35));
      _dummy.updateMatrix();
      sparks.setMatrixAt(i, _dummy.matrix);
    }
    sparks.instanceMatrix.needsUpdate = true;

    if (cameraTransitionActive) {
      const k = 1 - Math.exp(-5.5 * dt);
      camera.position.lerp(_camTargetPos, k);
      controls.target.lerp(_camTargetLook, k);
      if (camera.position.distanceTo(_camTargetPos) < 0.02) {
        cameraTransitionActive = false;
      }
    }
    if (controls.enabled) {
      controls.update();
    } else {
      camera.lookAt(controls.target);
    }

    renderer.render(scene, camera);

    if (isSoftwareGl) {
      afterDraw(() => tick(performance.now()));
    } else {
      frameId = requestAnimationFrame(tick);
    }
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", handleResize);

  renderer.domElement.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    contextLost = true;
    window.cancelAnimationFrame(frameId);
    window.clearTimeout(frameId);
  });
  renderer.domElement.addEventListener("webglcontextrestored", () => {
    contextLost = false;
    prevNow = performance.now();
    frameId = requestAnimationFrame(tick);
  });

  // Wire collapsible bottom dock & top shortcut
  const dock = document.getElementById("studio-dock");
  const dockCollapseBtn = document.getElementById("dock-collapse-btn");
  const dockZenBtn = document.getElementById("dock-zen-btn");
  const topZenBtn = document.getElementById("top-zen-btn");
  const presetBtns = document.querySelectorAll("[data-camera-preset]");

  if (dockCollapseBtn && dock) {
    dockCollapseBtn.addEventListener("click", () => {
      const collapsed = dock.classList.toggle("collapsed");
      dockCollapseBtn.textContent = collapsed ? "▴ 3D Controls" : "▾ Hide Bar";
      dockCollapseBtn.setAttribute("aria-expanded", String(!collapsed));
    });
  }
  if (dockZenBtn) {
    dockZenBtn.addEventListener("click", () => setZenMode(!zenMode));
  }
  if (topZenBtn) {
    topZenBtn.addEventListener("click", () => setZenMode(!zenMode));
  }
  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const preset = btn.dataset.cameraPreset || "studio";
      presetBtns.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      if (!zenMode && preset !== "studio") setZenMode(true);
      applyPreset(preset);
    });
  });

  window.Spread3D = {
    pulseClick(strength = 1) {
      clickPulse = Math.min(1.5, Math.max(clickPulse, 0.7 * strength));
      extraSplitKick = Math.min(1.8, Math.max(extraSplitKick, 0.65 * strength));
    },
    setTheme(themeId) {
      const p = THEME_PALETTES[themeId] || THEME_PALETTES.warm;
      _targetBg.setHex(p.bg);
      _targetPedestal.setHex(p.pedestal);
      _targetMat.setHex(p.mat);
      hemiLight.color.setHex(p.sky);
      hemiLight.groundColor.setHex(p.ground);
      keyLight.color.setHex(p.key);
      rimLight.color.setHex(p.rim);
    },
    setFlavor(flavorId) {
      const hex = FLAVOR_COLORS[flavorId] || FLAVOR_COLORS.hazelnut;
      _targetSpread.setHex(hex);
    },
    setState(next = {}) {
      if (typeof next.frenzy === "boolean") isFrenzy = next.frenzy;
      if (typeof next.fever === "boolean") isFever = next.fever;
      if (typeof next.splitAngle === "number") splitAngle = next.splitAngle;
    },
    setZenMode
  };

  if (isSoftwareGl) {
    afterDraw(() => tick(performance.now()));
  } else {
    frameId = requestAnimationFrame(tick);
  }
}

initSpread3D();
