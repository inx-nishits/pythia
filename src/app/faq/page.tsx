import FAQSection from "../containers/FAQSection";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

export const metadata = {
  title: "Frequently Asked Questions | Pythia Scorecard",
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

