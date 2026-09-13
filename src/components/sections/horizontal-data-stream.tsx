"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, Globe2, ShieldAlert, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface StatCard {
  id: string;
  metric: string;
  label: string;
  description: string;
  telemetry: string;
  accent: "cyan" | "orange";
  icon: React.ReactNode;
}

const stats: StatCard[] = [
  {
    id: "precision",
    metric: "99.998%",
    label: "KINEMATIC PRECISION",
    description: "Sub-millimeter closed-loop position accuracy under dynamic 15G multi-axis acceleration vectors.",
    telemetry: "ENCODER: 24-BIT ABSOLUTE // DRIFT RATE: <0.001°/HR",
    accent: "cyan",
    icon: <Gauge className="w-6 h-6 text-cyan" />,
  },
  {
    id: "latency",
    metric: "<0.04 ms",
    label: "NEURAL LATENCY",
    description: "Quantum edge neuromorphic cycle from optical camera acquisition to magnetic motor flux actuation.",
    telemetry: "BUS: DIRECT LASER-OPTIC // JITTER: ±0.002ms",
    accent: "orange",
    icon: <Zap className="w-6 h-6 text-orange" />,
  },
  {
    id: "deployed",
    metric: "12,450+",
    label: "ACTIVE UNITS",
    description: "Autonomous kinetic agents operating concurrently across 34 planetary industrial and biological grids.",
    telemetry: "COVERAGE: 6 CONTINENTS // SWARM COHESION: 99.99%",
    accent: "cyan",
    icon: <Globe2 className="w-6 h-6 text-cyan" />,
  },
  {
    id: "failure",
    metric: "0.00%",
    label: "UNSCHEDULED DOWNTIME",
    description: "Zero catastrophic motor stalls or thermal halts recorded across 4.2M continuous operating hours.",
    telemetry: "MTBF: >120,000 HRS // TRIPLE-MODULAR OVERRIDE",
    accent: "orange",
    icon: <ShieldAlert className="w-6 h-6 text-orange" />,
  },
];

export function HorizontalDataStream() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. WebGL / Canvas velocity-reactive particle stream
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 120;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: -(Math.random() * 1.5 + 0.5),
      color: Math.random() > 0.6 ? "#00F0FF" : Math.random() > 0.3 ? "#FF4D00" : "#ffffff",
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let velocityMultiplier = 1;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX * velocityMultiplier;
        if (p.x < 0) p.x = width;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gradually decay velocity multiplier back to idle speed 1
      velocityMultiplier = gsap.utils.interpolate(velocityMultiplier, 1, 0.05);

      animId = requestAnimationFrame(render);
    };
    render();

    // 2. GSAP Horizontal Scroll Pinning
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!trigger || !track) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctxGsap = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalScroll + 300}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Speed up particle field based on scroll velocity!
            const vel = Math.abs(self.getVelocity() / 300);
            velocityMultiplier = Math.min(8, 1 + vel);
          },
        },
      });
    }, triggerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      ctxGsap.revert();
    };
  }, []);

  return (
    <section
      id="data-stream"
      ref={triggerRef}
      className="relative w-full h-screen bg-dark-950 overflow-hidden select-none"
    >
      {/* Background Velocity-Reactive Particle Field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
      />

      {/* Cybernetic Grid & Ambient Glow */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] radial-cyan-glow opacity-25 blur-3xl pointer-events-none" />

      {/* Sticky Top Heading Bar */}
      <div className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan uppercase">
          <Cpu className="w-4 h-4 text-cyan animate-pulse" />
          04 // HORIZONTAL DATA STREAM
        </div>
        <span className="text-zinc-600">|</span>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
          PARALLAX TELEMETRY
        </span>
      </div>

      {/* Horizontal Moving Track */}
      <div
        ref={trackRef}
        className="relative z-10 h-full flex items-center gap-12 px-6 md:px-16 w-max"
      >
        {/* Intro Banner */}
        <div className="w-[320px] sm:w-[420px] flex-shrink-0 flex flex-col justify-center pr-8">
          <div className="text-xs font-mono text-cyan tracking-widest uppercase mb-2">
            GLOBAL METRICS
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-white uppercase leading-none mb-4">
            EXTREME PHYSICAL VALIDATION
          </h2>
          <p className="text-sm text-zinc-400 font-body leading-relaxed">
            Continuously logged across 34 industrial deployments. Scroll vertically to travel through the high-frequency telemetry spectrum.
          </p>
        </div>

        {/* 4 Massive Stat Cards */}
        {stats.map((stat, idx) => {
          const isCyan = stat.accent === "cyan";
          return (
            <div
              key={stat.id}
              className={`w-[360px] sm:w-[500px] flex-shrink-0 rounded-3xl glass-panel p-8 sm:p-10 border transition-all duration-300 flex flex-col justify-between min-h-[440px] relative group overflow-hidden ${
                isCyan
                  ? "border-cyan/30 hover:border-cyan/70 hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
                  : "border-orange/30 hover:border-orange/70 hover:shadow-[0_0_35px_rgba(255,77,0,0.2)]"
              }`}
            >
              {/* Card Index Watermark */}
              <div className="absolute right-6 top-6 text-7xl font-heading font-black text-white/5 pointer-events-none group-hover:text-white/10 transition-colors">
                0{idx + 1}
              </div>

              {/* Top Card Bar */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-dark-900 border border-white/10">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    METRIC // 0{idx + 1}
                  </div>
                  <div className="text-sm font-heading font-bold text-white tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>

              {/* Massive Metric Display */}
              <div className="my-8">
                <div
                  className={`text-6xl sm:text-7xl md:text-8xl font-heading font-black tracking-tighter leading-none ${
                    isCyan
                      ? "text-cyan glow-text-cyan"
                      : "text-orange glow-text-orange"
                  }`}
                >
                  {stat.metric}
                </div>
                <p className="text-sm sm:text-base text-zinc-300 font-body mt-4 leading-relaxed">
                  {stat.description}
                </p>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="pt-4 border-t border-white/10 font-mono text-[11px] text-zinc-400 tracking-wider">
                {stat.telemetry}
              </div>
            </div>
          );
        })}

        {/* End Station */}
        <div className="w-[300px] flex-shrink-0 flex flex-col justify-center pl-6">
          <div className="text-xs font-mono text-orange uppercase tracking-widest mb-2">
            TELEMETRY END
          </div>
          <div className="text-2xl font-heading font-bold text-white uppercase">
            PROCEED TO LAUNCH
          </div>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Scroll down to enter sequence ignition.
          </p>
        </div>
      </div>
    </section>
  );
}
