import { MotionSpan, MotionH2, MotionDiv } from "@/app/component/MotionWrapper";

function PersonaSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[160px] px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto space-y-10 w-full min-w-0">
        <div className="space-y-4 max-w-2xl">
          <MotionSpan
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Built for your team
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter"
          >
            One intelligence layer, two perspectives.
          </MotionH2>
          <p className="text-slate-600 text-[15px] leading-relaxed">
            Whether you oversee a full network of locations or run a flagship store, Pythia gives you
            a clear, shared view of what happens at the counter every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-7 flex flex-col gap-4 transition-all duration-300 hover:border-slate-300/80 hover:shadow-[0_18px_40px_rgba(15,23,42,0.04)]"
          >
            <div>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.24em]">
                Persona
              </p>
              <h3 className="text-[20px] lg:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
                C‑suite & operations leaders
              </h3>
            </div>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              Get a network-level view of where stores are leaking revenue, burning out great people,
              or introducing friction that never shows up in standard reports.
            </p>
            <ul className="space-y-2.5 text-[13px] text-slate-700 leading-relaxed">
              <li>• Compare behavior and experience across locations without flying store to store.</li>
              <li>• See which teams are quietly excelling so you can recognize and retain them.</li>
              <li>• Align field, HR, and operations around one shared source of truth.</li>
            </ul>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-[28px] border border-slate-200 bg-white p-7 flex flex-col gap-4 shadow-[0_18px_45px_rgba(15,23,42,0.04)] transition-all duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)] hover:border-slate-300/80"
          >
            <div>
              <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.24em]">
                Persona
              </p>
              <h3 className="text-[20px] lg:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
                Store owners & frontline managers
              </h3>
            </div>
            <p className="text-[14px] text-slate-600 leading-relaxed">
              See exactly how conversations are going in your store so you can coach with confidence,
              celebrate wins, and fix issues before they turn into lost customers.
            </p>
            <ul className="space-y-2.5 text-[13px] text-slate-700 leading-relaxed">
              <li>• Spot missed upsell opportunities and scripting gaps as they happen.</li>
              <li>• Turn daily digests into practical talking points for team huddles.</li>
              <li>• Create a fair, data-informed way to recognize top performers.</li>
            </ul>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}

export default PersonaSection;

