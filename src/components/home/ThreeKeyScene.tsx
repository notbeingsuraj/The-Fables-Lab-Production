"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive mechanical-switch core — the boot gateway centerpiece.
 *
 * Ported from the design prototype (ANIMATION_5): a translucent keycap over an
 * acid-green switch stem, orbited by holographic rings and quantum particles.
 * Striking the key (click / touch / any keyboard key) depresses the stem via
 * spring physics, spikes the stage lights, and broadcasts a
 * `fables-key-press` window event consumed by the HUD telemetry.
 */
export default function ThreeKeyScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.02);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 8, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x1a1c24, 1.8));

    const mainSpot = new THREE.SpotLight(0xd7ff00, 6.0, 50, Math.PI / 4, 0.4, 1);
    mainSpot.position.set(0, 16, 10);
    scene.add(mainSpot);

    const magentaRim = new THREE.PointLight(0xff2daa, 4.5, 35);
    magentaRim.position.set(12, 4, -8);
    scene.add(magentaRim);

    const cyanRim = new THREE.PointLight(0x00e5ff, 4.0, 35);
    cyanRim.position.set(-12, -2, 6);
    scene.add(cyanRim);

    // ── Master key assembly ───────────────────────────────────────────────
    const switchGroup = new THREE.Group();

    const baseMesh = new THREE.Mesh(
      new THREE.BoxGeometry(7.6, 2.0, 7.6),
      new THREE.MeshPhongMaterial({ color: 0x0d0e12, specular: 0x444955, shininess: 90 })
    );
    baseMesh.position.y = -1.2;
    switchGroup.add(baseMesh);

    const clipGeo = new THREE.BoxGeometry(0.5, 1.4, 7.8);
    const clipMat = new THREE.MeshStandardMaterial({
      color: 0x8892b0,
      metalness: 0.85,
      roughness: 0.25,
    });
    const clip1 = new THREE.Mesh(clipGeo, clipMat);
    clip1.position.set(3.8, -0.6, 0);
    switchGroup.add(clip1);
    const clip2 = clip1.clone();
    clip2.position.set(-3.8, -0.6, 0);
    switchGroup.add(clip2);

    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xd7ff00,
      emissive: 0x334400,
      metalness: 0.2,
      roughness: 0.3,
    });
    const stemGroup = new THREE.Group();
    stemGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.6, 2.4), stemMat));
    stemGroup.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, 0.8), stemMat));
    stemGroup.position.y = 0.6;
    switchGroup.add(stemGroup);

    const capMesh = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 3.4, 6.6),
      new THREE.MeshPhysicalMaterial({
        color: 0x161820,
        emissive: 0x050608,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.85,
        thickness: 2.2,
        transparent: true,
        opacity: 0.96,
        reflectivity: 0.9,
      })
    );
    capMesh.position.y = 2.4;
    switchGroup.add(capMesh);

    // Glowing legend plate ("FABLES") painted onto a canvas texture.
    const legendCanvas = document.createElement("canvas");
    legendCanvas.width = 512;
    legendCanvas.height = 512;
    const ctx = legendCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0f1118";
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = "#222838";
      ctx.lineWidth = 4;
      for (let i = 40; i < 512; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 512);
        ctx.moveTo(0, i);
        ctx.lineTo(512, i);
        ctx.stroke();
      }

      ctx.strokeStyle = "#d7ff00";
      ctx.lineWidth = 14;
      ctx.strokeRect(30, 30, 452, 452);

      ctx.fillStyle = "#d7ff00";
      ctx.fillRect(20, 20, 36, 10);
      ctx.fillRect(20, 20, 10, 36);
      ctx.fillRect(456, 20, 36, 10);
      ctx.fillRect(482, 20, 10, 36);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#d7ff00";
      ctx.font = "900 78px sans-serif";
      ctx.fillText("FABLES", 256, 230);

      try {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = "6px";
      } catch {
        /* letterSpacing unsupported — harmless */
      }
      ctx.font = "700 24px monospace";
      ctx.fillStyle = "#00e5ff";
      ctx.fillText("SYSTEM // 001", 256, 310);

      ctx.font = "600 16px monospace";
      ctx.fillStyle = "#ff2daa";
      ctx.fillText("TACTILE OVERDRIVE READY", 256, 360);
    }

    const legendTexture = new THREE.CanvasTexture(legendCanvas);
    legendTexture.colorSpace = THREE.SRGBColorSpace;
    const legendPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(5.4, 5.4),
      new THREE.MeshBasicMaterial({ map: legendTexture, transparent: true })
    );
    legendPlane.rotation.x = -Math.PI / 2;
    legendPlane.position.y = 4.12;
    switchGroup.add(legendPlane);

    // ── Holographic rings ─────────────────────────────────────────────────
    const ringsGroup = new THREE.Group();
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(8.2, 0.06, 16, 90),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.75 })
    );
    ring1.rotation.x = Math.PI / 2.3;
    ringsGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(10.5, 0.04, 16, 90),
      new THREE.MeshBasicMaterial({ color: 0xd7ff00, transparent: true, opacity: 0.5 })
    );
    ring2.rotation.x = Math.PI / 2.1;
    ringsGroup.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(12.8, 0.05, 16, 90),
      new THREE.MeshBasicMaterial({ color: 0xff2daa, transparent: true, opacity: 0.4 })
    );
    ring3.rotation.x = Math.PI / 2.5;
    ringsGroup.add(ring3);

    scene.add(ringsGroup);
    scene.add(switchGroup);

    // ── Quantum data particles ────────────────────────────────────────────
    const pCount = 350;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const colorOptions = [
      new THREE.Color(0xd7ff00),
      new THREE.Color(0x00e5ff),
      new THREE.Color(0xff2daa),
      new THREE.Color(0xf5f4ef),
    ];

    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 55;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 55;
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.85 })
    );
    scene.add(particles);

    // ── Interaction & transition engine ───────────────────────────────────
    let depression = 0;
    let targetDepression = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isUnlocking = false;

    const triggerActivation = (sourceKey: string) => {
      targetDepression = 2.6;
      mainSpot.intensity = 16.0;
      magentaRim.intensity = 10.0;
      cyanRim.intensity = 9.0;
      window.dispatchEvent(new CustomEvent("fables-key-press", { detail: { key: sourceKey } }));
      window.setTimeout(() => {
        targetDepression = 0;
        mainSpot.intensity = 6.0;
        magentaRim.intensity = 4.5;
        cyanRim.intensity = 4.0;
      }, 220);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (["Enter", " ", "ArrowDown"].includes(e.key) || e.key.length === 1) {
        triggerActivation(e.key.toUpperCase());
      }
    };

    const onPointerDown = () => triggerActivation("TACTILE_CLICK");

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onUnlockBurst = () => {
      isUnlocking = true;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("fables-unlock-burst", onUnlockBurst);

    // Resize via observer so the stage tracks its container, not the window.
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth || width;
      const h = container.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Spring physics on the stem depression.
      depression += (targetDepression - depression) * 0.32;
      switchGroup.position.y = -depression + Math.sin(time * 1.8) * 0.35;

      // Cursor tilt with smooth return.
      switchGroup.rotation.y = time * 0.28 + mouseX * 0.5;
      switchGroup.rotation.x = 0.28 + mouseY * 0.35;

      ring1.rotation.z = time * 0.6;
      ring2.rotation.z = -time * 0.45;
      ring3.rotation.z = time * 0.3;

      particles.rotation.y = time * 0.06;
      particles.rotation.x = time * 0.02;

      // Cinematic unlock — warp the camera into the core.
      if (isUnlocking) {
        camera.position.z -= 0.6;
        mainSpot.intensity += 0.4;
        switchGroup.scale.multiplyScalar(1.025);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("fables-unlock-burst", onUnlockBurst);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        }
      });
      legendTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden />;
}
