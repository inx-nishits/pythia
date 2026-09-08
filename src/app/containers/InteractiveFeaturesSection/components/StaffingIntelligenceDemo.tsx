"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, Star, GripVertical, Flame, Check, Zap } from "lucide-react";
import { openDemoModal } from "@/app/utils/calendly";
import { DEMO_SOURCES } from "@/app/utils/demoSource";
import { trackEvent } from "@/app/utils/gtm";

const CTA_LOCATION = "interactive_demo_staffing";

type Staff = {
  id: string;
  name: string;
  initials: string;
  score: number;
  color: string;
  bgColor: string;
};

const staffMembers: Staff[] = [
  { id: "sarah", name: "Sarah J.", initials: "SJ", score: 94, color: "text-green-700", bgColor: "bg-green-100" },
  { id: "mike", name: "Mike D.", initials: "MD", score: 88, color: "text-emerald-700", bgColor: "bg-emerald-100" },
  { id: "kevin", name: "Kevin T.", initials: "KT", score: 72, color: "text-amber-700", bgColor: "bg-amber-100" }
];

export default function StaffingIntelligenceDemo() {
  const [step, setStep] = useState<number>(0);
  const [slots, setSlots] = useState<{ morning: Staff | null; peak: Staff[] }>({
    morning: null,
    peak: [],
  });
  
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const handleBookDemo = () => {
    trackEvent("intelligence_demo_click", {
      section: "interactive_staffing_intelligence"
    });
    openDemoModal({
      ctaLocation: CTA_LOCATION,
      source: DEMO_SOURCES.product,
    });
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeZone !== zone) {
      setActiveZone(zone);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setActiveZone(null);
  };

  const handleDrop = (e: React.DragEvent, slot: "morning" | "peak" | "pool") => {
    e.preventDefault();
    setActiveZone(null);
    const id = e.dataTransfer.getData("text/plain");
    const staff = staffMembers.find((s) => s.id === id);
    
    if (staff) {
      setSlots((prev) => {
        const newSlots = { morning: prev.morning, peak: [...prev.peak] };
        
        // Remove from old position
        if (newSlots.morning?.id === id) newSlots.morning = null;
        newSlots.peak = newSlots.peak.filter(s => s.id !== id);
        
        // Add to new position
        if (slot === "morning") {
          newSlots.morning = staff;
        } else if (slot === "peak") {
          if (newSlots.peak.length < 2) {
            newSlots.peak.push(staff);
          } else {
            // Replace the first one if already full (max 2)
            newSlots.peak.shift();
            newSlots.peak.push(staff);
          }
        }
        
        return newSlots;
      });
    }
  };

  // Automatically move to step 2 when successful
  const isSuccess = 
    slots.morning?.id === "kevin" && 
    slots.peak.some(s => s.id === "sarah") && 
    slots.peak.some(s => s.id === "mike");

  React.useEffect(() => {
    if (isSuccess && step === 1) {
      setTimeout(() => setStep(2), 500); // Small delay to let user see it drop
    }
  }, [isSuccess, step]);

  const poolStaff = staffMembers.filter(
    (s) => slots.morning?.id !== s.id && !slots.peak.find(ps => ps.id === s.id)
  );

  return (
    <div className="w-full h-full min-h-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        
        {/* Step 0: The Problem */}
        {step === 0 && (
          <motion.div 
            key="scene-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center px-4 py-8 md:p-8 lg:p-12 max-w-6xl mx-auto"
          >
            <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Issue Detected
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-slate-900 tracking-tight text-balance">
                The Scheduling <span className="text-slate-400 font-medium">Blind Spot</span>
              </h3>
              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                Yesterday's schedule placed a struggling employee alone during the peak Lunch Rush. This resulted in slower service and lost revenue.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-10 w-full sm:w-auto">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-slate-500 text-sm mb-1 font-medium">Service Speed</div>
                  <div className="text-2xl font-bold text-red-500">-24%</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-slate-500 text-sm mb-1 font-medium">Lost Revenue</div>
                  <div className="text-2xl font-bold text-red-500">$450</div>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full sm:w-auto"
              >
                <button 
                  onClick={() => setStep(1)}
                  className="group relative px-6 py-4 bg-white text-slate-800 font-bold rounded-2xl overflow-hidden shadow-lg border border-slate-200 hover:border-brand-teal hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 w-full"
                >
                  <Zap className="w-5 h-5 text-slate-400 group-hover:text-brand-teal transition-colors" />
                  Optimize Schedule
                </button>
              </motion.div>
            </div>

            <div className="w-full bg-white rounded-3xl p-6 relative border border-slate-100 shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out h-[300px] lg:h-[380px] flex flex-col justify-center">
              <h4 className="font-bold text-slate-900 mb-6 text-xl">Yesterday's Peak <span className="text-slate-500 text-lg font-medium">(12PM - 2PM)</span></h4>
              
              <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
                <div className="w-12 h-12 bg-white border border-red-100 rounded-xl flex items-center justify-center font-bold text-slate-700 shadow-sm shrink-0">
                  KT
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-lg">Kevin T.</div>
                  <div className="text-sm font-medium text-red-600">Scheduled Alone</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Pythia Score</div>
                  <div className="font-extrabold text-red-500 text-2xl">72</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Interactive Solution */}
        {step === 1 && (
          <motion.div 
            key="scene-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center justify-center px-4 py-8 md:p-8 lg:p-12 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full items-start">
              {/* Available Staff (Pool) */}
              <div 
                className={`w-full rounded-2xl md:rounded-3xl p-2 md:p-4 transition-colors col-span-1 ${activeZone === 'pool' ? 'bg-slate-100/80 ring-2 ring-slate-300 ring-inset' : 'bg-transparent'}`}
                onDragOver={(e) => handleDragOver(e, 'pool')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "pool")}
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-3 md:mb-4 pb-2 md:pb-3 border-b border-slate-200 gap-1 md:gap-0">
                  <h4 className="font-bold text-slate-900 text-xs md:text-base text-center md:text-left">Available Staff</h4>
                  <span className="hidden md:inline-block text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">Drag to reassign</span>
                </div>
                <div className="space-y-2 md:space-y-4 min-h-[150px] md:min-h-[250px]">
                  <AnimatePresence>
                    {poolStaff.map((staff) => (
                        <motion.div
                        key={staff.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, staff.id)}
                        className="bg-white p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-1 md:gap-2 lg:gap-4 cursor-grab active:cursor-grabbing hover:border-brand-teal hover:shadow-md transition-all group"
                      >
                        <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${staff.bgColor} rounded-lg md:rounded-xl flex items-center justify-center font-bold ${staff.color} text-xs md:text-base lg:text-lg shadow-sm border border-white shrink-0`}>
                          {staff.initials}
                        </div>
                        <div className="flex-1 min-w-0 w-full text-center md:text-left">
                          <div className="font-bold text-slate-900 text-[10px] md:text-sm lg:text-base truncate leading-tight">{staff.name}</div>
                          <div className={`text-[9px] md:text-[10px] lg:text-xs font-bold flex items-center justify-center md:justify-start gap-0.5 md:gap-1 mt-0.5 md:mt-0 ${staff.color}`}>
                            {staff.score > 80 && <Star className="hidden md:block w-3 h-3 lg:w-3.5 lg:h-3.5 fill-current shrink-0" />} <span className="hidden md:inline">Score:</span> {staff.score}
                          </div>
                        </div>
                        <GripVertical className="hidden md:block w-4 h-4 lg:w-5 lg:h-5 text-slate-300 group-hover:text-brand-teal transition-colors shrink-0" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {poolStaff.length === 0 && (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium pt-10">
                      All staff assigned
                    </div>
                  )}
                </div>
              </div>

              {/* Schedule Slots */}
              <div className="w-full space-y-3 md:space-y-5 col-span-2">
                {/* Morning Slot */}
                <div className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 mb-2 md:mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm md:text-lg leading-tight">Morning Open</h4>
                      <p className="text-[9px] sm:text-[10px] md:text-sm font-medium text-slate-500 hidden sm:block">8:00 AM - 12:00 PM</p>
                    </div>
                    <span className="px-1.5 py-0.5 md:px-3 md:py-1.5 bg-slate-100 text-slate-600 text-[8px] sm:text-[10px] md:text-xs font-bold rounded md:rounded-lg uppercase tracking-widest border border-slate-200 whitespace-nowrap">
                      Low <span className="hidden sm:inline">Traffic</span>
                    </span>
                  </div>
                  <div
                    onDragOver={(e) => handleDragOver(e, "morning")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "morning")}
                    className={`min-h-[60px] md:min-h-[96px] border-2 border-dashed rounded-xl md:rounded-2xl flex items-center justify-center p-1.5 md:p-2 transition-all
                      ${slots.morning ? 'border-transparent' : activeZone === 'morning' ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-teal/40'}
                    `}
                  >
                    {slots.morning ? (
                      <motion.div
                        key={slots.morning.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, slots.morning!.id)}
                        className="w-full bg-white p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 lg:gap-4 cursor-grab active:cursor-grabbing hover:border-brand-teal transition-colors"
                      >
                        <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${slots.morning.bgColor} rounded-lg md:rounded-xl flex items-center justify-center font-bold ${slots.morning.color} text-xs md:text-base lg:text-lg shrink-0`}>
                          {slots.morning.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-900 text-[10px] sm:text-sm md:text-base lg:text-base truncate leading-tight">{slots.morning.name}</div>
                          <div className={`text-[9px] sm:text-[10px] lg:text-xs font-bold mt-0 md:mt-0.5 ${slots.morning.color}`}><span className="hidden sm:inline">Score:</span> {slots.morning.score}</div>
                        </div>
                        <GripVertical className="hidden sm:block w-4 h-4 lg:w-5 lg:h-5 text-slate-300 shrink-0" />
                      </motion.div>
                    ) : (
                      <span className={`font-medium text-[10px] sm:text-xs md:text-sm transition-colors text-center ${activeZone === 'morning' ? 'text-brand-teal' : 'text-slate-400'}`}>
                        Drag Kevin<span className="hidden sm:inline"> here</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Peak Slot */}
                <div className="bg-white border border-slate-200 rounded-2xl md:rounded-3xl p-2 sm:p-3 md:p-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-2 mb-2 md:mb-4">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm md:text-lg leading-tight">Lunch Rush</h4>
                      <p className="text-[9px] sm:text-[10px] md:text-sm font-medium text-slate-500 hidden sm:block">12:00 PM - 2:00 PM</p>
                    </div>
                    <span className="px-1.5 py-0.5 md:px-3 md:py-1.5 bg-orange-50 text-orange-600 text-[8px] sm:text-[10px] md:text-xs font-bold rounded md:rounded-lg uppercase tracking-widest flex items-center gap-1 md:gap-1.5 border border-orange-200 shadow-sm shrink-0 whitespace-nowrap">
                      <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 fill-orange-600" /> High <span className="hidden sm:inline">Traffic</span>
                    </span>
                  </div>
                  <div
                    onDragOver={(e) => handleDragOver(e, "peak")}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "peak")}
                    className={`min-h-[60px] md:min-h-[96px] border-2 border-dashed rounded-xl md:rounded-2xl flex flex-col md:flex-row gap-2 md:gap-3 items-center justify-center p-1.5 md:p-2 transition-all
                      ${slots.peak.length > 0 ? (slots.peak.length === 2 ? 'border-transparent' : 'border-slate-300 bg-slate-50') : activeZone === 'peak' ? 'border-brand-teal bg-brand-teal/5' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-brand-teal/40'}
                    `}
                  >
                    <AnimatePresence>
                      {slots.peak.map((staff) => (
                        <motion.div
                          key={staff.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          draggable
                          onDragStart={(e: any) => handleDragStart(e, staff.id)}
                          className="w-full md:flex-1 bg-white p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 lg:gap-4 cursor-grab active:cursor-grabbing hover:border-brand-teal transition-colors"
                        >
                          <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${staff.bgColor} rounded-lg md:rounded-xl flex items-center justify-center font-bold ${staff.color} text-xs md:text-base lg:text-lg shrink-0`}>
                            {staff.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-900 text-[10px] sm:text-sm md:text-base truncate leading-tight">{staff.name}</div>
                            <div className={`text-[9px] sm:text-[10px] lg:text-xs font-bold mt-0 md:mt-0.5 ${staff.color}`}><span className="hidden sm:inline">Score:</span> {staff.score}</div>
                          </div>
                          <GripVertical className="hidden sm:block w-4 h-4 lg:w-5 lg:h-5 text-slate-300 shrink-0" />
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {slots.peak.length === 0 && (
                      <span className={`font-medium text-[10px] sm:text-xs md:text-sm transition-colors w-full text-center ${activeZone === 'peak' ? 'text-brand-teal' : 'text-slate-400'}`}>
                        Drag Sarah and Mike<span className="hidden sm:inline"> here</span>
                      </span>
                    )}
                    
                    {slots.peak.length === 1 && (
                      <div className="w-full md:flex-1 min-h-[48px] md:min-h-[82px] rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                         <span className="text-slate-400 text-[10px] sm:text-sm font-medium">Drag second person<span className="hidden sm:inline"> here</span></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Value Delivered */}
        {step === 2 && (
          <motion.div 
            key="scene-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center py-8 md:py-12 max-w-4xl mx-auto"
          >
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 text-center max-w-2xl mx-auto w-full shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-teal"></div>
              
              <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-sm relative">
                <div className="absolute inset-0 bg-brand-teal/10 rounded-2xl animate-ping opacity-75"></div>
                <Check className="w-10 h-10 text-brand-teal relative z-10" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Schedule Optimized Successfully
              </h3>
              
              <p className="text-slate-600 text-base mb-8 leading-relaxed max-w-lg mx-auto">
                By matching top performers to high traffic periods, you've improved projected service speed by 18% and recovered potential lost revenue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => {
                    setSlots({ morning: null, peak: [] });
                    setStep(0);
                  }}
                  className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                >
                  Reset Demo
                </button>
                <button 
                  onClick={handleBookDemo}
                  className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 py-4 font-bold shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl tracking-wide flex items-center gap-2"
                >
                  Book a Demo <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

