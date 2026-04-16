"use client";

import { useState } from "react";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Link from "next/link";
import { ChevronDown, Check, Zap, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv, MotionSpan } from "@/app/component/MotionWrapper";

const deviceDetails = [
  "Compact, tamper-resistant hardware designed for counter deployment",
  "Always-on audio capture with privacy-first edge processing",
  "Plug-and-play setup - no IT team or technician required",
  "Automatically syncs every session to your Pythia dashboard",
  "Regular over-the-air firmware updates included at no extra cost",
  "Built for convenience and retail environments",
];

const dashboardDetails = [
  "Store performance dashboard with intuitive visualisations",
  "AI-generated coaching insights surfaced per shift and per associate",
  "Multi-location roll-up views for area managers and executives",
  "Custom alerts and scheduled weekly digest emails",
  "Dedicated onboarding support and live chat during business hours",
  "Unlimited historical data access and CSV exports",
];

const TOTAL_PRICE = 129;

function DetailAccordion({
  icon: Icon,
  label,
  details,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  details: string[];
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-[14px] font-bold text-[#0F172A] hover:bg-slate-100/70 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-teal/10">
            <Icon className="w-3.5 h-3.5 text-brand-teal" strokeWidth={2.5} />
          </span>
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex text-slate-400"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 pt-1 flex flex-col gap-3">
              {details.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-relaxed"
                >
                  <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-brand-teal/15">
                    <Check className="w-2.5 h-2.5 text-brand-teal" strokeWidth={3} />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc]">
        <section className="px-4 sm:px-6 pt-10 sm:pt-14 lg:pt-[100px] pb-[100px]">
          <div className="max-w-[720px] mx-auto">

            {/* Page header */}
            <header className="text-center space-y-4 mb-10">
              <MotionSpan
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-block text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
              >
                Pricing
              </MotionSpan>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-tighter leading-[1.05]">
                  Simple, transparent pricing
                </h1>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <p className="text-slate-500 text-[15px] sm:text-[16px] max-w-xl mx-auto leading-relaxed">
                  Everything you need to capture, analyse, and act on your store interactions - with no hidden fees.
                </p>
              </MotionDiv>
            </header>

            {/* Free setup banner */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 bg-brand-teal/10 border border-brand-teal/30 rounded-2xl px-6 py-3.5 mb-10 max-w-xl mx-auto"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-teal/20">
                <Check className="w-3.5 h-3.5 text-brand-teal" strokeWidth={3} />
              </span>
              <p className="text-[14px] font-semibold text-[#0F172A]">
                Device setup and Dashboard setup are both&nbsp;
                <span className="text-brand-teal">completely free.</span>
              </p>
            </MotionDiv>

            {/* Professional Plan card */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[28px] border border-brand-teal bg-white shadow-[0_18px_45px_rgba(15,23,42,0.09)] overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-teal via-cyan-400 to-brand-teal" />

              <div className="p-8 sm:p-10">

                {/* Plan name + badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="flex items-center justify-between flex-wrap gap-3 mb-6"
                >
                  <div>
                    <span className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.22em]">
                      Plan
                    </span>
                    <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] tracking-tight mt-0.5">
                      Professional Plan
                      <span className="text-brand-teal"> - ${TOTAL_PRICE}/month</span>
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <span className="bg-brand-teal text-brand-navy text-[11px] font-extrabold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full shadow-sm">
                      Unlimited Seats
                    </span>
                    <span className="bg-brand-teal text-brand-navy text-[11px] font-extrabold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full shadow-sm">
                      All-in-one
                    </span>
                  </div>
                </motion.div>

                {/* What you get breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5 mb-7"
                >
                  <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                    What you get
                  </p>

                  {/* Device & Dashboard row */}
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2.5 text-[14px] font-semibold text-slate-700">
                      <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-teal/10">
                        <Zap className="w-3.5 h-3.5 text-brand-teal" strokeWidth={2.5} />
                      </span>
                      Device & Dashboard
                    </span>
                    <span className="text-[15px] font-bold text-[#0F172A]">
                      ${TOTAL_PRICE}
                      <span className="text-slate-400 font-medium text-[12px]">/mo</span>
                    </span>
                  </div>
                </motion.div>

                {/* More details accordions */}
                <div className="flex flex-col gap-3 mb-8">
                  <DetailAccordion
                    icon={Zap}
                    label="Device details"
                    details={deviceDetails}
                    delay={0.35}
                  />
                  <DetailAccordion
                    icon={LayoutDashboard}
                    label="Dashboard details"
                    details={dashboardDetails}
                    delay={0.42}
                  />
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/#contact"
                    className="block w-full text-center rounded-full font-bold text-[16px] py-4 bg-brand-teal text-brand-navy hover:bg-brand-teal-hover shadow-md hover:shadow-lg transition-colors duration-200"
                  >
                    Buy Now - ${TOTAL_PRICE}/month
                  </Link>
                </motion.div>

              </div>
            </MotionDiv>

            {/* Footer note */}
            <MotionDiv
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-8"
            >
              <p className="text-[13px] text-slate-400">
                Price is per location per month. Volume discounts available for chains with 5+ locations.{" "}
                <a href="/contact/" className="text-brand-teal font-semibold hover:underline">
                  Contact us
                </a>{" "}
                to learn more.
              </p>
            </MotionDiv>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
