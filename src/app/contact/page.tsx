import Footer from "../containers/Footer";
import Header from "../containers/Header";
import ContactPageContent from "./ContactPageContent";

export const metadata = {
  title: "Contact Pythia Scorecard | Request a Demo or Get Support",
  description: "Reach out to the Pythia Scorecard team to schedule a demo, ask questions about the device and dashboard, or discuss how we can help your retail operations with AI insights.",
  keywords: [
    "contact Pythia Scorecard",
    "schedule demo retail AI",
    "Pythia support",
    "in-store analytics demo",
    "retail operations AI inquiry",
    "retail technology contact"
  ],
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: "Contact Pythia Scorecard | Request a Demo or Get Support",
    description: "Talk to us about how Pythia can transform your in-store experience with audio-based AI insights.",
    url: "/contact/",
    site_name: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Pythia Scorecard team, demo and support"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Pythia Scorecard | Request a Demo or Get Support",
    description: "Schedule a demo or get support for Pythia Store's AI analytics.",
    images: ["/og-image.jpg"],
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
