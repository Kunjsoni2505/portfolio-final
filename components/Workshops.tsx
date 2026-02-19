"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Code2, Cpu, Zap } from "lucide-react";

const TRAINING_DATA = [
  {
    id: "module-01",
    title: "Fullstack Java Developer",
    provider: "Starahb",
    status: "SYSTEM_UPGRADE",
    date: "Jan 2026", // 🛰️ Updated timeline
    description: "Enterprise-grade training in Microservices architecture, Spring Boot backend systems, and Angular frontend integration.",
    tech: ["Spring Boot", "Microservices", "Angular", "Java"]
  },
  {
    id: "module-02",
    title: "ML in Cyber Crime Investigation",
    provider: "EICT IIT Roorkee",
    status: "CERTIFIED",
    date: "Apr 2025", // 🛰️ Fixed timeline
    description: "MeitY-sponsored intensive diagnostic on anomaly detection and digital forensics. Engineered ML models for cyber pattern recognition.",
    tech: ["Python", "Scikit-learn", "Digital Forensics", "Cybersecurity"]
  }
];

export default function Workshops() {
  return (
    <div className="w-full max-w-6xl mx-auto py-32 px-6">
      <div className="flex flex-col mb-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-[10px] font-mono text-teal-500/60 uppercase tracking-[0.4em]">Subsystem_Analysis</span>
        </div>
        <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic">
          Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-zinc-500">Upgrades</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
        {/* Decorative Circuit Line Bridge */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent hidden lg:block" />

        {TRAINING_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Blueprint Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[9px] font-mono text-zinc-600 tracking-widest uppercase italic">
                {item.id} // {item.date}
              </span>
              <span className="text-[9px] font-mono text-teal-500 bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/20">
                {item.status}
              </span>
            </div>

            {/* Main Schematic Card */}
            <div className="bg-[#030014]/40 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] hover:border-teal-500/30 transition-all duration-500 group-hover:shadow-[0_0_30px_-10px_rgba(45,212,191,0.2)]">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-zinc-900 rounded-2xl text-teal-500 group-hover:bg-teal-500 group-hover:text-black transition-all duration-500">
                  {idx === 1 ? <ShieldAlert size={28} /> : <Code2 size={28} />}
                </div>
                <div className="p-2 text-zinc-800">
                  <Zap size={18} className="group-hover:text-teal-500 transition-colors" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight leading-none group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-widest">{item.provider}</p>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[9px] font-bold text-zinc-600 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-teal-500/20 group-hover:text-teal-500/60 transition-colors uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Connector Dot for the Schematic look */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-white/10 bg-[#030014] hidden lg:flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-teal-500 transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}