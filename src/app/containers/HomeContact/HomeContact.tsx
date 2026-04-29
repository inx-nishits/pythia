"use client";

import { motion } from "framer-motion";
import { Sections } from "@/app/sections";
import { Calendar, ShieldCheck, Zap } from "lucide-react";
import "./HomeContact.css";
import PythiaForm from "../PythiaForm/PythiaForm";

function HomeContact() {
  return (
    <section 
      id={Sections.Contact}
      className="relative px-4 sm:px-6 py-16 sm:py-20 lg:py-[120px] xl:py-[160px] bg-[#0F172A] overflow-hidden min-w-0 w-full"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-[#020617] to-[#020617] opacity-90 pointer-events-none" />
      <div className="absolute top-[-120px] right-[-120px] w-[480px] h-[480px] bg-brand-teal/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-160px] left-[-160px] w-[520px] h-[520px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24 relative z-10 min-w-0">
        
        <div className="flex-1 space-y-8 sm:space-y-10 min-w-0">
          <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/15 border border-brand-teal/25 backdrop-blur-sm"
            >
               <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
               <span className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">Enterprise Ready</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="!text-white text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[56px] font-extrabold leading-[1.05] tracking-tight max-w-xl break-words"
            >
              Ready to hear what your{" "}
              <span className="text-brand-teal italic">stores aren&rsquo;t telling you?</span>
            </motion.h2>
            <p className="text-slate-300 text-lg lg:text-[20px] font-medium leading-relaxed max-w-xl opacity-90">
              Cut turnover by up to 18%. Add up to $4,200 in monthly sales. Both in 6 months. You can’t be in every store at once. For as low as $129/month, Pythia can.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
             <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-teal group-hover:border-brand-teal shadow-lg transition-all duration-300">
                  <Calendar className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors" />
                </div>
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Setup Time</p>
                   <p className="text-[17px] font-bold text-white tracking-tight">Under 5 Minutes</p>
                </div>
             </div>
             <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-teal group-hover:border-brand-teal shadow-lg transition-all duration-300">
                  <Zap className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors" />
                </div>
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Integration</p>
                   <p className="text-[17px] font-bold text-white tracking-tight">Zero Friction API</p>
                </div>
             </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full min-w-0 lg:w-[520px] lg:shrink-0 relative group"
        >
          <div className="absolute -inset-3 bg-brand-teal/18 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="bg-white rounded-[24px] lg:rounded-[28px] p-6 sm:p-7 lg:p-9 shadow-[0_26px_70px_rgba(15,23,42,0.5)] border border-slate-100/60 overflow-hidden relative backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-teal to-brand-coral" />
            
            <div className="mb-10 text-center lg:text-left">
               <h3 className="text-[24px] lg:text-[28px] font-extrabold text-[#0F172A] mb-2 tracking-tight leading-tight">Schedule Your Demo</h3>
               <p className="text-slate-500 text-[14px] lg:text-[15px] font-medium max-w-md">Join 100+ locations using Pythia Intelligence.</p>
            </div>
            
            <PythiaForm
              hiddenFields={{ message: false }}
              submitText="Book My Demo"
              submitClassName="w-full mt-4 py-5 rounded-2xl text-[18px] font-extrabold shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              formClassName="flex flex-col gap-5 w-full"
              requestedDemo={true}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default HomeContact;
