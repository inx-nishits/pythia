import Image from "next/image";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

export const metadata = {
  title: "About Pythia Scorecard",
  description: "Learn about the mission behind Pythia Scorecard - giving retail leaders a clear, objective view of every customer interaction through AI-driven audio intelligence.",
  openGraph: {
    title: "About Pythia Scorecard",
    description: "Retail operations insights built for leaders who care about every interaction.",
    url: "/about/",
  },
  alternates: {
    canonical: "/about/",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pythia Scorecard",
    description: "Retail operations insights built for leaders who care about every interaction.",
  }
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8fafc]">
        <section className="px-4 sm:px-6 pt-10 sm:pt-14 lg:pt-[120px] pb-[80px]">
          <div className="max-w-[1100px] mx-auto space-y-10">
          <header className="space-y-4 max-w-2xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
              About
            </span>
            <h1 className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tighter leading-[1.05]">
              Pythia Scorecard is built for operators who care about every interaction.
            </h1>
            <p className="text-slate-600 text-[15px] leading-relaxed">
              The product exists to give retail leaders a clear, objective view of what really happens
              at the counter without adding more manual work to their day. It combines hardware,
              audio intelligence, and focused reporting to help teams coach better and act faster.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_minmax(0,0.9fr)] gap-10 items-start">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
                  Why Pythia exists
                </h2>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  Retail operators have no shortage of dashboards and reports, but they still struggle
                  to see the full picture of what customers experience. Pythia was created to close that
                  gap by listening at the counter and giving leaders an always-on, conversational view of their
                  stores.
                </p>
              </div>
              <div className="space-y-3">
                <h2 className="text-[20px] font-extrabold text-[#0F172A] tracking-tight">
                  Who it is built for
                </h2>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  The platform is designed for multi-location convenience and fuel retailers, as well as
                  independent operators who want enterprise-level visibility without enterprise-level
                  complexity. Every part of the experience aims to meet operators where they already are.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                  <Image
                    src="/pythiaLogo.png"
                    alt="Pythia Intelligence"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-500 uppercase tracking-[0.22em]">
                    Focus
                  </p>
                  <p className="text-[14px] font-semibold text-[#0F172A]">
                    Always-on, audio-driven store intelligence
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                The goal is simple: help operators reduce turnover, remove customer friction, and
                recover revenue that would otherwise stay invisible. Pythia blends device, software, and
                service into a single, focused experience.
              </p>
            </div>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

