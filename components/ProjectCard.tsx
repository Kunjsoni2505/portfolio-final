"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Activity, Cpu, Box } from "lucide-react";
import ProjectModal from "./ProjectModal";

export default function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 🛠️ CALIBRATED 3D TILT PHYSICS ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Stiffness increased for a "heavy" hardware feel
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Corrected coordinate mapping for centered tilt
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0); 
    y.set(0);
  };

  return (
    <>
      <motion.div
        ref={ref}
        layoutId={`card-${project.id}`} // 🛰️ SHARED ELEMENT TRANSITION KEY
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsModalOpen(true)}
        style={{ 
          perspective: "1200px", // Adds depth to the tilt
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group relative min-h-[350px] flex flex-col bg-[#030014]/40 backdrop-blur-md border border-white/5 rounded-[32px] hover:border-teal-500/30 transition-colors duration-500 cursor-none overflow-hidden"
      >
        {/* --- 1. THE RADAR SCANNER (Top Visual) --- */}
        <div className="relative h-36 bg-teal-500/[0.02] overflow-hidden border-b border-white/5">
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
          
          <motion.div 
            animate={hovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Animated Radar Rings */}
            <div className="w-56 h-56 border border-teal-500/5 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border border-teal-500/10 rounded-full flex items-center justify-center animate-pulse">
                <Box className="text-teal-500/20 w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${project.liveLink ? "bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)] animate-pulse" : "bg-zinc-700"}`} />
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              {project.liveLink ? "Module_Active" : "Archive_Static"}
            </span>
          </div>
        </div>

        {/* --- 2. THE CORE DATA CONTENT --- */}
        <div className="p-8 flex-1 flex flex-col" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-zinc-100 uppercase tracking-tight group-hover:text-teal-400 transition-colors">
              {project.title}
            </h3>
            {project.stars > 0 && (
              <div className="flex items-center gap-1 text-[10px] text-yellow-500/80 font-mono bg-yellow-500/5 px-2 py-0.5 rounded-full border border-yellow-500/10">
                <span>★</span> {project.stars}
              </div>
            )}
          </div>

          <p className="text-zinc-500 text-[11px] leading-relaxed mb-6 line-clamp-2 font-medium italic">
            {project.description || "Sophisticated backend architecture designed for modular scalability and high-concurrency data processing."}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.topics?.slice(0, 3).map((topic: string) => (
              <span key={topic} className="text-[9px] font-bold tracking-widest uppercase text-teal-500/60 bg-teal-500/[0.03] px-3 py-1 rounded-sm border border-teal-500/10">
                {topic}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
            <div className="flex gap-4 text-zinc-600">
              <Github size={14} className="group-hover:text-white transition-colors" />
              {project.liveLink && <ExternalLink size={14} className="group-hover:text-white transition-colors" />}
            </div>
            <span className="text-[8px] font-mono text-teal-500/80 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all uppercase tracking-[0.2em]">
              Launch_Diagnostics &gt;
            </span>
          </div>
        </div>

        {/* --- ⚡ HOVER GLOW EFFECT --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>

      {/* --- 3. MODAL UPLINK --- */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal project={project} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}