import { MotionSpan, MotionH2, MotionFigure } from "@/app/component/MotionWrapper";
import { Quote } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  logoInitials: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Drew Bryant",
    role: "President",
    company: "Jr. Food Mart",
    quote:
      "As a multi-unit convenience store operator, we need to keep a close eye on store-level details, both issues and opportunities. More often than not, these surface during checkout conversations between customers and cashiers.\n\nPythia Scorecard uses AI to capture, flag, and categorize these interactions, allowing our supervisors to easily understand the situation and act quickly. Success in our business is built on getting the details right, and Pythia is a vital tool that lets us oversee our stores 100% of the time, even when management isn't on the floor.\n\nAs a company leader, since implementing Pythia, my overall confidence in our operations has improved. It gives me the flexibility to oversee the business at a high level, while still allowing me to easily drill down into the details whenever necessary.\n\nPythia is quickly becoming an invaluable tool for ensuring our standards are met every single day.",
    logoInitials: "DB",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[160px] px-4 sm:px-6 bg-white border-t border-slate-100 overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto w-full min-w-0">
        <div className="text-center mb-16 space-y-4">
          <MotionSpan
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Customer Voices
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold tracking-tighter"
          >
            What operators say after hearing everything.
          </MotionH2>
        </div>

        <div className="max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <MotionFigure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)] hover:border-slate-300/80"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between gap-4 min-h-[52px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xs font-bold tracking-[0.18em] shrink-0">
                      {t.logoInitials}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.22em]">
                        {t.company}
                      </span>
                      <span className="text-[12px] font-medium text-slate-500">
                        {t.role}
                      </span>
                    </div>
                  </div>
                  <Quote className="w-7 h-7 text-brand-coral opacity-90 shrink-0" />
                </div>
                <p className="text-slate-700 text-[15px] leading-relaxed font-medium whitespace-pre-wrap">
                  {t.quote}
                </p>
              </div>
              <figcaption className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-col gap-1">
                <span className="text-sm font-bold text-[#0F172A] tracking-tight">
                  {t.name}
                </span>
                <span className="text-[12px] text-slate-500 font-medium">
                  {t.role} · {t.company}
                </span>
              </figcaption>
            </MotionFigure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

