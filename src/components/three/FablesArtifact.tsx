"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS, MOTION } from "@/lib/tokens";

/**
 * FablesArtifact — Signature 3D scene for The Fables Lab.
 *
 * A central floating geometric artifact composed of:
 *   • An octahedron core (matte bronze) — intelligence, the lab centre
 *   • Eight thin planar slabs (matte charcoal/graphite) arranged
 *     octagonally around the core — story / fable layers
 *   • Thin cylindrical beams (bronze) connecting slabs to core —
 *     engineering, structure, connection
 *
 * Interactions:
 *   • Pointer-based parallax with damping, bounded travel
 *   • Subtle auto-rotation with interpolation
 *   • Scroll-linked camera drift (driven by external scroll value)
 *
 * No post-processing. Clean studio lighting. Capped pixel ratio.
 */

interface FablesArtifactProps {
  /** When true, disable continuous motion (prefers-reduced-motion). */
  reducedMotion?: boolean;
}

const CORE_COLOR = COLORS.bronze;
const SLAB_COLOR = COLORS.surfaceElevated;
const BEAM_COLOR = COLORS.bronze;
const CORE_GLOW = 0xf5e8d0; // warm ivory

export default function FablesArtifact({
  reducedMotion = false,
}: FablesArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scene refs (avoid React state in the render loop)
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);
  const slabsRef = useRef<THREE.Group | null>(null);
  const beamsRef = useRef<THREE.Group | null>(null);

  // Pointer state
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  // Animation frame
  const frameRef = useRef<number>(0);

  // ──────────────── Build scene ────────────────
  const buildScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.background);
    scene.fog = new THREE.Fog(COLORS.background, 10, 45);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ──────── Lights ────────
    // Ambient — soft base fill
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    // Key light — from top-left, soft
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(-6, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Fill light — from right, cooler, lower
    const fillLight = new THREE.DirectionalLight(0xe8e0d0, 0.35);
    fillLight.position.set(8, 2, -6);
    scene.add(fillLight);

    // Rim / accent — bronze tint from behind
    const rimLight = new THREE.SpotLight(0xa67c52, 4, 30, 0.5, 0.5, 1);
    rimLight.position.set(0, -4, 10);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // ──────── Core — octahedron ────────
    const coreGroup = new THREE.Group();

    const coreGeo = new THREE.OctahedronGeometry(1.6, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: CORE_COLOR,
      metalness: 0.35,
      roughness: 0.55,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    coreGroup.add(coreMesh);

    // Inner glow — smaller icosahedron, warm ivory, emissive
    const glowGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const glowMat = new THREE.MeshStandardMaterial({
      color: CORE_GLOW,
      emissive: CORE_GLOW,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowMesh);

    scene.add(coreGroup);
    coreRef.current = coreGroup;

    // ──────── Slabs — thin planar layers ────────
    const slabsGroup = new THREE.Group();
    const slabCount = 8;
    const slabRadius = 4.2;
    const slabHeight = 0.06;
    const slabWidth = 2.6;
    const slabDepth = 0.6;

    const slabGeo = new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth);
    const slabMat = new THREE.MeshStandardMaterial({
      color: SLAB_COLOR,
      metalness: 0.15,
      roughness: 0.75,
    });

    const slabMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < slabCount; i++) {
      const angle = (i / slabCount) * Math.PI * 2;
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.set(
        Math.cos(angle) * slabRadius,
        0,
        Math.sin(angle) * slabRadius
      );
      slab.lookAt(0, 0, 0);
      slab.rotation.x += Math.PI / 2;
      slab.castShadow = true;
      slab.receiveShadow = true;
      slabsGroup.add(slab);
      slabMeshes.push(slab);
    }

    scene.add(slabsGroup);
    slabsRef.current = slabsGroup;

    // ──────── Beams — thin connectors ────────
    const beamsGroup = new THREE.Group();
    const beamGeo = new THREE.CylinderGeometry(0.035, 0.035, slabRadius - 1.2, 8);
    const beamMat = new THREE.MeshStandardMaterial({
      color: BEAM_COLOR,
      metalness: 0.45,
      roughness: 0.5,
    });

    for (let i = 0; i < slabCount; i++) {
      const angle = (i / slabCount) * Math.PI * 2;
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(
        Math.cos(angle) * ((slabRadius - 1.2) / 2 + 1.2),
        0,
        Math.sin(angle) * ((slabRadius - 1.2) / 2 + 1.2)
      );
      beam.lookAt(
        Math.cos(angle) * slabRadius,
        0,
        Math.sin(angle) * slabRadius
      );
      beam.rotation.x = Math.PI / 2;
      beam.castShadow = true;
      beamsGroup.add(beam);
    }

    scene.add(beamsGroup);
    beamsRef.current = beamsGroup;

    // ──────── Store refs ────────
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // ──────── Resize ────────
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      if (camera) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // ──────── Pointer interaction ────────
    const onPointerMove = (e: PointerEvent) => {
      if (reducedMotion) return;
      targetPointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointerRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scrollRef.current = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ──────── Animation loop ────────
    let time = 0;
    const animate = (now: number) => {
      time = now;
      frameRef.current = requestAnimationFrame(animate);

      // Interpolate pointer toward target (damped)
      pointerRef.current.x += (targetPointerRef.current.x - pointerRef.current.x) * MOTION.pointerDamping;
      pointerRef.current.y += (targetPointerRef.current.y - pointerRef.current.y) * MOTION.pointerDamping;

      // Core: subtle floating rotation
      const core = coreRef.current;
      if (core) {
        const speed = reducedMotion ? 0 : 0.18;
        core.rotation.y += speed * 0.001;
        core.rotation.x += speed * 0.0006;

        // Pointer parallax on core (bounded)
        core.position.x = pointerRef.current.x * MOTION.pointerMaxTravel;
        core.position.y = pointerRef.current.y * (MOTION.pointerMaxTravel * 0.5);
        core.position.z = Math.sin(time * 0.0015) * 0.15;

        // Glow pulse
        const glow = core.children[1] as THREE.Mesh;
        if (glow) {
          const pulse = 0.85 + Math.sin(time * 0.002) * 0.1;
          (glow.material as THREE.MeshStandardMaterial).opacity = Math.min(1, pulse);
          glow.scale.setScalar(1 + Math.sin(time * 0.003) * 0.03);
        }
      }

      // Slabs: slower counter-rotation
      const slabs = slabsRef.current;
      if (slabs) {
        slabs.rotation.y = -time * 0.0004 + pointerRef.current.x * 0.05;
      }

      // Beams: follow slabs
      const beams = beamsRef.current;
      if (beams) {
        beams.rotation.y = -time * 0.0004 + pointerRef.current.x * 0.05;
      }

      // Camera: scroll-linked drift
      const cameraInst = cameraRef.current;
      if (cameraInst) {
        const scrollDrift = scrollRef.current * 2;
        cameraInst.position.z = 14 + scrollDrift;
        cameraInst.position.x = pointerRef.current.x * 0.4;
        cameraInst.position.y = 2 + pointerRef.current.y * 0.2 - scrollRef.current;
        cameraInst.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();

      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material)
            ? object.material
            : [object.material];
          mats.forEach((mat) => {
            mat.dispose();
            Object.values(mat).forEach((v) => {
              if (v instanceof THREE.Texture) v.dispose();
            });
          });
        }
      });
      ambient.dispose();
      keyLight.dispose();
      fillLight.dispose();
      rimLight.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    const cleanup = buildScene();
    return () => cleanup?.();
  }, [buildScene]);

  return (
    <div ref={containerRef} className="w-full h-full bg-background" aria-label="The Fables Lab signature 3D artifact" />
  );
}
