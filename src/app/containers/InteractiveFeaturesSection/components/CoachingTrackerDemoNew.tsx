"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Send, 
  CalendarX, 
  SearchCode,
  Wand2,
  Check
} from "lucide-react";
import { openDemoModal } from "@/app/utils/calendly";
import { DEMO_SOURCES } from "@/app/utils/demoSource";
import { trackEvent } from "@/app/utils/gtm";
import AnimatedFoldText from "./AnimatedFoldText";
import PythiaDashboard from "./PythiaDashboard";
import DemoMockupCard from "./DemoMockupCard";

const CTA_LOCATION = "interactive_demo_coaching";

export default function CoachingTrackerDemoNew() {
  const [step, setStep] = useState<number>(0);
  const [showAI, setShowAI] = useState(false);

  const handleReply = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
    }, 2500);
  };

  const handleUsePythia = () => {
    setStep(3);
    setTimeout(() => {
      setShowAI(true);
    }, 1500);
  };

  const handleShowDashboard = () => {
    setStep(4);
  };

  const handleReset = () => {
    setStep(0);
    setShowAI(false);
  };

  const handleBookDemo = () => {
    trackEvent("intelligence_demo_click", {
      section: "interactive_coaching_tracker"
    });  
    openDemoModal({
      ctaLocation: CTA_LOCATION,
      source: DEMO_SOURCES.product,
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* SCENE 1 & 2: The Old Way (Interactive) */}
        {(step === 0 || step === 1 || step === 2) && (
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> The Manual Bottleneck
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                Great insights are useless <span className="text-slate-400 font-medium">if they are forgotten.</span>
              </h3>
              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                Most QA software stops at identifying the problem. They rely on busy managers to manually intervene, schedule reviews, and coach employees.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col items-center lg:items-start w-full"
              >
                <p className="text-sm text-slate-500 mb-4 font-semibold flex items-center justify-center md:justify-start uppercase tracking-wider">
                  <ArrowRight className="w-4 h-4 text-brand-teal mr-2 hidden md:block" /> 
                  Take the role of the manager:
                </p>
                <button 
                  onClick={handleReply}
                  disabled={step > 0}
                  className={`group relative px-6 py-4 bg-white text-slate-800 font-bold rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto
                    ${step > 0 ? "border-brand-teal ring-4 ring-brand-teal/10 pointer-events-none shadow-brand-teal/20" : "border-slate-200 hover:border-brand-teal hover:scale-[1.02] active:scale-95"}
                  `}
                >
                  {step === 0 ? (
                    <>Reply: &quot;I&apos;ll review his performance&quot; <Send className="w-5 h-5 text-slate-400 group-hover:text-brand-teal transition-colors" /></>
                  ) : (
                    <>Sent <Check className="w-5 h-5 text-brand-teal" /></>
                  )}
                </button>
              </motion.div>
            </div>

            {/* UI Mockup */}
            <DemoMockupCard className="pl-3 pt-3 h-[440px] lg:h-[460px] transform md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out w-full">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100 shadow-sm">S</div>
                  <div>
                    <div className="font-bold text-slate-900">Sarah Jenkins</div>
                    <div className="text-sm font-medium text-slate-500">Regional Director</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 flex-1 overflow-hidden p-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-50 text-slate-800 rounded-3xl rounded-tl-sm p-4 lg:p-5 max-w-[90%] border border-slate-100 shadow-sm relative"
                >
                  <p className="text-[13px] lg:text-[15px] leading-relaxed">Hey, I noticed Bob&apos;s greeting compliance dropped by 25% this week. Can you make sure he gets a review?</p>
                  <p className="text-[10px] lg:text-xs text-slate-400 mt-2 lg:mt-3 font-semibold tracking-wide">Today, 9:41 AM</p>
                </motion.div>

                <AnimatePresence>
                  {step > 0 && (
                    <motion.div 
                      key="sent-message"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      className="bg-brand-teal text-white rounded-3xl rounded-br-sm p-4 lg:p-5 max-w-[95%] lg:max-w-[90%] self-end shadow-lg shadow-brand-teal/30 mt-4 relative"
                    >
                      <p className="text-[13px] lg:text-[15px] leading-relaxed font-medium">I&apos;ll review his performance and schedule a meeting with him this week.</p>
                      <p className="text-[10px] lg:text-xs text-teal-100 mt-2 lg:mt-3 text-right font-semibold tracking-wide">Just now</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {step === 2 && (
                  <motion.div 
                    key="failure-alert"
                    initial={{ opacity: 0, y: 20, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, y: 0, backdropFilter: "blur(12px)" }}
                    transition={{ delay: 0.2, type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-2xl border border-white p-6 sm:p-8 rounded-[2rem] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-center z-20 overflow-hidden"
                  >
                    {/* Premium subtle shine/glass reflection */}
                    <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none"></div>

                    <div className="w-12 h-12 bg-slate-50/80 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100/50 relative z-10">
                      <CalendarX className="w-6 h-6 text-slate-400" />
                    </div>
                    
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight relative z-10">30 Days Later.</h4>
                    
                    <div className="space-y-1 mb-6 relative z-10 text-sm">
                      <p className="text-slate-500 font-medium leading-relaxed">The manager got busy.<br/>The review never happened.</p>
                      <p className="text-slate-800 font-bold">Bob&apos;s performance didn&apos;t improve.</p>
                    </div>
                    
                    <button 
                      onClick={handleUsePythia}
                      className="w-full max-w-sm px-6 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white font-bold rounded-xl shadow-xl shadow-brand-teal/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-teal/30 text-base relative z-10"
                    >
                      See How Pythia Fixes This
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </DemoMockupCard>
          </motion.div>
        )}

        {/* SCENE 3: How Pythia Works (AI Generation) */}
        {step === 3 && (
          <motion.div 
            key="scene-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center px-4 py-8 md:p-12 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 tracking-tight">Here is how Pythia works.</h3>
              <p className="text-slate-600 text-base leading-relaxed mx-auto max-w-2xl">
                Instead of waiting for a manual review, Pythia's AI instantly identifies the issue and drafts a targeted micro-coaching tip for the employee.
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto mt-2">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-brand-teal" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">AI Coaching Tip Generated</h4>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative w-full">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-teal rounded-l-2xl"></div>
                  <AnimatedFoldText
                    text={'"Hey Bob, I noticed your greeting speed slowed down during the rush. Take a deep breath between customers, and remember to smile and offer the loyalty card before scanning items!"'}
                    fontSize={18}
                    fontWeight={500}
                    color="#334155"
                    className="leading-relaxed italic"
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showAI && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mt-12"
                >
                  <button 
                    onClick={handleShowDashboard}
                    className="bg-slate-900 text-white hover:bg-slate-800 rounded-2xl px-8 py-4 font-extrabold shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 tracking-wide flex items-center gap-3"
                  >
                    See Dashboard <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

        {/* SCENE 4: The Unified Dashboard */}
        {step === 4 && (
          <motion.div 
            key="scene-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex-1 flex flex-col items-center justify-start overflow-hidden bg-white"
          >
            {/* Unified Universal Dashboard */}
            <PythiaDashboard activeTab="coaching">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-4 md:pb-6 shrink-0">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Coaching Tips History</h4>
                <div className="self-start sm:self-auto flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full font-bold border border-slate-200 shadow-sm">
                  Employee: Bob
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto relative pr-2 pb-10 mt-4 md:mt-6">
                
                {/* Tip 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-50/50 p-4 lg:p-6 rounded-2xl border border-brand-teal/30 shadow-md flex items-start gap-3 lg:gap-5 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-teal"></div>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white flex items-center justify-center shrink-0 border border-brand-teal/20 shadow-sm">
                    <Wand2 className="w-5 h-5 lg:w-6 lg:h-6 text-brand-teal" />
                  </div>
                  <div className="flex-1 pt-0.5 lg:pt-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                      <h5 className="font-bold text-slate-900 text-base lg:text-lg">Greeting Protocol</h5>
                      <span className="text-[10px] lg:text-xs font-bold text-brand-teal uppercase tracking-wider">Just now</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium text-xs sm:text-sm lg:text-base">"Hey Bob, I noticed your greeting speed slowed down during the rush. Take a deep breath between customers, and remember to smile and offer the loyalty card before scanning items!"</p>
                  </div>
                </motion.div>

                {/* Tip 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3 lg:gap-5"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Wand2 className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                  </div>
                  <div className="flex-1 pt-0.5 lg:pt-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                      <h5 className="font-bold text-slate-900 text-base lg:text-lg">Upsell Opportunity</h5>
                      <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider">Monday, 2:14 PM</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium text-xs sm:text-sm lg:text-base">"Great job moving the line! Don't forget to ask if they want to add a beverage to their meal combo."</p>
                  </div>
                </motion.div>

                {/* Tip 3 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-4 lg:p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3 lg:gap-5"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <Wand2 className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
                  </div>
                  <div className="flex-1 pt-0.5 lg:pt-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
                      <h5 className="font-bold text-slate-900 text-base lg:text-lg">Shift Transition</h5>
                      <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider">Sunday, 11:00 AM</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium text-xs sm:text-sm lg:text-base">"Make sure your drawer is fully counted before handing off to Sarah."</p>
                  </div>
                </motion.div>

              </div>
            </PythiaDashboard>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
