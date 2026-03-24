"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Link from "next/link";
import { articles } from "../articles/data";

type ResourceCategory = "Blog" | "Article" | "Case Study";

interface ResourceItem {
  id: number;
  title: string;
  category: ResourceCategory;
  industry: string;
  excerpt: string;
  tags: string[];
  slug?: string;
}

const resources: ResourceItem[] = [
  {
    id: 1,
    title: "What your store reports aren’t telling you about missed sales.",
    category: "Article",
    industry: "Convenience Retail",
    excerpt:
      "Standard dashboards surface shortage, shrink, and basket size, but they rarely capture what customers actually say when they walk away from a purchase.",
    tags: ["Missed sales", "Store reports", "Friction"],
  },
  {
    id: 2,
    title: "Designing a feedback loop for multi-store operations.",
    category: "Blog",
    industry: "Fuel & C‑Store",
    excerpt:
      "Operations leaders need a simple way to hear what is happening at the counter without sitting in every store for hours each week.",
    tags: ["Feedback loop", "Multi-store", "Operations"],
  },
  {
    id: 3,
    title: "How one operator turned audio into a coaching playbook.",
    category: "Case Study",
    industry: "Retail Chains",
    excerpt:
      "By listening to everyday interactions, this operator uncovered patterns that transformed how they coached frontline teams.",
    tags: ["Coaching", "Audio intelligence", "Case study"],
  },
];

const allResources: ResourceItem[] = [
  ...articles.map((article, index) => ({
    id: 10 + index,
    title: article.title,
    category: "Article" as ResourceCategory,
    industry: "Convenience Retail",
    excerpt: article.excerpt,
    tags: ["Insights", "Operations"],
    slug: article.slug,
  })),
  ...resources,
];

const categories: (ResourceCategory | "All")[] = ["All", "Blog", "Article", "Case Study"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "All">("All");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    return allResources.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ? true : item.category === selectedCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        item.industry.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc]">
        <section className="px-4 sm:px-6 pt-10 sm:pt-14 lg:pt-[120px] pb-[96px]">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <header className="space-y-5">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]"
            >
              Resources
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter"
            >
              Insights for operators who care about what really happens at the counter.
            </motion.h1>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              Browse articles, blogs, and case studies that explore how audio intelligence changes
              the way retail leaders run their stores and coach their teams.
            </p>
          </header>

          <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between p-4 rounded-2xl bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
            <div className="inline-flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#0F172A] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full md:w-[280px]">
              <input
                type="search"
                placeholder="Search resources"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:border-brand-teal transition-shadow duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-4">
            {filteredResources.map((item) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_24px_52px_rgba(15,23,42,0.08)] hover:border-slate-300/80"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <span>{item.category}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{item.industry}</span>
                  </div>
                  <h2 className="text-[18px] font-extrabold text-[#0F172A] leading-snug tracking-tight">
                    {item.title}
                  </h2>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{item.excerpt}</p>
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
                <div className="mt-6 pt-4 border-t border-slate-100">
                  {item.slug ? (
                    <Link href={`/articles/${item.slug}`} className="inline-flex items-center gap-2 text-[13px] font-bold text-brand-teal hover:opacity-80 transition-opacity group">
                      Read Article
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-slate-500">
                      Full summaries will be available soon.
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
            {filteredResources.length === 0 && (
              <p className="text-sm text-slate-500 col-span-full">
                No resources found for your current filters. Try clearing the search or choosing a
                different category.
              </p>
            )}
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

