"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { faqs } from "../../faq/faqs";

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden min-w-0 w-full"
    >
      <div className="max-w-[800px] mx-auto w-full min-w-0">
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            id="faq-heading"
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
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-3xl transition-all duration-300 ${openIndex === index ? 'border-brand-teal/30 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left gap-4"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-[15px] sm:text-lg font-bold text-[#0F172A] tracking-tight flex-1">
                  {faq.question}
                </h3>
                <div
                  className={`w-8 h-8 aspect-square rounded-full border border-slate-200 flex-none flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index
                      ? "rotate-180 bg-brand-teal border-brand-teal"
                      : ""
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index
                    ? "max-h-[300px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-8 pb-8 text-slate-500 leading-relaxed text-[16px]">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center space-y-6 pt-12 border-t border-slate-100"
        >
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Have more questions?</h3>
            <p className="text-slate-500 font-medium">We are happy to help!</p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-pythia-chat'))}
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-white border border-slate-200 text-brand-navy font-bold text-[15px] shadow-sm hover:border-brand-teal/30 hover:bg-slate-50 transition-all active:scale-[0.98] group"
          >
            Contact support
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQSection;
