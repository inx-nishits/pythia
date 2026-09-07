"use client";

import React, { ReactNode } from "react";
import { PieChart, Zap, LineChart, Users, HeartPulse, Menu } from "lucide-react";

interface PythiaDashboardProps {
  children: ReactNode;
  activeTab?: "coaching" | "analytics" | "staffing" | "health";
}

export default function PythiaDashboard({ children, activeTab = "coaching" }: PythiaDashboardProps) {
  return (
    <div className="w-full h-full min-h-[550px] bg-white border-t border-slate-200/60 flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-slate-50 border-b border-slate-100 p-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center text-white shadow-md shadow-brand-teal/20">
            <PieChart className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Pythia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-brand-teal bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
            Auto-Coaching
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-slate-50/50 border-r border-slate-100 p-6 flex-col shrink-0">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center text-white shadow-md shadow-brand-teal/20">
            <PieChart className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Pythia</span>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
            activeTab === "coaching" 
              ? "text-brand-teal bg-white border-slate-100 font-bold shadow-sm shadow-slate-200/50" 
              : "text-slate-400 border-transparent font-semibold hover:text-slate-600 cursor-not-allowed"
          }`}>
            <Zap className="w-5 h-5" /> Auto-Coaching
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
            activeTab === "analytics" 
              ? "text-brand-teal bg-white border-slate-100 font-bold shadow-sm shadow-slate-200/50" 
              : "text-slate-400 border-transparent font-semibold hover:text-slate-600 cursor-not-allowed"
          }`}>
            <LineChart className="w-5 h-5" /> Analytics
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
            activeTab === "staffing" 
              ? "text-brand-teal bg-white border-slate-100 font-bold shadow-sm shadow-slate-200/50" 
              : "text-slate-400 border-transparent font-semibold hover:text-slate-600 cursor-not-allowed"
          }`}>
            <Users className="w-5 h-5" /> Staffing
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm transition-colors ${
            activeTab === "health" 
              ? "text-brand-teal bg-white border-slate-100 font-bold shadow-sm shadow-slate-200/50" 
              : "text-slate-400 border-transparent font-semibold hover:text-slate-600 cursor-not-allowed"
          }`}>
            <HeartPulse className="w-5 h-5" /> Team Health
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 flex flex-col bg-white relative overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
