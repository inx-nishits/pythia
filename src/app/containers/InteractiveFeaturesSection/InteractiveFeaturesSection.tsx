"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MotionSpan, MotionH2 } from "@/app/component/MotionWrapper";
import { Sections } from "@/app/sections";
import { 
  MessagesSquare, 
  Users, 
  TrendingUp,
  HeartPulse,
  PieChart,
  ArrowRight
} from "lucide-react";
import CoachingTrackerDemoNew from "./components/CoachingTrackerDemoNew";
import RoiAttributionDemo from "./components/RoiAttributionDemo";
import StaffingIntelligenceDemo from "./components/StaffingIntelligenceDemo";
import TeamHealthDigestDemo from "./components/TeamHealthDigestDemo";
import MarketingFeedbackDemo from "./components/MarketingFeedbackDemo";

const featuresList = [
  {
    id: "coaching-tracker",
    title: "Coaching Tracker",
    description: "Automate micro-coaching without relying on busy managers to manually intervene.",
    icon: <MessagesSquare className="w-5 h-5" />,
    demo: <CoachingTrackerDemoNew />,
    link: "/coaching-tracker"
  },
  {
    id: "roi-attribution",
    title: "ROI Attribution",
    description: "Track how marketing spend and coaching efforts attribute to your actual revenue.",
    icon: <TrendingUp className="w-5 h-5" />,
    demo: <RoiAttributionDemo />,
    link: "/pos-roi-attribution"
  },
  {
    id: "staffing",
    title: "Staffing Intelligence",
    description: "Optimize your floor coverage based on real-time customer traffic and interaction data.",
    icon: <Users className="w-5 h-5" />,
    demo: <StaffingIntelligenceDemo />,
    link: "/staffing-intelligence"
  },
  {
    id: "team-health",
    title: "Team Health Digest",
    description: "Monitor team mood scores and generate instant AI coaching plans to prevent burnout.",
    icon: <HeartPulse className="w-5 h-5" />,
    demo: <TeamHealthDigestDemo />,
    link: "/team-health"
  },
  {
    id: "marketing-feedback",
    title: "Marketing Feedback",
    description: "Passively track campaign ROI and demographics using Pythia in-store sensors.",
    icon: <PieChart className="w-5 h-5" />,
    demo: <MarketingFeedbackDemo />,
    link: "/marketing-feedback"
  }
];

export default function InteractiveFeaturesSection() {
  return (
    <section
      id={Sections.InteractiveFeatures}
      className="relative flex flex-col items-center w-full min-w-0 py-12 lg:py-20 bg-slate-50 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-16 space-y-6 text-center flex flex-col items-center">
          <MotionSpan
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-[0.15em]"
          >
            Capabilities
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-900 text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-balance max-w-3xl mx-auto"
          >
            Explore the <span className="text-brand-teal">Platform.</span>
          </MotionH2>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto">
            Interact with our capabilities below to see exactly how Pythia translates in-store sensor data into actionable workflows.
          </p>
        </div>

        {/* The Features Cards */}
        <div className="grid grid-cols-1 gap-10 md:gap-16 w-full max-w-5xl mx-auto">
          {featuresList.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-200 min-h-[600px] lg:min-h-[500px]"
            >
              {/* Window header */}
              <div className="grid grid-cols-[auto_1fr_auto] items-center px-3 sm:px-4 py-3 bg-white border-b border-slate-100 z-20 shrink-0">
                <div className="hidden sm:flex items-center gap-2 w-24">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                </div>
                
                {/* Fallback space for mobile where traffic lights are hidden */}
                <div className="sm:hidden w-2"></div>

                <div className="text-sm sm:text-base font-bold text-slate-700 flex items-center justify-start sm:justify-center gap-2">
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-4 h-4 text-brand-teal hidden sm:block" })}
                  <span className="truncate">{feature.title}</span>
                </div>
                
                <div className="flex justify-end">
                  <Link 
                    href={feature.link}
                    className="inline-flex whitespace-nowrap items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-brand-teal text-xs font-bold rounded-lg hover:bg-emerald-100 transition-colors group shadow-sm"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full relative flex flex-col overflow-hidden bg-white">
                {feature.demo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
