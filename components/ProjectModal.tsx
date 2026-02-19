"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Activity, Cpu, Server, Database, Code2 } from "lucide-react";
import { useLenis } from "lenis/react"; // 🛰️ BRIDGE TO THE SCROLL ENGINE

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const lenis = useLenis();

  // 🛰️ MODAL SYNC: Freeze the background 3D scene when viewing a project
  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10">
      {/* --- 1. Backdrop Blur --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-zoom-out"
      />

      {/* --- 2. Main Modal Window --- */}
      <motion.div
        layoutId={`card-${project.id}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-6xl h-full max-h-[850px] bg-[#030014] border border-white/10 rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
      >
        {/* --- LEFT: SSH TERMINAL DIAGNOSTICS --- */}
        <div className="lg:w-1/3 bg-black/40 p-8 md:p-12 border-r border-white/5 font-mono overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-teal-500/20" />
            </div>
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Diagnostic_Session</span>
          </div>

          <div className="text-teal-500 text-[10px] mb-12 leading-relaxed opacity-80">
            <p>&gt; ESTABLISHING_SECURE_UPLINK...</p>
            <p>&gt; MAPPING_NEURAL_NODES: SUCCESS</p>
            <p>&gt; FETCHING_REPO_METRICS...</p>
            <p className="animate-pulse">&gt; STREAMING_LIVE_DATA_PACKETS...</p>
          </div>

          <div className="space-y-8">
            <DiagnosticStat icon={Cpu} label="Core_Engine" value={project.language || "System"} />
            <DiagnosticStat icon={Server} label="System_Arch" value="Cloud Native" />
            <DiagnosticStat icon={Database} label="Data_Layer" value="Distributed" />
            <DiagnosticStat icon={Activity} label="Status" value="Production" color="text-emerald-500" />
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
            <p className="text-[10px] text-zinc-600 mb-6 uppercase font-bold tracking-[0.2em]">Module_Dependencies</p>
            <div className="flex flex-wrap gap-2">
              {project.topics?.map((topic: string) => (
                <span key={topic} className="px-2 py-1 bg-teal-500/5 border border-teal-500/20 rounded text-[9px] text-teal-400/80 uppercase">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT: PROJECT CONTENT --- */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-between overflow-y-auto custom-scrollbar bg-gradient-to-br from-black to-[#050505]">
          <div>
            <div className="flex justify-between items-start mb-12">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                  {project.title}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-teal-500 to-transparent" />
              </div>
              <button 
                onClick={onClose}
                className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all group"
              >
                <X className="text-zinc-500 group-hover:text-white" size={24} />
              </button>
            </div>

            <div className="space-y-8 max-w-2xl">
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                {project.description || "A high-performance technical implementation focused on modularity and system efficiency."}
              </p>
              
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase mb-2 italic">Technical Goal</h4>
                  <p className="text-sm text-zinc-500">Optimization of model inference and data pipeline scalability.</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase mb-2 italic">System Impact</h4>
                  <p className="text-sm text-zinc-500">Reduced processing latency and improved system reliability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <a 
              href={project.githubLink} 
              target="_blank" 
              className="flex-1 flex items-center justify-center gap-3 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-teal-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-teal-500/20"
            >
              <Github size={18} /> Sync_Source_Code
            </a>
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                className="flex-1 flex items-center justify-center gap-3 py-5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/5 transition-all"
              >
                <ExternalLink size={18} /> Access_Live_Module
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DiagnosticStat({ icon: Icon, label, value, color = "text-white" }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white/5 rounded-2xl text-teal-500/50 group-hover:text-teal-400 transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] uppercase text-zinc-600 font-bold tracking-tighter">{label}</p>
        <p className={`text-md font-bold tracking-tight ${color}`}>{value}</p>
      </div>
    </div>
  );
}