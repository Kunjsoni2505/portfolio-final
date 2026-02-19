"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileCode, CheckCircle2, Loader2 } from "lucide-react";

export default function ResumeButton() {
  const [status, setStatus] = useState<"idle" | "downloading" | "complete">("idle");

  const handleDownload = () => {
    setStatus("downloading");
    
    // Simulate high-speed data stream
    setTimeout(() => {
      setStatus("complete");
      // Replace with your actual resume link (e.g., from public folder or Google Drive)
      window.open("/Kunjan_Soni_Resume.pdf", "_blank");
      
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div className="relative group">
      <motion.button
        onClick={handleDownload}
        disabled={status !== "idle"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-sm tracking-widest uppercase overflow-hidden transition-all duration-500 border ${
          status === "complete" 
            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400" 
            : "border-teal-500/50 bg-teal-500/5 text-teal-400 hover:bg-teal-500/20"
        }`}
      >
        {/* Animated Background Stream */}
        <AnimatePresence>
          {status === "downloading" && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"
            />
          )}
        </AnimatePresence>

        {/* Button Content */}
        <div className="relative z-10 flex items-center gap-3">
          {status === "idle" && (
            <>
              <Download size={18} className="group-hover:animate-bounce" />
              <span>Download_Resume.exe</span>
            </>
          )}
          {status === "downloading" && (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Streaming_Data...</span>
            </>
          )}
          {status === "complete" && (
            <>
              <CheckCircle2 size={18} />
              <span>Transfer_Complete</span>
            </>
          )}
        </div>
      </motion.button>

      {/* Futuristic Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-zinc-600 font-mono whitespace-nowrap">
        Protocol: SECURE_PDF_TRANSFER_V2
      </div>
    </div>
  );
}