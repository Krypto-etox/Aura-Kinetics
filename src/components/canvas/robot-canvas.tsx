"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoboticAssembly } from "./robotic-assembly";

interface RobotCanvasProps {
  scrollProgress: number; // 0 to 1
  pointer: { x: number; y: number };
}

function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00F0FF");
    const orange = new THREE.Color("#FF4D00");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const pick = Math.random();
      const chosenColor = pick > 0.6 ? cyan : pick > 0.35 ? orange : white;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const speedMultiplier = 1 + scrollProgress * 4;
    pointsRef.current.rotation.y += delta * 0.04 * speedMultiplier;
    pointsRef.current.rotation.x += delta * 0.02 * speedMultiplier;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export function RobotCanvas({ scrollProgress, pointer }: RobotCanvasProps) {
  return (
    <div className="w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        {/* Cybernetic Studio High-Contrast Lighting */}
        <ambientLight intensity={1.5} color="#e2e8f0" />
        
        {/* Main Key Studio Light */}
        <directionalLight position={[4, 6, 6]} intensity={3.5} color="#ffffff" />

        {/* Electric Cyan Rim & Accent Lighting */}
        <directionalLight position={[-6, 4, 3]} intensity={4.5} color="#00F0FF" />
        <pointLight position={[0, 0, 1.2]} intensity={4.5} color="#00F0FF" distance={8} />

        {/* Hyper-Orange Fill Light */}
        <directionalLight position={[5, -4, 4]} intensity={3.0} color="#FF4D00" />
        <pointLight position={[3, -2, 3]} intensity={2.5} color="#FF4D00" distance={10} />

        <Suspense fallback={null}>
          <ParticleField scrollProgress={scrollProgress} />
          <RoboticAssembly
            scrollProgress={scrollProgress}
            pointerX={pointer.x}
            pointerY={pointer.y}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
