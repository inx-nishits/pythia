"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const solutions = [
  {
    slug: "in-store-analytics",
    title: "In-Store Analytics",
    description:
      "Understand what actually happens at the counter across every store.",
    tags: ["Operations", "Insights"],
  },
  {
    slug: "fuel-pricing-software",
    title: "Fuel Pricing Software",
    description:
      "Connect forecourt conversations with dynamic pricing decisions.",
    tags: ["Pricing", "Real-time"],
  },
  {
    slug: "retail-ai",
    title: "Retail AI",
    description:
      "Bring an always-on AI analyst into every store via structured audio.",
    tags: ["AI", "Automation"],
  },
  {
    slug: "convenience-store-analytics",
    title: "C-Store Analytics",
    description:
      "See how service and behavior vary by region and location.",
    tags: ["Regional", "Benchmarking"],
  },
];

function SolutionsSection() {
  return (
    <section className="py-16 lg:py-24 px-6 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50/30 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
            >
              Enterprise Solutions
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight"
            >
              Built for fuel &amp; <br />
              <span className="text-emerald-500 italic">convenience retail.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 leading-relaxed max-w-sm font-medium"
          >
            Explore how our audio-intel engine powers different parts of your operation, from pricing to execution.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {solutions.map((solution, index) => (
            <motion.article
              key={solution.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-500 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      {solution.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-emerald-600 transition-colors">
                      {solution.title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#04245b] group-hover:border-[#04245b] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xs">
                  {solution.description}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2 group/link"
                >
                  Explore Solution
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <span className="text-[10px] font-black text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  ACTIVE
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
