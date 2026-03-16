"use client";

import Image from "next/image";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { motion } from "framer-motion";
import { Target, Users, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="px-6 pt-32 lg:pt-48 pb-24 lg:pb-40 overflow-hidden">
          <div className="max-w-[1320px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="space-y-8">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
                >
                  Our Mission
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[0.95]"
                >
                  Intelligence for <br />
                  <span className="text-emerald-500 italic">operators who care.</span>
                </motion.h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                  Pythia Scorecard exists to give retail leaders a clear, objective view of what really happens at the counter—without adding more manual work to their day.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square bg-slate-100 rounded-[48px] overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://www.pythiascorecard.com/desktop-meet-pythia-store.webp"
                  alt="Pythia Intelligence"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Why Pythia exists",
                  icon: <Target className="w-6 h-6" />,
                  text: "Retail operators have no shortage of reports, but they still struggle to see the full picture. Pythia was created to close that gap by listening at the counter."
                },
                {
                  title: "Who it is built for",
                  icon: <Users className="w-6 h-6" />,
                  text: "Designed for multi-location convenience and fuel retailers, as well as independent operators who want enterprise visibility without complexity."
                },
                {
                  title: "Trust & Privacy",
                  icon: <ShieldCheck className="w-6 h-6" />,
                  text: "We built Pythia with a security-first mindset. All audio is processed locally on the device, ensuring customer privacy and compliance."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 space-y-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-900">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                  <p className="text-base text-slate-500 font-medium leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
