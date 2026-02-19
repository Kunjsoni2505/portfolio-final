"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getGithubRepos } from "@/lib/getGithubRepos";
import { getLeetCodeStats } from "@/lib/getLeetCodeStats";

// --- CORE SYSTEM COMPONENTS ---
import Navbar from "@/components/Navbar"; 
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CodingStats from "@/components/CodingStats";
import TechConstellation from "@/components/TechConstellation";
import Workshops from "@/components/Workshops";
import Experience from "@/components/Experience";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import BootSequence from "@/components/BootSequence";

// --- HUD & ACCESSIBILITY MODULES ---
import CustomCursor from "@/components/CustomCursor";
import MobileNav from "@/components/MobileNav";
import RecruiterTerminal from "@/components/RecruiterTerminal";
import StarCanvas from "@/components/StarCanvas"; // Essential for the space background

import { ArrowRight } from "lucide-react";

export default function Home() {
  const [isBooted, setIsBooted] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [leetCodeData, setLeetCodeData] = useState<any>(null);

  useEffect(() => {
    async function initSystem() {
      try {
        const [projectsData, leetData] = await Promise.all([
          getGithubRepos(),
          getLeetCodeStats("kunj25")
        ]);
        setProjects(projectsData);
        setLeetCodeData(leetData);
      } catch (error) {
        console.error("System_Error: Data uplink failed", error);
      }
    }
    initSystem();
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center px-6 py-24 sm:px-16 overflow-hidden">
      {/* 🛰️ GLOBAL OVERLAYS (Independent of Boot State) */}
      <StarCanvas />
      <CustomCursor />

      {/* --- PHASE 1: BOOT SEQUENCE --- */}
      <AnimatePresence mode="wait">
        {!isBooted && (
          <BootSequence onComplete={() => setIsBooted(true)} />
        )}
      </AnimatePresence>

      {/* --- PHASE 2: CORE INTERFACE --- */}
      {isBooted && (
        <>
          {/* 🛰️ NAVIGATION & HANDSHAKE MODULES */}
          <Navbar />
          <MobileNav />
          <RecruiterTerminal />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full flex flex-col items-center relative z-10"
          >
            {/* 🌑 CORE IDENTITY */}
            <section id="hero" className="w-full flex justify-center">
              <Hero />
            </section>

            {/* 🌑 INTEL STATS */}
            <section id="stats" className="w-full flex justify-center">
              <Stats />
            </section>

            {/* 🌑 CODING METRICS */}
            <CodingStats stats={leetCodeData} />

            {/* 🌑 NEURAL ARCHITECTURE */}
            <section id="skills" className="z-10 w-full mb-32">
              <TechConstellation />
            </section>

            {/* 🌑 NEURAL UPGRADES (Workshops) */}
            <section id="workshops" className="z-10 w-full mb-32">
              <Workshops />
            </section>

            {/* 🌑 MISSION LOG (Experience) */}
            <section id="experience" className="z-10 w-full mb-32">
              <Experience />
            </section>

            {/* 🌑 PROJECT FLEET [13 MODULES] */}
            <section id="projects" className="z-10 w-full max-w-7xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-white/10 pb-8">
                <div>
                  <h2 className="text-5xl font-bold text-white tracking-tight italic uppercase">Project Fleet</h2>
                  <p className="text-zinc-500 mt-2 text-lg italic uppercase tracking-widest text-[10px]">
                    Autonomous synchronization with GitHub active // 13_MODULES_LIVE
                  </p>
                </div>
                <a 
                  href="https://github.com/Kunjsoni2505" 
                  target="_blank" 
                  className="flex items-center gap-2 text-sm font-bold text-teal-500 hover:text-teal-400 transition-colors group"
                >
                  VIEW ALL MODULES <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))
                ) : (
                  <div className="col-span-full py-20 flex justify-center">
                     <p className="text-zinc-600 font-mono text-xs animate-pulse tracking-[0.3em]">
                      &gt; SECURE_CONNECTION_RE-ESTABLISHING...
                    </p>
                  </div>
                )}
              </div>
            </section>

            <SocialLinks />

            <footer className="z-10 mt-40 pb-10 flex flex-col items-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
              <p className="text-zinc-600 text-[8px] font-mono tracking-[0.5em] uppercase text-center">
                End of Transmission // Kunjan Soni // 2026
              </p>
            </footer>
          </motion.div>
        </>
      )}
    </main>
  );
}