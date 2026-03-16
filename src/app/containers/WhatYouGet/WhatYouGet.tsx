"use client";

import { motion } from "framer-motion";
import { Trophy, Target, Cpu, Wifi, Sparkles, Layout, ChevronRight } from "lucide-react";
import { Sections } from "@/app/sections";

const features = [
  {
    title: "Performance Rankings",
    description: "Identify top performers instantly with automated scores.",
    icon: <Trophy className="w-5 h-5" />,
    className: "lg:col-span-2 lg:row-span-1",
    visual: (
      <div className="mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black ${i === 1 ? "bg-amber-100 text-amber-600" : "bg-slate-50 text-slate-400"}`}>0{i}</div>
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>Store #{42 + i}</span>
                <span className={i === 1 ? "text-emerald-500" : "text-slate-400"}>{98 - i * i}% Compliance</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  whileInView={{ width: `${100 - i * 15}%` }} 
                  transition={{ duration: 1, delay: i * 0.2 }} 
                  className={`h-full ${i === 1 ? "bg-emerald-500" : "bg-slate-300"}`} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "AI Ticketing Agent",
    description: "Auto-fill requests from natural conversation.",
    icon: <Sparkles className="w-5 h-5" />,
    className: "lg:col-span-1 lg:row-span-1",
    visual: (
      <div className="mt-6 font-mono text-[9px] bg-slate-900 rounded-xl p-3 overflow-hidden border border-slate-800 shadow-xl">
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-slate-500 uppercase tracking-widest text-[7px] font-bold">New Ticket</span>
        </div>
        <div className="space-y-1">
          <p className="text-emerald-400">{"{"}</p>
          <p className="pl-3 text-slate-300">"issue": <span className="text-amber-400">"Cooler leak"</span>,</p>
          <p className="pl-3 text-slate-300">"confidence": 0.98,</p>
          <p className="pl-3 text-slate-300">"status": <span className="text-emerald-400">"Auto-filled"</span></p>
          <p className="text-emerald-400">{"}"}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Coaching Prompts",
    description: "Feedback tied to specific customer interactions.",
    icon: <Target className="w-5 h-5" />,
    className: "lg:col-span-1 lg:row-span-1",
    visual: (
      <div className="mt-6 p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100/60">
        <div className="flex gap-2.5 items-start">
          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-[11px] font-black text-slate-900 leading-tight">Coaching Suggestion</p>
            <p className="text-[10px] text-emerald-800 font-medium leading-normal">"Mention the loyalty program with fuel purchases."</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Quick Insights",
    description: "Condensed digests of every interaction in minutes.",
    icon: <Layout className="w-5 h-5" />,
    className: "lg:col-span-2 lg:row-span-1",
    visual: (
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Sentiment</span>
          <div className="text-lg font-black text-emerald-600">Positive</div>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Risk</span>
          <div className="text-lg font-black text-rose-600">$2,410.00</div>
        </div>
      </div>
    ),
  },
];

function WhatYouGet() {
  return (
    <section
      id={Sections.WhatYouGet}
      className="py-16 lg:py-24 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200"
            >
              <Cpu className="w-3.5 h-3.5 text-slate-900" />
              <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">Product Intelligence</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              The intelligence your stores <br />
              <span className="text-emerald-500 italic">were missing.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed"
          >
            Turn unstructured audio into precise operational playbooks in under 180 seconds.
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-500 flex flex-col justify-between overflow-hidden group ${feature.className}`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center mb-6 text-slate-700 group-hover:bg-[#04245b] group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
              {feature.visual}
              
              {/* Subtle background glow on hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatYouGet;
