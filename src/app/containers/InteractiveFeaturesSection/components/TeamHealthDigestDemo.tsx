"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  Send, 
  Wand2,
  Check,
  TrendingUp,
  UserX,
  AlertTriangle,
  HeartPulse
} from "lucide-react";
import { openDemoModal } from "@/app/utils/calendly";
import { DEMO_SOURCES } from "@/app/utils/demoSource";
import { trackEvent } from "@/app/utils/gtm";
import AnimatedFoldText from "./AnimatedFoldText";
import PythiaDashboard from "./PythiaDashboard";
import DemoMockupCard from "./DemoMockupCard";

const CTA_LOCATION = "interactive_demo_team_health";

export default function TeamHealthDigestDemo() {
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

  const handleBookDemo = () => {
    trackEvent("intelligence_demo_click", {
      section: "interactive_team_health"
    });
    openDemoModal({
      ctaLocation: CTA_LOCATION,
      source: DEMO_SOURCES.product,
    });
  };

  return (
    <div className="w-full h-full min-h-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        
        {/* SCENE 1 & 2: The Old Way (Interactive) */}
        {(step === 0 || step === 1 || step === 2) && (
          <motion.div 
            key="scene-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center p-8 md:p-12 py-8 md:py-12 max-w-6xl mx-auto"
          >
            {/* Context Text */}
            <div className="flex-1 max-w-lg z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> The Retention Blind Spot
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight">
                Turnover is expensive, <span className="text-slate-400 font-medium">but the signs are subtle.</span>
              </h3>
              <p className="text-slate-600 text-base mb-8 leading-relaxed">
                Most managers only realize an employee is struggling when they hand in their two weeks&apos; notice. By then, it&apos;s too late.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <p className="text-sm text-slate-500 mb-4 font-semibold flex items-center uppercase tracking-wider">
                  <ArrowRight className="w-4 h-4 text-brand-teal mr-2" /> 
                  Take the role of the manager:
                </p>
                <button 
                  onClick={handleReply}
                  disabled={step > 0}
                  className={`group relative px-6 py-4 bg-white text-slate-800 font-bold rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 flex items-center gap-3
                    ${step > 0 ? "border-brand-teal ring-4 ring-brand-teal/10 pointer-events-none shadow-brand-teal/20" : "border-slate-200 hover:border-brand-teal hover:scale-[1.02] active:scale-95"}
                  `}
                >
                  {step === 0 ? (
                    <>Looks fine to me <Send className="w-5 h-5 text-slate-400 group-hover:text-brand-teal transition-colors" /></>
                  ) : (
                    <>Action Logged <Check className="w-5 h-5 text-brand-teal" /></>
                  )}
                </button>
              </motion.div>
            </div>

            {/* UI Mockup (Generic Dashboard) */}
            <DemoMockupCard className="p-6 h-[450px] transform md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <div className="font-bold text-slate-900 text-lg">Team Performance</div>
                  <div className="text-sm font-medium text-slate-500">Current Month</div>
                </div>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1 font-medium">Team Mood</div>
                    <div className="text-xl font-bold text-slate-800 flex items-center gap-1.5"><TrendingUp className="w-5 h-5 text-emerald-500"/> Good</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs mb-1 font-medium">Attendance</div>
                    <div className="text-xl font-bold text-slate-800">98%</div>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm relative mt-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">On Duty</h5>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">MJ</div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Marcus J.</div>
                      <div className="text-xs text-slate-500">Sales Associate</div>
                    </div>
                    <div className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1.5 rounded-md border border-emerald-100 shadow-sm">Looks Fine</div>
                  </div>
                </div>

                <AnimatePresence>
                  {step > 0 && (
                    <motion.div 
                      key="sent-message"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                      className="bg-slate-900 text-white rounded-3xl p-5 max-w-[90%] self-end shadow-lg mt-auto relative"
                    >
                      <p className="text-[15px] leading-relaxed font-medium">I&apos;ll assume everything is going smoothly with the team.</p>
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

                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-red-100 relative z-10">
                      <UserX className="w-6 h-6 text-red-500" />
                    </div>
                    
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight relative z-10">60 Days Later.</h4>
                    
                    <div className="space-y-1 mb-6 relative z-10 text-sm">
                      <p className="text-slate-500 font-medium leading-relaxed">Marcus quit unexpectedly.</p>
                      <p className="text-red-600 font-bold">Cost to replace: $4,000</p>
                    </div>
                    
                    <button 
                      onClick={handleUsePythia}
                      className="w-full max-w-sm px-6 py-3 bg-brand-teal hover:bg-brand-teal-hover text-white font-bold rounded-xl shadow-xl shadow-brand-teal/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-brand-teal/30 text-base relative z-10"
                    >
                      See How Pythia Prevents This
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
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3 text-slate-900 tracking-tight">Detect burnout before it happens.</h3>
              <p className="text-slate-600 text-base leading-relaxed mx-auto max-w-2xl">
                Pythia analyzes behavioral shifts to identify who needs support and generates an empathetic coaching plan instantly.
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto mt-2">

              <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-brand-teal" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">AI Intervention Plan Generated</h4>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative w-full min-h-[140px]">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-teal rounded-l-2xl"></div>
                  <AnimatedFoldText
                    text={'"Hey Marcus, I noticed you\'ve been a bit quieter with customers during the morning rush lately. Is everything okay? You usually have great energy, so I want to make sure you\'re feeling supported."'}
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
            <PythiaDashboard activeTab="health">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-4 md:pb-6 shrink-0">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Team Health Digest</h4>
                <div className="self-start sm:self-auto flex items-center gap-2 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full font-bold border border-slate-200 shadow-sm">
                  Manager View
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto relative pr-2 pb-10 mt-4 md:mt-6">
                
                {/* Alert 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50/50 p-6 rounded-2xl border border-red-200 shadow-md flex items-start gap-5 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
                    <HeartPulse className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-slate-900 text-lg">Marcus J. At Risk</h5>
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Action Required</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium mb-4">Score dropped across &quot;Greeting Speed&quot; and &quot;Tone&quot; for 3 consecutive shifts.</p>
                    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-brand-teal font-bold text-sm">
                        <Wand2 className="w-4 h-4" /> AI Coaching Plan
                      </div>
                      <p className="text-slate-600 italic text-sm">&quot;Hey Marcus, I noticed you&apos;ve been a bit quieter with customers during the morning rush lately. Is everything okay?&quot;</p>
                    </div>
                  </div>
                </motion.div>

                {/* Alert 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-slate-900 text-lg">Team Burnout Warning</h5>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yesterday</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed font-medium">Average shift duration exceeded by 1.5 hours for the closing team.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 flex justify-center"
                >
                  <button 
                    onClick={handleBookDemo}
                    className="bg-brand-teal text-white hover:bg-brand-teal-hover rounded-xl px-8 py-4 font-bold shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl tracking-wide flex items-center gap-2"
                  >
                    Book a Demo <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>

              </div>
            </PythiaDashboard>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
