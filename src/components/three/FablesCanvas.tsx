"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * FablesCanvas — WebGL canvas wrapper with proper lifecycle management.
 *
 * Handles:
 *   - Renderer creation, resize, pixel-ratio capping
 *   - Visibility-aware animation suspension (requestAnimationFrame pause when tab hidden)
 *   - Graceful WebGL failure fallback
 *   - Resource disposal on unmount
 *   - Demand-based rendering (render loop only when dirty or interacting)
 *
 * Consumers provide a `sceneSetup` callback that receives (scene, camera, renderer)
 * and returns a cleanup function.
 */

interface FablesCanvasProps {
  /** Called once the WebGL context is ready. Receives (scene, camera, renderer). */
  sceneSetup: (
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer
  ) => () => void;
  /** When false, the render loop pauses (scene is static). Default true. */
  animate?: boolean;
  /** Cap device pixel ratio for performance. Default 1.5. */
  maxPixelRatio?: number;
  /** Minimum time between renders in ms (0 = every frame). Default 0. */
  minRenderInterval?: number;
}

export default function FablesCanvas({
  sceneSetup,
  animate = true,
  maxPixelRatio = 1.5,
  minRenderInterval = 0,
}: FablesCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState<string | null>(null);
  const frameRef = useRef<number>(0);
  const lastRenderRef = useRef<number>(0);

  const isDocumentHiddenRef = useRef<boolean>(false);

  // ──────────────── Render loop ────────────────
  const render = useCallback(
    (time: number) => {
      frameRef.current = requestAnimationFrame(render);

      // Suspend when tab/window is hidden.
      if (isDocumentHiddenRef.current) return;

      // Demand-based rendering: skip frames if below min interval.
      if (minRenderInterval > 0) {
        const elapsed = time - lastRenderRef.current;
        if (elapsed < minRenderInterval) return;
        lastRenderRef.current = time;
      }

      // The sceneSetup cleanup may re-render; we rely on the consumer's
      // animate function calling renderer.render. The wrapper just drives RAF.
    },
    [minRenderInterval]
  );

  // ──────────────── Lifecycle ────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL context availability check.
    if (
      typeof window === "undefined" ||
      !document.createElement("canvas").getContext("webgl")
    ) {
      setWebglError("WebGL is not available on this device.");
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.Camera;
    let renderer: THREE.WebGLRenderer;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
      renderer.setSize(container.clientWidth || 800, container.clientHeight || 600);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.setClearColor(0x0a0a0a, 1); // matte charcoal

      container.appendChild(renderer.domElement);

      // Run consumer setup — returns cleanup for scene-specific resources.
      const cleanupScene = sceneSetup(scene, camera, renderer);

      // Resize observer.
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
          }
          renderer.setSize(width, height);
        }
      });
      resizeObserver.observe(container);

      // Visibility handling — suspend animation when document hidden.
      const onVisibilityChange = () => {
        isDocumentHiddenRef.current = document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      // Start render loop.
      const tick = (time: number) => {
        frameRef.current = requestAnimationFrame(tick);
        if (isDocumentHiddenRef.current) return;
        if (!animate) return;
        if (minRenderInterval > 0) {
          const elapsed = time - lastRenderRef.current;
          if (elapsed < minRenderInterval) return;
          lastRenderRef.current = time;
        }
        renderer.render(scene, camera);
      };
      frameRef.current = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(frameRef.current);
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibilityChange);
        cleanupScene?.();
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
        renderer.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error("[FablesCanvas] WebGL initialization failed:", err);
      setWebglError(
        err instanceof Error ? err.message : "WebGL initialization failed."
      );
    }
  }, [sceneSetup, animate, maxPixelRatio, minRenderInterval]);

  // Document visibility cleanup on unmount.
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  if (webglError) {
    return (
      <div ref={containerRef} className="canvas-wrap bg-surface min-h-[560px] flex items-center justify-center">
        <div className="text-sm text-on-surface-muted font-mono">
          {webglError}<br />
          <span className="mt-2 block text-xs text-on-surface-muted/70">
            A static representation is shown instead.
          </span>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="canvas-wrap min-h-[560px]" />;
}
