"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  logoInitials: string;
};

const testimonials: Testimonial[] = [
  {
    name: "VP of Operations",
    role: "Multi-store convenience chain",
    company: "US-based retail group",
    quote:
      "Within weeks, Pythia surfaced patterns we had never seen in our traditional reports. It changed how we coach frontline teams and how fast we act on issues at the counter.",
    logoInitials: "RG",
  },
  {
    name: "Regional Director",
    role: "Fuel & c-store locations",
    company: "50+ site portfolio",
    quote:
      "Seeing every missed upsell and every friction point in one place has been a breakthrough. The team finally has a single source of truth for what really happens at checkout.",
    logoInitials: "FP",
  },
  {
    name: "Store Owner",
    role: "Independent operator",
    company: "High-volume flagship site",
    quote:
      "Setup was under five minutes. The first 24-hour digest highlighted three issues we fixed the same day. It felt like adding another manager without more headcount.",
    logoInitials: "FS",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[160px] px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto w-full min-w-0">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Customer Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-tighter"
          >
            What operators say after hearing everything.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((t, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)] hover:border-slate-300/80"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between gap-4 min-h-[52px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold tracking-[0.18em] shrink-0">
                      {t.logoInitials}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.22em]">
                        {t.company}
                      </span>
                      <span className="text-[12px] font-medium text-slate-500">
                        {t.role}
                      </span>
                    </div>
                  </div>
                  <Quote className="w-7 h-7 text-brand-coral opacity-90 shrink-0" />
                </div>
                <p className="text-slate-700 text-[15px] leading-relaxed font-medium">
                  {t.quote}
                </p>
              </div>
              <figcaption className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-col gap-1">
                <span className="text-sm font-bold text-[#0F172A] tracking-tight">
                  {t.name}
                </span>
                <span className="text-[12px] text-slate-500 font-medium">
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

