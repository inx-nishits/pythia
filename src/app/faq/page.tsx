import FAQSection from "../containers/FAQSection";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

export const metadata = {
  title: "Frequently Asked Questions | Pythia Scorecard",
  description: "Find answers to common questions about Pythia Store's audio intelligence device, AI dashboard, and how it helps retail operators gain always-on insights.",
  openGraph: {
    title: "Frequently Asked Questions | Pythia Store",
    description: "Got questions about Pythia? Find answers here.",
    url: "/faq/",
  },
  alternates: {
    canonical: "/faq/",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Pythia Store",
    description: "Answers to common questions about Pythia retail AI.",
  }
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-6 sm:pt-10">
        <FAQSection standalone />
      </main>
      <Footer />
    </>
  );
}

