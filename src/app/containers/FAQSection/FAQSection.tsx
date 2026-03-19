"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How many locations do I need to get started?",
    a: "Just one. Pythia is built to scale from a single flagship store up to a portfolio of 100+ locations. Many operators start with one or two sites to prove the value, then roll out across the chain."
  },
  {
    q: "What hardware do I actually receive?",
    a: "You receive a compact, plug-and-play audio intelligence device that sits discreetly at the checkout counter. There's no bulky equipment to install and no technician required — just plug it in, connect to Wi-Fi, and you're live."
  },
  {
    q: "Who can see the insights — just corporate, or store managers too?",
    a: "Both. Pythia offers two perspectives in one platform. Corporate and operations leaders get a network-wide view to compare locations and spot trends. Store owners and frontline managers see a store-level dashboard with daily digests they can use directly in team huddles."
  },
  {
    q: "How does Pythia handle noisy or high-traffic store environments?",
    a: "Pythia is designed for the realities of busy convenience and fuel retail environments. The AI is trained to filter ambient noise and focus on checkout counter interactions, so high foot traffic and background sound don't degrade the quality of insights."
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
