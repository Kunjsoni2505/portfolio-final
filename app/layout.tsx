import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// --- CORE SYSTEM IMPORTS ---
import StarCanvas from "@/components/StarCanvas";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor"; // 🛰️ ADDED GLOBAL RETICLE

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- UPDATED PROFESSIONAL METADATA ---
export const metadata: Metadata = {
  title: "Kunjan Soni | Applied AI Engineer & Gold Medalist",
  description: "Portfolio of Kunjan Soni: MCA Rank 1 & Gold Medalist specializing in Generative AI, Enterprise Java Architectures, and Cyber-Investigative ML.",
  keywords: [
    "Kunjan Soni", 
    "Applied AI Engineer", 
    "MCA Gold Medalist", 
    "Java Enterprise Architect", 
    "Cyber Intelligence ML", 
    "ITM University Gwalior", 
    "Techori Intern", 
    "Saanvi Innovations"
  ],
  authors: [{ name: "Kunjan Soni" }],
  creator: "Kunjan Soni",
  openGraph: {
    title: "Kunjan Soni | AI Engineering Command Center",
    description: "Verified: MCA Gold Medalist building production-grade AI and Enterprise Backend Systems.",
    url: "https://kunjan-soni.vercel.app", 
    siteName: "Kunjan Soni Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Kunjan Soni Portfolio Diagnostic Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunjan Soni | Applied AI Engineer",
    description: "Rank 1 MCA Graduate & Gold Medalist. Specializing in Scalable AI & Security.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white selection:bg-teal-500/30 overflow-x-hidden`}
      > 
        {/* 🛰️ GLOBAL HUD ELEMENTS */}
        <CustomCursor /> 

        <SmoothScroll>
          {/* Background is fixed and sits behind all content */}
          <StarCanvas />
          
          {/* 🛰️ CORE CONTENT LAYER: Transparent for Eclipse Engine visibility */}
          <div className="relative z-10 bg-transparent">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}