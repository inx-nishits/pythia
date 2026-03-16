"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

function PersonaSection() {
  const personas = [
    {
      title: "C-suite & Operations",
      description: "Get a network-level view of where stores are leaking revenue, burning out great people, or introducing friction that never shows up in standard reports.",
      benefits: [
        "Compare behavior and experience across locations remotely.",
        "See which teams are quietly excelling and recognize them.",
        "Align field, HR, and operations around a single source of truth."
      ],
      light: true
    },
    {
      title: "Store Owners & Managers",
      description: "See exactly how conversations are going in your store so you can coach with confidence and fix issues before they turn into lost customers.",
      benefits: [
        "Spot missed upsell opportunities in real-time.",
        "Turn daily digests into practical talking points for huddles.",
        "Create a fair, data-informed way to recognize top performers."
      ],
      light: false
    }
  ];

  return (
    <section className="py-16 lg:py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]"
            >
              Built for your team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.05]"
            >
              One intelligence layer, <br />
              <span className="text-emerald-500 italic">two perspectives.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px]"
          >
            Whether you oversee a full network of locations or run a flagship store, Pythia gives you a shared view of what happens.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {personas.map((persona, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border transition-all duration-500 flex flex-col justify-between overflow-hidden relative group ${persona.light
                ? "bg-slate-50 border-slate-200 hover:bg-white hover:shadow-xl hover:border-[#04245b]"
                : "bg-slate-950 border-slate-800 text-white hover:shadow-xl hover:border-emerald-500 hover:shadow-emerald-500/10"
                }`}
            >
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${persona.light ? "text-slate-400" : "text-emerald-500"}`}>Persona</span>
                  <h3 className={`text-2xl font-black tracking-tight group-hover:text-emerald-500 transition-colors`} style={{ color: persona.light ? '#0f172a' : '#ffffff' }}>{persona.title}</h3>
                </div>
                <p className={`text-sm font-medium leading-relaxed max-w-sm`} style={{ color: persona.light ? '#64748b' : '#94a3b8' }}>
                  {persona.description}
                </p>
              </div>

              <ul className="space-y-3 mt-8 relative z-10">
                {persona.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${persona.light ? "bg-slate-200 text-slate-600 group-hover:bg-[#04245b] group-hover:text-white transition-colors" : "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-[13px] font-semibold leading-relaxed ${persona.light ? "text-slate-700" : "text-slate-300 group-hover:text-white transition-colors"}`}>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Decorative backgrounds */}
              {persona.light ? (
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#04245b]/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              ) : (
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PersonaSection;
