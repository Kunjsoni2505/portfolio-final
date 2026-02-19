"use client";
import React from "react";
import { motion } from "framer-motion";

// Skills mapped directly from your professional experience
const SKILLS = [
  // AI & Data Science (Top Cluster)
  { name: "TensorFlow", x: 50, y: 15, category: "AI" },
  { name: "Python", x: 30, y: 25, category: "AI" },
  { name: "Scikit-Learn", x: 70, y: 25, category: "AI" },

  // Backend & APIs (Middle Cluster)
  { name: "FastAPI", x: 45, y: 45, category: "Backend" },
  { name: "Django", x: 25, y: 55, category: "Backend" },
  { name: "Spring Boot", x: 65, y: 55, category: "Backend" },

  // Databases & Infrastructure (Bottom Cluster)
  { name: "PostgreSQL", x: 35, y: 80, category: "Data" },
  { name: "MongoDB", x: 60, y: 80, category: "Data" },
  { name: "Docker", x: 80, y: 70, category: "DevOps" },
];

export default function TechConstellation() {
  return (
    <section className="z-10 w-full max-w-5xl mx-auto py-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
          Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Architecture</span>
        </h2>
        <p className="text-zinc-500 text-sm mt-2 font-mono uppercase tracking-widest">
          Core specialized stack // v2026.02
        </p>
      </div>

      <div className="relative h-[600px] w-full bg-white/[0.02] rounded-[50px] border border-white/10 overflow-hidden backdrop-blur-xl shadow-2xl">
        {/* Connecting Neural Pathways */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          {/* AI Cluster Connections */}
          <line x1="30%" y1="25%" x2="50%" y2="15%" stroke="white" strokeWidth="1" />
          <line x1="50%" y1="15%" x2="70%" y2="25%" stroke="white" strokeWidth="1" />
          
          {/* AI to Backend Bridge */}
          <line x1="50%" y1="15%" x2="45%" y2="45%" stroke="white" strokeWidth="1" />
          
          {/* Backend Connections */}
          <line x1="25%" y1="55%" x2="45%" y2="45%" stroke="white" strokeWidth="1" />
          <line x1="45%" y1="45%" x2="65%" y2="55%" stroke="white" strokeWidth="1" />
          
          {/* Data Infrastructure Connections */}
          <line x1="45%" y1="45%" x2="35%" y2="80%" stroke="white" strokeWidth="1" />
          <line x1="45%" y1="45%" x2="60%" y2="80%" stroke="white" strokeWidth="1" />
          <line x1="65%" y1="55%" x2="80%" y2="70%" stroke="white" strokeWidth="1" />
        </svg>

        {SKILLS.map((skill, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-grab active:cursor-grabbing z-20"
          >
            <div className="relative">
              {/* Dynamic Glow based on Category */}
              <div className={`absolute inset-0 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                skill.category === "AI" ? "bg-purple-500/40" : 
                skill.category === "Backend" ? "bg-teal-500/40" : "bg-blue-500/40"
              }`} />
              
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className={`relative px-6 py-2 bg-[#030014]/80 border rounded-full text-white text-xs font-bold tracking-tight shadow-xl backdrop-blur-md transition-all duration-300 ${
                  skill.category === "AI" ? "border-purple-500/50 group-hover:border-purple-400" : 
                  skill.category === "Backend" ? "border-teal-500/50 group-hover:border-teal-400" : "border-blue-500/50 group-hover:border-blue-400"
                }`}
              >
                {skill.name}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Dynamic Background Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      </div>
      
      <div className="mt-8 flex justify-center gap-8">
        <LegendItem color="bg-purple-500" label="AI/ML" />
        <LegendItem color="bg-teal-500" label="Systems" />
        <LegendItem color="bg-blue-500" label="Data" />
      </div>
    </section>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}