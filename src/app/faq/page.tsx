import { faqs } from "./faqs";
import Header from "@/app/containers/Header";
import Footer from "@/app/containers/Footer";
import HomeContact from "@/app/containers/HomeContact";
import FAQSection from "@/app/containers/FAQSection";
import Script from "next/script";

export const metadata = {
  title: "Frequently Asked Questions | Pythia Scorecard",
  description: "Find answers to the most common questions about Pythia Scorecard, including hardware, deployment, and privacy.",
  alternates: {
    canonical: "/faq/",
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="flex flex-col min-w-0 w-full max-w-[100vw] overflow-x-hidden pt-20">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="flex-grow w-full pt-8 md:pt-14 pb-12 md:pb-20">
        <FAQSection isPageHeading={true} />
      </main>
      <HomeContact />
      <Footer />
    </div>
  );
}
