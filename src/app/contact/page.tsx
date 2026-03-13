import Footer from "../containers/Footer";
import Header from "../containers/Header";
import ContactPageContent from "./ContactPageContent";

export const metadata = {
  title: "Contact Pythia Scorecard | Request a Demo or Get Support",
  description: "Reach out to the Pythia Scorecard team to schedule a demo, ask questions about the device and dashboard, or discuss how we can help your retail operations benefit from AI-powered in-store insights.",
  keywords: [
    "contact Pythia Scorecard",
    "schedule demo retail AI",
    "Pythia support",
    "in-store analytics demo",
    "retail operations AI inquiry",
    "retail technology contact"
  ],
  openGraph: {
    title: "Contact Pythia Scorecard | Request a Demo or Get Support",
    description: "Talk to us about how Pythia can transform your in-store experience with audio-based AI insights.",
    url: `${process.env.NEXT_PUBLIC_SITE}/contact`,
    site_name: "Pythia Scorecard",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Pythia Scorecard team, demo and support"
      }
    ],
    type: "website"
  }
};

export default function Contact() {
  return (
    <>
      <Header />
      <ContactPageContent />
      <Footer />
    </>
  );
}
