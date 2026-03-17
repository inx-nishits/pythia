"use client";

import { motion } from "framer-motion";


type Partner = {
  name: string;
  symbol: string;
};

const partners: Partner[] = [
  { name: "NACS", symbol: "N" },
  { name: "Conexxus", symbol: "CX" },
  { name: "PDI", symbol: "◆" },
  { name: "Verifone", symbol: "V" },
  { name: "Gilbarco", symbol: "G" },
  { name: "NCR Voyix", symbol: "NV" }
];

function TrustBar() {
  return (
    <section className="w-full min-w-0 bg-white border-b border-slate-100 py-10 sm:py-14 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 w-full min-w-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-w-0">
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 min-w-0 text-center lg:text-left">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Infrastructure</span>
              <p className="text-lg font-extrabold text-[#0F172A] leading-none">Built for Retail Chains</p>
              <p className="text-sm font-medium text-slate-500 mt-1">1-100+ retail locations</p>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden lg:block" />
          </div>

          <div className="flex-1 overflow-hidden relative min-w-0 flex justify-center">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
            >
              {partners.map((p, i) => (
                <div key={i} className="flex items-center gap-3 shrink-0 min-h-[40px] min-w-[80px] justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-extrabold text-[13px] shrink-0 shadow-sm">
                    {p.symbol}
                  </div>
                  <span className="text-xl font-extrabold text-[#0F172A] tracking-tighter font-mono">
                    {p.name}
                  </span>
                </div>
              ))}
              {partners.map((p, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 shrink-0 min-h-[40px] min-w-[80px] justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-extrabold text-[13px] shrink-0 shadow-sm">
                    {p.symbol}
                  </div>
                  <span className="text-xl font-extrabold text-[#0F172A] tracking-tighter font-mono">
                    {p.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
