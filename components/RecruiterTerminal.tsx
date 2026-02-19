"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Terminal as TerminalIcon } from "lucide-react";

export default function RecruiterTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAuthorize = () => {
    localStorage.setItem("kunjan_resume_accessed", "true");
    setIsAuthorized(true);
    window.dispatchEvent(new Event("storage")); // Refresh Navbar status
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[100] p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl hover:bg-teal-500/20 transition-all group"
      >
        <Lock className="text-teal-500 group-hover:scale-110 transition-transform" size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg bg-[#030014] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2 text-teal-500">
                  <TerminalIcon size={16} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Secure_Uplink_v3</span>
                </div>
                <button onClick={() => setIsOpen(false)}><X size={18} className="text-zinc-500" /></button>
              </div>

              <div className="p-8 font-mono space-y-6">
                {!isAuthorized ? (
                  <>
                    <p className="text-xs text-zinc-400">&gt; VERIFICATION REQUIRED TO ACCESS CONTACT_PROTOCOLS</p>
                    <button 
                      onClick={handleAuthorize}
                      className="w-full py-4 bg-teal-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-teal-400 transition-all"
                    >
                      Authorize_Access
                    </button>
                  </>
                ) : (
                  <div className="space-y-4 text-xs">
                    <p className="text-teal-500">&gt; ACCESS_GRANTED: WELCOME, VERIFIED_RECRUITER</p>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
                      <p><span className="text-zinc-500">EMAIL:</span> kunjsoni2505@gmail.com</p>
                      <p><span className="text-zinc-500">LOCATION:</span> Gwalior, India</p>
                      <p><span className="text-zinc-500">STATUS:</span> Actively Seeking Applied AI Roles</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}