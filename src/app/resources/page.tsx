"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { Search, Filter, BookOpen, ArrowRight } from "lucide-react";

type ResourceCategory = "Blog" | "Article" | "Case Study";

interface ResourceItem {
  id: number;
  title: string;
  category: ResourceCategory;
  industry: string;
  excerpt: string;
  tags: string[];
}

const resources: ResourceItem[] = [
  {
    id: 1,
    title: "What your store reports aren’t telling you about missed sales.",
    category: "Article",
    industry: "Convenience Retail",
    excerpt:
      "Standard dashboards surface shortage, shrink, and basket size, but they rarely capture what customers actually say.",
    tags: ["Missed sales", "Store reports", "Friction"],
  },
  {
    id: 2,
    title: "Designing a feedback loop for multi-store operations.",
    category: "Blog",
    industry: "Fuel & C‑Store",
    excerpt:
      "Operations leaders need a simple way to hear what is happening at the counter without sitting in every store.",
    tags: ["Feedback loop", "Multi-store", "Operations"],
  },
  {
    id: 3,
    title: "How one operator turned audio into a coaching playbook.",
    category: "Case Study",
    industry: "Retail Chains",
    excerpt:
      "By listening to everyday interactions, this operator uncovered patterns that transformed how they coached teams.",
    tags: ["Coaching", "Audio intelligence", "Case study"],
  },
];

const categories: (ResourceCategory | "All")[] = ["All", "Blog", "Article", "Case Study"];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "All">("All");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
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
      <main className="min-h-screen bg-white">
        <section className="px-6 pt-32 lg:pt-48 pb-24 lg:pb-40">
          <div className="max-w-[1320px] mx-auto">
            <div className="max-w-4xl mb-20 space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100"
              >
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Resource Library</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[0.95]"
              >
                Insights for the <br />
                <span className="text-slate-400 italic">modern operator.</span>
              </motion.h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                Browse our library of articles, blogs, and case studies exploring the frontier of audio intelligence in retail.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
              <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-white text-slate-900 shadow-xl border border-slate-100"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-[320px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input
                  type="search"
                  placeholder="Search insights..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredResources.map((item) => (
                  <motion.article
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group relative flex flex-col p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-slate-200 transition-all duration-500"
                  >
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.category}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.industry}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight group-hover:text-emerald-500 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>
                    
                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Read Article</span>
                      <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:text-white transition-all duration-500">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
