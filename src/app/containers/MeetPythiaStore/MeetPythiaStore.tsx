"use client";

import { motion } from "framer-motion";
import { Headphones, Brain, Wifi, ShieldCheck, Cpu, Zap } from "lucide-react";
import { Sections } from "@/app/sections";
import Image from "next/image";

const specs = [
  { icon: <Wifi className="w-4 h-4" />, label: "Plug & Play", desc: "No wiring — just Wi-Fi" },
  { icon: <ShieldCheck className="w-4 h-4" />, label: "On-Device", desc: "Private, secure processing" },
  { icon: <Zap className="w-4 h-4" />, label: "<800ms", desc: "Real-time latency" },
  { icon: <Cpu className="w-4 h-4" />, label: "Edge AI", desc: "Works without cloud" },
];

function MeetPythiaStore() {
  return (
    <section
      id={Sections.MeetPythiaStore}
      className="py-16 lg:py-20 px-6 bg-slate-50 border-y border-slate-100/60 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Copy + specs ── */}
          <div className="order-1 space-y-6">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Edge AI Technology
                </p>
                <p className="text-sm font-bold text-slate-800">Real-Time Intelligence</p>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-black leading-[1.1] tracking-tight text-slate-900"
            >
              The small device<br />
              <span className="text-emerald-500 italic font-bold">
                with big intelligence.
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base text-slate-500 leading-relaxed font-medium max-w-md"
            >
              Pythia lives at the point of sale. It captures checkout conversations,
              processes them instantly with edge AI, and delivers actionable
              recommendations directly to your management dashboard.
            </motion.p>

            {/* Spec chips — 2×2 grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="grid grid-cols-2 gap-3"
            >
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    {spec.icon}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{spec.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium leading-none">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dashboard image ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 relative"
          >
            {/* Glow behind image */}
            <div className="absolute -inset-3 bg-emerald-300/15 blur-3xl rounded-3xl -z-10" />

            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-[0_20px_56px_-12px_rgba(0,0,0,0.12)]">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200/70">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="max-w-[180px] mx-auto bg-white border border-slate-200 rounded px-2.5 py-0.5 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-[9px] text-slate-400 font-mono truncate">
                      app.pythiascorecard.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/9] bg-slate-100">
                <Image
                  src="https://www.pythiascorecard.com/desktop-meet-pythia-store.webp"
                  alt="Pythia Intelligence Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default MeetPythiaStore;
