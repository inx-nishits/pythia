"use client";

import { useState } from "react";
import Script from "next/script";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { ChevronDown, Check, Zap, LayoutDashboard, ShieldCheck, BarChart3, Users, ZapIcon, HeadphonesIcon, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionDiv, MotionSpan } from "@/app/component/MotionWrapper";
import { trackEvent } from "../utils/gtm";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";
import { DEMO_SOURCES, setDemoSource } from "@/app/utils/demoSource";
import { PopupModal } from "react-calendly";

const deviceDetails = [
  "Compact, tamper-resistant hardware designed for counter deployment",
  "Always-on audio capture with privacy-first edge processing",
  "Plug-and-play setup - no IT team or technician required",
  "Automatically syncs every session to your Pythia dashboard",
  "Regular over-the-air firmware updates included at no extra cost",
  "Built for convenience and retail environments",
];

const dashboardDetails = [
  "Store performance dashboard with intuitive visualisations",
  "AI-generated coaching insights surfaced per shift and per associate",
  "Multi-location roll-up views for area managers and executives",
  "Custom alerts and scheduled weekly digest emails",
  "Dedicated onboarding support and live chat during business hours",
  "Unlimited historical data access and CSV exports",
];

const pricingFaqs = [
  {
    question: "What is included in the $129 monthly fee?",
    answer: "The $129 fee covers everything you need: the Pythia Store edge-processing hardware, full access to the performance dashboard, unlimited user seats, all AI-driven insights, and continuous firmware updates. There are no extra 'per-feature' costs."
  },
  {
    question: "Are there any upfront setup or hardware costs?",
    answer: "No. Unlike traditional retail technology providers, Pythia does not charge for the hardware or the initial setup. We believe in earning your business through the value our insights provide every month, so we keep the barrier to entry as low as possible."
  },
  {
    question: "How does the 'per location' pricing work for chains?",
    answer: "Pricing is simple: $129 per month per physical store location. If you have 5 locations, your total is $645/month. For large chains (50+ locations), we offer enterprise volume discounts. Contact our sales team for a custom quote."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Yes. We offer flexible month-to-month billing. If you decide Pythia isn't the right fit for a particular location, you can cancel your subscription. We're confident in the ROI we deliver, so we don't lock you into long-term restrictive contracts."
  },
  {
    question: "Is there a limit to how many managers can access the data?",
    answer: "None at all. We encourage transparency and collaborative coaching. You can invite as many store managers, area supervisors, and corporate executives as you need. Everyone gets their own login with appropriate permission levels."
  },
  {
    question: "How long does it take to see the first ROI insights?",
    answer: "Immediately. Once the device is plugged in and connected to Wi-Fi, it begins processing checkout conversations. Most operators see actionable coaching trends and 'missed sale' patterns within the first 48 hours of deployment."
  }
];

const TOTAL_PRICE = 129;

function DetailAccordion({
  icon: Icon,
  label,
  details,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  details: string[];
  delay: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 text-sm font-bold text-[#0F172A] hover:bg-slate-100/70 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-brand-teal/10">
            <Icon className="w-3.5 h-3.5 text-brand-teal" strokeWidth={2.5} />
          </span>
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex text-slate-400"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="px-5 pb-5 pt-1 flex flex-col gap-3">
              {details.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed"
                >
                  <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-brand-teal/15">
                    <Check
                      className="w-2.5 h-2.5 text-brand-teal"
                      strokeWidth={3}
                    />
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingPage() {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Pythia Scorecard Professional Plan",
    "image": "https://pythia.store/og-image.jpg",
    "description": "Always-on retail AI insights with compact edge-processing hardware and a comprehensive performance dashboard.",
    "brand": {
      "@type": "Brand",
      "name": "Pythia"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://pythia.store/pricing/",
      "priceCurrency": "USD",
      "price": "129.00",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pricingFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Pricing", path: "/pricing/" },
  ]);

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  return (
    <>
      <Script id="pricing-product-schema" type="application/ld+json">
        {JSON.stringify(productSchema)}
      </Script>
      <Script id="pricing-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="pricing-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Header />
      <main className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-[120px] pb-12 sm:pb-20">
          <div className="max-w-[1000px] mx-auto">
            <header className="text-center space-y-6 mb-16">
              <MotionSpan
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-[0.2em]"
              >
                Pricing & Value
              </MotionSpan>
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-[#0F172A] text-4xl sm:text-5xl lg:text-7xl font-[900] tracking-tight leading-[1.05] max-w-4xl mx-auto">
                  Invest in <span className="text-brand-teal">Clarity</span>, Not Complexity.
                </h1>
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  Pythia provides a complete hardware-and-software ecosystem to capture, analyse, and act on your store interactions - all for one transparent monthly price.
                </p>
              </MotionDiv>
            </header>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Pricing Card Column */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <MotionDiv
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-brand-teal via-cyan-400 to-brand-teal" />

                  <div className="p-8 sm:p-12">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">Professional Plan</h2>
                        <p className="text-slate-500 text-sm">Everything you need for a single location.</p>
                      </div>
                      <div className="text-right relative">
                        <span className="absolute -top-6 right-1 inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                          As low as
                        </span>
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-5xl font-[900] text-[#0F172A] tracking-tighter">${TOTAL_PRICE}</span>
                          <span className="text-slate-400 font-semibold text-lg">/mo</span>
                        </div>
                        <p className="text-xs font-bold text-brand-teal uppercase tracking-widest mt-1">Billed Monthly</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <DetailAccordion
                        icon={Zap}
                        label="Pythia Store Device"
                        details={deviceDetails}
                        delay={0.3}
                      />
                      <DetailAccordion
                        icon={LayoutDashboard}
                        label="AI Analytics Dashboard"
                        details={dashboardDetails}
                        delay={0.4}
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("pricing_cta_click", {
                            plan: "professional",
                            price: String(TOTAL_PRICE),
                          });
                          setDemoSource(DEMO_SOURCES.pricing);
                          setIsCalendlyOpen(true);
                        }}
                        className="flex items-center justify-center gap-3 w-full rounded-2xl font-bold text-lg py-5 bg-brand-navy text-white hover:bg-slate-800 shadow-xl transition-all duration-300"
                      >
                        Book a Demo
                      </button>
                    </motion.div>

                    <p className="text-center text-xs text-slate-400 mt-6">
                      No credit card required to start. Cancel anytime.
                    </p>
                  </div>
                </MotionDiv>
              </div>

              {/* Value Props Column */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-8 lg:pt-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#0F172A]">Why it pays for itself</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Most retail managers only see <span className="text-[#0F172A] font-semibold italic">what</span> was sold. Pythia shows you <span className="text-[#0F172A] font-semibold italic">why</span> customers didn&apos;t buy.
                  </p>
                </div>

                <ul className="space-y-6">
                  {[
                    { title: "Identify Missed Upsells", desc: "See exactly which shifts are missing loyalty sign-ups or suggestive selling opportunities.", icon: BarChart3 },
                    { title: "Optimize Staff Training", desc: "Replace guess-work with data-driven coaching based on actual customer interactions.", icon: Users },
                    { title: "Privacy-First Intelligence", desc: "Local edge processing ensures customer privacy while delivering deep operational insights.", icon: ShieldCheck }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-brand-teal" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-sm mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The ROI of Real-Time Retail Insights Section */}
        <section className="px-4 sm:px-6 py-20 bg-white border-y border-slate-100">
          <div className="max-w-[1000px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight mb-6">
                  Turn Every Conversation <br />Into <span className="text-brand-teal">Growth Capital</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                  <p>
                    In the fast-paced retail environment, every second at the checkout is a missed opportunity or a won customer. Traditional metrics like conversion rates and average transaction value only tell half the story. They describe the outcome, but they ignore the process.
                  </p>
                  <p>
                    Pythia changes the game by analyzing the <span className="font-bold text-[#0F172A]">signal in the noise</span>. Our Professional Plan is designed for operators who want to move beyond spreadsheets and into real-time operational excellence. By identifying just one additional upsell per hour across a 10-store chain, Pythia doesn&apos;t just pay for itself—it becomes a significant revenue driver. Our edge AI doesn&apos;t just listen; it understands intent, detects frustration, and highlights when your staff is overwhelmed. This level of visibility allows for precision coaching that transforms &apos;average&apos; associates into top performers.
                  </p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-[40px] p-8 sm:p-12 border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10">
                  <div className="text-6xl font-[900] text-brand-teal mb-2">12%</div>
                  <div className="text-lg font-bold text-[#0F172A] mb-4">Average Increase in High-Margin Upsells</div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    Based on our data across convenience retail deployments, stores using Pythia see a measurable lift in suggestive selling within the first 60 days.
                  </p>
                  <div className="pt-8 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200" />
                      <div>
                        <div className="font-bold text-[#0F172A]">Area Manager, Major Fuel Brand</div>
                        <div className="text-xs text-slate-400">&quot;Pythia gave us the &apos;eyes&apos; we never had on second shift.&quot;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Checklist Section */}
        <FeatureChecklist />

        {/* FAQ Section */}
        <section className="px-4 sm:px-6 py-24 bg-[#0F172A] text-white overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-teal/5 rounded-full blur-[120px]" />

          <div className="max-w-[800px] mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-[900] tracking-tight !text-white">Common Questions</h2>
            </div>

            <div className="space-y-4">
              {pricingFaqs.map((faq, i) => (
                <FAQAccordion key={i} question={faq.question} answer={faq.answer} index={i} />
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
      <PopupModal
        url="https://calendly.com/nick-pythiascorecard/new-meeting"
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={
          typeof window !== "undefined"
            ? document.body
            : (undefined as unknown as HTMLElement)
        }
      />
    </>
  );
}

function FeatureChecklist() {
  const checklistData = [
    {
      title: "Hardware & Connectivity",
      icon: Package,
      features: [
        "Edge-AI Processing Unit for local privacy",
        "Tamper-Resistant, low-profile design",
        "Dual-Band Wi-Fi 6 & Ethernet support",
        "USB-C universal power delivery",
        "Physical Privacy Kill-Switch & LED status",
        "Over-the-air secure firmware updates"
      ]
    },
    {
      title: "Advanced Analytics",
      icon: BarChart3,
      features: [
        "Real-Time Sentiment & Tone Analysis",
        "Shift-by-Shift Performance Breakdowns",
        "Automated Missed Upsell Detection",
        "Associate-Level Coaching Insights",
        "Custom KPI Threshold Alerts",
        "Competitor Mention Tracking"
      ]
    },
    {
      title: "Operations & Scale",
      icon: ZapIcon,
      features: [
        "Unlimited Manager & User Seats",
        "Multi-Location Dashboard Rollups",
        "Automated Work Order Generation",
        "Weekly Executive Digest Emails",
        "Full CSV, PDF & API Data Exports",
        "Single Sign-On (SSO) Capability"
      ]
    },
    {
      title: "Enterprise Support",
      icon: HeadphonesIcon,
      features: [
        "24/7 Proactive System Monitoring",
        "Priority Live Chat & Phone Support",
        "Dedicated Onboarding Specialist",
        "Lifetime Hardware Warranty",
        "Custom Staff Training Resources",
        "Quarterly Business Reviews (QBR)"
      ]
    }
  ];

  return (
    <section className="px-4 sm:px-6 py-24 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-[900] text-[#0F172A] mb-6 tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive breakdown of the enterprise-grade features and professional capabilities included in every location subscription.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {checklistData.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-[#f8fafc] rounded-[40px] p-10 sm:p-12 border border-slate-100 hover:border-brand-teal/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start gap-8">
                <div className="w-16 h-16 rounded-[22px] bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <group.icon className="w-8 h-8 text-brand-teal" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0F172A] mb-8 tracking-tight">{group.title}</h3>
                  <ul className="grid sm:grid-cols-1 gap-x-12 gap-y-5">
                    {group.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-4 text-slate-600 text-sm leading-snug">
                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-teal/15 flex items-center justify-center">
                          <Check className="w-3 h-3 text-brand-teal" strokeWidth={3} />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordion({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-base sm:text-lg pr-8">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-brand-teal" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
