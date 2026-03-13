"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sections } from "@/app/sections";

function DemoAssetsSection() {
  const hasDemoVideo = !!process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

  return (
    <section
      id={Sections.DemoAssets}
      className="py-16 sm:py-20 lg:py-[96px] xl:py-[128px] px-4 sm:px-6 bg-[#f8fafc] border-t border-slate-100 overflow-hidden min-w-0 w-full"
    >
      <div className="max-w-[1400px] mx-auto space-y-10 w-full min-w-0">
        <div className="space-y-3 max-w-[640px]">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Demo & Resources
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[28px] sm:text-[32px] lg:text-[36px] font-extrabold tracking-tighter"
          >
            Watch a 60-second demo and grab the follow-up materials.
          </motion.h2>
          <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
            Start with a quick product run-through, then share one-pagers or guides with other
            stakeholders when you&apos;re ready to evaluate Pythia in more detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.04)] p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_24px_52px_rgba(15,23,42,0.08)] hover:border-slate-300/80">
            <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.24em]">
              60-second product demo
            </p>
            <div className="relative w-full min-h-[200px] aspect-video rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden">
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
                    className="object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 gap-3">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <span className="ml-0.5 inline-block w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-slate-900 border-b-[8px] border-b-transparent" />
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center">
                      <span className="text-[13px] font-semibold text-slate-50">
                        60-second demo preview
                      </span>
                      <span className="text-[12px] text-slate-200">
                        Embed your live demo via{" "}
                        <code className="text-xs bg-slate-900/70 px-1.5 py-0.5 rounded">
                          NEXT_PUBLIC_DEMO_VIDEO_URL
                        </code>{" "}
                        when it&apos;s ready.
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.04)] p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_24px_52px_rgba(15,23,42,0.08)] hover:border-slate-300/80">
            <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.24em]">
              Downloadable resources
            </p>
            <div className="min-h-[120px] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80 px-5 py-6 flex flex-col gap-2 justify-center">
              <span className="text-[13px] font-medium text-slate-600">
                Space for one-pagers, guides, or checklists.
              </span>
              <span className="text-[12px] text-slate-400">
                Links can be wired here when assets are ready.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DemoAssetsSection;

