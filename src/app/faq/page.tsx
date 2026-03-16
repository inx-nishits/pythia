"use client";

import FAQSection from "../containers/FAQSection";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 lg:pt-48 pb-12 px-6">
          <div className="max-w-[1320px] mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100"
            >
              <HelpCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">FAQ</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight"
            >
              How can we <br />
              <span className="text-slate-400 italic">help you?</span>
            </motion.h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Find answers to common questions about Pythia Intelligence, privacy, and ROI.
            </p>
          </div>
        </section>
        <FAQSection standalone />
      </main>
      <Footer />
    </>
  );
}
