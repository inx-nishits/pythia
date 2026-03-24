"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sections } from "@/app/sections";

function DemoAssetsSection() {
  return (
    <section
      id={Sections.VoiceToTicket}
      className="py-16 sm:py-20 lg:py-[96px] xl:py-[128px] px-4 sm:px-6 bg-[#f8fafc] border-t border-slate-100 overflow-hidden min-w-0 w-full"
    >
      <div className="max-w-[1400px] mx-auto space-y-6 w-full min-w-0">
        <div className="space-y-3 max-w-[800px]">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Operational Intelligence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tighter leading-[1.1]"
          >
            Voice to Ticket Work Order Automation
          </motion.h2>
          <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed max-w-[700px]">
            Eliminate the gap between detecting a problem and fixing it. Pythia turns register conversations into instant action across your entire store network.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-brand-navy tracking-tight">Instant Ticket Generation</h3>
              <p className="text-slate-600 text-[16px] sm:text-[18px] leading-relaxed">
                Pythia picks up equipment failures, customer complaints, and operational issues straight from conversations at the register. No forms. No delays. No waiting for an employee to report it two days later.
              </p>
              <p className="text-slate-600 text-[16px] sm:text-[18px] leading-relaxed">
                Our AI agent creates the ticket, fills out the details, and routes it the moment the problem surfaces. Managers get faster resolution without adding a single task to their day.
              </p>
            </div>
          </div>

          <div className="relative w-full rounded-[32px] overflow-hidden bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] border border-slate-200/60 transition-all duration-500 hover:shadow-[0_32px_80px_rgba(15,23,42,0.12)]">
            <div className="relative w-full aspect-square sm:aspect-video lg:h-[500px] flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dsgulltma/image/upload/v1774346958/Gemini_Generated_Image_7hfrzj7hfrzj7hfr_1_apuzkt.png"
                alt="Voice to Ticket automation visualization"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoAssetsSection;

