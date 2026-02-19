"use client";
import React from "react";
import { motion } from "framer-motion";
import { Anchor, Cpu, ShieldAlert, Database, Terminal } from "lucide-react";
import { useLenis } from "lenis/react";

export default function MobileNav() {
  const lenis = useLenis();

  const items = [
    { id: "hero", icon: Anchor },
    { id: "stats", icon: Cpu },
    { id: "workshops", icon: ShieldAlert },
    { id: "experience", icon: Database },
    { id: "projects", icon: Terminal }
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] lg:hidden">
      <div className="flex items-center gap-6 px-6 py-4 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        {items.map((item) => (
          <button 
            key={item.id} 
            onClick={() => lenis?.scrollTo(`#${item.id}`)}
            className="text-zinc-500 active:text-teal-400"
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    </nav>
  );
}