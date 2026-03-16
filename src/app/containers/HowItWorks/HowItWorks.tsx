"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { Zap, Brain, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Capture",
    desc: "Pythia records checkout conversations automatically and securely.",
    icon: <Zap className="w-5 h-5" />,
    color: "emerald"
  },
  {
    number: "02",
    title: "Analyze",
    desc: "AI reviews interactions for sentiment, and patterns in real time.",
    icon: <Brain className="w-5 h-5" />,
    color: "blue"
  },
  {
    number: "03",
    title: "Act",
    desc: "Get insights to improve service, and fix problems fast.",
    icon: <Rocket className="w-5 h-5" />,
    color: "amber"
  }
];

function HowItWorks() {
  return (
    <section 
      id={Sections.HowItWorks} 
      className="py-16 lg:py-24 px-6 bg-slate-50 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
            >
              How it works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              Three steps to <br />
              <span className="text-emerald-500 italic">operational intelligence.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed"
          >
            A seamless transformation from raw counter audio to actionable playbooks.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Background Connector (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.6%] right-[16.6%] h-px bg-slate-200 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative mb-8">
                <div className="w-[104px] h-[104px] rounded-[32px] bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-[#04245b] group-hover:border-[#04245b] group-hover:text-white transition-all duration-500 z-10 relative group-hover:shadow-xl group-hover:scale-110">
                  {step.icon}
                </div>
                {/* Step Number Badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-black text-slate-500 z-20 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {step.number}
                </div>
              </div>
              
              <div className="space-y-3 px-4 max-w-[280px]">
                <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
