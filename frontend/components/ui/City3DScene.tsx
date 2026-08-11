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
  { id: "m1", label: "Central Marketplace", category: "PRODUCTS", position: [-4, 3.8, 2], color: "#a855f7", icon: "🛒" },
  { id: "m2", label: "Home Services Hub", category: "SERVICES", position: [4, 3.2, -3], color: "#ec4899", icon: "🔧" },
  { id: "m3", label: "Society Clubhouse", category: "SOCIETY", position: [-3, 3.5, -4], color: "#3b82f6", icon: "🏢" },
  { id: "m4", label: "Bikaner & Life Hub", category: "LIFE", position: [3, 2.8, 3], color: "#10b981", icon: "🍽️" },
  { id: "m5", label: "Sports & Wellness Arena", category: "LIFE", position: [0, 4.6, 0], color: "#f59e0b", icon: "⚡" },
];

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
    camera.position.set(17, 16, 21);
    camera.lookAt(0, 1.8, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // VIBRANT LIGHTING SYSTEM
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x10b981, 0.85);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffae8, 2.2);
    dirLight.position.set(22, 32, 18);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.bias = -0.0003;
    scene.add(dirLight);

    // Colored Accent Pointlights for Glowing Depth
    const purpleLight = new THREE.PointLight(0xa855f7, 3, 20);
    purpleLight.position.set(-4, 5, -4);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 20);
    cyanLight.position.set(4, 5, 4);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xec4899, 3, 20);
    pinkLight.position.set(0, 7, 0);
    scene.add(pinkLight);

    // -------------------------------------------------------------
    // CITY BASE & TERRAIN PLATFORM (MODERN HIGH-TECH PODIUM)
    // -------------------------------------------------------------
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    // Main Podium Cylinder Base
    const baseGeo = new THREE.CylinderGeometry(11.2, 11.8, 0.9, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.15,
      metalness: 0.85,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.45;
    baseMesh.receiveShadow = true;
    cityGroup.add(baseMesh);

    // Double Glowing Rim Rings (Purple & Cyan)
    const rimGeo1 = new THREE.TorusGeometry(11.3, 0.1, 16, 64);
    const rimMat1 = new THREE.MeshBasicMaterial({ color: 0xc084fc });
    const rimMesh1 = new THREE.Mesh(rimGeo1, rimMat1);
    rimMesh1.rotation.x = Math.PI / 2;
    rimMesh1.position.y = 0.02;
    cityGroup.add(rimMesh1);

    const rimGeo2 = new THREE.TorusGeometry(11.5, 0.06, 16, 64);
    const rimMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const rimMesh2 = new THREE.Mesh(rimGeo2, rimMat2);
    rimMesh2.rotation.x = Math.PI / 2;
    rimMesh2.position.y = -0.15;
    cityGroup.add(rimMesh2);

    // Roads Grid surface
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const roadMain1 = new THREE.Mesh(new THREE.BoxGeometry(21, 0.05, 2.4), roadMat);
    roadMain1.position.y = 0.02;
    roadMain1.receiveShadow = true;
    cityGroup.add(roadMain1);

    const roadMain2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 21), roadMat);
    roadMain2.position.y = 0.02;
    roadMain2.receiveShadow = true;
    cityGroup.add(roadMain2);

    // Road Stripes
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    for (let r = -9; r <= 9; r += 2) {
      if (Math.abs(r) < 1.5) continue;
      const stripe1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.15), stripeMat);
      stripe1.position.set(r, 0.03, 0);
      cityGroup.add(stripe1);

      const stripe2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 1.2), stripeMat);
      stripe2.position.set(0, 0.03, r);
      cityGroup.add(stripe2);
    }

    // Lush Parks & Landscaped Gardens
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    const parkLocations = [
      [-6, 4], [6, 4], [-6, -4], [6, -4]
    ];
    parkLocations.forEach(([px, pz]) => {
      const parkMesh = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 3.8), grassMat);
      parkMesh.position.set(px, 0.04, pz);
      parkMesh.receiveShadow = true;
      cityGroup.add(parkMesh);

      // Trees in parks
      for (let i = 0; i < 5; i++) {
        const treeGroup = new THREE.Group();
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.12, 0.5),
          new THREE.MeshStandardMaterial({ color: 0x854d0e })
        );
        trunk.position.y = 0.25;

        const foliageColor = i % 2 === 0 ? 0x059669 : 0x34d399;
        const foliage = new THREE.Mesh(
          new THREE.SphereGeometry(0.45, 12, 12),
          new THREE.MeshStandardMaterial({ color: foliageColor, roughness: 0.3 })
        );
        foliage.position.y = 0.65;
        treeGroup.add(trunk, foliage);

        const offsetX = (Math.random() - 0.5) * 2.5;
        const offsetZ = (Math.random() - 0.5) * 2.5;
        treeGroup.position.set(px + offsetX, 0.06, pz + offsetZ);
        cityGroup.add(treeGroup);
      }
    });

    // -------------------------------------------------------------
    // VIBRANT ARCHITECTURAL BUILDINGS & TOWERS
    // -------------------------------------------------------------
    const buildingMaterials = [
      // 0: Platinum Glass Tower
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.1, metalness: 0.85 }),
      // 1: Sapphire Indigo Tower
      new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.15, metalness: 0.7 }),
      // 2: Emerald Green Pavilion
      new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.2, metalness: 0.6 }),
      // 3: Royal Blue Complex
      new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.1, metalness: 0.75 }),
      // 4: Magenta Fuchsia Tower
      new THREE.MeshStandardMaterial({ color: 0xd946ef, roughness: 0.2, metalness: 0.5 }),
      // 5: Amber Gold Center
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.6 }),
    ];

    const windowMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xeab308, emissiveIntensity: 0.8, roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.8, roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0xf0abfc, emissive: 0xc084fc, emissiveIntensity: 0.8, roughness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x6ee7b7, emissive: 0x10b981, emissiveIntensity: 0.8, roughness: 0.1 }),
    ];

    const buildingConfigs = [
      // Central High-rise Towers
      { x: -2.5, z: -2.5, w: 2.2, h: 7.2, d: 2.2, colorIdx: 0, winIdx: 1, crown: "spire" },
      { x: 2.5, z: -2.5, w: 2.4, h: 6.0, d: 2.0, colorIdx: 1, winIdx: 0, crown: "helipad" },
      { x: -2.5, z: 2.5, w: 2.0, h: 5.5, d: 2.4, colorIdx: 2, winIdx: 3, crown: "pyramid" },
      { x: 2.5, z: 2.5, w: 2.4, h: 6.8, d: 2.2, colorIdx: 3, winIdx: 2, crown: "spire" },

      // Outer Residential Towers
      { x: -7, z: -1, w: 1.9, h: 4.2, d: 1.9, colorIdx: 4, winIdx: 2, crown: "flat" },
      { x: -7, z: 1.8, w: 1.8, h: 4.8, d: 1.8, colorIdx: 0, winIdx: 1, crown: "pyramid" },
      { x: 7, z: -1, w: 2.1, h: 4.5, d: 1.9, colorIdx: 5, winIdx: 0, crown: "flat" },
      { x: 7, z: 1.8, w: 1.9, h: 5.0, d: 2.0, colorIdx: 1, winIdx: 3, crown: "spire" },

      // Rear Towers
      { x: -3.5, z: -7, w: 2.2, h: 5.2, d: 2.0, colorIdx: 3, winIdx: 1, crown: "helipad" },
      { x: 0, z: -7, w: 2.6, h: 7.8, d: 2.4, colorIdx: 0, winIdx: 0, crown: "spire" },
      { x: 3.5, z: -7, w: 2.1, h: 4.8, d: 2.1, colorIdx: 2, winIdx: 3, crown: "pyramid" },

      // Front Commercial Plazas
      { x: -3.5, z: 7, w: 2.5, h: 3.2, d: 2.1, colorIdx: 4, winIdx: 2, crown: "flat" },
      { x: 0, z: 7, w: 3.0, h: 3.8, d: 2.4, colorIdx: 5, winIdx: 0, crown: "helipad" },
      { x: 3.5, z: 7, w: 2.3, h: 3.4, d: 2.1, colorIdx: 1, winIdx: 1, crown: "flat" },
    ];

    buildingConfigs.forEach((b) => {
      const bGroup = new THREE.Group();

      // Main Building Block
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMesh = new THREE.Mesh(bGeo, buildingMaterials[b.colorIdx]);
      bMesh.position.y = b.h / 2;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bGroup.add(bMesh);

      // Glowing Windows Overlay Mesh
      const winGeo = new THREE.BoxGeometry(b.w * 1.015, b.h * 0.88, b.d * 1.015);
      const winMesh = new THREE.Mesh(winGeo, windowMaterials[b.winIdx]);
      winMesh.position.y = b.h / 2;
      bGroup.add(winMesh);

      // Roof Crowns & Spire Beacons
      if (b.crown === "spire") {
        const antGeo = new THREE.CylinderGeometry(0.03, 0.08, 1.6);
        const antMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
        const antMesh = new THREE.Mesh(antGeo, antMat);
        antMesh.position.y = b.h + 0.8;
        bGroup.add(antMesh);

        // Glowing Beacon Sphere at tip
        const tipGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const tipMat = new THREE.MeshBasicMaterial({ color: 0xfff1f2 });
        const tipMesh = new THREE.Mesh(tipGeo, tipMat);
        tipMesh.position.y = b.h + 1.6;
        bGroup.add(tipMesh);
      } else if (b.crown === "pyramid") {
        const pyrGeo = new THREE.ConeGeometry(b.w * 0.5, 1.2, 4);
        const pyrMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9 });
        const pyrMesh = new THREE.Mesh(pyrGeo, pyrMat);
        pyrMesh.rotation.y = Math.PI / 4;
        pyrMesh.position.y = b.h + 0.6;
        bGroup.add(pyrMesh);
      } else if (b.crown === "helipad") {
        const padGeo = new THREE.CylinderGeometry(b.w * 0.4, b.w * 0.4, 0.1, 16);
        const padMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
        const padMesh = new THREE.Mesh(padGeo, padMat);
        padMesh.position.y = b.h + 0.05;
        bGroup.add(padMesh);

        const hRingGeo = new THREE.TorusGeometry(b.w * 0.3, 0.03, 8, 16);
        const hRingMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
        const hRingMesh = new THREE.Mesh(hRingGeo, hRingMat);
        hRingMesh.rotation.x = Math.PI / 2;
        hRingMesh.position.y = b.h + 0.11;
        bGroup.add(hRingMesh);
      }

      bGroup.position.set(b.x, 0, b.z);
      cityGroup.add(bGroup);
    });

    // -------------------------------------------------------------
    // VEHICLE PARTICLES / LIGHT TRAILS ON ROADS
    // -------------------------------------------------------------
    const vehicleGroup = new THREE.Group();
    const vehicleMat1 = new THREE.MeshBasicMaterial({ color: 0xec4899 });
    const vehicleMat2 = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const vehicles: { mesh: THREE.Mesh; speed: number; dir: "x" | "z" }[] = [];

    for (let v = 0; v < 8; v++) {
      const vGeo = new THREE.BoxGeometry(0.4, 0.2, 0.2);
      const vMesh = new THREE.Mesh(vGeo, v % 2 === 0 ? vehicleMat1 : vehicleMat2);
      const isX = v % 2 === 0;
      const speed = (0.04 + Math.random() * 0.04) * (v % 4 === 0 ? -1 : 1);

      if (isX) {
        vMesh.position.set((Math.random() - 0.5) * 16, 0.12, (v % 2 === 0 ? 0.6 : -0.6));
      } else {
        vMesh.rotation.y = Math.PI / 2;
        vMesh.position.set((v % 2 === 0 ? 0.6 : -0.6), 0.12, (Math.random() - 0.5) * 16);
      }

      vehicleGroup.add(vMesh);
      vehicles.push({ mesh: vMesh, speed, dir: isX ? "x" : "z" });
    }
    cityGroup.add(vehicleGroup);

    // -------------------------------------------------------------
    // FLOATING 3D PINS & MARKERS
    // -------------------------------------------------------------
    const markerMeshes: THREE.Mesh[] = [];

    CITY_MARKERS.forEach((m) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(...m.position);

      const sphereGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(m.color),
        emissive: new THREE.Color(m.color),
        emissiveIntensity: 0.9,
        roughness: 0.1,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { marker: m };
      pinGroup.add(sphereMesh);
      markerMeshes.push(sphereMesh);

      // Light beam pin shaft
      const stemGeo = new THREE.CylinderGeometry(0.05, 0.05, m.position[1]);
      const stemMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(m.color),
        transparent: true,
        opacity: 0.5,
      });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.y = -m.position[1] / 2;
      pinGroup.add(stemMesh);

      cityGroup.add(pinGroup);
    });

    // -------------------------------------------------------------
    // MOUSE PARALLAX & ANIMATION LOOP
    // -------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    container.addEventListener("mousemove", handlePointerMove);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera tilt & slow auto rotation
      const targetRotationY = mouseX * 0.5;
      const targetRotationX = mouseY * 0.25;

      cityGroup.rotation.y += (targetRotationY - cityGroup.rotation.y + 0.003) * 0.05;
      cityGroup.rotation.x += (targetRotationX - cityGroup.rotation.x) * 0.05;

      // Animate Vehicles along roads
      vehicles.forEach((v) => {
        if (v.dir === "x") {
          v.mesh.position.x += v.speed;
          if (v.mesh.position.x > 10) v.mesh.position.x = -10;
          if (v.mesh.position.x < -10) v.mesh.position.x = 10;
        } else {
          v.mesh.position.z += v.speed;
          if (v.mesh.position.z > 10) v.mesh.position.z = -10;
          if (v.mesh.position.z < -10) v.mesh.position.z = 10;
        }
      });

      // Pulse floating pins up & down
      markerMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(elapsedTime * 2.5 + idx * 1.2) * 0.2;
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
          <span className="font-bold">HL City 3D Digital Twin</span>
        </div>
        <div className="hidden sm:block text-slate-700 bg-white/90 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border border-slate-200/80 shadow-sm">
          ✨ Vibrant 3D City Twin
        </div>
      </div>

    </div>
  );
}
