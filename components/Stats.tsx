"use client";
import { motion } from "framer-motion";
import { Trophy, Code, ShieldAlert, Cpu } from "lucide-react";

// 🛰️ RECALIBRATED DATA: Highlighting new Cyber and Java sub-systems
const statData = [
  { 
    label: "Academic Merit", 
    value: "MCA Rank 1", 
    detail: "Gold Medalist @ ITM", 
    icon: Trophy, 
    color: "text-yellow-500", 
    glow: "group-hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]" 
  },
  { 
    label: "Cyber Forensics", 
    value: "Cyber Intel", 
    detail: "IIT Roorkee // ML Investigations", 
    icon: ShieldAlert, 
    color: "text-red-400", 
    glow: "group-hover:shadow-[0_0_20px_rgba(248,113,113,0.2)]" 
  },
  { 
    label: "Enterprise Stack", 
    value: "Java Fullstack", 
    detail: "Spring Boot // Microservices", 
    icon: Code, 
    color: "text-purple-400", 
    glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]" 
  },
  { 
    label: "Technical Depth", 
    value: "200+ DSA", 
    detail: "LeetCode // GFG Gold Badge", 
    icon: Cpu, 
    color: "text-teal-400", 
    glow: "group-hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]" 
  },
];

export default function Stats() {
  return (
    <section id="stats" className="z-10 w-full max-w-7xl py-24 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statData.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1,
              ease: [0, 0.71, 0.2, 1.01] 
            }}
            viewport={{ once: true }}
            className={`group relative bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-500 hover:bg-white/[0.06] hover:border-white/20 ${stat.glow}`}
          >
            {/* Animated Icon Container */}
            <div className="relative mb-4">
              <div className={`absolute inset-0 blur-xl opacity-20 ${stat.color} group-hover:opacity-40 transition-opacity`} />
              <stat.icon className={`relative w-10 h-10 ${stat.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`} />
            </div>

            {/* Stat Values */}
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">
                {stat.value}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">
                {stat.label}
              </p>
            </div>

            {/* Hidden Detail Tooltip (Reveals on Hover) */}
            <motion.span 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest whitespace-nowrap z-20"
            >
              {stat.detail}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}