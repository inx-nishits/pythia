"use client";

import { useState } from "react";
import { MotionDiv, MotionSpan, MotionH2 } from "@/app/component/MotionWrapper";
import { Trophy, Target, FileJson, History, Calendar } from "lucide-react";
import { Sections } from "@/app/sections";
import Image from "next/image";
import Button from "@/app/component/Button";
import { PopupModal } from "react-calendly";

const features = [
  {
    title: "Always-on analysis of in-store customer feedback",
    description: "",
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                i === 1 ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-400"
                }`}
            >
              0{i}
            </div>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <MotionDiv
                initial={{ width: 0 }}
                whileInView={{ width: `${100 - i * 15}%` }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="h-full bg-brand-teal"
              />
            </div>
            <span className="text-[10px] font-bold text-slate-600">{98 - i * 3}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Insights into staff performance and behavior patterns",
    description: "",
    icon: <Target className="w-6 h-6 text-brand-teal" />,
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="mt-6 h-24 flex items-end">
        <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
          <MotionDiv 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-brand-teal/20"
          />
        </div>
      </div>
    ),
    hasCalendly: true,
  },
  {
    title: "AI-powered recommendations to improve your operations",
    description: "",
    icon: <FileJson className="w-6 h-6 text-blue-500" />,
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="mt-3 flex items-center justify-center">
        <Image
          src="https://res.cloudinary.com/dsgulltma/image/upload/v1773919322/Gemini_Generated_Image_rmkejirmkejirmke_nqb0hu.png"
          alt="AI powered recommendations"
          width={850}
          height={410}
          style={{ width: "100%", maxWidth: "850px", height: "auto" }}
          className="rounded-2xl shadow-sm"
        />
      </div>
    ),
  },
  {
    title: "Quick and easy plug-and-play setup – just connect to Wi-Fi",
    description: "",
    icon: <History className="w-6 h-6 text-purple-500" />,
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="mt-6 space-y-4">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal mt-1"></div>
          <p className="text-[20px] text-slate-600 font-medium">Plug in at checkout</p>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1"></div>
          <p className="text-[20px] text-slate-600 font-medium">Connect to Wi‑Fi</p>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1"></div>
          <p className="text-[20px] text-slate-600 font-medium">Start getting insights</p>
        </div>
        <div>
        </div>
      </div>
    ),
  },
];

function WhatYouGet() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <section
      id={Sections.WhatYouGet}
      className="flex flex-col items-center justify-center w-full min-w-0 py-16 sm:py-20 lg:py-[120px] xl:py-[180px] bg-white border-t border-slate-100 overflow-hidden"
    >
      <div className="text-center px-4 sm:px-6 mb-12 lg:mb-24 space-y-4 max-w-3xl w-full min-w-0">
        <MotionSpan
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xs font-bold text-brand-teal uppercase tracking-[0.2em]"
        >
          Product Intelligence
        </MotionSpan>
        <MotionH2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[#0F172A] text-[40px] lg:text-[60px] font-extrabold tracking-tighter leading-[1] text-balance"
        >
          Get the answers you’ve been <span className="text-slate-400">missing.</span>
        </MotionH2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 w-full max-w-[1400px] mx-auto min-w-0">
        {features.map((feature, index) => (
          <MotionDiv
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group p-8 rounded-[32px] border border-slate-200/60 bg-white hover:border-brand-teal/20 hover:shadow-[0_8px_40px_rgba(15,23,42,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between ${feature.className}`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-brand-teal/5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-[22px] font-bold tracking-tight text-[#0F172A] mb-3">{feature.title}</h3>
              {feature.description ? (
                <p className="text-slate-500 text-[15px] leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
                  {feature.description}
                </p>
              ) : null}
              {feature.hasCalendly && (
                <Button 
                  onClick={() => setIsCalendlyOpen(true)}
                  className="mt-2 bg-brand-teal text-brand-navy hover:bg-brand-teal-hover rounded-xl px-5 py-2.5 text-sm font-bold flex items-center gap-2 group/btn transition-all duration-300 w-fit"
                >
                  <Calendar className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                  Book a 15-min demo
                </Button>
              )}
            </div>
            {feature.visual}
          </MotionDiv>
        ))}
      </div>

      <PopupModal
        url="https://calendly.com/nick-pythiascorecard/new-meeting"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={typeof window !== 'undefined' ? document.body : (undefined as unknown as HTMLElement)}
      />
    </section>
  );
}

export default WhatYouGet;
