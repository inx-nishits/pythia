"use client";

import { motion } from "framer-motion";
import Button from "@/app/component/Button";
import { Sections } from "@/app/sections";
import { ArrowRight, PlayCircle } from "lucide-react";

function ConversionSection() {
  return (
    <section className="py-16 lg:py-24 px-6 relative overflow-hidden bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div
          className="relative p-8 lg:p-14 rounded-3xl overflow-hidden text-center lg:text-left"
          style={{
            background: "linear-gradient(135deg, #020817 0%, #04245b 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Grid background on dark card */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glow accents */}
          <div
            className="absolute top-0 right-0 w-[50%] h-full pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(16,185,129,0.15) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[40%] h-[60%] pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* ── LEFT: Copy ── */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <span
                  className="text-[9px] font-black uppercase tracking-[0.2em]"
                  style={{ color: "#34d399" }}
                >
                  Conversion Focus
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl lg:text-[3rem] font-black tracking-tight leading-[1.05]"
              >
                <span style={{ color: "#ffffff" }}>Turn checkout</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #34d399, #2dd4bf)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontStyle: "italic",
                  }}
                >
                  conversations
                </span>
                <span style={{ color: "#ffffff" }}> into</span>
                <br />
                <span style={{ color: "#f1f5f9" }}>tomorrow&apos;s wins.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm leading-relaxed font-medium max-w-md mx-auto lg:mx-0"
                style={{ color: "#cbd5e1" }}
              >
                Choose the path that fits your schedule: jump straight into a live
                walkthrough, or watch a short demo first.
              </motion.p>
            </div>

            {/* ── RIGHT: CTAs ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-3 max-w-md mx-auto lg:mx-0 w-full"
            >
              <a
                href="https://calendly.com/pythia/15-minute-demo"
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <Button className="w-full h-12 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 text-sm font-bold shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5">
                  Book a 15-Minute Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>

              <a href={`#${Sections.DemoAssets}`} className="block">
                <Button
                  className="w-full h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2.5 hover:bg-white/10"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f1f5f9",
                  }}
                >
                  <PlayCircle className="w-4 h-4" />
                  Watch a 60-Second Demo
                </Button>
              </a>

              <p
                className="text-[11px] text-center lg:text-left font-medium pt-2"
                style={{ color: "#94a3b8" }}
              >
                No obligation. No pressure. Just a clear look at how Pythia turns
                live counter audio into a daily playbook for your stores.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConversionSection;
