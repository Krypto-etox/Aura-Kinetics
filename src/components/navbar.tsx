"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [clock, setClock] = useState("00:00:00 UTC");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    const updateClock = () => {
      const d = new Date();
      setClock(d.toISOString().slice(11, 19) + " UTC");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-dark-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-dark-900 border border-cyan/40 group-hover:border-cyan transition-colors">
            <Cpu className="w-5 h-5 text-cyan group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-cyan/10 rounded-lg blur-sm group-hover:bg-cyan/20 transition-all" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg tracking-widest text-white flex items-center gap-1.5">
              AURA <span className="text-cyan font-light">KINETICS</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">
              AUTONOMOUS SYSTEMS // V7.4
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-zinc-400">
          <button
            onClick={() => scrollTo("hero")}
            className="hover:text-cyan transition-colors uppercase tracking-wider relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan hover:after:w-full after:transition-all"
          >
            01. IGNITION
          </button>
          <button
            onClick={() => scrollTo("blast-section")}
            className="hover:text-cyan transition-colors uppercase tracking-wider relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan hover:after:w-full after:transition-all"
          >
            02. EXPLODED VIEW
          </button>
          <button
            onClick={() => scrollTo("sectors")}
            className="hover:text-cyan transition-colors uppercase tracking-wider relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan hover:after:w-full after:transition-all"
          >
            03. SECTORS
          </button>
          <button
            onClick={() => scrollTo("data-stream")}
            className="hover:text-cyan transition-colors uppercase tracking-wider relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyan hover:after:w-full after:transition-all"
          >
            04. DATA STREAM
          </button>
        </nav>

        {/* Telemetry & Action Pill */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-900/80 border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            <span className="text-zinc-400">SYS:</span>
            <span className="text-cyan font-semibold">OPTIMAL</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">{clock}</span>
          </div>

          <button
            onClick={() => scrollTo("footer-cta")}
            className="relative px-4 py-2 text-xs font-mono tracking-wider font-semibold text-black uppercase bg-cyan hover:bg-white transition-all duration-300 clip-corner-tl-br shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)]"
          >
            INITIATE // V7
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-zinc-400 hover:text-white"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-6 font-mono text-sm tracking-wider">
          <button
            onClick={() => scrollTo("hero")}
            className="text-left py-2 text-zinc-300 hover:text-cyan border-b border-white/5"
          >
            01. IGNITION
          </button>
          <button
            onClick={() => scrollTo("blast-section")}
            className="text-left py-2 text-zinc-300 hover:text-cyan border-b border-white/5"
          >
            02. EXPLODED VIEW (3D)
          </button>
          <button
            onClick={() => scrollTo("sectors")}
            className="text-left py-2 text-zinc-300 hover:text-cyan border-b border-white/5"
          >
            03. SECTORS (BENTO)
          </button>
          <button
            onClick={() => scrollTo("data-stream")}
            className="text-left py-2 text-zinc-300 hover:text-cyan border-b border-white/5"
          >
            04. DATA STREAM
          </button>
          <button
            onClick={() => scrollTo("footer-cta")}
            className="mt-4 w-full py-3 text-center bg-cyan text-black font-semibold uppercase tracking-widest"
          >
            INITIATE SEQUENCE
          </button>
        </div>
      )}
    </header>
  );
}
