"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

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
    <section className="py-16 lg:py-24 px-6 bg-slate-50 border-y border-slate-100 overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
            >
              Proof Layer
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              What operators say after <br />
              <span className="text-emerald-500 italic">hearing everything.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 font-medium max-w-[280px] leading-relaxed"
          >
            Real feedback from leaders managing single flagships to multi-region portfolios.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-500 flex flex-col justify-between group overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:fill-emerald-400 group-hover:text-emerald-400 transition-colors duration-500" />
                  ))}
                </div>
                <blockquote className="text-[15px] text-slate-700 font-medium leading-relaxed italic">
                  "{t.quote}"
                </blockquote>
              </div>
              
              <footer className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-[#04245b] transition-colors">{t.name}</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.company}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center text-[11px] font-black tracking-widest shrink-0 group-hover:bg-[#04245b] group-hover:border-[#04245b] group-hover:text-white transition-all duration-300">
                  {t.logoInitials}
                </div>
              </footer>
              
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-50 group-hover:text-emerald-50/50 transition-colors -z-0" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
