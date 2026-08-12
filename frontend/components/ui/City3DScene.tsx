"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Marker {
  id: string;
  label: string;
  category: "PRODUCTS" | "SERVICES" | "SOCIETY" | "LIFE";
  position: [number, number, number];
  color: string;
  icon: string;
}

const CITY_MARKERS: Marker[] = [
  { id: "m1", label: "Central Marketplace", category: "PRODUCTS", position: [-4.2, 4.2, 2.2], color: "#a855f7", icon: "🛒" },
  { id: "m2", label: "Home Services Hub", category: "SERVICES", position: [4.5, 3.8, -3.2], color: "#ec4899", icon: "🔧" },
  { id: "m3", label: "Society Clubhouse", category: "SOCIETY", position: [-3.8, 4.0, -4.5], color: "#3b82f6", icon: "🏢" },
  { id: "m4", label: "Bikaner & Life Hub", category: "LIFE", position: [3.8, 3.5, 3.8], color: "#10b981", icon: "🍽️" },
  { id: "m5", label: "Sports & Wellness Arena", category: "LIFE", position: [0, 5.2, 0], color: "#f59e0b", icon: "⚡" },
];

// Helper: Procedural Window Texture for Realistic Lit/Unlit Windows
function createBuildingWindowTexture(colorHex = "#38bdf8") {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 256, 512);

  const cols = 10;
  const rows = 24;
  const padX = 6;
  const padY = 6;
  const winW = (256 - (cols + 1) * padX) / cols;
  const winH = (512 - (rows + 1) * padY) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padX + c * (winW + padX);
      const y = padY + r * (winH + padY);
      const isLit = Math.random() > 0.32;
      if (isLit) {
        const rand = Math.random();
        if (rand > 0.65) ctx.fillStyle = "#fef08a"; // Warm Golden Light
        else if (rand > 0.3) ctx.fillStyle = colorHex; // Cyan / Accent Light
        else ctx.fillStyle = "#ffffff"; // Pure White Office Light
      } else {
        ctx.fillStyle = "#1e293b"; // Dark Unlit Window
      }
      ctx.fillRect(x, y, winW, winH);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

// Helper: Realistic Car Generator with Body, Wheels, Tinted Windows & Headlights
function createRealisticCar(colorHex: number, isSuv = false) {
  const carGroup = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: colorHex,
    metalness: 0.85,
    roughness: 0.15,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.85,
  });

  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  const bodyLength = isSuv ? 1.4 : 1.25;
  const bodyWidth = 0.62;
  const bodyHeight = 0.24;

  // Chassis
  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(bodyLength, bodyHeight, bodyWidth), bodyMat);
  lowerBody.position.y = 0.18;
  lowerBody.castShadow = true;
  carGroup.add(lowerBody);

  // Cabin
  const cabinLength = isSuv ? 0.85 : 0.65;
  const cabinHeight = isSuv ? 0.32 : 0.25;
  const cabinWidth = 0.55;
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(cabinLength, cabinHeight, cabinWidth), glassMat);
  cabin.position.set(-0.04, 0.18 + bodyHeight / 2 + cabinHeight / 2, 0);
  cabin.castShadow = true;
  carGroup.add(cabin);

  // Roof Cap
  const roof = new THREE.Mesh(new THREE.BoxGeometry(cabinLength * 0.95, 0.03, cabinWidth * 0.95), bodyMat);
  roof.position.set(-0.04, 0.18 + bodyHeight / 2 + cabinHeight + 0.015, 0);
  carGroup.add(roof);

  // 4 Wheels
  const wheelRadius = 0.11;
  const wheelThick = 0.07;
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThick, 16);
  const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.55, wheelRadius * 0.55, wheelThick * 1.05, 12);

  const wheelPositions = [
    [bodyLength * 0.32, 0.11, bodyWidth / 2 + 0.01],
    [bodyLength * 0.32, 0.11, -bodyWidth / 2 - 0.01],
    [-bodyLength * 0.32, 0.11, bodyWidth / 2 + 0.01],
    [-bodyLength * 0.32, 0.11, -bodyWidth / 2 - 0.01],
  ];

  wheelPositions.forEach(([wx, wy, wz]) => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, wy, wz);
    wheel.castShadow = true;

    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(wx, wy, wz);

    carGroup.add(wheel, rim);
  });

  // Glowing Headlights
  const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 0.11), headlightMat);
  hl1.position.set(bodyLength / 2 + 0.01, 0.2, bodyWidth / 3.2);
  const hl2 = hl1.clone();
  hl2.position.set(bodyLength / 2 + 0.01, 0.2, -bodyWidth / 3.2);
  carGroup.add(hl1, hl2);

  // Glowing Taillights
  const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 0.11), taillightMat);
  tl1.position.set(-bodyLength / 2 - 0.01, 0.22, bodyWidth / 3.2);
  const tl2 = tl1.clone();
  tl2.position.set(-bodyLength / 2 - 0.01, 0.22, -bodyWidth / 3.2);
  carGroup.add(tl1, tl2);

  return carGroup;
}

// Helper: Realistic 3D Tree
function createRealisticTree(foliageHex: number) {
  const treeGroup = new THREE.Group();

  const trunkGeo = new THREE.CylinderGeometry(0.08, 0.14, 0.6, 8);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x54381e, roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.3;
  trunk.castShadow = true;
  treeGroup.add(trunk);

  const foliageMat = new THREE.MeshStandardMaterial({ color: foliageHex, roughness: 0.5 });
  const f1 = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.9, 8), foliageMat);
  f1.position.y = 0.75;
  f1.castShadow = true;

  const f2 = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.75, 8), foliageMat);
  f2.position.y = 1.15;
  f2.castShadow = true;

  const f3 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.55, 8), foliageMat);
  f3.position.y = 1.45;
  f3.castShadow = true;

  treeGroup.add(f1, f2, f3);
  return treeGroup;
}

// Helper: Realistic Street Light Lamp Post
function createStreetLamp() {
  const lampGroup = new THREE.Group();

  const poleGeo = new THREE.CylinderGeometry(0.03, 0.05, 1.4, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = 0.7;
  pole.castShadow = true;
  lampGroup.add(pole);

  const headGeo = new THREE.BoxGeometry(0.2, 0.05, 0.1);
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0.08, 1.4, 0);
  lampGroup.add(head);

  return lampGroup;
}

export function City3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(18, 17, 22);
    camera.lookAt(0, 1.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x059669, 0.9);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffae8, 2.4);
    dirLight.position.set(24, 34, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0003;
    scene.add(dirLight);

    // Accent Lights for Nightlife Glow
    const purpleLight = new THREE.PointLight(0xa855f7, 3.5, 22);
    purpleLight.position.set(-5, 6, -5);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3.5, 22);
    cyanLight.position.set(5, 6, 5);
    scene.add(cyanLight);

    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    // Podium Base
    const baseGeo = new THREE.CylinderGeometry(11.4, 12.0, 1.0, 64);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0b1329, roughness: 0.2, metalness: 0.8 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.5;
    baseMesh.receiveShadow = true;
    cityGroup.add(baseMesh);

    // Glowing Rim Rings
    const rimGeo1 = new THREE.TorusGeometry(11.5, 0.1, 16, 64);
    const rimMat1 = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const rimMesh1 = new THREE.Mesh(rimGeo1, rimMat1);
    rimMesh1.rotation.x = Math.PI / 2;
    rimMesh1.position.y = 0.02;
    cityGroup.add(rimMesh1);

    const rimGeo2 = new THREE.TorusGeometry(11.7, 0.06, 16, 64);
    const rimMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const rimMesh2 = new THREE.Mesh(rimGeo2, rimMat2);
    rimMesh2.rotation.x = Math.PI / 2;
    rimMesh2.position.y = -0.18;
    cityGroup.add(rimMesh2);

    // Roads Grid (2-Way Dual Carriageway Roads with Sidewalk Curbs)
    const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const zebraMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Main Road X
    const roadX = new THREE.Mesh(new THREE.BoxGeometry(22, 0.06, 2.6), asphaltMat);
    roadX.position.y = 0.03;
    roadX.receiveShadow = true;
    cityGroup.add(roadX);

    // Main Road Z
    const roadZ = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.06, 22), asphaltMat);
    roadZ.position.y = 0.03;
    roadZ.receiveShadow = true;
    cityGroup.add(roadZ);

    // Sidewalk Curbs
    const curbX1 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.1, 0.2), curbMat);
    curbX1.position.set(0, 0.05, 1.4);
    const curbX2 = new THREE.Mesh(new THREE.BoxGeometry(22, 0.1, 0.2), curbMat);
    curbX2.position.set(0, 0.05, -1.4);
    cityGroup.add(curbX1, curbX2);

    const curbZ1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 22), curbMat);
    curbZ1.position.set(1.4, 0.05, 0);
    const curbZ2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 22), curbMat);
    curbZ2.position.set(-1.4, 0.05, 0);
    cityGroup.add(curbZ1, curbZ2);

    // Double Yellow Center Lines & Pedestrian Zebra Crossings
    for (let r = -9; r <= 9; r += 1.8) {
      if (Math.abs(r) < 1.6) continue;
      const yellow1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.07, 0.08), stripeMat);
      yellow1.position.set(r, 0.04, 0.05);
      const yellow2 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.07, 0.08), stripeMat);
      yellow2.position.set(r, 0.04, -0.05);
      cityGroup.add(yellow1, yellow2);

      const yellowZ1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 1.0), stripeMat);
      yellowZ1.position.set(0.05, 0.04, r);
      const yellowZ2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.07, 1.0), stripeMat);
      yellowZ2.position.set(-0.05, 0.04, r);
      cityGroup.add(yellowZ1, yellowZ2);
    }

    // Pedestrian Zebra Stripes at Intersection
    [-1.6, 1.6].forEach((pos) => {
      for (let z = -1.0; z <= 1.0; z += 0.3) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.07, 0.14), zebraMat);
        stripe.position.set(pos, 0.04, z);
        cityGroup.add(stripe);

        const stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 0.8), zebraMat);
        stripe2.position.set(z, 0.04, pos);
        cityGroup.add(stripe2);
      }
    });

    // Street Lamps along Sidewalks
    [-8, -4, 4, 8].forEach((lx) => {
      const lamp1 = createStreetLamp();
      lamp1.position.set(lx, 0.08, 1.5);
      const lamp2 = createStreetLamp();
      lamp2.rotation.y = Math.PI;
      lamp2.position.set(lx, 0.08, -1.5);
      cityGroup.add(lamp1, lamp2);
    });

    // Parks & Landscaped Gardens
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    const parkLocs = [[-6.2, 4.2], [6.2, 4.2], [-6.2, -4.2], [6.2, -4.2]];
    parkLocs.forEach(([px, pz]) => {
      const park = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.09, 4.0), grassMat);
      park.position.set(px, 0.05, pz);
      park.receiveShadow = true;
      cityGroup.add(park);

      // Detailed Trees
      for (let t = 0; t < 4; t++) {
        const tree = createRealisticTree(t % 2 === 0 ? 0x047857 : 0x10b981);
        const offsetX = (Math.random() - 0.5) * 2.6;
        const offsetZ = (Math.random() - 0.5) * 2.6;
        tree.position.set(px + offsetX, 0.07, pz + offsetZ);
        cityGroup.add(tree);
      }
    });

    // Realistic Architectural Buildings with Window Textures & Roof Details
    const winTexCyan = createBuildingWindowTexture("#38bdf8");
    const winTexPurple = createBuildingWindowTexture("#c084fc");
    const winTexGold = createBuildingWindowTexture("#fde047");

    const buildingMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.9 }),
      new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.15, metalness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.2, metalness: 0.7 }),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.1, metalness: 0.85 }),
      new THREE.MeshStandardMaterial({ color: 0x831843, roughness: 0.2, metalness: 0.6 }),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.2, metalness: 0.7 }),
    ];

    const windowMaterials = [
      new THREE.MeshStandardMaterial({ map: winTexCyan, roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: winTexPurple, roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ map: winTexGold, roughness: 0.1 }),
    ];

    const beaconBeams: THREE.Mesh[] = [];

    const buildingConfigs = [
      // Central Towers
      { x: -2.6, z: -2.6, w: 2.3, h: 7.5, d: 2.3, matIdx: 0, winIdx: 0, crown: "spire" },
      { x: 2.6, z: -2.6, w: 2.5, h: 6.2, d: 2.1, matIdx: 1, winIdx: 2, crown: "helipad" },
      { x: -2.6, z: 2.6, w: 2.1, h: 5.8, d: 2.5, matIdx: 2, winIdx: 0, crown: "pyramid" },
      { x: 2.6, z: 2.6, w: 2.5, h: 7.0, d: 2.3, matIdx: 3, winIdx: 1, crown: "spire" },

      // Outer Towers
      { x: -7.2, z: -1.2, w: 2.0, h: 4.5, d: 2.0, matIdx: 4, winIdx: 1, crown: "flat" },
      { x: -7.2, z: 1.8, w: 1.9, h: 5.0, d: 1.9, matIdx: 0, winIdx: 0, crown: "pyramid" },
      { x: 7.2, z: -1.2, w: 2.2, h: 4.8, d: 2.0, matIdx: 5, winIdx: 2, crown: "flat" },
      { x: 7.2, z: 1.8, w: 2.0, h: 5.4, d: 2.1, matIdx: 1, winIdx: 0, crown: "spire" },

      // Rear Towers
      { x: -3.6, z: -7.2, w: 2.3, h: 5.5, d: 2.1, matIdx: 3, winIdx: 0, crown: "helipad" },
      { x: 0, z: -7.2, w: 2.7, h: 8.2, d: 2.5, matIdx: 0, winIdx: 1, crown: "spire" },
      { x: 3.6, z: -7.2, w: 2.2, h: 5.0, d: 2.2, matIdx: 2, winIdx: 2, crown: "pyramid" },

      // Front Plazas
      { x: -3.6, z: 7.2, w: 2.6, h: 3.5, d: 2.2, matIdx: 4, winIdx: 1, crown: "flat" },
      { x: 0, z: 7.2, w: 3.2, h: 4.0, d: 2.5, matIdx: 5, winIdx: 2, crown: "helipad" },
      { x: 3.6, z: 7.2, w: 2.4, h: 3.6, d: 2.2, matIdx: 1, winIdx: 0, crown: "flat" },
    ];

    buildingConfigs.forEach((b) => {
      const bGroup = new THREE.Group();

      // Main Podium Storefront Base
      const baseBox = new THREE.Mesh(
        new THREE.BoxGeometry(b.w * 1.08, 0.8, b.d * 1.08),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 })
      );
      baseBox.position.y = 0.4;
      baseBox.castShadow = true;
      bGroup.add(baseBox);

      // Main Building Core
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), buildingMaterials[b.matIdx]);
      bMesh.position.y = b.h / 2 + 0.8;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bGroup.add(bMesh);

      // Window Facade Shell
      if (windowMaterials[b.winIdx]) {
        const winMesh = new THREE.Mesh(
          new THREE.BoxGeometry(b.w * 1.01, b.h * 0.88, b.d * 1.01),
          windowMaterials[b.winIdx]
        );
        winMesh.position.y = b.h / 2 + 0.8;
        bGroup.add(winMesh);
      }

      // Roof Structures
      const topY = b.h + 0.8;
      if (b.crown === "spire") {
        const spire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.08, 1.8),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
        );
        spire.position.y = topY + 0.9;
        bGroup.add(spire);

        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xef4444 })
        );
        beacon.position.y = topY + 1.8;
        bGroup.add(beacon);
        beaconBeams.push(beacon);
      } else if (b.crown === "pyramid") {
        const pyr = new THREE.Mesh(
          new THREE.ConeGeometry(b.w * 0.5, 1.3, 4),
          new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9 })
        );
        pyr.rotation.y = Math.PI / 4;
        pyr.position.y = topY + 0.65;
        bGroup.add(pyr);
      } else if (b.crown === "helipad") {
        const pad = new THREE.Mesh(
          new THREE.CylinderGeometry(b.w * 0.42, b.w * 0.42, 0.1, 24),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
        );
        pad.position.y = topY + 0.05;
        bGroup.add(pad);

        const hRing = new THREE.Mesh(
          new THREE.TorusGeometry(b.w * 0.32, 0.03, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0xfde047 })
        );
        hRing.rotation.x = Math.PI / 2;
        hRing.position.y = topY + 0.11;
        bGroup.add(hRing);
      }

      bGroup.position.set(b.x, 0, b.z);
      cityGroup.add(bGroup);
    });

    // Realistic Cars & Moving Vehicle Traffic
    const carColors = [0xef4444, 0x3b82f6, 0xf8fafc, 0x10b981, 0xf59e0b, 0x8b5cf6, 0x1e293b];
    const animatedVehicles: { mesh: THREE.Group; speed: number; axis: "x" | "z"; laneOffset: number }[] = [];

    for (let i = 0; i < 10; i++) {
      const color = carColors[i % carColors.length];
      const isSuv = i % 3 === 0;
      const carMesh = createRealisticCar(color, isSuv);

      const isXAxis = i % 2 === 0;
      const laneOffset = i % 4 < 2 ? 0.65 : -0.65;
      const speed = (0.045 + Math.random() * 0.035) * (laneOffset > 0 ? 1 : -1);

      if (isXAxis) {
        carMesh.position.set((Math.random() - 0.5) * 18, 0.04, laneOffset);
        if (speed < 0) carMesh.rotation.y = Math.PI;
      } else {
        carMesh.position.set(laneOffset, 0.04, (Math.random() - 0.5) * 18);
        carMesh.rotation.y = speed > 0 ? Math.PI / 2 : -Math.PI / 2;
      }

      cityGroup.add(carMesh);
      animatedVehicles.push({ mesh: carMesh, speed, axis: isXAxis ? "x" : "z", laneOffset });
    }

    // Floating 3D Category Markers & Pins
    const markerMeshes: THREE.Mesh[] = [];

    CITY_MARKERS.forEach((m) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(...m.position);

      const sphereGeo = new THREE.SphereGeometry(0.42, 20, 20);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(m.color),
        emissive: new THREE.Color(m.color),
        emissiveIntensity: 0.95,
        roughness: 0.1,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { marker: m };
      pinGroup.add(sphereMesh);
      markerMeshes.push(sphereMesh);

      // Light Beam Shaft
      const stemGeo = new THREE.CylinderGeometry(0.04, 0.04, m.position[1]);
      const stemMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(m.color),
        transparent: true,
        opacity: 0.45,
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = -m.position[1] / 2;
      pinGroup.add(stemMesh);

      cityGroup.add(pinGroup);
    });

    // Mouse Parallax & Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    container.addEventListener("mousemove", handlePointerMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera Rotation & Tilt
      const targetRotationY = mouseX * 0.45;
      const targetRotationX = mouseY * 0.22;
      cityGroup.rotation.y += (targetRotationY - cityGroup.rotation.y + 0.0025) * 0.05;
      cityGroup.rotation.x += (targetRotationX - cityGroup.rotation.x) * 0.05;

      // Animate Realistic Traffic / Cars
      animatedVehicles.forEach((v) => {
        if (v.axis === "x") {
          v.mesh.position.x += v.speed;
          if (v.mesh.position.x > 11) v.mesh.position.x = -11;
          if (v.mesh.position.x < -11) v.mesh.position.x = 11;
        } else {
          v.mesh.position.z += v.speed;
          if (v.mesh.position.z > 11) v.mesh.position.z = -11;
          if (v.mesh.position.z < -11) v.mesh.position.z = 11;
        }
      });

      // Pulse Floating Pins
      markerMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsedTime * 2.8 + idx * 1.3) * 0.22;
      });

      // Blink Aviation Beacons on Roof Spires
      beaconBeams.forEach((b, idx) => {
        const mat = b.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.sin(elapsedTime * 4 + idx) > 0 ? 1 : 0.2;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] sm:h-[550px] lg:h-[630px] rounded-3xl overflow-hidden glass-panel border border-slate-200/80 shadow-2xl group">
      
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Category Badges Overlay */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none z-10 justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="px-3.5 py-1.5 rounded-xl font-black text-xs bg-slate-900/90 text-purple-300 backdrop-blur-md border border-purple-500/40 shadow-lg animate-float">
            01 PRODUCTS
          </span>
          <span className="px-3.5 py-1.5 rounded-xl font-black text-xs bg-slate-900/90 text-pink-300 backdrop-blur-md border border-pink-500/40 shadow-lg animate-float-slow">
            02 SERVICES
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3.5 py-1.5 rounded-xl font-black text-xs bg-slate-900/90 text-blue-300 backdrop-blur-md border border-blue-500/40 shadow-lg animate-float">
            03 SOCIETY
          </span>
          <span className="px-3.5 py-1.5 rounded-xl font-black text-xs bg-slate-900/90 text-emerald-300 backdrop-blur-md border border-emerald-500/40 shadow-lg animate-float-slow">
            04 LIFE
          </span>
        </div>
      </div>

      {/* Interactive Helper Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-xs">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 text-slate-200 backdrop-blur-md border border-slate-700/60 shadow-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold">Residential Community Realistic 3D Digital Twin</span>
        </div>
        <div className="hidden sm:block text-slate-700 bg-white/90 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border border-slate-200/80 shadow-sm">
          🚗 Realistic Cars & 🏢 Architectural Towers
        </div>
      </div>

    </div>
  );
}

