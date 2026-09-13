import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA KINETICS | Machines With Purpose",
  description: "Next-generation autonomous kinetic systems and multi-axis cybernetic robotics engineered for extreme frontiers. Surgical healthcare, autonomous agriculture, planetary infrastructure, and biomimetic living.",
  keywords: ["Robotics", "Autonomous Systems", "Cybernetics", "Artificial Intelligence", "Actuator Matrix", "AURA-7"],
  openGraph: {
    title: "AURA KINETICS | Machines With Purpose",
    description: "Next-generation autonomous kinetic systems and multi-axis cybernetic robotics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-dark-950 text-foreground antialiased selection:bg-cyan selection:text-black min-h-screen relative overflow-x-hidden`}
      >
        <CustomCursor />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
