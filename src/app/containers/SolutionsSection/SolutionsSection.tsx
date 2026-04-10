import { MotionSpan, MotionH2, MotionArticle } from "@/app/component/MotionWrapper";
import Link from "next/link";

const solutions = [
  {
    slug: "in-store-analytics",
    title: "In-Store Analytics",
    description:
      "Understand what actually happens at the counter, across every store, in language your operations team can act on.",
  },
  {
    slug: "work-order-tickets",
    title: "Work Order Tickets",
    description:
      "Introducing Tickets. From Friction Detected to Fix in Motion. When Pythia flags a friction point in the shopping experience, our AI Ticket Agent automatically converts it into a work order and routes it to the right manager or maintenance team, no forms to fill out, no manual steps required. Detect, assign, resolve.",
  },
  {
    slug: "retail-ai",
    title: "Retail AI",
    description:
      "Bring an always-on AI analyst into every store, turning unstructured audio into structured operational intelligence.",
  },
  {
    slug: "convenience-store-analytics",
    title: "Convenience Store Analytics",
    description:
      "See how service, upsell behavior, and friction vary by location so you can coach stores like a top-performing region.",
  },
];

function SolutionsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[160px] px-4 sm:px-6 bg-[#f8fafc] border-t border-slate-100 overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto w-full min-w-0">
        <div className="max-w-[720px] mb-12 space-y-4">
          <MotionSpan
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
          >
            Solutions
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter"
          >
            Built for the realities of modern fuel and convenience retail.
          </MotionH2>
          <p className="text-slate-600 text-[15px] sm:text-[16px] leading-relaxed">
            Explore how the same audio-intelligence engine powers different parts of your operation, from pricing decisions to day-to-day store execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <MotionArticle
              key={solution.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)] p-7 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_56px_rgba(15,23,42,0.08)] hover:border-slate-300/80 hover:-translate-y-2"
            >
              <div className="space-y-4">
                <h3 className="text-[20px] lg:text-[22px] font-extrabold text-[#0F172A] tracking-tight">
                  {solution.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed line-clamp-4">
                  {solution.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-brand-teal hover:text-brand-teal-hover transition-colors"
                >
                  <span>View solution</span>
                  <span className="w-5 h-5 rounded-full border border-brand-teal/40 flex items-center justify-center text-[11px]">
                    →
                  </span>
                </Link>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;

