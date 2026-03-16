"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sections } from "@/app/sections";
import { Play, Download, FileText, ArrowRight, BookOpen, Calculator } from "lucide-react";

const resources = [
  {
    icon: <FileText className="w-4 h-4" />,
    label: "Product One-Pager",
    meta: "PDF · 1.2 MB",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Implementation Guide",
    meta: "PDF · 2.4 MB",
  },
  {
    icon: <Calculator className="w-4 h-4" />,
    label: "ROI Calculator",
    meta: "XLSX · 0.8 MB",
  },
];

function DemoAssetsSection() {
  const hasDemoVideo = !!process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

  return (
    <section
      id={Sections.DemoAssets}
      className="py-16 lg:py-20 px-6 bg-white border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">

        {/* ── Section header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">
              Demo &amp; Resources
            </p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 leading-tight">
              Watch, explore,{" "}
              <span className="text-emerald-500 italic font-bold">share.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 font-medium max-w-xs leading-relaxed">
            A 60-second walkthrough and download-ready assets for your team.
          </p>
        </div>

        {/* ── Two columns: video + resources ── */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* ── Video card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl aspect-video"
          >
            {hasDemoVideo ? (
              <iframe
                src={process.env.NEXT_PUBLIC_DEMO_VIDEO_URL}
                title="Pythia 60-second demo"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src="https://www.pythiascorecard.com/desktop-meet-pythia-store.webp"
                  alt="Pythia dashboard preview"
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-center px-8">
                  {/* Play button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center shadow-xl shadow-emerald-500/30 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-slate-900 translate-x-0.5" />
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Watch the Product Walkthrough
                    </h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">
                      60 seconds · No sign-up required
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* ── Resource cards ── */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Downloads
            </p>

            {resources.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="group flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-white hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.meta}
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" />
              </motion.div>
            ))}

            {/* CTA link */}
            <a
              href={`/#${Sections.Contact}`}
              className="mt-2 flex items-center justify-center gap-2 h-10 rounded-xl bg-slate-950 text-white text-sm font-bold hover:bg-emerald-500 transition-all group"
            >
              Book a Live Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DemoAssetsSection;
