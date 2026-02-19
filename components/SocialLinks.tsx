"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, Award } from "lucide-react";

const links = [
  { icon: Github, href: "https://github.com/Kunjsoni2505", color: "hover:text-white" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kunj-soni-9608512a1", color: "hover:text-blue-400" },
  { icon: Mail, href: "mailto:kunjansoni169@gmail.com", color: "hover:text-red-400" },
  { icon: Code2, href: "https://leetcode.com/u/kunj25/", color: "hover:text-yellow-500" },
  { icon: Award, href: "https://www.hackerrank.com/profile/kunjansoni169", color: "hover:text-green-500" },
];

export default function SocialLinks() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-6 px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
      >
        {links.map((link, i) => (
          <a 
            key={i} 
            href={link.href} 
            target="_blank" 
            className={`text-zinc-400 transition-all duration-300 hover:scale-125 ${link.color}`}
          >
            <link.icon size={24} />
          </a>
        ))}
      </motion.div>
    </div>
  );
}