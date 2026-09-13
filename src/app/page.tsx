import React from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { BlastSection } from "@/components/sections/blast-section";
import { BentoGrid } from "@/components/sections/bento-grid";
import { HorizontalDataStream } from "@/components/sections/horizontal-data-stream";
import { MagneticFooter } from "@/components/sections/magnetic-footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-dark-950 text-foreground overflow-x-hidden">
      {/* Fixed Cybernetic Header Navbar */}
      <Navbar />

      {/* 01. The Hero (The Ignition) */}
      <HeroSection />

      {/* 02. The Core Mechanic: "The Scroll Blast Effect" (3D Exploded View) */}
      <BlastSection />

      {/* 03. Sector Solutions (The Bento Grid) */}
      <BentoGrid />

      {/* 04. Data Stream (Horizontal Parallax with Velocity Particles) */}
      <HorizontalDataStream />

      {/* 05. The Magnetic Footer ("INITIATE SEQUENCE") */}
      <MagneticFooter />
    </main>
  );
}
