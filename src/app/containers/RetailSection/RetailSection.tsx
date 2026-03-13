"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { AlertCircle, UserMinus, TrendingDown, EyeOff } from "lucide-react";

function RetailSection() {
  const painPoints = [
    {
      icon: <UserMinus className="w-5 h-5 text-rose-400" />,
      title: "Silent Turnover",
      desc: "Your best cashier just quit, and you didn't even know they were unhappy.",
      stat: "42% Industry average"
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-amber-400" />,
      title: "Missed Upsells",
      desc: "67% of missed upsells happen because managers never hear about them.",
      stat: "$2k+ Leakage per shift"
    },
    {
       icon: <EyeOff className="w-5 h-5 text-blue-400" />,
       title: "Dark Ops",
       desc: "The moments that hurt your business most are the ones no one tells you about.",
       stat: "Zero visibility today"
    }
  ];

  return (
    <section
      id={Sections.WhyItMatters}
      className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-[120px] xl:py-[200px] bg-[#0F172A] overflow-hidden min-w-0 w-full"
    >
      {/* Dynamic Grid Background with Glow */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-teal/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full min-w-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 items-start min-w-0">
          
          <div className="flex-1 space-y-6 sm:space-y-8 min-w-0">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/25"
            >
               <AlertCircle className="w-3 h-3 text-brand-teal" />
               <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest leading-relaxed">Efficiency Gap Detected</span>
            </motion.div>
            
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-[28px] sm:text-[36px] lg:text-[52px] xl:text-[68px] leading-[0.95] font-extrabold !text-white tracking-tighter break-words"
            >
              <span className="text-brand-teal">Your stores are leaking money.</span>{" "}
              <span className="text-slate-300 italic font-medium">You just can’t hear it happening.</span>
            </motion.h2>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-slate-200 text-lg lg:text-xl font-medium leading-relaxed max-w-xl"
            >
              It’s not always obvious. A line gets too long. A customer walks out
              frustrated. Your best cashier is burning out. The moments that hurt
              your business most are the ones no one talks about until it’s too late.
            </motion.p>
          </div>

          <div className="flex-1 grid grid-cols-1 gap-6 w-full min-w-0 lg:max-w-md">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 bg-white/[0.03] border border-white/10 rounded-[28px] hover:bg-white/[0.06] transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                       <h3 className="text-lg font-bold !text-white tracking-tight">{point.title}</h3>
                       <span className="text-[10px] font-bold text-slate-300 uppercase leading-relaxed">{point.stat}</span>
                    </div>
                    <p className="text-slate-100 text-sm leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default RetailSection;
