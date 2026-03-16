"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { Calendar, ShieldCheck, Zap, BarChart3, Users } from "lucide-react";
import PythiaForm from "../PythiaForm/PythiaForm";

const trustPills = [
  { icon: <Calendar className="w-3 h-3" />, label: "Under 5 min setup" },
  { icon: <Zap className="w-3 h-3" />, label: "Zero friction API" },
  { icon: <BarChart3 className="w-3 h-3" />, label: "$4K+ ROI / store" },
  { icon: <Users className="w-3 h-3" />, label: "100+ chains" },
];

function HomeContact() {
  return (
    <section
      id={Sections.Contact}
      className="relative py-16 lg:py-24 px-6 bg-[#020817] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#04245b]/30 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[60%] bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="max-w-[1240px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* Left Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Enterprise Ready</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.05]"
              style={{ color: "#ffffff" }}
            >
              Ready to hear what your{" "}
              <br className="hidden lg:block" />
              <span
                style={{
                  background: "linear-gradient(90deg, #34d399, #2dd4bf)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "#34d399", // Fallback
                  backgroundClip: "text",
                  fontStyle: "italic",
                }}
              >
                stores aren&rsquo;t telling you?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium leading-relaxed max-w-sm"
              style={{ color: "#cbd5e1" }}
            >
              Book a walkthrough and see how Pythia helps you catch what&apos;s slipping before it turns into bad reviews or lost revenue.
            </motion.p>

            {/* Trust Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {trustPills.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e2e8f0",
                  }}
                >
                  <span className="text-emerald-400">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow halo behind card */}
            <div className="absolute -inset-4 bg-[#04245b]/20 blur-2xl rounded-3xl" />
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl overflow-hidden border border-slate-200/50">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#04245b] via-emerald-500 to-[#04245b]" />

              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Schedule Your Demo</h3>
                  <p className="text-[13px] text-slate-500 font-medium mt-1">Join 100+ brands using Pythia Intelligence.</p>
                </div>

                <PythiaForm
                  hiddenFields={{ message: false }}
                  submitText="Get Started"
                  submitClassName=""
                  formClassName="flex flex-col gap-4 w-full"
                  requestedDemo={true}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HomeContact;
