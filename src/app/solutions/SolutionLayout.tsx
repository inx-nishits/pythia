"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/app/component/Button";
import dynamic from "next/dynamic";
const PopupModalDynamic = dynamic(() => import("react-calendly").then((mod) => mod.PopupModal), { ssr: false });
import { clearDemoSource } from "@/app/utils/demoSource";

interface SolutionLayoutProps {
  title: string;
  eyebrow: string;
  intro: string;
  problemHeadline: string;
  problemBody: string;
  solutionHeadline: string;
  solutionBody: string;
  useCases: Array<{ title: string; body: string }>;
  integrations?: Array<{ name: string; description: string }>;
  faqs?: Array<{ question: string; answer: string }>;
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
  useCases,
  integrations,
  faqs,
  impactLabel,
  impactValue,
  impactDetail,
  capabilities,
}: SolutionLayoutProps) {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <main className="min-h-screen bg-[#0b1120] text-white">
        <section className="px-6 pt-[120px] pb-[96px]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px] items-start">
              <div className="space-y-6">
                <div className="space-y-4 max-w-3xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.22em] uppercase text-slate-200">
                    {eyebrow}
                  </span>
                  <h1 className="text-[32px] sm:text-[40px] lg:text-[64px] font-extrabold tracking-tight leading-[1.05] !text-white">
                    {title}
                  </h1>
                  <p className="text-slate-300 text-[16px] sm:text-[18px] leading-relaxed max-w-2xl">
                    {intro}
                  </p>
                </div>

                <div className="space-y-12 max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h2 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight !text-white">
                        {problemHeadline}
                      </h2>
                      <p className="text-slate-400 text-[15px] leading-relaxed">
                        {problemBody}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight !text-white">
                        {solutionHeadline}
                      </h2>
                      <p className="text-slate-400 text-[15px] leading-relaxed">
                        {solutionBody}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight !text-white border-l-4 border-brand-teal pl-4">
                      Primary Use Cases
                    </h2>
                    <div className="grid gap-6">
                      {useCases.map((useCase, index) => (
                        <div key={index} className="rounded-[24px] border border-white/10 bg-white/5 p-8 space-y-4 hover:bg-white/[0.07] transition-all duration-300">
                          <h3 className="text-[18px] font-extrabold tracking-tight !text-white">
                            {useCase.title}
                          </h3>
                          <p className="text-slate-300 text-[15px] leading-relaxed">
                            {useCase.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {integrations && integrations.length > 0 && (
                    <div className="space-y-6">
                      <h2 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight !text-white">
                        Built for Your Ecosystem
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {integrations.map((integration, index) => (
                          <div key={index} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center shrink-0">
                              <span className="w-2 h-2 rounded-full bg-brand-teal" />
                            </div>
                            <div>
                              <h4 className="text-[15px] font-bold !text-white mb-1">{integration.name}</h4>
                              <p className="text-[13px] text-slate-400 leading-relaxed">{integration.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {faqs && faqs.length > 0 && (
                    <div className="space-y-6 pt-8 border-t border-white/10">
                      <h2 className="text-[20px] sm:text-[24px] font-extrabold tracking-tight !text-white">
                        Frequently Asked Questions
                      </h2>
                      <div className="space-y-3">
                        {faqs.map((faq, index) => (
                          <div key={index} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                            <button
                              onClick={() => setOpenFaq(openFaq === index ? null : index)}
                              className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors"
                            >
                              <span className="text-[15px] font-semibold text-slate-200">{faq.question}</span>
                              <span className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </span>
                            </button>
                            {openFaq === index && (
                              <div className="px-5 pb-5 text-[14px] text-slate-400 leading-relaxed animate-in fade-in slide-in-from-top-1">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <aside className="w-full shrink-0 self-start space-y-6">
                <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 transition-colors duration-200">
                  <h3 className="text-[16px] font-semibold tracking-tight mb-4 !text-white">
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

      <PopupModalDynamic
        url="https://calendly.com/nick-pythiascorecard/new-meeting"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={typeof window !== 'undefined' ? document.body : (undefined as unknown as HTMLElement)}
      />
    </>
  );
}
