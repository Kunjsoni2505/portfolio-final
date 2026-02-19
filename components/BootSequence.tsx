"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING KUNJAN_OS_v3.0.4...",
  "CHECKING HARDWARE_ACCELERATION... ENABLED",
  "ESTABLISHING NEURAL_UPLINK... OK",
  "VERIFYING ACADEMIC_CREDENTIALS: MCA_GOLD_MEDALIST...", //
  "STATUS: RANK_1_VERIFIED",
  "LOADING PROJECT_FLEET [13_MODULES_DETECTED]...", //
  "INTEGRATING TECHORI_NETWORK_PROTOCOLS...", //
  "SYNCING SAANVI_INNOVATIONS_DATASET...", //
  "SYSTEM_STATUS: ALL_SYSTEMS_GO",
  "WELCOME, USER_ACCESS_GRANTED."
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 150); // Speed of the boot log
      return () => clearTimeout(timeout);
    } else {
      // Hold the final "Ready" screen for a moment
      const finalTimeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentIndex, onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[200] bg-[#02010a] flex items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-lg space-y-1">
        <AnimatePresence>
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] md:text-xs flex gap-3"
            >
              <span className="text-zinc-700">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === BOOT_LOGS.length - 1 ? "text-teal-400 font-bold" : "text-zinc-400"}>
                {i === currentIndex - 1 ? "> " : "  "} {log}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Cursor Blink */}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-teal-500 ml-10"
        />
      </div>

      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </motion.div>
  );
}