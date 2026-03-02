import Footer from "./containers/Footer";
import Header from "./containers/Header";
import HeroSection from "./containers/HeroSection";
import HomeContact from "./containers/HomeContact";
import HowItWorks from "./containers/HowItWorks";
import MeetPythiaStore from "./containers/MeetPythiaStore";
import RetailSection from "./containers/RetailSection";
import WhatYouGet from "./containers/WhatYouGet";


export const metadata = {
  title: "Pythia Scorecard – Real-Time Retail AI Insights at Checkout",
  description: "Pythia is your in-store audio-intel device and dashboard. It captures in-store checkout conversations, analyses sentiment & behaviour with AI and gives retail chains real-time insights to prevent missed sales, staff burnout and poor customer experience.",
  keywords: [
    "retail AI",
    "in-store analytics",
    "checkout insights",
    "customer sentiment",
    "Pythia Scorecard",
    "real-time store insights",
    "staff performance analytics",
    "audio intelligence retail",
    "missed sale prevention",
    "retail operations optimization"
  ],
  openGraph: {
    title: "Pythia Scorecard – Real-Time Retail AI Insights at Checkout",
    description: "Capture what your stores don’t report. Pythia listens at the counter, analyses checkout interactions and delivers actionable insights in real time.",
    url: `${process.env.NEXT_PUBLIC_SITE}/`,
    site_name: "Pythia Scorecard",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pythia Store device analysing retail checkout conversations"
      }
    ],
    type: "website"
  }
};


export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <RetailSection />
        <MeetPythiaStore />
        <WhatYouGet />
        <HowItWorks />
        <HomeContact />
      </main>
      <Footer
      // link={
      //   <Link
      //     href="/contact"
      //     className="text-[16px] text-semibold hover:underline"
      //   >
      //     Contact
      //   </Link>
      // }
      />
    </div>
  );
}
