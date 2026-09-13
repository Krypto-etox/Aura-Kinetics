"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { Terminal, ArrowRight, Zap, CheckCircle2, RotateCcw, X } from "lucide-react";
import confetti from "canvas-confetti";

export function MagneticFooter() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sequenceStep, setSequenceStep] = useState(0);

  // Magnetic Button Spring Physics
  const springX = useSpring(0, { stiffness: 220, damping: 18 });
  const springY = useSpring(0, { stiffness: 220, damping: 18 });

  const magneticDistance = 120; // 120px activation radius

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < magneticDistance) {
        // Pull towards cursor with spring
        const pullFactor = 0.45;
        springX.set(distX * pullFactor);
        springY.set(distY * pullFactor);
      } else {
        springX.set(0);
        springY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  // Launch sequence handler
  const handleInitiate = () => {
    setModalOpen(true);
    setSequenceStep(1);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00F0FF", "#FF4D00", "#FFFFFF"],
    });

    const t1 = setTimeout(() => setSequenceStep(2), 1200);
    const t2 = setTimeout(() => setSequenceStep(3), 2400);
    const t3 = setTimeout(() => {
      setSequenceStep(4);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#00F0FF", "#FF4D00", "#39FF14"],
      });
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <footer
      id="footer-cta"
      className="relative min-h-screen w-full bg-dark-950 flex flex-col justify-between items-center px-6 pt-32 pb-12 overflow-hidden select-none border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] radial-cyan-glow opacity-60 blur-3xl animate-pulse-slow" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] radial-orange-glow opacity-40 blur-3xl" />
        <div className="absolute inset-0 cyber-dots opacity-20" />
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 flex items-center gap-2 text-xs font-mono tracking-widest text-cyan uppercase mb-6">
        <Zap className="w-4 h-4 text-cyan fill-cyan" />
        05 // KINETIC ACTIVATION STAGE
      </div>

      {/* Main Massive Call to Action Center */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto">
        <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none text-white mb-6">
          READY TO <span className="text-cyan glow-text-cyan">DEPLOY?</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base md:text-lg font-body text-zinc-400 mb-12">
          Connect your industrial fleet or autonomous facility to the AURA-7 Neuromorphic Core. Sub-40 microsecond reflex loops, zero downtime guarantee.
        </p>

        {/* Magnetic Button Container */}
        <div className="relative p-12 flex items-center justify-center">
          {/* Animated Glow Ring behind */}
          <div className="absolute w-72 h-72 rounded-full border border-cyan/20 animate-ping opacity-30 pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full border border-dashed border-orange/20 animate-spin-slow pointer-events-none" />

          {/* Actual Magnetic Framer Motion Button */}
          <motion.button
            ref={buttonRef}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleInitiate}
            className="relative px-12 py-7 sm:px-16 sm:py-8 bg-cyan text-black font-heading font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-wider clip-corner-tl-br shadow-[0_0_60px_rgba(0,240,255,0.6)] hover:shadow-[0_0_90px_rgba(0,240,255,0.9)] transition-shadow duration-300 group cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-3 group-hover:tracking-widest transition-all duration-300">
              INITIATE SEQUENCE
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
          </motion.button>
        </div>

        {/* Magnetic Button Radius Hint */}
        <div className="text-[11px] font-mono text-zinc-400 mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          MAGNETIC PULL ACTIVE: MOVE CURSOR NEAR THE BUTTON (120PX RADIUS)
        </div>
      </div>

      {/* Interactive Sequence Launch Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl glass-panel-glow border-cyan/50 p-8 rounded-3xl bg-dark-900/95 relative text-left"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-5 h-5 text-cyan animate-pulse" />
              <div className="text-xs font-mono uppercase tracking-widest text-cyan font-bold">
                TELEMETRY DIAGNOSTIC // AURA-7
              </div>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className={`p-3 rounded-lg border ${sequenceStep >= 1 ? "border-cyan/40 bg-cyan/10 text-white" : "border-white/5 text-zinc-600"}`}>
                [01] OPTICAL BUS HANDSHAKE ......... {sequenceStep >= 1 ? "ESTABLISHED (0.02ms)" : "PENDING"}
              </div>
              <div className={`p-3 rounded-lg border ${sequenceStep >= 2 ? "border-orange/40 bg-orange/10 text-white" : "border-white/5 text-zinc-600"}`}>
                [02] 57 SERVO JOINTS CALIBRATION .. {sequenceStep >= 2 ? "MAGNETIC LOCK CONFIRMED" : "QUEUED"}
              </div>
              <div className={`p-3 rounded-lg border ${sequenceStep >= 3 ? "border-cyan/40 bg-cyan/10 text-white" : "border-white/5 text-zinc-600"}`}>
                [03] QUANTUM EDGE SYNAPSE .......... {sequenceStep >= 3 ? "128 TFLOPS SYNCED" : "QUEUED"}
              </div>
              <div className={`p-3 rounded-lg border ${sequenceStep >= 4 ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-white/5 text-zinc-600"}`}>
                [04] FLEET ACTIVATION ............. {sequenceStep >= 4 ? "COMPLETE. FULL AUTONOMY GRANTED." : "WAITING"}
              </div>
            </div>

            {sequenceStep >= 4 ? (
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs font-mono text-green-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> ALL SYSTEMS OPERATIONAL
                </span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 bg-cyan text-black font-mono font-bold text-xs uppercase rounded-lg hover:bg-white transition-colors"
                >
                  DISMISS CONSOLE
                </button>
              </div>
            ) : (
              <div className="mt-6 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-cyan" />
                EXECUTION IN PROGRESS...
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer Meta Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/10 font-mono text-xs text-zinc-400">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-white font-bold tracking-wider">AURA KINETICS INC.</span>
          <span className="hidden sm:inline text-zinc-600">/</span>
          <span>© 2026 ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
          <a href="#hero" className="hover:text-cyan transition-colors">IGNITION</a>
          <a href="#blast-section" className="hover:text-cyan transition-colors">EXPLODED VIEW</a>
          <a href="#sectors" className="hover:text-cyan transition-colors">SECTORS</a>
          <a href="#data-stream" className="hover:text-cyan transition-colors">DATA STREAM</a>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
          <span className="text-cyan font-semibold">GRID TELEMETRY: 100% ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
