"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Award } from "lucide-react";

export default function CodingStats({ stats }: { stats: any }) {
  // Extracting data and fallback status
  const solved = stats?.totalSolved || 200;
  const easy = stats?.easySolved || 0;
  const medium = stats?.mediumSolved || 0;
  const hard = stats?.hardSolved || 0;
  const isLive = stats?.isLive ?? false; // Detects if API fetch was successful

  return (
    <section className="z-10 w-full max-w-6xl mx-auto py-20 px-6">
      <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[40px] backdrop-blur-xl relative overflow-hidden group">
        
        {/* --- Header with Data Source Tag --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="text-3xl font-black text-white flex items-center gap-4">
            <Target className="text-teal-500 animate-pulse" /> INTELLIGENCE_DASHBOARD
          </h2>

          {/* Glowing Status Tag */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-tighter uppercase transition-colors duration-500 ${
            isLive 
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" 
              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-500"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-yellow-500"}`} />
            {isLive ? "Live Data: LeetCode API" : "Verified: Resume Data"}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LeetCode Live Data */}
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white">LeetCode Stats</h3>
                <p className="text-zinc-500 text-sm font-mono">ID: kunj25</p>
              </div>
              <div className="text-right">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                  {solved}
                </span>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Total Solved</p>
              </div>
            </div>
            
            <div className="space-y-5">
              <StatBar label="Easy" count={easy} total={800} color="bg-emerald-500" />
              <StatBar label="Medium" count={medium} total={1600} color="bg-yellow-500" />
              <StatBar label="Hard" count={hard} total={700} color="bg-rose-500" />
            </div>
          </div>

          {/* HackerRank & Professional Ranking */}
          <div className="flex flex-col justify-center space-y-10 lg:border-l lg:border-white/10 lg:pl-16">
            <div className="relative p-6 bg-teal-500/5 border border-teal-500/20 rounded-3xl">
              <Award className="absolute -top-4 -right-4 text-yellow-500 w-12 h-12" />
              <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mb-2">Verified Achievement</p>
              <h4 className="text-2xl font-bold text-white leading-tight">
                HackerRank Gold Level Coder
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-zinc-600 text-[10px] uppercase font-bold">Academic Rank</p>
                <p className="text-xl font-black text-white italic">MCA Rank 1</p>
                <p className="text-teal-500 text-xs">Gold Medalist</p>
              </div>
              <div className="space-y-1">
                <p className="text-zinc-600 text-[10px] uppercase font-bold">Specialization</p>
                <p className="text-xl font-black text-white">Applied AI</p>
                <p className="text-zinc-500 text-xs">Deep Learning & NLP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBar({ label, count, total, color }: any) {
  const percentage = Math.min((count / (count + 100)) * 100, 100); 
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase">
        <span className="text-zinc-500">{label}</span>
        <span className="text-white font-bold">{count} Solved</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} 
        />
      </div>
    </div>
  );
}