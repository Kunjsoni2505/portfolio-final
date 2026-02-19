"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const EXPERIENCES = [
  {
    title: "Software Development Intern",
    company: "Techori IT Division",
    period: "June 2025 – August 2025",
    location: "Remote",
    description: [
      "Engineered backend microservices using FastAPI and Django.",
      "Optimized database queries in PostgreSQL, reducing latency by 30%.",
      "Collaborated on AI-driven system architecture designs."
    ]
  },
  {
    title: "Data Science Intern",
    company: "Symposium on Data Analytics & Smart Computing",
    period: "March 2025 – April 2025",
    location: "Gwalior, India",
    description: [
      "Contributed to research design and predictive modeling for academic performance analytics.",
      "Applied preprocessing, feature selection, and algorithm testing for interpretable results.",
      "Supported research publications with model insights and performance evaluation using SHAP/LIME."
    ]
  },
  {
    title: "Data Science Intern",
    company: "Saanvi Innovations",
    period: "June 2024 – August 2024",
    location: "Hybrid",
    description: [
      "Developed ML models for sentiment intelligence and trend analysis.",
      "Processed large datasets using Python and Scikit-learn.",
      "Integrated AI models into a real-time web dashboard."
    ]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative w-full max-w-5xl mx-auto py-32 px-6">
      <h2 className="text-5xl font-black text-white mb-20 text-left tracking-tighter uppercase">
        Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Log</span>
      </h2>

      {/* The Scroll-Triggered Laser Beam */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-10 top-48 w-[2px] h-[75%] bg-gradient-to-b from-teal-500 via-purple-500 to-transparent origin-top hidden md:block shadow-[0_0_15px_rgba(45,212,191,0.5)]"
      />

      <div className="space-y-24">
        {EXPERIENCES.map((exp, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex gap-12 group relative"
          >
            {/* Node Dot */}
            <div className="hidden md:flex flex-col items-center mt-2">
              <div className="w-5 h-5 rounded-full border-2 border-teal-500 bg-[#030014] group-hover:scale-150 group-hover:bg-teal-500 transition-all duration-300 z-10 shadow-[0_0_10px_#2dd4bf]" />
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md flex-1 hover:border-teal-500/30 transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors uppercase tracking-tight">{exp.title}</h3>
                  <p className="text-teal-500 font-medium italic">{exp.company} <span className="text-zinc-600">| {exp.location}</span></p>
                </div>
                <span className="text-xs font-mono text-zinc-500 tracking-widest mt-2 md:mt-0 uppercase">
                  {exp.period}
                </span>
              </div>
              
              <ul className="space-y-3">
                {exp.description.map((point, i) => (
                  <li key={i} className="text-zinc-400 text-sm leading-relaxed flex gap-3">
                    <span className="text-teal-500/50 mt-1">▹</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}