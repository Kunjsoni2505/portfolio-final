"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth spring physics for the trailing effect
  const springConfig = { stiffness: 300, damping: 30 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("button, a, .cursor-pointer"));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      className="fixed top-0 left-0 pointer-events-none z-[999] hidden lg:block"
    >
      {/* Outer Ring */}
      <motion.div
        animate={{ width: isHovering ? 64 : 32, height: isHovering ? 64 : 32, opacity: isHovering ? 0.8 : 0.4 }}
        className="border border-teal-500 rounded-full flex items-center justify-center transition-all duration-300"
      >
        {/* Inner Dot */}
        <div className="w-1 h-1 bg-teal-500 rounded-full" />
      </motion.div>
      
      {/* Diagnostic Crosshairs (Optional Aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-teal-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-teal-400" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-teal-400" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-teal-400" />
      </div>
    </motion.div>
  );
}