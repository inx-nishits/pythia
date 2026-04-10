import { MotionSpan, MotionH2, MotionDiv } from "@/app/component/MotionWrapper";
import { Shield } from "lucide-react";



function PrivacySection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-[#fafafa] overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto text-center mb-12 lg:mb-16 space-y-4 w-full min-w-0">
        <MotionSpan 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold text-slate-400 uppercase tracking-widest"
        >
          Trust & Compliance
        </MotionSpan>
        <MotionH2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#0F172A] text-[36px] lg:text-[52px] font-extrabold tracking-tighter"
        >
          Security that scales.
        </MotionH2>
      </div>

      <div className="max-w-[1200px] mx-auto flex justify-center px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-10 lg:p-14 bg-white border border-slate-200 rounded-[32px] hover:border-brand-teal/20 hover:shadow-[0_32px_64px_rgba(15,23,42,0.06)] transition-all duration-300 overflow-hidden relative group w-full max-w-4xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10 text-center sm:text-left">
            <div className="w-16 h-16 rounded-[24px] bg-brand-teal/5 flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-brand-teal" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0F172A] tracking-tight">Privacy is our core foundation</h3>
              <p className="text-slate-500 leading-relaxed text-lg lg:text-xl font-medium">Audio captured at the counter is transmitted securely to the cloud using enterprise-grade encryption in transit. Recordings are retained for up to 14 days to ensure accuracy and support issue resolution, then permanently deleted. Only the structured insights and operational summaries derived from those recordings are stored long-term in your dashboard.</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}

export default PrivacySection;
