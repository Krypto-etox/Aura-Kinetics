"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, ShieldCheck, Activity, Layers, RotateCcw } from "lucide-react";

// Dynamic import for Three.js Canvas to prevent SSR issues
const RobotCanvas = dynamic(
  () => import("../canvas/robot-canvas").then((mod) => mod.RobotCanvas),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export function BlastSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP ScrollTrigger timeline to bind scroll progress strictly to explosion factor
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      st.kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <section
      id="blast-section"
      ref={containerRef}
      className="relative w-full h-[380vh] bg-dark-950"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 md:p-12 pt-24 md:pt-28 select-none">
        
        {/* Background 3D WebGL Canvas */}
        <div className="absolute inset-0 z-0">
          <RobotCanvas scrollProgress={scrollProgress} pointer={pointer} />
        </div>

        {/* Ambient Top Subtle Vignette */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-950 via-dark-950/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent pointer-events-none z-10" />

        {/* TOP HUD: Section Header & State */}
        <div className="relative z-20 flex items-start justify-between w-full max-w-7xl mx-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
              02 // MECHANICAL DECONSTRUCTION
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white uppercase">
              THE SCROLL BLAST EFFECT
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md mt-1">
              57 distinct structural components suspended in zero-g micro-gravity. Scroll to expand and inspect sub-assemblies.
            </p>
          </div>

          {/* Real-time Exploded View Gauge */}
          <div className="glass-panel p-3 sm:p-4 rounded-xl border-cyan/20 flex flex-col items-end min-w-[160px]">
            <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
              DISPERSION FACTOR
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-cyan tracking-wider">
              {progressPercent}%
            </div>
            <div className="w-full bg-dark-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gradient-to-r from-cyan to-orange h-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[9px] font-mono text-zinc-400 mt-1.5 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${progressPercent > 5 ? "bg-orange animate-pulse" : "bg-cyan"}`} />
              {progressPercent > 80
                ? "FULLY DETACHED"
                : progressPercent > 20
                ? "DECOUPLING JOINTS"
                : "ASSEMBLED STATE"}
            </div>
          </div>
        </div>

        {/* MIDDLE LAYER: Dynamic Telemetry Cards fading in/out as scroll progresses */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 pointer-events-none flex items-center justify-between">
          
          {/* Phase 1: Sub-Millimeter Servo Array (Progress 12% - 38%) */}
          <AnimatePresence>
            {scrollProgress >= 0.1 && scrollProgress <= 0.38 && (
              <motion.div
                initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="glass-panel-glow p-6 rounded-2xl max-w-sm pointer-events-auto border-cyan/40 bg-dark-950/85 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-cyan uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> SUBSYSTEM 01
                  </span>
                  <span className="text-[10px] font-mono bg-cyan/10 text-cyan px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white uppercase mb-1">
                  SUB-MILLIMETER SERVO ARRAY
                </h3>
                <div className="text-2xl font-mono font-black text-cyan mb-2">
                  0.002mm
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                  Dual titanium harmonic drives delivering continuous closed-loop feedback across 7 degrees of freedom with instantaneous magnetic dampening.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    TORQUE: <span className="text-white">450 N·m</span>
                  </div>
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    GEAR RATIO: <span className="text-white">160:1</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 2: Quantum Synapse Bus (Progress 36% - 62%) */}
          <AnimatePresence>
            {scrollProgress >= 0.36 && scrollProgress <= 0.62 && (
              <motion.div
                initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="glass-panel-glow p-6 rounded-2xl max-w-sm ml-auto pointer-events-auto border-orange/40 bg-dark-950/85 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-orange uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5" /> SUBSYSTEM 02
                  </span>
                  <span className="text-[10px] font-mono bg-orange/10 text-orange px-2 py-0.5 rounded">
                    SUPERCONDUCTING
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white uppercase mb-1">
                  NEURAL SYNAPSE BUS
                </h3>
                <div className="text-2xl font-mono font-black text-orange mb-2">
                  128 TFLOPS EDGE
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                  Direct laser-optic interconnects linking all 57 servos to the central neuromorphic core, eliminating signal latency down to sub-40 microseconds.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    LATENCY: <span className="text-white">&lt;0.04ms</span>
                  </div>
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    BUS RATE: <span className="text-white">40 Gbps</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3: Titanium Exoskeleton (Progress 60% - 85%) */}
          <AnimatePresence>
            {scrollProgress >= 0.60 && scrollProgress <= 0.85 && (
              <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="glass-panel-glow p-6 rounded-2xl max-w-sm pointer-events-auto border-cyan/40 bg-dark-950/85 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-cyan uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> SUBSYSTEM 03
                  </span>
                  <span className="text-[10px] font-mono bg-cyan/10 text-cyan px-2 py-0.5 rounded">
                    GRADE-5 TI
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white uppercase mb-1">
                  TITANIUM EXOSKELETON
                </h3>
                <div className="text-2xl font-mono font-black text-cyan mb-2">
                  94% DAMPENING
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                  Monocoque aerospace-grade titanium matrix paired with articulated kinetic louvers for instantaneous heat rejection and kinetic impact dissipation.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400">
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    TENSILE: <span className="text-white">1,150 MPa</span>
                  </div>
                  <div className="bg-dark-900/90 p-1.5 rounded border border-white/5">
                    THERMAL: <span className="text-white">-60°C to 180°C</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 4: Full Exploded Telemetry (Progress 84% - 100%) */}
          <AnimatePresence>
            {scrollProgress >= 0.84 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="glass-panel-glow p-6 rounded-2xl max-w-sm ml-auto pointer-events-auto border-orange/40 bg-dark-950/85 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                  <span className="text-xs font-mono text-orange uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> SUBSYSTEM 04
                  </span>
                  <span className="text-[10px] font-mono bg-orange/10 text-orange px-2 py-0.5 rounded">
                    DISPERSED
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white uppercase mb-1">
                  57 SUSPENDED NODES
                </h3>
                <div className="text-2xl font-mono font-black text-orange mb-2">
                  ZERO-G MATRIX
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-3">
                  Every structural element is completely decoupled. Scroll backwards to witness magnetic snap-assembly under quantum flux guidance.
                </p>
                <div className="flex items-center gap-2 text-[11px] font-mono text-cyan">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
                  MAGNETIC RE-ALIGNMENT READY
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* BOTTOM HUD: Visual Milestone Tracker */}
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan" />
              SCROLL AXIS: DYNAMIC
            </span>
            <span className="text-zinc-600">/</span>
            <span>PARTS DETACHED: {Math.min(57, Math.round(scrollProgress * 57))} / 57</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-zinc-400">STATE:</span>
              <span className="text-cyan font-bold">
                {scrollProgress > 0.05 ? "EXPLODED SUSPENSION" : "MAGNETICALLY ASSEMBLED"}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
