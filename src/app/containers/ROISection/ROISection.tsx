"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Wallet, ArrowUpRight } from "lucide-react";

const stats = [
  {
    label: "Potential Revenue Recovered",
    value: "$4,200",
    detail: "per store / month",
    icon: <DollarSign className="w-5 h-5" />,
    trend: "+24% Efficiency",
    color: "emerald"
  },
  {
    label: "Turnover Reduction",
    value: "18%",
    detail: "Avg decrease in 6 months",
    icon: <Users className="w-5 h-5" />,
    trend: "-12% Hiring costs",
    color: "blue"
  },
  {
    label: "Upsell Script Adoption",
    value: "92%",
    detail: "from 45% baseline",
    icon: <TrendingUp className="w-5 h-5" />,
    trend: "+47% Performance",
    color: "amber"
  },
  {
    label: "Friction Score",
    value: "9.4/10",
    detail: "Post-Pythia average",
    icon: <Wallet className="w-5 h-5" />,
    trend: "+3.2pts Improvement",
    color: "rose"
  }
];

function ROISection() {
  return (
    <section className="py-16 lg:py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
            >
              Measurable ROI
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              The impact is <br/>
              <span className="text-emerald-500 italic">quantifiable.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed"
          >
            Every checkout interaction carries a monetary value. Pythia turns those moments into a data-driven ROI engine.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 rounded-3xl bg-white border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[200px]"
            >
              {/* Colored top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04245b] to-[#04245b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#04245b] group-hover:text-white group-hover:border-[#04245b] transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-[9px] font-black text-[#04245b] uppercase tracking-widest bg-slate-50 border border-slate-100 px-2 py-1 rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors">
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  {stat.trend.split(' ')[0]}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                <p className="text-[13px] font-bold text-slate-700 leading-tight">{stat.label}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.12em]">{stat.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ROISection;
