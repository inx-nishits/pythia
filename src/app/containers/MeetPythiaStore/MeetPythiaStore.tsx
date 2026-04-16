import { MotionDiv, MotionH2, MotionP } from "@/app/component/MotionWrapper";
import { Headphones, Brain, Activity } from "lucide-react";
import { Sections } from "@/app/sections";
import Image from "next/image";

function MeetPythiaStore() {
  return (
    <section
      id={Sections.MeetPythiaStore}
      className="flex flex-col items-center justify-center w-full min-w-0 bg-[#fafafa] pt-16 sm:pt-20 lg:pt-[120px] xl:pt-[200px] pb-16 sm:pb-20 lg:pb-[100px] xl:pb-[160px] overflow-hidden px-4 sm:px-6"
    >
      <div className="w-full max-w-[1400px] mx-auto min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-w-0">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal/10 flex items-center justify-center border border-brand-teal/20 text-brand-teal">
                <Headphones className="w-7 h-7 animate-pulse" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-brand-navy/5 flex items-center justify-center border border-brand-navy/10 text-brand-navy">
                <Brain className="w-7 h-7" />
              </div>
            </div>

            <div className="space-y-4 min-w-0">
              <MotionH2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-[#0F172A] text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[52px] font-extrabold leading-[1.02] tracking-tight break-words"
              >
                Meet{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-blue-500 italic">
                  Pythia
                </span>{" "}
                , your ears at the counter.
              </MotionH2>

              <MotionP
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-[17px] lg:text-[19px] font-medium leading-relaxed max-w-[520px]"
              >
                Pythia is a simple device that listens to what’s said at the counter, analyzes it with AI, and gives you
                always-on insights and recommendations in a clear dashboard. All it needs is Wi-Fi.
              </MotionP>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="w-full flex flex-col gap-4"
          >
            <div className="relative w-full">
              <Image
                src="/desktop-meet-pythia-store.webp"
                alt="Pythia Intelligence Dashboard"
                width={1100}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-slate-100 border border-slate-200/40 shadow-md">
                <Activity className="w-4 h-4 text-emerald-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                  800ms Latency
                </span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

export default MeetPythiaStore;
