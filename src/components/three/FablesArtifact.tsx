"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS, MOTION } from "@/lib/tokens";

/**
 * FablesArtifact — Signature 3D scene.
 *
 * A sculptural digital artifact built around a central bronze octahedron
 * surrounded by layered translucent graphite slabs arranged octagonally.
 *
 * Studio lighting, soft shadows, restrained materials. No particles,
 * no post-processing, no decorative noise.
 *
 * Interactions:
 *   • Pointer parallax with damping, bounded travel
 *   • Subtle auto-rotation with interpolation
 *   • Scroll-linked camera drift
 */

interface FablesArtifactProps {
  reducedMotion?: boolean;
}

export default function FablesArtifact({
  reducedMotion = false,
}: FablesArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);
  const slabsRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const frameRef = useRef<number>(0);

  const buildScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.background);
    scene.fog = new THREE.Fog(COLORS.background, 14, 50);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1, 16);
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

    // ── Lighting ──────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(-6, 12, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8e0d0, 0.3);
    fillLight.position.set(8, 2, -6);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xa67c52, 2.5, 30, 0.5, 0.5, 1);
    rimLight.position.set(0, -3, 10);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // ── Core — octahedron, matte bronze ───────────────────────────
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.OctahedronGeometry(1.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: COLORS.bronze,
      metalness: 0.45,
      roughness: 0.45,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    coreGroup.add(coreMesh);

    // Inner glow — warm ivory, translucent
    const glowGeo = new THREE.IcosahedronGeometry(0.7, 1);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xf5e8d0,
      emissive: 0xf5e8d0,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      transparent: true,
      opacity: 0.75,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowMesh);
    scene.add(coreGroup);
    coreRef.current = coreGroup;

    // ── Slabs — layered translucent forms around core ─────────────
    const slabsGroup = new THREE.Group();
    const slabCount = 8;
    const slabRadius = 4.2;
    const slabGeo = new THREE.BoxGeometry(2.4, 0.04, 0.55);
    const slabMat = new THREE.MeshStandardMaterial({
      color: COLORS.surfaceElevated,
      metalness: 0.2,
      roughness: 0.85,
      transparent: true,
      opacity: 0.85,
    });

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
    }
    scene.add(slabsGroup);
    slabsRef.current = slabsGroup;

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

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

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 16;

      pointerRef.current.x +=
        (targetPointerRef.current.x - pointerRef.current.x) *
        MOTION.pointerDamping;
      pointerRef.current.y +=
        (targetPointerRef.current.y - pointerRef.current.y) *
        MOTION.pointerDamping;

      const core = coreRef.current;
      if (core) {
        const speed = reducedMotion ? 0 : 0.00015;
        core.rotation.y += speed;
        core.rotation.x += speed * 0.4;
        core.position.x = pointerRef.current.x * MOTION.pointerMaxTravel;
        core.position.y = pointerRef.current.y * (MOTION.pointerMaxTravel * 0.35);
        core.position.z = Math.sin(time * 0.0008) * 0.08;

        const glow = core.children[1] as THREE.Mesh;
        if (glow) {
          const pulse = 0.75 + Math.sin(time * 0.0012) * 0.06;
          (glow.material as THREE.MeshStandardMaterial).opacity = Math.min(
            1,
            pulse
          );
        }
      }

      const slabs = slabsRef.current;
      if (slabs) {
        slabs.rotation.y = -time * 0.00008 + pointerRef.current.x * 0.025;
      }

      const cameraInst = cameraRef.current;
      if (cameraInst) {
        const scrollDrift = scrollRef.current * 1.2;
        cameraInst.position.z = 16 + scrollDrift;
        cameraInst.position.x = pointerRef.current.x * 0.25;
        cameraInst.position.y =
          1 + pointerRef.current.y * 0.12 - scrollRef.current * 0.4;
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
