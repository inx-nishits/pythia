"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/app/component/Button";
import { PopupModal } from "react-calendly";
import { clearDemoSource } from "@/app/utils/demoSource";

interface SolutionLayoutProps {
  title: string;
  eyebrow: string;
  intro: string;
  problemHeadline: string;
  problemBody: string;
  solutionHeadline: string;
  solutionBody: string;
  useCaseTitle: string;
  useCaseBody: string;
  impactLabel: string;
  impactValue: string;
  impactDetail: string;
  capabilities: string[];
}

export default function SolutionLayout({
  title,
  eyebrow,
  intro,
  problemHeadline,
  problemBody,
  solutionHeadline,
  solutionBody,
  useCaseTitle,
  useCaseBody,
  impactLabel,
  impactValue,
  impactDetail,
  capabilities,
}: SolutionLayoutProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-[#0b1120] text-white">
        <section className="px-6 pt-[120px] pb-[96px]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10 space-y-4 max-w-3xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-200">
                {eyebrow}
              </span>
              <h1 className="text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-tight leading-[1.05]">
                {title}
              </h1>
              <p className="text-slate-200 text-[15px] sm:text-[16px] leading-relaxed">
                {intro}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight mb-2">
                    {problemHeadline}
                  </h2>
                  <p className="text-slate-300 text-[14px] leading-relaxed">
                    {problemBody}
                  </p>
                </div>
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight mb-2">
                    {solutionHeadline}
                  </h2>
                  <p className="text-slate-300 text-[14px] leading-relaxed">
                    {solutionBody}
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 space-y-4 transition-colors duration-200">
                  <h2 className="text-[16px] sm:text-[18px] font-extrabold tracking-tight text-white">
                    {useCaseTitle}
                  </h2>
                  <p className="text-slate-200 text-[14px] leading-relaxed">
                    {useCaseBody}
                  </p>
                </div>
              </div>

              <aside className="w-full max-w-[360px] shrink-0 space-y-6">
                <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 transition-colors duration-200">
                  <h3 className="text-[16px] font-semibold tracking-tight mb-4">
                    Key capabilities
                  </h3>
                  <ul className="space-y-3 text-[13px] text-slate-100 leading-relaxed">
                    {capabilities.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[24px] border border-emerald-400/25 bg-emerald-500/10 p-6 space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-emerald-200">
                    {impactLabel}
                  </p>
                  <p className="text-[22px] font-extrabold text-white leading-tight">
                    {impactValue}
                  </p>
                  <p className="text-[12px] text-emerald-100/90 leading-relaxed">
                    {impactDetail}
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 space-y-4 transition-colors duration-200">
                  <p className="text-[13px] text-slate-200 leading-relaxed">
                    Ready to see how this solution fits into your network of stores?
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => {
                        clearDemoSource();
                        setIsCalendlyOpen(true);
                      }}
                      className="w-full py-3 rounded-full bg-brand-teal text-brand-navy hover:bg-brand-teal-hover text-[14px] font-semibold shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Book a 15-minute demo
                    </Button>
                    <Link href="/contact/">
                      <Button className="w-full py-3 rounded-full bg-transparent border border-white/25 text-white hover:bg-white/5 text-[13px] font-semibold">
                        Talk to the team
                      </Button>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <PopupModal
        url="https://calendly.com/nick-pythiascorecard/new-meeting"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={typeof window !== 'undefined' ? document.body : (undefined as unknown as HTMLElement)}
      />
    </>
  );
}
