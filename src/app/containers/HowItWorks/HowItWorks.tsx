"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { Zap, Brain, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Capture",
    desc: "Pythia records all customer and staff conversations at the checkout counter, automatically and securely.",
    icon: <Zap className="w-6 h-6 text-brand-coral" />,
    color: "bg-brand-coral/10"
  },
  {
    number: "02",
    title: "Analyze",
    desc: "Our AI reviews each interaction to detect tone, sentiment, feedback, and patterns in real time.",
    icon: <Brain className="w-6 h-6 text-brand-teal" />,
    color: "bg-brand-teal/10"
  },
  {
    number: "03",
    title: "Act",
    desc: "You get insights and recommendations to improve service, support your team, and fix problems fast.",
    icon: <Rocket className="w-6 h-6 text-amber-500" />,
    color: "bg-amber-500/10"
  }
];

function HowItWorks() {
  return (
    <section 
      id={Sections.HowItWorks} 
      className="py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-white overflow-hidden relative min-w-0 w-full"
    >
      <div className="max-w-[1400px] mx-auto relative z-10 w-full min-w-0">
        <div className="text-center mb-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[40px] lg:text-[60px] font-extrabold tracking-tighter"
          >
            How it works
          </motion.h2>
          <p className="text-slate-500 text-lg lg:text-xl font-medium">Low friction. Immediate value.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 relative">
          {/* Connecting Line (Desktop, behind cards) */}
          <div className="hidden lg:block absolute top-[96px] left-[15%] right-[15%] h-[2px] bg-slate-100 -z-10 overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               whileInView={{ x: "0%" }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full w-full bg-gradient-to-r from-brand-coral via-brand-teal to-amber-500 opacity-50"
             />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex-1 flex flex-col items-center text-center group"
            >
              <div className={`w-32 h-32 rounded-[40px] ${step.color} border-2 border-white shadow-xl flex items-center justify-center relative mb-8 group-hover:-translate-y-2 transition-transform duration-500 ring-8 ring-slate-50 group-hover:ring-brand-teal/5`}>
                 <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-sm font-bold text-slate-400">
                    {step.number}
                 </div>
                 <div className="group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                 </div>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-4">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-[300px] text-[15px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
