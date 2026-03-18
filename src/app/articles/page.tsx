import { articles } from "./data";
import Header from "@/app/containers/Header";
import Footer from "@/app/containers/Footer";
import AnimatedArticleGrid from "./AnimatedArticleGrid";

export const metadata = {
  title: "Retail Articles & Strategies | Pythia Scorecard",
  description: "Educational articles and insights on retail operations, training, and eliminating customer friction.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-w-0 w-full max-w-[100vw] overflow-x-hidden pt-20">
      <Header />
      <main className="flex-grow w-full px-4 py-12 md:py-20 lg:px-8 max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">Retail Articles & Strategies</h1>
          <p className="text-lg text-slate-600">Explore our latest articles on closing training gaps, preventing equipment failures, and building a stronger store culture.</p>
        </div>
        <AnimatedArticleGrid articles={articles} />
      </main>
      <Footer />
    </div>
  );
}
