"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { MOTION } from "@/lib/tokens";

interface FablesArtifactProps {
  reducedMotion?: boolean;
}

export default function FablesArtifact({
  reducedMotion = false,
}: FablesArtifactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const buildScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 80);
    camera.position.set(0, 0.2, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // Lighting - crisp studio lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(-6, 10, 8);
    scene.add(key);

    const fill = new THREE.DirectionalLight(0xffffff, 0.25);
    fill.position.set(8, 4, -6);
    scene.add(fill);

    const rim = new THREE.SpotLight(0xf5f5f7, 1.6, 40, 0.32, 0.6, 1);
    rim.position.set(0, -4, 12);
    rim.lookAt(0, 0, 0);
    scene.add(rim);

    // Core sculptural form - twisted torus knot-like abstract shape
    const coreGroup = new THREE.Group();
    
    // Primary form
    const primaryGeo = new THREE.TorusKnotGeometry(1.0, 0.32, 180, 24, 2, 3);
    const primaryMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      metalness: 0.72,
      roughness: 0.24,
      envMapIntensity: 1,
    });
    const primary = new THREE.Mesh(primaryGeo, primaryMat);
    coreGroup.add(primary);

    // Inner crystalline shell
    const shellGeo = new THREE.IcosahedronGeometry(0.68, 2);
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.86,
      roughness: 0.16,
      transparent: true,
      opacity: 0.92,
      wireframe: false,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    // Subtle ring elements
    const ringGroup = new THREE.Group();
    const ringGeo = new THREE.TorusGeometry(1.6, 0.008, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xa1a1a6,
      metalness: 0.9,
      roughness: 0.18,
      transparent: true,
      opacity: 0.4,
    });
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 6;
      ring.rotation.y = (i * Math.PI) / 4;
      ringGroup.add(ring);
    }
    coreGroup.add(ringGroup);

    scene.add(coreGroup);

    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };
    const scroll = { current: 0 };

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
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      scroll.current = Math.min(window.scrollY / max, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 16;

      pointer.x += (targetPointer.x - pointer.x) * MOTION.pointerDamping;
      pointer.y += (targetPointer.y - pointer.y) * MOTION.pointerDamping;

      if (!reducedMotion) {
        coreGroup.rotation.y += 0.0008;
        coreGroup.rotation.x += 0.0004;
        primary.rotation.z += 0.0006;
        shell.rotation.y -= 0.0005;
        ringGroup.rotation.y += 0.0003;
      }

      coreGroup.position.x = pointer.x * 0.4;
      coreGroup.position.y = pointer.y * 0.25 + Math.sin(time * 0.0006) * 0.08;
      coreGroup.position.z = Math.cos(time * 0.0004) * 0.04;

      const cameraInst = camera;
      cameraInst.position.z = 14 + scroll.current * 2.2;
      cameraInst.position.x = pointer.x * 0.25;
      cameraInst.position.y = 0.2 + pointer.y * 0.12 - scroll.current * 0.4;
      cameraInst.lookAt(0, 0, 0);

      renderer.render(scene, cameraInst);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mats = Array.isArray(object.material) ? object.material : [object.material];
          mats.forEach((mat) => {
            mat.dispose();
            Object.values(mat).forEach((v) => {
              if (v instanceof THREE.Texture) v.dispose();
            });
          });
        }
      });
      ambient.dispose();
      key.dispose();
      fill.dispose();
      rim.dispose();
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
    <div
      ref={containerRef}
      className="w-full h-full"
      aria-label="The Fables Lab signature 3D artifact"
    />
  );
}
