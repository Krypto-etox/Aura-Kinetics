"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoboticAssemblyProps {
  scrollProgress: number; // 0 (assembled) to 1 (fully exploded)
  pointerX?: number;
  pointerY?: number;
}

interface PartDef {
  id: string;
  type: "box" | "cylinder" | "sphere" | "torus" | "ring" | "cone";
  args: number[];
  basePos: [number, number, number];
  baseRot: [number, number, number];
  blastDir: [number, number, number];
  blastRot: [number, number, number];
  blastDistance: number;
  color: string;
  metalness: number;
  roughness: number;
  emissive?: string;
  emissiveIntensity?: number;
  wireframe?: boolean;
}

export function RoboticAssembly({ scrollProgress, pointerX = 0, pointerY = 0 }: RoboticAssemblyProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const meshRefs = useRef<{ [key: string]: THREE.Mesh | null }>({});

  const smoothProgress = useRef(0);

  // Generate 55+ distinct mechanical, structural, and cybernetic parts
  const parts: PartDef[] = useMemo(() => {
    const p: PartDef[] = [];

    // 1. Quantum Core Reactor (Emissive Cyan Center)
    p.push({
      id: "core-reactor",
      type: "sphere",
      args: [0.52, 32, 32],
      basePos: [0, 0, 0],
      baseRot: [0, 0, 0],
      blastDir: [0, 0, -1.2],
      blastRot: [0, 2, 0],
      blastDistance: 1.5,
      color: "#00F0FF",
      metalness: 0.1,
      roughness: 0.05,
      emissive: "#00F0FF",
      emissiveIntensity: 3.5,
    });

    // Outer and Inner Containment Gimbal Rings
    p.push({
      id: "core-gimbal-outer",
      type: "torus",
      args: [0.78, 0.05, 16, 48],
      basePos: [0, 0, 0],
      baseRot: [Math.PI / 4, 0, 0],
      blastDir: [0, 0.8, -1.5],
      blastRot: [2, 1, 0],
      blastDistance: 2.2,
      color: "#64748b",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.4,
    });
    p.push({
      id: "core-gimbal-inner",
      type: "torus",
      args: [0.64, 0.04, 16, 48],
      basePos: [0, 0, 0],
      baseRot: [0, Math.PI / 3, 0],
      blastDir: [0, -0.8, -1.5],
      blastRot: [-1, 2, 1],
      blastDistance: 2.0,
      color: "#38bdf8",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#00F0FF",
      emissiveIntensity: 1.2,
    });

    // 4 Flux Coils radiating from Core
    const coilAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    coilAngles.forEach((ang, idx) => {
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      p.push({
        id: `flux-coil-${idx}`,
        type: "cylinder",
        args: [0.06, 0.06, 0.5, 16],
        basePos: [cos * 0.65, sin * 0.65, 0],
        baseRot: [0, 0, ang + Math.PI / 2],
        blastDir: [cos * 2.2, sin * 2.2, -0.5],
        blastRot: [ang, 1, 1],
        blastDistance: 2.4,
        color: "#94a3b8",
        metalness: 0.95,
        roughness: 0.15,
        emissive: idx % 2 === 0 ? "#00F0FF" : "#FF4D00",
        emissiveIntensity: 1.2,
      });
    });

    // 2. Titanium Spinal Column (8 Interconnected Vertebrae Segments)
    for (let v = 0; v < 8; v++) {
      const yPos = -1.5 + v * 0.42;
      p.push({
        id: `vertebra-${v}`,
        type: "cylinder",
        args: [0.28 - v * 0.012, 0.32 - v * 0.012, 0.24, 8],
        basePos: [0, yPos, -0.3],
        baseRot: [0, Math.PI / 8, 0],
        blastDir: [0, (v - 3.5) * 0.8, -2.8],
        blastRot: [0.4, (v % 2 === 0 ? 1 : -1) * 1.5, 0],
        blastDistance: 2.8,
        color: "#64748b",
        metalness: 0.95,
        roughness: 0.2,
        emissive: "#00F0FF",
        emissiveIntensity: 0.25,
      });

      // Vertebra lateral ribs
      p.push({
        id: `vertebra-rib-L-${v}`,
        type: "box",
        args: [0.65, 0.07, 0.14],
        basePos: [-0.45, yPos, -0.28],
        baseRot: [0, 0.2, -0.15],
        blastDir: [-2.0, (v - 3.5) * 0.5, -1.8],
        blastRot: [-0.5, 1, -1],
        blastDistance: 3.2,
        color: "#475569",
        metalness: 0.9,
        roughness: 0.25,
      });
      p.push({
        id: `vertebra-rib-R-${v}`,
        type: "box",
        args: [0.65, 0.07, 0.14],
        basePos: [0.45, yPos, -0.28],
        baseRot: [0, -0.2, 0.15],
        blastDir: [2.0, (v - 3.5) * 0.5, -1.8],
        blastRot: [0.5, -1, 1],
        blastDistance: 3.2,
        color: "#475569",
        metalness: 0.9,
        roughness: 0.25,
      });
    }

    // 3. Carbon-Fiber Exoskeleton Chest & Pectoral Armor
    p.push({
      id: "chest-plate-L",
      type: "box",
      args: [0.95, 0.85, 0.14],
      basePos: [-0.65, 0.35, 0.45],
      baseRot: [0.1, 0.25, -0.1],
      blastDir: [-2.8, 1.2, 3.2],
      blastRot: [-0.4, 0.8, -0.5],
      blastDistance: 3.8,
      color: "#334155",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#00F0FF",
      emissiveIntensity: 0.2,
    });
    p.push({
      id: "chest-plate-R",
      type: "box",
      args: [0.95, 0.85, 0.14],
      basePos: [0.65, 0.35, 0.45],
      baseRot: [0.1, -0.25, 0.1],
      blastDir: [2.8, 1.2, 3.2],
      blastRot: [-0.4, -0.8, 0.5],
      blastDistance: 3.8,
      color: "#334155",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#00F0FF",
      emissiveIntensity: 0.2,
    });

    // Upper Clavicle Shields
    p.push({
      id: "clavicle-shield-L",
      type: "box",
      args: [0.8, 0.2, 0.16],
      basePos: [-0.7, 0.95, 0.3],
      baseRot: [0.2, 0.1, -0.2],
      blastDir: [-2.2, 2.5, 2.5],
      blastRot: [1, 0.5, -1],
      blastDistance: 3.5,
      color: "#475569",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.8,
    });
    p.push({
      id: "clavicle-shield-R",
      type: "box",
      args: [0.8, 0.2, 0.16],
      basePos: [0.7, 0.95, 0.3],
      baseRot: [0.2, -0.1, 0.2],
      blastDir: [2.2, 2.5, 2.5],
      blastRot: [1, -0.5, 1],
      blastDistance: 3.5,
      color: "#475569",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#FF4D00",
      emissiveIntensity: 0.8,
    });

    // Abdominal Kinetic Louvers (4 horizontal articulated slats)
    for (let l = 0; l < 4; l++) {
      const yL = -0.35 - l * 0.26;
      p.push({
        id: `ab-louver-${l}`,
        type: "box",
        args: [0.85 - l * 0.08, 0.16, 0.12],
        basePos: [0, yL, 0.38 - l * 0.03],
        baseRot: [0.2, 0, 0],
        blastDir: [0, -1.8 - l * 0.4, 3.6],
        blastRot: [1.2, 0, 0],
        blastDistance: 3.6,
        color: "#64748b",
        metalness: 0.9,
        roughness: 0.2,
        emissive: "#00F0FF",
        emissiveIntensity: 0.3,
      });
    }

    // 4. Robotic Arm & Actuator Matrix (Shoulder, Bicep, Pistons, Forearm)
    // Shoulder Magnetic Ball Joint
    p.push({
      id: "shoulder-joint",
      type: "sphere",
      args: [0.4, 24, 24],
      basePos: [1.6, 0.85, 0],
      baseRot: [0, 0, 0],
      blastDir: [3.5, 1.8, 0.5],
      blastRot: [2, 1, -1],
      blastDistance: 3.5,
      color: "#475569",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.8,
    });

    // Hydraulic Cylinders (Main + Auxiliary)
    p.push({
      id: "hydraulic-cylinder-main",
      type: "cylinder",
      args: [0.14, 0.14, 1.1, 16],
      basePos: [1.8, 0.2, 0.2],
      baseRot: [0.1, 0, -0.3],
      blastDir: [3.8, 0.4, 2.0],
      blastRot: [0, 2, 1],
      blastDistance: 4.0,
      color: "#64748b",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.3,
    });
    // Chrome Sliding Piston Shaft
    p.push({
      id: "hydraulic-shaft-main",
      type: "cylinder",
      args: [0.08, 0.08, 0.9, 16],
      basePos: [1.95, -0.15, 0.25],
      baseRot: [0.1, 0, -0.3],
      blastDir: [4.4, -0.2, 2.8],
      blastRot: [0.5, 2.5, 1.2],
      blastDistance: 4.8,
      color: "#f8fafc",
      metalness: 1.0,
      roughness: 0.05,
      emissive: "#ffffff",
      emissiveIntensity: 0.2,
    });

    // Elbow Rotary Servo Disc
    p.push({
      id: "elbow-servo-disc",
      type: "cylinder",
      args: [0.32, 0.32, 0.25, 24],
      basePos: [2.1, -0.75, 0.1],
      baseRot: [Math.PI / 2, 0, 0],
      blastDir: [4.6, -1.5, 0.8],
      blastRot: [3, 0, 2],
      blastDistance: 4.2,
      color: "#00F0FF",
      metalness: 0.8,
      roughness: 0.2,
      emissive: "#00F0FF",
      emissiveIntensity: 1.2,
    });

    // Forearm Twin Titanium Struts
    p.push({
      id: "forearm-strut-1",
      type: "cylinder",
      args: [0.07, 0.07, 1.2, 16],
      basePos: [2.25, -1.45, 0.2],
      baseRot: [0.2, 0, 0.1],
      blastDir: [4.8, -2.8, 1.6],
      blastRot: [1, 2, -1],
      blastDistance: 4.4,
      color: "#94a3b8",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.2,
    });
    p.push({
      id: "forearm-strut-2",
      type: "cylinder",
      args: [0.07, 0.07, 1.2, 16],
      basePos: [2.4, -1.45, -0.1],
      baseRot: [0.2, 0, -0.1],
      blastDir: [5.2, -2.8, -0.6],
      blastRot: [-1, 2, 1],
      blastDistance: 4.5,
      color: "#94a3b8",
      metalness: 0.95,
      roughness: 0.15,
      emissive: "#00F0FF",
      emissiveIntensity: 0.2,
    });

    // 5. Cybernetic End-Effector / Multi-Finger Gripper
    // Wrist & Palm Hub
    p.push({
      id: "wrist-hub",
      type: "box",
      args: [0.45, 0.3, 0.35],
      basePos: [2.45, -2.2, 0.05],
      baseRot: [0.3, 0.1, 0.1],
      blastDir: [5.6, -4.0, 1.2],
      blastRot: [2, -1, 3],
      blastDistance: 4.8,
      color: "#64748b",
      metalness: 0.9,
      roughness: 0.2,
      emissive: "#FF4D00",
      emissiveIntensity: 0.8,
    });

    // 5 Articulated Fingers (Phalanges)
    for (let f = 0; f < 5; f++) {
      const xOffset = (f - 2) * 0.14;
      p.push({
        id: `finger-proximal-${f}`,
        type: "cylinder",
        args: [0.035, 0.04, 0.35, 12],
        basePos: [2.35 + xOffset, -2.5, 0.12],
        baseRot: [0.4, 0, xOffset * 0.8],
        blastDir: [5.8 + xOffset * 3.0, -5.0, 1.8],
        blastRot: [3, f, 2],
        blastDistance: 5.2,
        color: "#0f1520",
        metalness: 0.9,
        roughness: 0.2,
      });
      p.push({
        id: `finger-distal-${f}`,
        type: "box",
        args: [0.06, 0.25, 0.06],
        basePos: [2.35 + xOffset, -2.8, 0.24],
        baseRot: [0.8, 0, xOffset * 0.8],
        blastDir: [6.2 + xOffset * 3.5, -5.6, 2.5],
        blastRot: [4, f * 2, 1],
        blastDistance: 5.8,
        color: "#00F0FF",
        metalness: 0.7,
        roughness: 0.3,
        emissive: "#00F0FF",
        emissiveIntensity: 0.9,
      });
    }

    // 6. Sensor Turret & LiDAR Head Optics
    p.push({
      id: "head-neck-base",
      type: "cylinder",
      args: [0.22, 0.28, 0.35, 16],
      basePos: [0, 1.35, -0.1],
      baseRot: [0, 0, 0],
      blastDir: [0, 2.6, 0.5],
      blastRot: [0.5, 1, 0],
      blastDistance: 3.2,
      color: "#18202d",
      metalness: 0.95,
      roughness: 0.2,
    });
    p.push({
      id: "head-sensor-chassis",
      type: "box",
      args: [0.75, 0.5, 0.65],
      basePos: [0, 1.75, -0.05],
      baseRot: [0.08, 0, 0],
      blastDir: [0, 3.6, 1.5],
      blastRot: [0.8, 0, 0],
      blastDistance: 4.2,
      color: "#0b0f16",
      metalness: 0.85,
      roughness: 0.3,
    });
    // LiDAR Aperture Visor (Glowing horizontal band)
    p.push({
      id: "lidar-visor-band",
      type: "box",
      args: [0.65, 0.12, 0.12],
      basePos: [0, 1.75, 0.3],
      baseRot: [0.08, 0, 0],
      blastDir: [0, 4.0, 3.2],
      blastRot: [1.2, 0, 0],
      blastDistance: 4.6,
      color: "#00F0FF",
      metalness: 0.3,
      roughness: 0.1,
      emissive: "#00F0FF",
      emissiveIntensity: 3.0,
    });

    // 6 Heat Dissipation Vent Fins on back of head
    for (let fin = 0; fin < 6; fin++) {
      p.push({
        id: `heat-fin-${fin}`,
        type: "box",
        args: [0.5, 0.03, 0.2],
        basePos: [0, 1.6 + fin * 0.06, -0.42],
        baseRot: [-0.2, 0, 0],
        blastDir: [0, 3.8 + fin * 0.2, -3.2],
        blastRot: [1.5, 0.4 * (fin - 2.5), 0],
        blastDistance: 4.0,
        color: "#ff4d00",
        metalness: 0.9,
        roughness: 0.3,
        emissive: "#ff4d00",
        emissiveIntensity: 0.7,
      });
    }

    return p;
  }, []);

  useFrame((state, delta) => {
    // Smooth lerp of scroll progress for buttery weight
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      scrollProgress,
      delta * 6.5
    );

    const t = smoothProgress.current;
    const time = state.clock.getElapsedTime();

    // Gentle floating idle motion + mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointerX * 0.35 + Math.sin(time * 0.8) * 0.08,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointerY * 0.25 + Math.cos(time * 0.6) * 0.05,
        delta * 3
      );
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.08;
    }

    // Spin core rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 1.5;
      ring1Ref.current.rotation.y += delta * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z += delta * 1.2;
      ring2Ref.current.rotation.x -= delta * 0.9;
    }

    // Animate every single part based on explosion progress t
    parts.forEach((part) => {
      const mesh = meshRefs.current[part.id];
      if (!mesh) return null;

      // Position: basePos + blastDir * t * blastDistance + micro-wobble
      const wobble = t > 0.05 ? Math.sin(time * 2 + part.blastDistance) * 0.04 * t : 0;
      mesh.position.x = part.basePos[0] + part.blastDir[0] * t * part.blastDistance + wobble;
      mesh.position.y = part.basePos[1] + part.blastDir[1] * t * part.blastDistance + wobble;
      mesh.position.z = part.basePos[2] + part.blastDir[2] * t * part.blastDistance;

      // Rotation: baseRot + blastRot * t
      mesh.rotation.x = part.baseRot[0] + part.blastRot[0] * t;
      mesh.rotation.y = part.baseRot[1] + part.blastRot[1] * t;
      mesh.rotation.z = part.baseRot[2] + part.blastRot[2] * t;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {parts.map((part) => {
        let geometry: React.ReactNode = null;
        if (part.type === "sphere") {
          geometry = <sphereGeometry args={part.args as [number, number, number]} />;
        } else if (part.type === "box") {
          geometry = <boxGeometry args={part.args as [number, number, number]} />;
        } else if (part.type === "cylinder") {
          geometry = <cylinderGeometry args={part.args as [number, number, number, number]} />;
        } else if (part.type === "torus") {
          geometry = <torusGeometry args={part.args as [number, number, number, number]} />;
        }

        return (
          <mesh
            key={part.id}
            ref={(el) => {
              meshRefs.current[part.id] = el;
              if (part.id === "core-gimbal-outer") ring1Ref.current = el;
              if (part.id === "core-gimbal-inner") ring2Ref.current = el;
            }}
            position={part.basePos}
            rotation={part.baseRot}
            castShadow
            receiveShadow
          >
            {geometry}
            <meshStandardMaterial
              color={part.color}
              metalness={part.metalness}
              roughness={part.roughness}
              emissive={part.emissive || "#000000"}
              emissiveIntensity={part.emissiveIntensity || 0}
              wireframe={part.wireframe || false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
