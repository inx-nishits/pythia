"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import React, { MouseEvent, useState } from "react";

function CardSpotlight({ children, theme, className }: { children: React.ReactNode, theme: "teal" | "navy", className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isTeal = theme === "teal";
  const glowColor = isTeal ? "rgba(45, 212, 191, 0.15)" : "rgba(59, 130, 246, 0.15)"; // Tailwind teal-400 and blue-500 approx

  return (
    <div
      className={`relative h-full w-full group/card ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover/card:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  );
}

const cards = [
  {
    title: "Pythia 1.0",
    description: "The classic Pythia Scorecard experience you know and love.",
    href: "https://app.pythiascorecard.com",
    icon: LayoutDashboard,
    isNew: false,
    theme: "teal" as const
  },
  {
    title: "Pythia 2.0",
    description: "The next-generation AI platform with enhanced capabilities.",
    href: "https://dev.d1epsbs0ekh6x3.amplifyapp.com/",
    icon: Sparkles,
    isNew: true,
    theme: "navy" as const
  }
];

export default function LoginClient() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl relative z-10">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight">
          Welcome back
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          Select which version of Pythia you want to log into.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          const isTeal = card.theme === "teal";
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 + 0.2, ease: "easeOut" }}
            >
              <motion.div
                onClick={() => {
                  window.history.replaceState(null, '', '/login/');
                  window.location.href = card.href;
                }}
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`block relative h-full cursor-pointer`}
              >
                <CardSpotlight 
                  theme={card.theme} 
                  className={`flex flex-col items-start p-8 sm:p-10 rounded-[32px] border-2 border-slate-200 bg-white/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${isTeal ? 'hover:border-brand-teal' : 'hover:border-brand-navy'} hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.15)]`}
                >
                  {/* Decorative top border */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent ${isTeal ? 'via-brand-teal/50' : 'via-brand-navy/50'} to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10`} />
                  
                  <motion.div 
                    animate={{
                      x: hoveredIndex === idx ? 0 : -10,
                      opacity: hoveredIndex === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-0 right-0 p-8 ${isTeal ? 'text-brand-teal' : 'text-brand-navy'} z-10`}
                  >
                    <ArrowRight className="w-7 h-7" />
                  </motion.div>

                  <motion.div 
                    animate={{
                      backgroundColor: hoveredIndex === idx ? (isTeal ? 'rgba(20, 184, 166, 0.15)' : 'rgba(30, 58, 138, 0.15)') : 'rgba(248, 250, 252, 1)',
                      color: hoveredIndex === idx ? (isTeal ? '#14B8A6' : '#1E3A8A') : '#64748B',
                      rotate: hoveredIndex === idx ? (idx % 2 === 0 ? 5 : -5) : 0,
                      scale: hoveredIndex === idx ? 1.1 : 1,
                    }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 relative z-10"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                  
                  <div className="flex items-center gap-3 mb-3 relative z-10">
                    <h2 className="text-2xl font-bold text-[#0F172A]">{card.title}</h2>
                    {card.isNew && (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="px-2.5 py-1 bg-brand-navy text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm"
                      >
                        New
                      </motion.span>
                    )}
                  </div>
                  <p className="text-slate-500 text-base leading-relaxed relative z-10">
                    {card.description}
                  </p>
                </CardSpotlight>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
