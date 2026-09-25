import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Scene } from "@babylonjs/core/scene";

export type GameMode = "booting" | "playing" | "paused" | "player-failed" | "level-complete";
export type InputAction = "move-left" | "move-right" | "move-up" | "move-down" | "jump" | "interact" | "pause";
export type FailureReason = "fell" | "jet" | "left-area";

export interface GameSnapshot {
  mode: GameMode;
  levelTitle: string;
  objective: string;
  waterPointActive: boolean;
  checkpointActive: boolean;
  activeJet: number;
  totalJets: number;
  hint: string;
  playerStatus: string;
  reducedMotion: boolean;
}

export interface GameRuntime {
  scene: Scene;
  start(): void;
  pause(): void;
  resume(): void;
  restart(): void;
  setAction(action: InputAction, pressed: boolean): void;
  setPausedByOrientation(paused: boolean): void;
  setReducedMotion(enabled: boolean): void;
  subscribe(listener: (snapshot: GameSnapshot) => void): () => void;
  getSnapshot(): GameSnapshot;
  dispose(): void;
}

type SnapshotListener = (snapshot: GameSnapshot) => void;

type BoxCollider = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

type Jet = {
  x: number;
  z: number;
  width: number;
  direction: number;
  phase: number;
  mesh: Mesh;
  particles: ParticleSystem;
  foam: ParticleSystem;
  active: boolean;
};

const palette = {
  deepBlue: new Color3(0.029, 0.329, 0.467),
  water: new Color3(0.07, 0.66, 0.77),
  aqua: new Color3(0.37, 0.85, 0.83),
  leaf: new Color3(0.30, 0.67, 0.27),
  forest: new Color3(0.09, 0.42, 0.29),
  sun: new Color3(0.96, 0.78, 0.27),
  orange: new Color3(0.95, 0.46, 0.13),
  sand: new Color3(0.91, 0.76, 0.53),
  foam: new Color3(0.97, 1, 0.96),
  coral: new Color3(0.86, 0.29, 0.25),
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
const approach = (current: number, target: number, amount: number) => {
  if (Math.abs(target - current) <= amount) return target;
  return current + Math.sign(target - current) * amount;
};

function material(scene: Scene, name: string, color: Color3, alpha = 1): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = new Color3(0.08, 0.14, 0.16);
  mat.alpha = alpha;
  if (alpha < 1) {
    mat.transparencyMode = StandardMaterial.MATERIAL_ALPHABLEND;
    mat.backFaceCulling = false;
  }
  return mat;
}

function particleTexture(scene: Scene, name: string, color: string): DynamicTexture {
  const texture = new DynamicTexture(name, { width: 64, height: 64 }, scene, true);
  const ctx = texture.getContext() as unknown as CanvasRenderingContext2D;
  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 31);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.55, color.replace(/\)$/, ", 0.72)").replace("rgb", "rgba"));
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  texture.update();
  return texture;
}

function createParticleSystem(
  scene: Scene,
  name: string,
  emitter: AbstractMesh,
  texture: DynamicTexture,
  capacity: number,
  emitRate: number,
  colorStart: Color4,
  colorEnd: Color4,
): ParticleSystem {
  const system = new ParticleSystem(name, capacity, scene);
  system.particleTexture = texture;
  system.emitter = emitter;
  system.minLifeTime = 0.22;
  system.maxLifeTime = 0.62;
  system.minSize = 0.08;
  system.maxSize = 0.28;
  system.minEmitPower = 0.35;
  system.maxEmitPower = 0.95;
  system.emitRate = emitRate;
  system.color1 = colorStart;
  system.color2 = colorEnd;
  system.colorDead = new Color4(colorEnd.r, colorEnd.g, colorEnd.b, 0);
  system.gravity = new Vector3(0, -2.6, 0);
  system.blendMode = ParticleSystem.BLENDMODE_STANDARD;
  system.direction1 = new Vector3(-0.35, 0.9, -0.35);
  system.direction2 = new Vector3(0.35, 1.45, 0.35);
  system.minEmitBox = new Vector3(-0.16, 0, -0.16);
  system.maxEmitBox = new Vector3(0.16, 0.04, 0.16);
  return system;
}

function createSplash(scene: Scene, position: Vector3, texture: DynamicTexture, reducedMotion: boolean): ParticleSystem {
  const emitter = MeshBuilder.CreateBox("splash-emitter", { size: 0.08 }, scene);
  emitter.isVisible = false;
  emitter.position.copyFrom(position);
  const splash = new ParticleSystem("splash-burst", reducedMotion ? 12 : 28, scene);
  splash.particleTexture = texture;
  splash.emitter = emitter;
  splash.minLifeTime = 0.2;
  splash.maxLifeTime = reducedMotion ? 0.3 : 0.55;
  splash.minSize = 0.08;
  splash.maxSize = reducedMotion ? 0.2 : 0.38;
  splash.minEmitPower = 0.35;
  splash.maxEmitPower = reducedMotion ? 0.65 : 1.35;
  splash.emitRate = 0;
  splash.manualEmitCount = reducedMotion ? 8 : 18;
  splash.color1 = new Color4(0.78, 0.98, 1, 0.9);
  splash.color2 = new Color4(0.28, 0.78, 0.88, 0.55);
  splash.colorDead = new Color4(0.28, 0.78, 0.88, 0);
  splash.gravity = new Vector3(0, -3.8, 0);
  splash.direction1 = new Vector3(-1.3, 0.7, -1.3);
  splash.direction2 = new Vector3(1.3, 1.7, 1.3);
  splash.start();
  window.setTimeout(() => {
    splash.stop();
    splash.dispose();
    emitter.dispose();
  }, reducedMotion ? 420 : 720);
  return splash;
}

function createTurtle(scene: Scene): TransformNode {
  const root = new TransformNode("turtle-player", scene);
  const bodyMat = material(scene, "turtle-body", palette.leaf);
  const shellMat = material(scene, "turtle-shell", palette.forest);
  const accentMat = material(scene, "turtle-accent", palette.aqua);
  const eyeMat = material(scene, "turtle-eyes", new Color3(0.035, 0.08, 0.08));

  const body = MeshBuilder.CreateSphere("turtle-body", { diameter: 1.22, segments: 12 }, scene);
  body.scaling = new Vector3(0.82, 0.66, 0.93);
  body.position.y = 0.78;
  body.material = bodyMat;
  body.parent = root;

  const shell = MeshBuilder.CreateSphere("turtle-shell", { diameter: 1.48, segments: 12 }, scene);
  shell.scaling = new Vector3(0.86, 0.42, 1);
  shell.position = new Vector3(-0.05, 1.12, 0);
  shell.material = shellMat;
  shell.parent = root;

  const shellStripe = MeshBuilder.CreateTorus("shell-wave", { diameter: 0.82, thickness: 0.075, tessellation: 12 }, scene);
  shellStripe.rotation.x = Math.PI / 2;
  shellStripe.rotation.z = Math.PI / 2;
  shellStripe.position = new Vector3(-0.06, 1.24, 0.55);
  shellStripe.scaling = new Vector3(0.9, 0.55, 1);
  shellStripe.material = accentMat;
  shellStripe.parent = root;

  const head = MeshBuilder.CreateSphere("turtle-head", { diameter: 0.72, segments: 12 }, scene);
  head.scaling = new Vector3(0.92, 0.88, 0.88);
  head.position = new Vector3(0.65, 0.82, 0);
  head.material = bodyMat;
  head.parent = root;

  for (const z of [-0.22, 0.22]) {
    const eye = MeshBuilder.CreateSphere("turtle-eye", { diameter: 0.12, segments: 8 }, scene);
    eye.position = new Vector3(0.98, 1.02, z);
    eye.material = eyeMat;
    eye.parent = root;
  }

  for (const z of [-0.48, 0.48]) {
    const flipper = MeshBuilder.CreateSphere("turtle-flipper", { diameter: 0.42, segments: 8 }, scene);
    flipper.scaling = new Vector3(0.9, 0.35, 1.25);
    flipper.position = new Vector3(0.08, 0.38, z);
    flipper.material = bodyMat;
    flipper.parent = root;
  }

  return root;
}

function createPalm(scene: Scene, position: Vector3, scale = 1): TransformNode {
  const root = new TransformNode("palm", scene);
  root.position.copyFrom(position);
  root.scaling = new Vector3(scale, scale, scale);
  const trunk = MeshBuilder.CreateCylinder("palm-trunk", { height: 2.4, diameterTop: 0.16, diameterBottom: 0.3, tessellation: 8 }, scene);
  trunk.position.y = 1.2;
  trunk.material = material(scene, "palm-trunk-mat", new Color3(0.46, 0.29, 0.15));
  trunk.parent = root;
  const leafMat = material(scene, "palm-leaf-mat", palette.leaf);
  for (let i = 0; i < 6; i += 1) {
    const leaf = MeshBuilder.CreateSphere("palm-leaf", { diameter: 1.25, segments: 8 }, scene);
    leaf.scaling = new Vector3(1.7, 0.18, 0.34);
    leaf.position = new Vector3(Math.cos(i * Math.PI / 3) * 0.7, 2.42, Math.sin(i * Math.PI / 3) * 0.7);
    leaf.rotation.y = i * Math.PI / 3;
    leaf.material = leafMat;
    leaf.parent = root;
  }
  return root;
}

function createLabel(scene: Scene, text: string, position: Vector3, color: string, width = 3.2): Mesh {
  const plane = MeshBuilder.CreatePlane(`label-${text}`, { width, height: 0.56 }, scene);
  plane.position.copyFrom(position);
  plane.billboardMode = Mesh.BILLBOARDMODE_ALL;
  const texture = new DynamicTexture(`label-texture-${text}`, { width: 640, height: 112 }, scene, true);
  const ctx = texture.getContext() as unknown as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, 640, 112);
  ctx.fillStyle = "rgba(5, 49, 67, .84)";
  ctx.roundRect(8, 8, 624, 96, 26);
  ctx.fill();
  ctx.font = "700 34px Arial";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 320, 56);
  texture.update();
  const mat = new StandardMaterial(`label-mat-${text}`, scene);
  mat.diffuseTexture = texture;
  mat.opacityTexture = texture;
  mat.emissiveColor = Color3.White();
  mat.disableLighting = true;
  plane.material = mat;
  return plane;
}

export function createGameScene(canvas: HTMLCanvasElement): GameRuntime {
  const engine = new Engine(canvas, true, { stencil: true, preserveDrawingBuffer: true, adaptToDeviceRatio: true });
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.48, 0.82, 0.9, 1);

  const camera = new ArcRotateCamera("isometric-camera", -Math.PI / 4, 1.03, 23, new Vector3(0, 0, 0), scene);
  camera.lowerBetaLimit = 0.88;
  camera.upperBetaLimit = 1.16;
  camera.lowerRadiusLimit = 18;
  camera.upperRadiusLimit = 28;
  camera.inputs.clear();
  camera.wheelPrecision = 10000;
  camera.attachControl(canvas, false);
  camera.detachControl();

  const hemi = new HemisphericLight("sunlight", new Vector3(0.1, 1, 0.15), scene);
  hemi.intensity = 1.15;
  hemi.diffuse = new Color3(1, 0.96, 0.84);
  hemi.groundColor = new Color3(0.16, 0.35, 0.4);

  const fill = new HemisphericLight("water-fill", new Vector3(-0.8, 0.35, -0.4), scene);
  fill.intensity = 0.28;
  fill.diffuse = palette.aqua;

  const root = new TransformNode("level-01-root", scene);
  const staticColliders: BoxCollider[] = [];
  const jets: Jet[] = [];
  const listeners = new Set<SnapshotListener>();
  const actions = new Set<InputAction>();
  const waterTexture = particleTexture(scene, "water-particle", "rgb(210, 250, 255)");
  const foamTexture = particleTexture(scene, "foam-particle", "rgb(255, 255, 255)");

  const groundMat = material(scene, "sand-material", palette.sand);
  const waterMat = material(scene, "pool-water-material", palette.water, 0.8);
  waterMat.specularColor = new Color3(0.25, 0.9, 0.95);
  const waterPattern = new Texture("/manus-storage/eco-thermas-water-pattern_112562cd.png", scene);
  waterPattern.uScale = 2.2;
  waterPattern.vScale = 1.35;
  waterMat.diffuseTexture = waterPattern;
  waterMat.diffuseColor = Color3.White();
  const deepMat = material(scene, "deep-water-material", palette.deepBlue, 0.82);
  const platformMat = material(scene, "platform-material", new Color3(0.94, 0.68, 0.3));
  const coralMat = material(scene, "coral-material", palette.coral);
  const goalMat = material(scene, "water-point-material", palette.sun);

  const ground = MeshBuilder.CreateGround("level-ground", { width: 32, height: 9, subdivisions: 2 }, scene);
  ground.material = groundMat;
  ground.parent = root;

  const shallowWater = MeshBuilder.CreateGround("shallow-water", { width: 19, height: 6.4, subdivisions: 12 }, scene);
  shallowWater.position = new Vector3(0.9, 0.035, 0.25);
  shallowWater.material = waterMat;
  shallowWater.parent = root;

  const deepWater = MeshBuilder.CreateGround("deep-water", { width: 12, height: 2.2, subdivisions: 8 }, scene);
  deepWater.position = new Vector3(1.9, 0.06, -2.8);
  deepWater.material = deepMat;
  deepWater.parent = root;

  const dock = MeshBuilder.CreateBox("dock", { width: 7.2, height: 0.22, depth: 1.8 }, scene);
  dock.position = new Vector3(8.3, 0.35, 1.6);
  dock.material = platformMat;
  dock.parent = root;
  staticColliders.push({ minX: 4.7, maxX: 11.9, minY: 0.35, maxY: 0.57, minZ: 0.7, maxZ: 2.5 });

  const teachingPlatform = MeshBuilder.CreateBox("teaching-platform", { width: 2.2, height: 0.5, depth: 1.8 }, scene);
  teachingPlatform.position = new Vector3(-9.2, 0.25, 1.85);
  teachingPlatform.material = platformMat;
  teachingPlatform.parent = root;
  staticColliders.push({ minX: -10.3, maxX: -8.1, minY: 0, maxY: 0.5, minZ: 0.95, maxZ: 2.75 });

  for (const x of [-13, -10.4, -7.8, -5.2, -2.6, 0, 2.6, 5.2, 7.8, 10.4, 13.1]) {
    const ring = MeshBuilder.CreateTorus(`buoy-${x}`, { diameter: 0.58, thickness: 0.08, tessellation: 12 }, scene);
    ring.rotation.x = Math.PI / 2;
    ring.position = new Vector3(x, 0.12, 3.6);
    ring.material = material(scene, `buoy-mat-${x}`, x % 5.2 === 0 ? palette.sun : palette.coral);
    ring.parent = root;
  }

  createPalm(scene, new Vector3(-13, 0, -3.3), 1.1).parent = root;
  createPalm(scene, new Vector3(-6.2, 0, 3.25), 0.8).parent = root;
  createPalm(scene, new Vector3(11.8, 0, -3.25), 1.15).parent = root;

  const sign = MeshBuilder.CreateBox("tutorial-sign", { width: 0.12, height: 1.2, depth: 0.12 }, scene);
  sign.position = new Vector3(-11.8, 0.6, 1.8);
  sign.material = material(scene, "sign-post", palette.deepBlue);
  sign.parent = root;
  createLabel(scene, "MOVA-SE", new Vector3(-11.8, 1.55, 1.8), "#ffffff", 2.4).parent = root;
  createLabel(scene, "PULO", new Vector3(-9.2, 1.45, 2.15), "#ffffff", 1.8).parent = root;
  createLabel(scene, "JATOS", new Vector3(-3.2, 1.55, -0.2), "#ffffff", 2.1).parent = root;

  const player = createTurtle(scene);
  player.position = new Vector3(-14, 0, 0);
  player.parent = root;

  const playerPosition = new Vector3(-14, 0, 0);
  const playerVelocity = new Vector3(0, 0, 0);
  const checkpoint = new Vector3(-14, 0, 0);
  let grounded = true;
  let waterPointActive = false;
  let checkpointActive = false;
  let mode: GameMode = "booting";
  let reducedMotion = false;
  let orientationPaused = false;
  let elapsed = 0;
  let failTimer = 0;
  let interactionHint = "Use A/D ou as setas para explorar";
  let lastJetCount = 0;

  const waterPoint = MeshBuilder.CreateCylinder("water-point", { diameter: 0.75, height: 0.14, tessellation: 24 }, scene);
  waterPoint.position = new Vector3(9.55, 0.62, 1.58);
  waterPoint.material = goalMat;
  waterPoint.parent = root;
  const waterPointOrb = MeshBuilder.CreateSphere("water-point-orb", { diameter: 0.46, segments: 12 }, scene);
  waterPointOrb.position = new Vector3(9.55, 1.05, 1.58);
  waterPointOrb.material = material(scene, "water-point-orb-mat", palette.aqua, 0.72);
  waterPointOrb.parent = root;
  createLabel(scene, "PONTO DE ÁGUA", new Vector3(9.55, 1.8, 1.58), "#063b51", 3.6).parent = root;

  const exitArch = MeshBuilder.CreateTorus("exit-arch", { diameter: 2.4, thickness: 0.18, tessellation: 24 }, scene);
  exitArch.rotation.x = Math.PI / 2;
  exitArch.position = new Vector3(14.05, 1.25, 0);
  exitArch.material = material(scene, "exit-arch-mat", palette.sun);
  exitArch.parent = root;
  createLabel(scene, "SAÍDA", new Vector3(14.05, 2.5, 0), "#063b51", 1.8).parent = root;

  const jetOriginMat = material(scene, "jet-origin-mat", palette.aqua);
  const makeJet = (x: number, z: number, phase: number, direction: number): Jet => {
    const base = MeshBuilder.CreateCylinder(`jet-base-${x}`, { diameter: 1.0, height: 0.12, tessellation: 20 }, scene);
    base.position = new Vector3(x, 0.08, z);
    base.material = jetOriginMat;
    base.parent = root;
    const core = MeshBuilder.CreateCylinder(`jet-core-${x}`, { diameterTop: 0.48, diameterBottom: 0.7, height: 1.9, tessellation: 16 }, scene);
    core.position = new Vector3(x, 0.98, z);
    core.material = material(scene, `jet-core-mat-${x}`, palette.aqua, 0.72);
    core.parent = root;
    const particles = createParticleSystem(scene, `jet-droplets-${x}`, core, waterTexture, reducedMotion ? 35 : 80, reducedMotion ? 14 : 28, new Color4(0.78, 0.98, 1, 0.9), new Color4(0.25, 0.78, 0.9, 0.3));
    const foam = createParticleSystem(scene, `jet-foam-${x}`, base, foamTexture, reducedMotion ? 12 : 24, reducedMotion ? 7 : 15, new Color4(1, 1, 1, 0.78), new Color4(0.65, 0.94, 0.95, 0));
    particles.start();
    foam.start();
    return { x, z, width: 1.25, direction, phase, mesh: core, particles, foam, active: false };
  };

  jets.push(makeJet(-6.4, 0, 0.5, 1));
  jets.push(makeJet(-3.6, 0, 2.0, -1));
  jets.push(makeJet(-0.8, 0, 3.4, 1));

  const snapshot = (): GameSnapshot => ({
    mode,
    levelTitle: "O Primeiro Jato",
    objective: waterPointActive ? "Atravesse o arco de saída" : "Ative o ponto de água no cais",
    waterPointActive,
    checkpointActive,
    activeJet: lastJetCount,
    totalJets: jets.length,
    hint: interactionHint,
    playerStatus: grounded ? "pronto" : "no ar",
    reducedMotion,
  });

  const emit = () => {
    const next = snapshot();
    listeners.forEach((listener) => listener(next));
  };

  const setMode = (next: GameMode) => {
    mode = next;
    emit();
  };

  const respawn = (reason: FailureReason) => {
    if (mode === "level-complete") return;
    playerPosition.copyFrom(checkpoint);
    playerVelocity.set(0, 0, 0);
    player.position.copyFrom(playerPosition);
    grounded = true;
    failTimer = 0.65;
    interactionHint = reason === "jet" ? "O jato empurrou você. Tente pular no intervalo." : "Você voltou ao último checkpoint.";
    createSplash(scene, playerPosition.add(new Vector3(0, 0.05, 0)), waterTexture, reducedMotion);
    setMode("player-failed");
  };

  const activateWaterPoint = () => {
    if (waterPointActive) return;
    waterPointActive = true;
    checkpointActive = true;
    checkpoint.copyFrom(new Vector3(9.55, 0.57, 1.58));
    waterPoint.material = material(scene, "water-point-active-mat", palette.aqua);
    waterPointOrb.material = material(scene, "water-point-active-orb", palette.sun, 0.9);
    createSplash(scene, waterPoint.position.add(new Vector3(0, 0.35, 0)), foamTexture, reducedMotion);
    interactionHint = "Muito bem! Atravesse o arco dourado da saída.";
    emit();
  };

  const collideWithPlatforms = (next: Vector3, previous: Vector3) => {
    for (const box of staticColliders) {
      const horizontalOverlap = next.x + 0.46 > box.minX && next.x - 0.46 < box.maxX && next.z + 0.46 > box.minZ && next.z - 0.46 < box.maxZ;
      if (!horizontalOverlap) continue;
      const wasAbove = previous.y >= box.maxY - 0.15;
      if (playerVelocity.y <= 0 && next.y <= box.maxY && wasAbove) {
        next.y = box.maxY;
        playerVelocity.y = 0;
        grounded = true;
      }
    }
  };

  const updateJets = () => {
    let activeCount = 0;
    jets.forEach((jet) => {
      jet.active = Math.sin(elapsed * 2.1 + jet.phase) > -0.15;
      jet.mesh.scaling.y = jet.active ? 1 : 0.18;
      jet.mesh.visibility = jet.active ? 1 : 0.35;
      if (jet.active) activeCount += 1;
      const inJet = Math.abs(playerPosition.x - jet.x) < jet.width && Math.abs(playerPosition.z - jet.z) < 0.75 && playerPosition.y < 1.5;
      if (inJet && jet.active) {
        playerVelocity.x += jet.direction * 4.8 * 0.016;
        if (Math.abs(playerPosition.x - jet.x) < 0.38 && grounded) {
          playerVelocity.y = 4.6;
          grounded = false;
          interactionHint = "Jato ativo! Pule quando ele subir.";
        }
      }
    });
    if (activeCount !== lastJetCount) {
      lastJetCount = activeCount;
      emit();
    }
  };

  const updatePlayer = (dt: number) => {
    const left = actions.has("move-left");
    const right = actions.has("move-right");
    const forward = actions.has("move-up");
    const backward = actions.has("move-down");
    const horizontal = (right ? 1 : 0) - (left ? 1 : 0);
    const depth = (forward ? 1 : 0) - (backward ? 1 : 0);
    const direction = new Vector3(horizontal, 0, depth);
    if (direction.lengthSquared() > 1) direction.normalize();

    const maxSpeed = 5.2;
    const acceleration = grounded ? 18 : 10;
    const friction = grounded ? 20 : 4;
    const targetX = direction.x * maxSpeed;
    const targetZ = direction.z * maxSpeed;
    playerVelocity.x = approach(playerVelocity.x, targetX, (direction.lengthSquared() > 0 ? acceleration : friction) * dt);
    playerVelocity.z = approach(playerVelocity.z, targetZ, (direction.lengthSquared() > 0 ? acceleration : friction) * dt);

    if (actions.has("jump") && grounded && failTimer <= 0) {
      playerVelocity.y = 6.7;
      grounded = false;
      actions.delete("jump");
      interactionHint = "Pulo! Atravesse os jatos observando o ritmo.";
      createSplash(scene, playerPosition.add(new Vector3(0, 0.03, 0)), waterTexture, reducedMotion);
    }

    playerVelocity.y -= 16.5 * dt;
    playerVelocity.y = clamp(playerVelocity.y, -18, 10);
    const previous = playerPosition.clone();
    const next = playerPosition.add(playerVelocity.scale(dt));
    next.x = clamp(next.x, -15.2, 15.3);
    next.z = clamp(next.z, -3.85, 3.85);
    if (next.y <= 0) {
      next.y = 0;
      if (playerVelocity.y < 0) playerVelocity.y = 0;
      grounded = true;
    } else {
      grounded = false;
    }
    collideWithPlatforms(next, previous);
    playerPosition.copyFrom(next);
    player.position.copyFrom(playerPosition);

    if (Math.abs(playerVelocity.x) > 0.08) {
      player.rotation.y = playerVelocity.x > 0 ? 0 : Math.PI;
    }
    const bob = grounded && Math.abs(playerVelocity.x) > 0.3 ? Math.sin(elapsed * 12) * 0.035 : 0;
    player.position.y += bob;

    if (playerPosition.x > 4.4 && !checkpointActive) {
      checkpointActive = true;
      checkpoint.copyFrom(new Vector3(4.5, 0, 0));
      interactionHint = "Checkpoint ativado. Continue até o cais.";
      emit();
    }

    if (playerPosition.x > 8.45 && playerPosition.x < 10.35 && Math.abs(playerPosition.z - 1.58) < 1.25) {
      interactionHint = waterPointActive ? "Ponto ativado. Siga para a saída." : "Pressione E ou o botão INTERAGIR para ativar.";
      if (actions.has("interact")) {
        actions.delete("interact");
        activateWaterPoint();
      }
    }

    if (waterPointActive && playerPosition.x > 13.25 && Math.abs(playerPosition.z) < 1.6) {
      interactionHint = "Fase concluída!";
      setMode("level-complete");
      createSplash(scene, playerPosition.add(new Vector3(0, 0.3, 0)), foamTexture, reducedMotion);
    }

    if (playerPosition.y < -1 || Math.abs(playerPosition.z) > 4.2) respawn("fell");
  };

  const updateCamera = (dt: number) => {
    const lookAhead = clamp(playerVelocity.x * 0.42, -2.2, 2.2);
    const target = new Vector3(playerPosition.x + lookAhead, 0.35, playerPosition.z * 0.22);
    camera.setTarget(Vector3.Lerp(camera.getTarget(), target, clamp(dt * 5, 0, 1)));
    camera.radius = 23;
  };

  const update = () => {
    const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
    elapsed += dt;
    updateJets();
    if (mode === "player-failed") {
      failTimer -= dt;
      if (failTimer <= 0 && !orientationPaused) setMode("playing");
    }
    if (mode === "playing" && !orientationPaused) {
      updatePlayer(dt);
      updateCamera(dt);
    } else {
      updateCamera(dt * 0.4);
    }
    if (waterPointActive) {
      waterPointOrb.position.y = 1.05 + Math.sin(elapsed * 3) * 0.08;
      waterPointOrb.rotation.y += dt * 1.3;
    }
    if (!reducedMotion) {
      shallowWater.position.y = 0.035 + Math.sin(elapsed * 1.6) * 0.012;
      deepWater.position.y = 0.06 + Math.sin(elapsed * 1.2 + 1) * 0.01;
    }
  };

  const resize = () => engine.resize();
  window.addEventListener("resize", resize);
  window.addEventListener("orientationchange", resize);
  scene.onBeforeRenderObservable.add(update);
  engine.runRenderLoop(() => scene.render());

  const runtime: GameRuntime = {
    scene,
    start() {
      if (mode === "booting") {
        setMode("playing");
        interactionHint = "Chegue ao ponto de água. A primeira parada ensina o salto.";
      }
    },
    pause() {
      if (mode === "playing") setMode("paused");
    },
    resume() {
      if (mode === "paused" && !orientationPaused) setMode("playing");
    },
    restart() {
      waterPointActive = false;
      checkpointActive = false;
      checkpoint.set(-14, 0, 0);
      playerPosition.set(-14, 0, 0);
      playerVelocity.set(0, 0, 0);
      player.position.copyFrom(playerPosition);
      waterPoint.material = goalMat;
      waterPointOrb.material = material(scene, "water-point-orb-reset", palette.aqua, 0.72);
      interactionHint = "Recomece observando os intervalos dos jatos.";
      setMode("playing");
    },
    setAction(action, pressed) {
      if (pressed) actions.add(action);
      else actions.delete(action);
      if (action === "pause" && pressed) {
        if (mode === "playing") runtime.pause();
        else if (mode === "paused") runtime.resume();
      }
    },
    setPausedByOrientation(paused) {
      orientationPaused = paused;
      if (paused && mode === "playing") setMode("paused");
      if (!paused && mode === "paused") setMode("playing");
    },
    setReducedMotion(enabled) {
      reducedMotion = enabled;
      emit();
    },
    subscribe(listener) {
      listeners.add(listener);
      listener(snapshot());
      return () => listeners.delete(listener);
    },
    getSnapshot: snapshot,
    dispose() {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      scene.onBeforeRenderObservable.clear();
      engine.stopRenderLoop();
      scene.dispose();
      engine.dispose();
    },
  };

  // A deterministic demo path makes screenshot verification and quick review repeatable.
  if (new URLSearchParams(window.location.search).has("demo")) {
    runtime.start();
    let demoTime = 0;
    const demo = () => {
      demoTime += 0.016;
      if (mode !== "playing") return;
      runtime.setAction("move-right", true);
      if (demoTime > 1.1 && demoTime < 1.22) runtime.setAction("jump", true);
      if (demoTime > 3.4 && demoTime < 3.52) runtime.setAction("jump", true);
      if (demoTime > 7.1 && demoTime < 7.3) runtime.setAction("interact", true);
      if (demoTime > 7.45) runtime.setAction("move-right", true);
    };
    scene.onBeforeRenderObservable.add(demo);
  }

  return runtime;
}
