"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { UserMinus, TrendingDown, EyeOff, AlertTriangle } from "lucide-react";

const painPoints = [
  {
    icon: <UserMinus className="w-5 h-5" />,
    title: "Silent Turnover",
    desc: "Your best cashier just quit, and you didn't even know they were unhappy.",
    stat: "42% Industry average",
    pill: "bg-rose-500/20 border-rose-500/30 text-rose-300",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-300",
    border: "hover:border-rose-500/40",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    title: "Missed Upsells",
    desc: "67% of missed upsells happen because managers never hear about them.",
    stat: "$2k+ Leakage per shift",
    pill: "bg-amber-500/20 border-amber-500/30 text-amber-300",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-300",
    border: "hover:border-amber-500/40",
  },
  {
    icon: <EyeOff className="w-5 h-5" />,
    title: "Dark Operations",
    desc: "The moments that hurt your business most are the ones no one tells you about.",
    stat: "Zero visibility today",
    pill: "bg-sky-500/20 border-sky-500/30 text-sky-300",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-300",
    border: "hover:border-sky-500/40",
  },
];

export default function RetailSection() {
  return (
    <section
      id={Sections.WhyItMatters}
      className="relative py-16 lg:py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0f172a 50%, #020817 100%)" }}
    >
      {/* ── Grid background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Visible crossed grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
        {/* Green glow top-left */}
        <div className="absolute -top-40 -left-20 w-[500px] h-[300px] rounded-full bg-emerald-600/15 blur-[120px]" />
        {/* Indigo glow bottom-right */}
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        {/* Rose accent */}
        <div className="absolute top-[30%] right-[15%] w-[250px] h-[200px] rounded-full bg-rose-600/8 blur-[80px]" />
      </div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Headline block ── */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">
                Growth Stagnation Alert
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.05] tracking-tight">
                <span className="text-white">Your stores are </span>
                <span className="text-white">leaking money.</span>
                <br />
                <span
                  className="font-black italic"
                  style={{
                    background: "linear-gradient(90deg, #34d399, #2dd4bf)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  You just can't hear it.
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm leading-relaxed font-medium max-w-lg"
              style={{ color: "#cbd5e1" }}
            >
              Management can't be everywhere. A frustrated customer walks out.
              A staff member burns out. These moments are invisible to traditional
              retail dashboards — until they hit the P&amp;L.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Pythia makes the invisible visible
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Pain-point cards ── */}
          <div className="grid gap-3">
            {painPoints.map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className={`group p-5 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm ${pt.border} transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${pt.iconBg} ${pt.iconColor}`}>
                    {pt.icon}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3
                        className="text-[15px] font-black"
                        style={{ color: "#f1f5f9" }}
                      >
                        {pt.title}
                      </h3>
                      <span className={`shrink-0 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${pt.pill}`}>
                        {pt.stat}
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-relaxed font-medium"
                      style={{ color: "#94a3b8" }}
                    >
                      {pt.desc}
                    </p>
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
