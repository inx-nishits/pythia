import { MotionSpan, MotionH2, MotionArticle } from "@/app/component/MotionWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogArticle {
  id: number;
  title: string;
  category: string;
  industry: string;
  excerpt: string;
  tags: string[];
}

const articles: BlogArticle[] = [
  {
    id: 1,
    title: "What your store reports aren’t telling you about missed sales.",
    category: "Article",
    industry: "Convenience Retail",
    excerpt: "Standard dashboards surface shortage, shrink, and basket size, but they rarely capture what customers actually say when they walk away from a purchase.",
    tags: ["Missed sales", "Store reports", "Friction"],
  },
  {
    id: 2,
    title: "Designing a feedback loop for multi-store operations.",
    category: "Blog",
    industry: "Fuel & C‑Store",
    excerpt: "Operations leaders need a simple way to hear what is happening at the counter without sitting in every store for hours each week.",
    tags: ["Feedback loop", "Multi-store", "Operations"],
  },
  {
    id: 3,
    title: "How one operator turned audio into a coaching playbook.",
    category: "Case Study",
    industry: "Retail Chains",
    excerpt: "By listening to everyday interactions, this operator uncovered patterns that transformed how they coached frontline teams.",
    tags: ["Coaching", "Audio intelligence", "Case study"],
  },
];

function BlogSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-[#f8fafc] overflow-hidden min-w-0 w-full">
      <div className="max-w-[1400px] mx-auto w-full min-w-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4">
            <MotionSpan 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
            >
              Latest Insights
            </MotionSpan>
            <MotionH2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter"
            >
              Resources for retail leaders.
            </MotionH2>
          </div>
          <Link 
            href="/resources/"
            className="inline-flex items-center gap-2 text-brand-teal font-bold hover:gap-3 transition-all duration-300 group"
          >
            Go to Resources
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {articles.map((item, index) => (
            <MotionArticle
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_52px_rgba(15,23,42,0.08)] hover:border-brand-teal/20 group h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>{item.category}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{item.industry}</span>
                </div>
                <h3 className="text-[20px] font-extrabold text-[#0F172A] leading-snug tracking-tight group-hover:text-brand-teal transition-colors">
                  {item.title}
                </h3>
                <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                  {item.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[12px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <Link 
                    href="/resources/" 
                    className="text-sm font-bold text-brand-teal flex items-center gap-2 group/btn"
                  >
                    Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </MotionArticle>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
