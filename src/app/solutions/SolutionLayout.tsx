"use client";

import Link from "next/link";
import Button from "@/app/component/Button";
import { motion } from "framer-motion";
import { Check, ArrowRight, Play, MessageSquare } from "lucide-react";

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
  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pt-32 lg:pt-48 pb-24 lg:pb-40">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-20 space-y-6 max-w-4xl">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-slate-100 bg-slate-50 text-xs font-bold tracking-widest uppercase text-slate-400"
            >
              {eyebrow}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[0.95]"
            >
              {title.split(' ').slice(0, -1).join(' ')} <br />
              <span className="text-emerald-500 italic">{title.split(' ').slice(-1)}</span>
            </motion.h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-start">
            <div className="space-y-16">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {problemHeadline}
                  </h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {problemBody}
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-emerald-600">
                    {solutionHeadline}
                  </h2>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {solutionBody}
                  </p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[40%] h-full bg-emerald-500/10 blur-[80px]" />
                <div className="relative z-10 space-y-6">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {useCaseTitle}
                  </h2>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed">
                    {useCaseBody}
                  </p>
                </div>
              </motion.div>
            </div>

            <aside className="space-y-8 sticky top-32">
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 space-y-8">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Key Capabilities
                </h3>
                <ul className="space-y-4">
                  {capabilities.map((item, index) => (
                    <li key={index} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-base text-slate-600 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-[40px] bg-emerald-500 text-slate-900 space-y-4 shadow-xl shadow-emerald-500/20 transition-transform hover:scale-[1.02]">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
                  {impactLabel}
                </p>
                <p className="text-2xl font-bold leading-tight">
                  {impactValue}
                </p>
                <p className="text-sm font-bold opacity-70">
                  {impactDetail}
                </p>
              </div>

              <div className="p-10 rounded-[40px] border border-slate-100 space-y-6">
                <p className="text-base text-slate-500 font-medium leading-relaxed">
                  Ready to see how this solution fits into your network of stores?
                </p>
                <div className="grid gap-4">
                  <Link
                    href="https://calendly.com/pythia/15-minute-demo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold flex items-center justify-center gap-2">
                      <Play className="w-4 h-4 fill-white" />
                      Book a Demo
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button className="w-full h-14 rounded-2xl bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 text-sm font-bold flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Talk to Team
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
