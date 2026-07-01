import { articles } from "../data";
import { notFound } from "next/navigation";

import Header from "@/app/containers/Header";
import Footer from "@/app/containers/Footer";
import Link from "next/link";
import HomeContact from "@/app/containers/HomeContact";
import RelatedLinks from "../../components/RelatedLinks";
import { Zap } from "lucide-react";
import AnimatedReveal from "@/app/component/AnimatedReveal";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Pythia`,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/articles/${slug}/`,
      images: ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/og-image.jpg"],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedSolutionLinks = slug === "close-the-turnover-tap"
    ? [
      { title: "In-Store Analytics", href: "/solutions/in-store-analytics/" },
      { title: "Convenience Store Analytics", href: "/solutions/convenience-store-analytics/" },
    ]
    : slug === "is-your-point-of-sale-leaking-profits"
      ? [
        { title: "Work Order Tickets", href: "/solutions/work-order-tickets/" },
        { title: "Retail AI", href: "/solutions/retail-ai/" },
      ]
      : slug === "when-your-team-sends-customer-to-competition"
        ? [
          { title: "Retail AI", href: "/solutions/retail-ai/" },
          { title: "In-Store Analytics", href: "/solutions/in-store-analytics/" },
        ]
        : [
          { title: "Work Order Tickets", href: "/solutions/work-order-tickets/" },
          { title: "Retail AI", href: "/solutions/retail-ai/" },
        ];

  // Schema.org structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": "https://www.pythiascorecard.com/og-image.jpg",
    "datePublished": article.date === "March 2026" ? "2026-03-01" : "2026-06-01",
    "author": article.author ? {
      "@type": "Person",
      "name": article.author.name,
      "jobTitle": article.author.role,
      "worksFor": {
        "@id": "https://www.pythiascorecard.com/#organization"
      }
    } : {
      "@type": "Organization",
      "name": "Pythia Scorecard",
      "url": "https://www.pythiascorecard.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pythia Scorecard",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pythiascorecard.com/pythiaLogo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.pythiascorecard.com/articles/${slug}/`
    }
  };

  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Resources", path: "/resources/" },
    { name: article.title, path: `/articles/${slug}/` },
  ]);

  return (
    <div className="flex flex-col min-w-0 w-full max-w-[100vw] overflow-x-hidden pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, jsonLd]) }}
      />
      <Header />
      <main className="flex-grow w-full px-4 pt-8 md:pt-14 pb-12 md:pb-20 lg:px-8 max-w-[1400px] mx-auto">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <AnimatedReveal index={0}>
            <nav className="mb-6 text-sm font-medium">
              <Link href="/resources/" className="text-brand-teal hover:underline transition-colors">
                &larr; Back to Resources
              </Link>
            </nav>
          </AnimatedReveal>

          {/* Header */}
          <AnimatedReveal index={1}>
            <header className="mb-10 text-center">
              <div className="flex items-center justify-center gap-3 text-sm text-slate-500 mb-6 font-medium uppercase tracking-wider">
                <span>{article.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span>{article.readTime}</span>
              </div>
              <h1 className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter mb-6 leading-tight">
                {article.title}
              </h1>
            </header>
          </AnimatedReveal>

          {/* Key Takeaways */}
          <AnimatedReveal index={2}>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-brand-teal" />
                <h3 className="text-xl font-bold text-brand-navy">Key Takeaways</h3>
              </div>
              <ul className="space-y-4">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-teal mt-2.5"></span>
                    <span className="text-slate-700 leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedReveal>

          {/* Main Content */}
          <AnimatedReveal index={3}>
            <div
              className="tracking-wide text-[16px] md:text-[17px] text-slate-700 [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-brand-navy [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:tracking-tight [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-brand-navy [&>h3]:mt-4 [&>h3]:mb-2 [&>h3]:tracking-tight [&>p]:leading-[1.6] [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ul>li]:mb-1 [&>ul>li]:leading-[1.6] [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>ol>li]:mb-1 [&>ol>li]:leading-[1.6] [&>p>strong]:text-brand-navy [&>p>strong]:font-semibold [&>li>strong]:text-brand-navy [&>li>strong]:font-semibold [&>a]:text-brand-teal [&>a]:underline [&>a:hover]:text-brand-teal-hover"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </AnimatedReveal>

          {/* Author Bio */}
          {article.author && (
            <AnimatedReveal index={4}>
              <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-brand-navy mb-1">{article.author.name}</h3>
                  <p className="text-sm font-medium text-brand-teal mb-3">{article.author.role}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">{article.author.bio}</p>
                </div>
              </div>
            </AnimatedReveal>
          )}

          {/* Citations */}
          {article.citations && article.citations.length > 0 && (
            <AnimatedReveal index={5}>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="text-lg font-bold text-brand-navy mb-4">References & Citations</h3>
                <ul className="space-y-2">
                  {article.citations.map((cite, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-slate-400">[{idx + 1}]</span>
                      <a href={cite.url} target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">
                        {cite.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>
          )}
        </article>
      </main>

      <RelatedLinks title="Related Solutions" links={relatedSolutionLinks} />

      {/* Footer CTA */}
      <HomeContact />
      <Footer />
    </div>
  );
}
