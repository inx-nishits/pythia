"use client";

import { motion } from "framer-motion";
import Button from "@/app/component/Button";
import { Sections } from "@/app/sections";

function ConversionSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[96px] xl:py-[140px] px-4 sm:px-6 bg-[#0F172A] text-white overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_minmax(0,1fr)] gap-8 lg:gap-16 items-center min-w-0">
        <div className="space-y-5 min-w-0">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-[0.24em] uppercase text-slate-200"
          >
            Conversion Focus
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[24px] sm:text-[30px] lg:text-[36px] xl:text-[44px] font-extrabold tracking-tight leading-[1.1] break-words"
            style={{ color: "var(--color-brand-teal)" }}
          >
            Turn today&apos;s checkout conversations into tomorrow&apos;s wins.
          </motion.h2>
          <p className="text-slate-200 text-[15px] sm:text-[16px] leading-relaxed max-w-xl">
            Choose the path that fits your schedule best: jump straight into a live walkthrough with the team, or watch a short product demo before you book.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://calendly.com/pythia/15-minute-demo"
              target="_blank"
              rel="noreferrer"
              className="flex-1"
            >
              <Button className="w-full py-3.5 rounded-full bg-brand-teal text-brand-navy hover:bg-brand-teal-hover text-[14px] font-semibold shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5">
                Book a 15-Minute Demo
              </Button>
            </a>
            <a href={`#${Sections.DemoAssets}`} className="flex-1">
              <Button className="w-full py-3.5 rounded-full bg-transparent border border-white/25 text-white hover:bg-white/5 text-[14px] font-semibold">
                Watch a 60-Second Demo
              </Button>
            </a>
          </div>

          <p className="text-[12px] text-slate-300 leading-relaxed">
            No obligation. No pressure. Just a clear look at how Pythia turns always-on counter audio into a daily playbook for your stores.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ConversionSection;

