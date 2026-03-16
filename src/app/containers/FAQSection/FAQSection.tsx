"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How does Pythia handle customer privacy?",
    a: "Privacy is our core foundation. All audio is processed locally on the hardware device using Edge AI. No customer voice recordings or Personally Identifiable Information (PII) are ever stored or transmitted to the cloud. We are fully BIPA and SOC 2 Type II compliant."
  },
  {
    q: "Will this integrate with my existing POS system?",
    a: "Yes. Pythia is design to be POS-agnostic. While it runs as a standalone intelligence layer, we offer integrations with major retail hubs like PDI, Verifone, and Gilbarco to correlate audio insights with transactional data."
  },
  {
    q: "How long does it take to see the first insights?",
    a: "Immediately. Once the device is connected to Wi-Fi, it begins analyzing conversations in real-time. Store managers typically receive their first actionable 'Summary Digest' within the first 24 hours of operation."
  },
  {
    q: "What is the typical ROI for a multi-store chain?",
    a: "Retailers typically see a full ROI within 3-4 months. This is driven by a 15-20% reduction in staff turnover and the recovery of approximately $4,000 per store per month in previously missed upsell opportunities."
  },
  {
    q: "Is any special training required for my staff?",
    a: "Zero. Pythia is a background intelligence tool. Staff continue their normal checkout procedures. The insights are delivered directly to managers and owners via a simple mobile-responsive dashboard and automated daily summaries."
  }
];

type FAQSectionProps = { standalone?: boolean };

function FAQSection({ standalone }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className={`py-16 lg:py-24 px-6 bg-white ${standalone ? "" : "border-t border-slate-100"}`}
    >
      <div className="max-w-[1000px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
        <div className="space-y-4 lg:sticky lg:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Support</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
          >
            Common <br />
            <span className="text-emerald-500 italic">questions.</span>
          </motion.h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]">Everything you need to know about Pythia Intelligence.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl overflow-hidden border transition-all duration-400 ${
                openIndex === index
                  ? "border-emerald-200 bg-emerald-50/20 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 group"
              >
                <span className={`text-[15px] font-bold tracking-tight transition-colors leading-snug ${
                  openIndex === index ? "text-[#04245b]" : "text-slate-700 group-hover:text-slate-900"
                }`}>
                  {faq.q}
                </span>
                <div className={`w-7 h-7 rounded-lg border flex-none flex items-center justify-center transition-all duration-300 shrink-0 ${
                  openIndex === index
                    ? "bg-[#04245b] border-[#04245b] text-white"
                    : "bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-[#04245b] group-hover:border-[#04245b] group-hover:text-white"
                }`}>
                  {openIndex === index ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-2 text-sm text-slate-600 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
