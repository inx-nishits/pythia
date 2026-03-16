"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

type Partner = {
  name: string;
  symbol: string;
};

const partners: Partner[] = [
  { name: "PDI", symbol: "◆" },
  { name: "Verifone", symbol: "V" },
  { name: "Gilbarco", symbol: "G" },
  { name: "NCR Voyix", symbol: "N" }
];

function TrustBar() {
  return (
    <section className="w-full bg-slate-50 border-y border-slate-100 py-12 lg:py-16 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Label */}
          <div className="shrink-0 text-center lg:text-left space-y-2 lg:border-r border-slate-200 lg:pr-10">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Trusted Infrastructure
            </h2>
            <p className="text-xl font-black text-slate-900 leading-tight">
              Integrates with every <br className="hidden lg:block" /> major POS
            </p>
          </div>

          {/* Marquee */}
          <div className="flex-1 relative overflow-hidden py-2 w-full">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />
            
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-20 whitespace-nowrap"
            >
              {[...partners, ...partners, ...partners, ...partners, ...partners].map((p, i) => (
                <div key={i} className="flex items-center gap-4 group opacity-50 hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center font-black text-lg text-slate-400 group-hover:text-[#04245b] group-hover:border-[#04245b] transition-all duration-500">
                    {p.symbol}
                  </div>
                  <span className="text-2xl font-black text-slate-400 group-hover:text-slate-800 transition-colors duration-500 tracking-tight">
                    {p.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Compliance Badge */}
          <div className="shrink-0 lg:border-l border-slate-200 lg:pl-10">
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-[#04245b] transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#04245b]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Security</span>
                <span className="text-[11px] font-black text-slate-900 whitespace-nowrap tracking-wide">SOC 2 & BIPA READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
