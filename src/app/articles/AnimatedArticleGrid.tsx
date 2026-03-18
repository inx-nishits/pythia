"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArticleData } from "./data";

export default function AnimatedArticleGrid({ articles }: { articles: ArticleData[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {articles.map((article, index) => (
        <motion.div
          key={article.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="h-full"
        >
          <Link href={`/articles/${article.slug}`} className="group block h-full">
            <article className="glass-panel rounded-card lg:rounded-card-lg p-6 lg:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-4 font-medium">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-navy mb-4 group-hover:text-brand-teal transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                {article.excerpt}
              </p>
              <div className="font-semibold text-brand-teal flex items-center gap-2 mt-auto">
                Read Article
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </article>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
