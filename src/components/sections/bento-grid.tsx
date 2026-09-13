"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Activity, Sprout, Building2, Home, Sparkles } from "lucide-react";

interface SectorItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  accent: "cyan" | "orange";
  colSpan: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
}

const sectors: SectorItem[] = [
  {
    id: "healthcare",
    tag: "BIO-MED // SECTOR 01",
    title: "SURGICAL CYBERNETICS",
    subtitle: "Sub-millimeter micro-manipulator arrays for non-invasive neural micro-suturing and remote tele-surgery.",
    image: "/sectors/healthcare-robotics.jpg",
    accent: "cyan",
    colSpan: "lg:col-span-7",
    icon: <Activity className="w-5 h-5 text-cyan" />,
    specs: [
      { label: "PRECISION", value: "0.001 mm" },
      { label: "TREMOR FILTER", value: "100% ACTIVE" },
      { label: "CLEANROOM", value: "ISO CLASS 1" },
    ],
  },
  {
    id: "agriculture",
    tag: "AGRI-SYSTEMS // SECTOR 02",
    title: "AUTONOMOUS HARVESTERS",
    subtitle: "Multi-spectral vision crawlers navigating dense crops for targeted organic harvesting with zero soil compaction.",
    image: "/sectors/agriculture-robotics.jpg",
    accent: "orange",
    colSpan: "lg:col-span-5",
    icon: <Sprout className="w-5 h-5 text-orange" />,
    specs: [
      { label: "SWARM SIZE", value: "32 UNITS/ACRE" },
      { label: "DIAGNOSTIC", value: "99.8% ACCURACY" },
      { label: "UPTIME", value: "24/7 CONTINUOUS" },
    ],
  },
  {
    id: "smart-city",
    tag: "AEROSPACE // SECTOR 03",
    title: "URBAN INFRASTRUCTURE SWARMS",
    subtitle: "Heavy-lift magnetic levitation drones and autonomous structural repair spiders maintaining skyscraper facades.",
    image: "/sectors/smart-city-robotics.jpg",
    accent: "orange",
    colSpan: "lg:col-span-5",
    icon: <Building2 className="w-5 h-5 text-orange" />,
    specs: [
      { label: "PAYLOAD", value: "500 KG CAPACITY" },
      { label: "WIND RATING", value: "GALE FORCE 9" },
      { label: "TELEMETRY", value: "DIGITAL TWIN LIVE" },
    ],
  },
  {
    id: "smart-housing",
    tag: "HABITAT // SECTOR 04",
    title: "BIOMIMETIC DOMESTIC SYSTEMS",
    subtitle: "Luxury architectural androids and kinetic walls with contextual spatial cognition, whisper-quiet acoustic damping.",
    image: "/sectors/smart-housing-robotics.jpg",
    accent: "cyan",
    colSpan: "lg:col-span-7",
    icon: <Home className="w-5 h-5 text-cyan" />,
    specs: [
      { label: "ACOUSTICS", value: "<18 dB MOTOR" },
      { label: "SAFE-TOUCH", value: "COMPLIANT BIO-GEL" },
      { label: "PRIVACY", value: "100% ON-DEVICE" },
    ],
  },
];

export function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="sectors" className="relative w-full py-32 px-6 md:px-12 bg-dark-950 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute inset-0 pointer-events-none cyber-dots opacity-20" />
      <div className="absolute top-1/2 left-0 w-96 h-96 radial-cyan-glow opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 radial-orange-glow opacity-25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              03 // EXPEDITION HORIZONS
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white uppercase">
              SECTOR SOLUTIONS
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-body text-zinc-400">
            Deployed across four critical planetary domains. Hover over each sector card to crossfade high-resolution telemetry imaging and operational specifications.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {sectors.map((sector) => {
            const isHovered = hoveredId === sector.id;
            const isCyan = sector.accent === "cyan";

            return (
              <motion.div
                key={sector.id}
                onMouseEnter={() => setHoveredId(sector.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.015, y: -4 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`bento-card relative rounded-3xl overflow-hidden glass-panel border transition-all duration-500 cursor-pointer min-h-[380px] p-8 flex flex-col justify-between ${
                  sector.colSpan
                } ${
                  isHovered
                    ? isCyan
                      ? "border-cyan/70 shadow-[0_0_40px_rgba(0,240,255,0.22)]"
                      : "border-orange/70 shadow-[0_0_40px_rgba(255,77,0,0.22)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Background Image with Crossfade Animation */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-all duration-700 ${
                      isHovered ? "opacity-75 scale-105 filter contrast-110" : "opacity-25 grayscale scale-100"
                    }`}
                  />
                  {/* Subtle gradient scrim */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isHovered
                      ? "bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30"
                      : "bg-gradient-to-t from-dark-950 via-dark-950/90 to-dark-950/70"
                  }`} />
                </div>

                {/* Top Card Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-dark-900/90 border border-white/10 backdrop-blur-md">
                      {sector.icon}
                    </div>
                    <span className="text-xs font-mono tracking-widest text-zinc-300">
                      {sector.tag}
                    </span>
                  </div>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isHovered
                      ? isCyan
                        ? "bg-cyan text-black border-cyan scale-110"
                        : "bg-orange text-black border-orange scale-110"
                      : "bg-dark-900/80 text-zinc-400 border-white/10"
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10 mt-12">
                  <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-white uppercase mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mb-6 leading-relaxed">
                    {sector.subtitle}
                  </p>

                  {/* Operational Telemetry Specifications */}
                  <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                    {sector.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex flex-col">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className={`text-xs sm:text-sm font-mono font-bold mt-0.5 ${
                          isCyan ? "text-cyan" : "text-orange"
                        }`}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
