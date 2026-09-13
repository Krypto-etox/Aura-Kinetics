"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Radio, Zap } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const [impactTriggered, setImpactTriggered] = useState(false);

  useEffect(() => {
    // Camera shake trigger after headline slam
    const timer = setTimeout(() => {
      setImpactTriggered(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const headlineWord1 = "MACHINES".split("");
  const headlineWord2 = "WITH".split("");
  const headlineWord3 = "PURPOSE.".split("");

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 pt-32 pb-12 overflow-hidden bg-dark-950"
    >
      {/* Intense Glowing Radial Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full radial-cyan-glow opacity-80 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full radial-orange-glow opacity-60 blur-2xl" />
        <div className="absolute inset-0 cyber-grid opacity-30" />
      </div>

      {/* Floating Geometric Masked Images (Futuristic Schematics) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Left Chamfered Floating Shape */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 0.35, x: 0 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="absolute left-6 top-1/4 w-48 h-64 md:w-64 md:h-80 clip-chamfer border border-cyan/30 overflow-hidden hidden sm:block"
        >
          <div className="relative w-full h-full bg-dark-900/80">
            <Image
              src="/sectors/healthcare-robotics.jpg"
              alt="Healthcare Cybernetics"
              fill
              sizes="300px"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-cyan uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-ping" />
              EFF-01 // BIO-SURGICAL
            </div>
          </div>
        </motion.div>

        {/* Right Hexagonal Floating Shape */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.35, x: 0 }}
          transition={{ duration: 1.4, delay: 0.7 }}
          className="absolute right-6 top-1/3 w-48 h-64 md:w-72 md:h-96 clip-corner-tl-br border border-orange/30 overflow-hidden hidden sm:block"
        >
          <div className="relative w-full h-full bg-dark-900/80">
            <Image
              src="/sectors/smart-city-robotics.jpg"
              alt="Urban Infrastructure Drone"
              fill
              sizes="300px"
              className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
            <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest text-orange uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
              AERO-04 // URBAN SWARM
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Protocol Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-cyan/30 text-xs font-mono tracking-widest text-zinc-300 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
      >
        <Radio className="w-3.5 h-3.5 text-cyan animate-pulse" />
        <span className="text-zinc-400">SERIES X-07</span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span className="text-cyan font-semibold uppercase">IGNITION READY</span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span className="text-orange font-mono">128 TFLOPS EDGE</span>
      </motion.div>

      {/* Camera Shake Wrapper on Main Headline */}
      <motion.div
        animate={
          impactTriggered
            ? {
                x: [0, -3, 3, -2, 2, 0],
                y: [0, 2, -2, 1, -1, 0],
              }
            : {}
        }
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="relative z-10 max-w-6xl mx-auto my-auto text-center flex flex-col items-center"
      >
        {/* Kinetic Masked Headline Reveal */}
        <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none select-none my-4">
          {/* Row 1: MACHINES */}
          <div className="overflow-hidden flex justify-center">
            {headlineWord1.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-white hover:text-cyan transition-colors duration-200"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Row 2: WITH PURPOSE. */}
          <div className="overflow-hidden flex justify-center gap-4 sm:gap-6 flex-wrap">
            <span className="flex">
              {headlineWord2.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.45 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-white to-zinc-400"
                >
                  {char}
                </motion.span>
              ))}
            </span>

            <span className="flex">
              {headlineWord3.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.6 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${
                    char === "." ? "text-cyan glow-text-cyan" : "text-white hover:text-orange transition-colors duration-200"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </div>
        </h1>

        {/* Subtitle & Architecture Synopsis */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-zinc-400 mt-6 leading-relaxed font-body"
        >
          Architecting multi-axis cybernetic embodiments engineered with 
          <span className="text-white font-medium"> 50+ articulated subsystems</span>, 
          sub-millimeter precision servos, and quantum-edge intelligence for extreme physical environments.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <a
            href="#blast-section"
            className="group relative px-8 py-4 font-mono font-bold text-sm tracking-wider uppercase bg-cyan text-black clip-corner-tl-br overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_45px_rgba(0,240,255,0.7)]"
          >
            <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform">
              EXPLODE 3D MODEL
              <Zap className="w-4 h-4 fill-current" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a
            href="#sectors"
            className="px-8 py-4 font-mono text-sm tracking-wider uppercase text-zinc-300 border border-white/20 hover:border-cyan hover:text-white glass-panel clip-chamfer transition-all duration-300"
          >
            EXPLORE SECTORS [04]
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Technical Telemetry Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono text-xs text-zinc-400"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            ACTUATOR BUS: SYNCHRONIZED
          </span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline">LATENCY: &lt;0.04ms</span>
        </div>

        {/* Scroll down prompt */}
        <div className="flex items-center gap-2 text-zinc-400 hover:text-cyan transition-colors cursor-pointer"
          onClick={() => {
            const el = document.getElementById("blast-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="tracking-widest uppercase text-[11px]">SCROLL TO DISASSEMBLE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-cyan" />
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <span>LAT: 37.7749° N</span>
          <span className="text-zinc-600">/</span>
          <span>LNG: 122.4194° W</span>
        </div>
      </motion.div>
    </section>
  );
}
