"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How does Pythia handle customer privacy?",
    a: "Privacy is our core foundation. Audio captured at the counter is transmitted securely to the cloud using enterprise-grade encryption in transit. Recordings are retained for up to 14 days to ensure accuracy and support issue resolution, then permanently deleted. Only the structured insights and operational summaries derived from those recordings are stored long-term in your dashboard."
  },
  {
    q: "Will this integrate with my existing POS system?",
    a: "Yes, Pythia is designed to be POS agnostic. It runs as a standalone intelligence layer, we work with any POS company such as Gilbarco, Verifone, NCR, Toast, and many more."
  },
  {
    q: "How long does it take to see the first insights?",
    a: "Immediately. Once the device is connected to Wi-Fi, it begins analyzing conversations in near real-time. Store managers typically receive their first actionable 'Summary Digest' within the first 24 hours of operation."
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
      className={
        standalone
          ? "py-8 sm:py-10 lg:py-16 px-4 sm:px-6 bg-white overflow-hidden min-w-0 w-full"
          : "py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden min-w-0 w-full"
      }
    >
      <div className="max-w-[800px] mx-auto w-full min-w-0">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[40px] lg:text-[56px] font-extrabold tracking-tighter"
          >
            Common questions
          </motion.h2>
          <p className="text-slate-500 text-lg lg:text-xl font-medium">Everything you need to know about Pythia Intelligence.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-3xl transition-all duration-300 ${openIndex === index ? 'border-brand-teal/30 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left gap-4"
              >
                <span className="text-[15px] sm:text-lg font-bold text-[#0F172A] tracking-tight flex-1">{faq.q}</span>
                <div
                  className={`w-8 h-8 aspect-square rounded-full border border-slate-200 flex-none flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 bg-brand-teal border-brand-teal' : ''
                  }`}
                >
                  {openIndex === index ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 text-slate-500 leading-relaxed text-[16px]">
                  {faq.a}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
