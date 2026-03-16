"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, Key, EyeOff } from "lucide-react";

const guards = [
  {
    title: "Privacy First Architecture",
    desc: "All audio is processed locally on the device. No customer Voice or PII is ever transmitted to the cloud.",
    icon: <EyeOff className="w-5 h-5" />
  },
  {
    title: "Enterprise Encryption",
    desc: "BIPA and SOC 2 Type II compliant. Enterprise-grade encryption at rest and in transit.",
    icon: <Lock className="w-5 h-5" />
  },
  {
    title: "Edge Processing",
    desc: "Our hardware runs local AI models so data stays where it was born—in your store.",
    icon: <Server className="w-5 h-5" />
  },
  {
    title: "Access Control",
    desc: "Strict IAM protocols and role-based access to ensure data is only seen by authorized eyes.",
    icon: <Key className="w-5 h-5" />
  }
];

function PrivacySection() {
  return (
    <section className="py-16 lg:py-24 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-200/20 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#04245b] text-white shadow-xl shadow-[#04245b]/10"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em]">Security First</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              Infrastructure you <br />
              <span className="text-slate-500 italic">can trust.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 max-w-[320px]"
          >
            {["BIPA Compliant", "SOC 2 Type II", "No PII Stored", "GDPR", "CCPA"].map((badge, i) => (
              <span key={i} className="px-3 py-1.5 bg-white rounded-full border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guards.map((guard, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#04245b] transition-all duration-500 flex flex-col gap-5 min-h-[220px] relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-[#04245b] group-hover:border-[#04245b] group-hover:text-emerald-400 transition-colors duration-300 relative z-10">
                {guard.icon}
              </div>
              <div className="space-y-2 relative z-10">
                <h3 className="text-[17px] font-black text-slate-950 tracking-tight group-hover:text-[#04245b] transition-colors">{guard.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{guard.desc}</p>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-slate-100 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrivacySection;
