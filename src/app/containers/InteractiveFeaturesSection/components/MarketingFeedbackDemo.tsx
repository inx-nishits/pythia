"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  TrendingUp,
  MousePointerClick,
  Eye,
  HelpCircle,
  Wand2,
  PieChart,
  Target,
  ShoppingCart,
  Users,
  BarChart3
} from "lucide-react";
import { openDemoModal } from "@/app/utils/calendly";
import { DEMO_SOURCES } from "@/app/utils/demoSource";
import { trackEvent } from "@/app/utils/gtm";
import DemoMockupCard from "./DemoMockupCard";

const CTA_LOCATION = "interactive_demo_marketing";

export default function MarketingFeedbackDemo() {
  const [step, setStep] = useState<number>(0);
  const [isOptimized, setIsOptimized] = useState(false);

  const handleAnalyze = () => {
    setStep(1);
  };

  const handleToggle = () => {
    setIsOptimized(true);
    // Move to Scene 3 automatically after a brief delay
    setTimeout(() => {
      setStep(2);
    }, 1200);
  };

  const handleBookDemo = () => {
    trackEvent("intelligence_demo_click", {
      section: "interactive_marketing_feedback"
    });
    openDemoModal({
      ctaLocation: CTA_LOCATION,
      source: DEMO_SOURCES.product,
    });
  };

  return (
    <div className="w-full h-full min-h-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        
        {/* SCENE 1: The Blind Spot (Ads Dashboard) */}
        {step === 0 && (
          <motion.div 
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 py-8 md:p-8 lg:p-12 max-w-6xl mx-auto"
          >
            {/* Context Text */}
            <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> The Marketing Blind Spot
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                Traffic is up, <span className="text-slate-400 font-medium">but who is walking in?</span>
              </h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                You run local promotions and track foot traffic, but traditional door counters and POS systems can't tell you which age group is actually responding to your marketing.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full sm:w-auto"
              >
                <button 
                  onClick={handleAnalyze}
                  className="group relative px-5 py-3 sm:px-6 sm:py-4 bg-brand-teal text-white text-sm sm:text-base font-bold rounded-2xl overflow-hidden shadow-lg shadow-brand-teal/20 transition-all duration-300 flex items-center justify-center gap-3 w-full hover:-translate-y-0.5 hover:shadow-brand-teal/30"
                >
                  Analyze with Pythia AI
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            {/* UI Mockup (Generic Store Analytics) */}
            <DemoMockupCard className="p-5 sm:p-6 h-[380px] lg:h-[440px] flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100">
                    <BarChart3 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Store Performance</div>
                    <div className="text-xs text-slate-500 font-medium">Last 30 Days</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1"><Users className="w-3 h-3"/> Foot Traffic</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-800">3,240</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1"><ShoppingCart className="w-3 h-3"/> Transactions</div>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-800">1,450</div>
                </div>
              </div>

              {/* The Missing Demographics Piece */}
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-5 flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-dashed flex items-center justify-center mb-3">
                  <HelpCircle className="w-6 h-6 text-slate-400" />
                </div>
                <h5 className="font-bold text-slate-700 text-sm mb-1">Customer Demographics</h5>
                <p className="text-xs text-slate-500 max-w-[200px]">Standard POS systems cannot identify the age or profile of your buyers.</p>
                <div className="mt-3 px-3 py-1 bg-white rounded border border-slate-200 text-[10px] font-bold text-slate-400 shadow-sm uppercase tracking-wider">
                  Unknown
                </div>
              </div>
            </DemoMockupCard>
          </motion.div>
        )}

        {/* SCENE 2: Pythia Analysis & Toggle */}
        {step === 1 && (
          <motion.div 
            key="scene-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 py-8 md:p-8 lg:p-12 max-w-6xl mx-auto"
          >
            <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-brand-teal text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-100 shadow-sm">
                <Wand2 className="w-3 h-3" /> Pythia Insight
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                Gen Z is your <span className="text-brand-teal">true audience.</span>
              </h3>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                Pythia analyzed your physical store traffic and identified that 65% of the people who actually walked in from the promo are Gen Z (18-24).
              </p>
            </div>

            <DemoMockupCard className="p-4 sm:p-6 h-[420px] lg:h-[440px]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 sm:pb-4 mb-4 sm:mb-5">
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-brand-teal"/> In-Store Demographics
                </div>
              </div>
              
              <div className="space-y-5 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-slate-800">Gen Z (18-24)</span>
                    <span className="text-brand-teal font-extrabold">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.3 }} className="bg-brand-teal h-full rounded-full"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-slate-600">Millennials (25-40)</span>
                    <span className="text-slate-500">25%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "25%" }} transition={{ delay: 0.4, duration: 0.8, type: "spring", bounce: 0.3 }} className="bg-slate-400 h-full rounded-full"></motion.div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bold">
                    <span className="text-slate-600">Gen X+ (41+)</span>
                    <span className="text-slate-500">10%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "10%" }} transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.3 }} className="bg-slate-300 h-full rounded-full"></motion.div>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-inner">
                <div className="text-sm font-bold text-slate-900 mb-1">Optimize Ad Targeting</div>
                <p className="text-[11px] sm:text-xs text-slate-500 mb-3 sm:mb-4 leading-relaxed">Focus your digital budget on Gen Z to maximize actual walk-ins.</p>
                <button 
                  onClick={handleToggle}
                  disabled={isOptimized}
                  className={`w-full relative flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${isOptimized ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/20' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-brand-teal/30 shadow-sm'}`}
                >
                  {isOptimized ? 'Targeting Optimized' : 'Enable Gen Z Targeting'}
                  
                  {/* Custom Toggle Switch */}
                  <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 flex items-center shadow-inner ${isOptimized ? 'bg-teal-700' : 'bg-slate-200 border border-slate-300'}`}>
                    <motion.div 
                      layout
                      className="w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: isOptimized ? 20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </button>
              </div>
            </DemoMockupCard>
          </motion.div>
        )}

        {/* SCENE 3: Revenue Chart */}
        {step === 2 && (
          <motion.div 
            key="scene-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center px-4 py-4 md:py-8 max-w-4xl mx-auto"
          >
            <div className="text-center mb-4">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 tracking-tight">Stop wasting ad spend.</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mx-auto max-w-2xl">
                When you shift your marketing dollars to target the people actually walking into your store, your revenue grows instantly.
              </p>
            </div>

            <div className="w-full max-w-3xl mx-auto mt-2 bg-white rounded-[2rem] p-5 md:p-6 border border-slate-100 shadow-2xl relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full filter blur-3xl pointer-events-none"></div>

               <div className="flex justify-between items-end border-b border-slate-100 pb-4 mb-4 relative z-10">
                 <div>
                   <h4 className="text-slate-400 font-bold text-xs uppercase tracking-wider mb-1">Weekly Revenue</h4>
                   <div className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                     $42,500 <span className="text-base md:text-xl text-brand-teal font-bold ml-2 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 align-middle">+34%</span>
                   </div>
                 </div>
               </div>

               <div className="h-32 md:h-40 flex items-end justify-between gap-3 md:gap-5 w-full relative z-10 mt-2">
                 
                 {/* Optimization Marker Line */}
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="absolute h-full w-px border-l-2 border-dashed border-brand-teal/40 left-[57%] -translate-x-1/2 flex flex-col items-center justify-start z-0"
                 >
                   <div className="bg-brand-teal text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap -mt-4 shadow-sm border border-brand-teal">
                     Targeting Enabled
                   </div>
                 </motion.div>

                 {/* Chart Bars */}
                 {[40, 45, 42, 48, 70, 85, 100].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full gap-3 relative z-10">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${val}%` }}
                         transition={{ delay: 0.1 * idx, type: "spring", stiffness: 50, damping: 15 }}
                         className={`w-full rounded-t-xl transition-all duration-500 ${idx >= 4 ? 'bg-brand-teal shadow-[0_0_20px_rgba(16,185,129,0.25)]' : 'bg-slate-200'}`}
                       />
                       <span className="text-[10px] md:text-xs font-bold text-slate-400">Day {idx + 1}</span>
                    </div>
                 ))}
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-6 md:mt-8"
            >
              <button 
                onClick={handleBookDemo}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-2xl px-8 py-3 md:py-4 font-extrabold shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 tracking-wide flex items-center gap-3 text-sm md:text-base"
              >
                Book a Demo <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
