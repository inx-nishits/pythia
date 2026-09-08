"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingDown, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Wand2,
  Search,
  Info
} from "lucide-react";
import { openDemoModal } from "@/app/utils/calendly";
import { DEMO_SOURCES } from "@/app/utils/demoSource";
import { trackEvent } from "@/app/utils/gtm";
import AnimatedFoldText from "./AnimatedFoldText";

const CTA_LOCATION = "interactive_demo_roi";

const formatMoney = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);

const formatNum = (val: number) => new Intl.NumberFormat("en-US").format(val);

const BASE_SCORE = 75;
const BASE_REVENUE = 150000;
const NACS_BASKET_SIZE = 7.42;
const TXN_LIFT_PER_POINT_PERCENT = 0.0025; // 0.25% monthly txns per 1-pt lift

export default function RoiAttributionDemo() {
  const [step, setStep] = useState<number>(0);
  
  // Calculator states
  const [score, setScore] = useState<number>(75);
  const [extraTx, setExtraTx] = useState<number>(0);
  const [extraRev, setExtraRev] = useState<number>(0);
  const [totalRev, setTotalRev] = useState<number>(BASE_REVENUE);
  const [growthPercentage, setGrowthPercentage] = useState<number>(0);

  useEffect(() => {
    const baselineMonthlyTx = BASE_REVENUE / NACS_BASKET_SIZE;
    const scoreDiff = score - BASE_SCORE;
    
    const extraMonthlyTx = Math.floor(scoreDiff * (baselineMonthlyTx * TXN_LIFT_PER_POINT_PERCENT));
    const extraMonthlyRev = extraMonthlyTx * NACS_BASKET_SIZE;

    setExtraTx(extraMonthlyTx);
    setExtraRev(extraMonthlyRev);
    setTotalRev(BASE_REVENUE + extraMonthlyRev);

    const maxScoreDiff = 100 - BASE_SCORE;
    const maxExtraRev = maxScoreDiff * (baselineMonthlyTx * TXN_LIFT_PER_POINT_PERCENT) * NACS_BASKET_SIZE;
    const growthPercent = maxExtraRev > 0 ? (extraMonthlyRev / maxExtraRev) * 50 : 0;
    setGrowthPercentage(growthPercent);
  }, [score]);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handleBookDemo = () => {
    trackEvent("intelligence_demo_click", {
      section: "interactive_roi_attribution"
    });
    openDemoModal({
      ctaLocation: CTA_LOCATION,
      source: DEMO_SOURCES.product,
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* SCENES 1 & 2: The Problem */}
        {(step === 0 || step === 1) && (
          <motion.div 
            key="scene-1-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 py-8 md:p-8 lg:p-12 max-w-6xl mx-auto"
          >
            {/* Context Text */}
            <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> The Blind Spot
              </div>
              
              {step === 0 ? (
                <>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                    Sales are dropping, <span className="text-slate-400 font-medium">and no one knows why.</span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                    Traffic is steady, but your location just missed its monthly target. Traditional POS data tells you <strong>what</strong> happened, but not <strong>why</strong>.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                    POS data is <span className="text-slate-400 font-medium">only half the story.</span>
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                    You can see the drop in revenue, but you're left guessing if it's a macro trend, bad weather, or an operational issue.
                  </p>
                </>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full sm:w-auto"
              >
                <button 
                  onClick={handleNextStep}
                  className="group relative px-5 py-3 sm:px-6 sm:py-4 bg-white text-slate-800 text-sm sm:text-base font-bold rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:border-brand-teal hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 w-full"
                >
                  {step === 0 ? "Check POS Dashboard" : "Analyze with Pythia AI"} 
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
                </button>
              </motion.div>
            </div>

            {/* UI Mockup - The Standard Dashboard */}
            <div className="w-full bg-white rounded-3xl relative shadow-2xl border border-slate-100 flex flex-col overflow-hidden p-5 h-[320px] lg:h-[350px] transform md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div>
                  <div className="font-bold text-slate-900 text-base sm:text-lg">Sales Performance</div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">Downtown Location (Last 30 Days)</div>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  <TrendingDown className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Chart Mockup */}
              <div className="flex-1 flex flex-col justify-end pb-6 relative">
                {/* Y-axis lines */}
                <div className="absolute inset-0 flex flex-col justify-between pt-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="border-b border-slate-100 w-full h-0"></div>
                  ))}
                </div>
                
                {/* Line graph simulation */}
                <svg className="absolute inset-x-0 bottom-6 w-full h-[80%] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M0,20 L20,30 L40,25 L60,50 L80,75 L100,85" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {/* Fill gradient */}
                  <motion.path 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    d="M0,20 L20,30 L40,25 L60,50 L80,75 L100,85 L100,100 L0,100 Z" 
                    fill="url(#redGradient)" 
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-2 shadow-md"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-red-900 text-xs sm:text-sm">Revenue Dropped 15%</h5>
                    <p className="text-red-700 text-[10px] sm:text-xs mt-0.5">POS data shows a dip, but cannot determine the root operational cause.</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* SCENE 3: Pythia Insight */}
        {step === 2 && (
          <motion.div 
            key="scene-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center px-4 py-8 md:p-12 max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-900 tracking-tight">Pythia connects the dots.</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mx-auto max-w-xl">
                Pythia overlays your team's real-world behavior directly onto your POS data, identifying the root cause of lost revenue.
              </p>
            </div>

            <div className="w-full mt-2">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-teal/20 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-teal"></div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-brand-teal/20">
                    <Search className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Root Cause Identified</h4>
                    <p className="text-slate-500 font-medium text-xs sm:text-sm">Downtown Location</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                      <span className="text-sm font-bold text-slate-700">1</span>
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-sm sm:text-base">Upsell attempts dropped by 45%</p>
                      <p className="text-slate-500 text-[10px] sm:text-xs">During peak hours (11am - 2pm)</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shrink-0 shadow-sm">
                      <span className="text-sm font-bold text-slate-700">2</span>
                    </div>
                    <div>
                      <p className="text-slate-800 font-bold text-sm sm:text-base">Greeting compliance fell to 60%</p>
                      <p className="text-slate-500 text-[10px] sm:text-xs">Below the 85% regional standard</p>
                    </div>
                  </div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 flex justify-center"
                >
                  <button 
                    onClick={handleNextStep}
                    className="bg-brand-teal text-white hover:bg-brand-teal-hover rounded-xl px-6 py-3 font-bold shadow-md shadow-brand-teal/20 transition-all hover:-translate-y-0.5 hover:shadow-lg tracking-wide flex items-center gap-2 w-full justify-center text-sm"
                  >
                    Calculate Financial Return <TrendingUp className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SCENE 4: ROI Calculator */}
        {step === 3 && (
          <motion.div 
            key="scene-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center px-4 py-8 md:p-8 lg:p-12 max-w-5xl mx-auto overflow-hidden md:overflow-visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
              {/* Context Text & Input */}
              <div className="pr-0 lg:pr-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-brand-teal text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 border border-brand-teal/20 shadow-sm">
                  <Wand2 className="w-3 h-3 sm:w-4 sm:h-4" /> ROI Projection
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight text-slate-900">
                  Projected <span className="text-slate-400">financial return.</span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                  Pythia runs a correlation between team score improvements and actual POS revenue. See exactly how much revenue you recover by coaching the team back to standard.
                </p>

                <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-md border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-teal"></div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-base font-bold text-slate-800">Team Interaction Score</label>
                    <div className="flex items-baseline gap-1">
                      <span className="text-brand-teal font-extrabold text-2xl sm:text-3xl">{score}</span>
                      <span className="text-slate-400 font-bold text-sm sm:text-base">/100</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="100"
                    step="1"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mb-3 accent-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20 transition-all"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
                    <span>Current</span>
                    <span>Target</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center gap-2">
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 text-brand-teal shrink-0" />
                    Drag slider to simulate improvement. (Based on 0.25% txn lift per 1-pt at $7.42 avg basket)
                  </p>
                </div>
              </div>

              {/* Output Panel (Light Theme) */}
              <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6 border border-slate-200 relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10">
                  <h2 className="text-lg sm:text-xl font-bold mb-5 text-slate-900 flex items-center gap-2">
                    <TrendingUp className="text-brand-teal w-5 h-5" /> Revenue Recovery
                  </h2>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
                    <div className="bg-slate-50 p-3 lg:p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center min-w-0">
                      <p className="text-[8px] lg:text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1 truncate">Extra Transactions</p>
                      <motion.div
                        key={extraTx}
                        initial={{ opacity: 0.5, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-base lg:text-xl font-extrabold truncate ${extraTx < 0 ? 'text-red-500' : 'text-slate-900'}`}
                      >
                        {extraTx > 0 ? '+' : ''}{formatNum(extraTx)}
                      </motion.div>
                    </div>
                    <div className={`p-3 lg:p-4 rounded-xl border shadow-sm flex flex-col justify-center min-w-0 ${extraRev < 0 ? 'bg-red-50 border-red-200' : 'bg-brand-teal/5 border-brand-teal/20'}`}>
                      <p className={`text-[8px] lg:text-[10px] uppercase tracking-wider font-bold mb-1 truncate ${extraRev < 0 ? 'text-red-500' : 'text-brand-teal'}`}>Monthly ROI Lift</p>
                      <motion.div
                        key={extraRev}
                        initial={{ opacity: 0.5, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-lg lg:text-2xl font-extrabold truncate ${extraRev < 0 ? 'text-red-500' : 'text-brand-teal'}`}
                      >
                        {extraRev > 0 ? '+' : ''}{formatMoney(extraRev)}
                      </motion.div>
                    </div>
                  </div>

                  {/* Dynamic Chart (Horizontal Bars) */}
                  <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                    <h3 className="text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Predicted Monthly Revenue vs Baseline</h3>

                    <div className="space-y-4">
                      {/* Baseline */}
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1 font-medium">
                          <span>Baseline (Score 75)</span>
                          <span>$150,000</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5">
                          <div className="bg-slate-300 h-2.5 rounded-full w-1/2"></div>
                        </div>
                      </div>

                      {/* With Pythia */}
                      <div>
                        <div className="flex justify-between text-xs mb-1 font-bold">
                          <span className={score < BASE_SCORE ? "text-red-500" : "text-brand-teal"}>
                            {score < BASE_SCORE ? "With Lower Score" : "With Improved Score"}
                          </span>
                          <span className="text-slate-900">{formatMoney(totalRev)}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 flex overflow-hidden">
                          <motion.div 
                            className={`h-2.5 ${score < BASE_SCORE ? 'bg-red-400 rounded-full' : 'bg-slate-300 rounded-l-full'}`}
                            animate={{ width: `${(Math.min(totalRev, BASE_REVENUE) / BASE_REVENUE) * 50}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                          ></motion.div>
                          <motion.div
                            className="bg-brand-teal h-2.5 shadow-[0_0_10px_rgba(16,185,129,0.5)] relative"
                            animate={{ width: `${Math.max(0, growthPercentage)}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            style={{ borderRadius: growthPercentage > 0 ? '0 9999px 9999px 0' : '0' }}
                          >
                            {/* Inner shine */}
                            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-tl-full"></div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Background glows */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/5 rounded-full filter blur-3xl pointer-events-none"></div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 flex justify-center w-full"
            >
              <button 
                onClick={handleBookDemo}
                className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 py-3 font-bold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 tracking-wide flex items-center gap-2 text-sm"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
