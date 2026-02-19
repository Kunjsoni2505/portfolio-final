"use client";
import { motion } from "framer-motion";
import { Sparkles, ShieldAlert, Cpu, Code2 } from "lucide-react";
import ResumeButton from "./ResumeButton";

export default function Hero() {
  return (
    <section className="z-10 flex flex-col items-center justify-center text-center space-y-10 mb-32 pt-16">
      {/* 🛰️ SYSTEM STATUS HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase"
      >
        <Sparkles size={14} className="animate-pulse" /> 
        Verified: MCA Gold Medalist // Mission 2026
      </motion.div>
      
      {/* --- NAME CORE (Restored Style) --- */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-9xl font-black tracking-tighter text-white"
      >
        KUNJAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">SONI</span>
      </motion.h1>

      {/* --- DESCRIPTION --- */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-3xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
      >
        Applied AI Engineer & <span className="text-white font-medium italic underline decoration-teal-500">Gold Medalist</span>. 
        Designing Enterprise Java Architectures and ML-driven Cyber Investigations.
      </motion.p>

      {/* --- CORE SUB-SYSTEMS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        <SubsystemItem 
          icon={Cpu} 
          title="Generative AI" 
          detail="LLMs // RAG // LangChain" 
          delay={0.4} 
        />
        <SubsystemItem 
          icon={Code2} 
          title="Java Fullstack" 
          detail="Spring Boot // Microservices" 
          delay={0.5} 
        />
        <SubsystemItem 
          icon={ShieldAlert} 
          title="Cyber Intel" 
          detail="Digital Forensics // Anomaly ML" 
          delay={0.6} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ResumeButton />
      </motion.div>
    </section>
  );
}

function SubsystemItem({ icon: Icon, title, detail, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 bg-white/[0.03] border border-white/5 rounded-[2.5rem] group hover:border-teal-500/30 transition-all duration-500"
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className="text-zinc-600 group-hover:text-teal-400 transition-colors" size={24} />
        <div>
          <h3 className="text-zinc-200 text-sm font-bold uppercase tracking-widest">{title}</h3>
          <p className="text-zinc-600 text-[10px] font-mono uppercase mt-1 tracking-tight">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}