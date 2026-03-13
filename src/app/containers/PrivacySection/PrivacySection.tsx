"use client";

import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

const guards = [
  {
    title: "Privacy First Architecture",
    desc: "All audio is processed locally on the device. No customer Voice or PII is ever transmitted to the cloud.",
    icon: <Shield className="w-5 h-5 text-brand-teal" />
  },
  {
    title: "Security & Compliance",
    desc: "BIPA and SOC 2 Type II compliant. Enterprise-grade encryption at rest and in transit.",
    icon: <Lock className="w-5 h-5 text-brand-teal" />
  }
];

function PrivacySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-[#fafafa] overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto text-center mb-12 lg:mb-16 space-y-4 w-full min-w-0">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold text-slate-400 uppercase tracking-widest"
        >
          Trust & Compliance
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#0F172A] text-[36px] lg:text-[52px] font-extrabold tracking-tighter"
        >
          Security that scales.
        </motion.h2>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            BIPA Compliant
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            SOC 2 Type II
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            No Customer PII Stored
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            GDPR
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            CCPA
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
        {guards.map((guard, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-white border border-slate-200 rounded-[28px] hover:border-brand-teal/20 hover:shadow-[0_24px_52px_rgba(15,23,42,0.08)] transition-all duration-300 overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/5 flex items-center justify-center shrink-0">
                {guard.icon}
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{guard.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{guard.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PrivacySection;
