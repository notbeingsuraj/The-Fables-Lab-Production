"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS, MOTION } from "@/lib/tokens";

/**
 * FablesArtifact — Signature 3D scene.
 *
 * A sculptural digital artifact: a central smooth bronze polyhedron surrounded
 * by layered graphite plates arranged in a precise orbital pattern. Studio
 * lighting, soft shadows, restrained materials. No particles, no post-processing,
 * no decorative noise.
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
  const platesRef = useRef<THREE.Group | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetPointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const frameRef = useRef<number>(0);

  const buildScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.background);
    scene.fog = new THREE.Fog(COLORS.background, 12, 45);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 15);
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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ── Lighting ──────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(-5, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8e0d0, 0.3);
    fillLight.position.set(6, 2, -5);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xa67c52, 2, 30, 0.4, 0.5, 1);
    rimLight.position.set(0, -3, 10);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // ── Core — smooth bronze polyhedron ───────────────────────────
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: COLORS.bronze,
      metalness: 0.5,
      roughness: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.castShadow = true;
    coreMesh.receiveShadow = true;
    coreGroup.add(coreMesh);

    // Inner warm glow
    const glowGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xf5e8d0,
      emissive: 0xf5e8d0,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      transparent: true,
      opacity: 0.7,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    coreGroup.add(glowMesh);
    scene.add(coreGroup);
    coreRef.current = coreGroup;

    // ── Graphite plates — layered orbital forms ───────────────────
    const platesGroup = new THREE.Group();
    const plateCount = 6;
    const plateRadius = 3.6;
    const plateGeo = new THREE.BoxGeometry(2.2, 0.03, 0.45);
    const plateMat = new THREE.MeshStandardMaterial({
      color: COLORS.surfaceElevated,
      metalness: 0.25,
      roughness: 0.8,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < plateCount; i++) {
      const angle = (i / plateCount) * Math.PI * 2;
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.set(
        Math.cos(angle) * plateRadius,
        0,
        Math.sin(angle) * plateRadius
      );
      plate.lookAt(0, 0, 0);
      plate.rotation.x += Math.PI / 2;
      plate.castShadow = true;
      plate.receiveShadow = true;
      platesGroup.add(plate);
    }
    scene.add(platesGroup);
    platesRef.current = platesGroup;

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
        const speed = reducedMotion ? 0 : 0.00012;
        core.rotation.y += speed;
        core.rotation.x += speed * 0.5;
        core.position.x = pointerRef.current.x * MOTION.pointerMaxTravel;
        core.position.y = pointerRef.current.y * (MOTION.pointerMaxTravel * 0.3);
        core.position.z = Math.sin(time * 0.0008) * 0.06;

        const glow = core.children[1] as THREE.Mesh;
        if (glow) {
          const pulse = 0.7 + Math.sin(time * 0.001) * 0.05;
          (glow.material as THREE.MeshStandardMaterial).opacity = Math.min(
            1,
            pulse
          );
        }
      }

      const plates = platesRef.current;
      if (plates) {
        plates.rotation.y = -time * 0.00006 + pointerRef.current.x * 0.02;
      }

      const cameraInst = cameraRef.current;
      if (cameraInst) {
        const scrollDrift = scrollRef.current * 1;
        cameraInst.position.z = 15 + scrollDrift;
        cameraInst.position.x = pointerRef.current.x * 0.2;
        cameraInst.position.y =
          0.5 + pointerRef.current.y * 0.1 - scrollRef.current * 0.3;
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
