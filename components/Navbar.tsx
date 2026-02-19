"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, Cpu, Database, Terminal, ShieldAlert } from "lucide-react";
import { useLenis } from "lenis/react";

const NAV_ITEMS = [
  { id: "hero", label: "Core_Identity", icon: Anchor },
  { id: "stats", label: "Intel_Stats", icon: Cpu },
  { id: "workshops", label: "Neural_Upgrades", icon: ShieldAlert }, 
  { id: "experience", label: "Mission_Log", icon: Database },
  { id: "projects", label: "Project_Fleet", icon: Terminal },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const lenis = useLenis();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    lenis?.scrollTo(`#${id}`, {
      offset: -50,
      lerp: 0.1,
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-end gap-6 pointer-events-none">
      {/* 🛰️ SECTION LABEL (Displays Active Module) */}
      <div className="mr-2 px-3 py-1 border-r-2 border-teal-500 bg-teal-500/5 backdrop-blur-md">
        <p className="text-[10px] font-mono text-teal-500 uppercase tracking-[0.3em]">
          Current_Node: {activeSection.toUpperCase()}
        </p>
      </div>

      <nav className="flex flex-col gap-4 pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group relative flex items-center justify-end gap-4 outline-none"
            >
              {/* 🌑 HOVER LABEL (Expands on Hover) */}
              <span className="opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[10px] font-black text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 whitespace-nowrap">
                {item.label}
              </span>

              {/* 🛰️ ICON HUB */}
              <div className={`
                relative p-4 rounded-2xl border transition-all duration-500
                ${isActive 
                  ? "bg-teal-500/10 border-teal-500/50 shadow-[0_0_20px_rgba(45,212,191,0.2)]" 
                  : "bg-black/40 border-white/5 hover:border-teal-500/30"}
              `}>
                <item.icon 
                  size={18} 
                  className={`transition-colors duration-300 ${isActive ? "text-teal-400" : "text-zinc-500 group-hover:text-white"}`} 
                />
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-teal-500 rounded-full"
                  />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* 🛰️ SYSTEM STATUS INDICATOR */}
      <div className="mt-4 rotate-90 origin-right translate-y-10">
        <p className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.5em] whitespace-nowrap">
          System_Online // Session_2026
        </p>
      </div>
    </div>
  );
}