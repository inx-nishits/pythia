"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { Sections } from "@/app/sections";
import Button from "@/app/component/Button";
import Image from "next/image";
import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Activity,
  AlertTriangle,
  BarChart3,
  Users,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

/* ── SLIDES — each has its own content + image ── */
const slides = [
  {
    src: "https://www.pythiascorecard.com/desktop-meet-pythia-store.webp",
    badge: "Live Dashboard",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    dotColor: "bg-emerald-500",
    headline: "Real-time checkout intelligence",
    desc: "Every conversation at the counter, analysed instantly. Spot missed upsells and friction as they happen.",
    stat: { icon: <BarChart3 className="w-3.5 h-3.5" />, value: "$4.2K", label: "recovered / store / mo" },
  },
  {
    src: "https://www.pythiascorecard.com/desktop-meet-pythia-store.webp",
    badge: "Staff Analytics",
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    dotColor: "bg-indigo-500",
    headline: "Detect burnout before it's too late",
    desc: "AI surfaces staff frustration signals days before problems escalate — so you can act before they walk out.",
    stat: { icon: <Users className="w-3.5 h-3.5" />, value: "42%", label: "avg industry turnover" },
  },
  {
    src: "https://www.pythiascorecard.com/desktop-meet-pythia-store.webp",
    badge: "ROI Reports",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-200",
    dotColor: "bg-amber-500",
    headline: "Turn audio into measurable ROI",
    desc: "Every missed upsell and complaint is tracked, scored, and turned into a daily improvement playbook.",
    stat: { icon: <TrendingUp className="w-3.5 h-3.5" />, value: "92%", label: "upsell adoption rate" },
  },
];

/* ── Slide variants — whole card slides in/out ── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-40%" : "40%",
    opacity: 0,
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, -60]);

  /* 3-D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 100, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 100, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (r.left + r.width / 2));
    mouseY.set(e.clientY - (r.top + r.height / 2));
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* Slider */
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  const go = (idx: number, d: 1 | -1) => { setDir(d); setCurrent(idx); };
  const prev = () => go((current - 1 + slides.length) % slides.length, -1);
  const next = () => go((current + 1) % slides.length, 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => { setDir(1); setCurrent(c => (c + 1) % slides.length); }, 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      ref={containerRef}
      id={Sections.HeroSection}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center pt-20 pb-12 px-6 overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage:
          "linear-gradient(rgba(4,36,91,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(4,36,91,0.05) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    >
      {/* ══ BACKGROUND overlays (glows + dots) ══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Intersection dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(4,36,91,0.08) 1.5px, transparent 1.5px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Animated extra drift row */}
        <motion.div
          animate={{ y: [0, 56] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(4,36,91,0.02) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Emerald glow top-left */}
        <motion.div
          style={{ background: "rgba(16,185,129,0.18)", y: parallaxY }}
          className="absolute -top-40 -left-20 w-[500px] h-[400px] rounded-full blur-[140px]"
        />
        {/* Indigo glow right */}
        <div
          className="absolute top-[5%] right-[-8%] w-[380px] h-[340px] rounded-full blur-[120px]"
          style={{ background: "rgba(99,102,241,0.10)" }}
        />
        {/* Vignette: pure white in corners so grid softens at very edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 45%, transparent 60%, rgba(255,255,255,0.6) 100%)",
          }}
        />
      </div>

      {/* ══ LAYOUT: side by side ══ */}
      <div className="max-w-[1320px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-7">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live · 100+ Enterprise Chains
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                SOC 2 Compliant
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.8rem,5vw,4.8rem)] font-black tracking-[-0.04em] leading-[0.9] text-slate-950 uppercase"
            >
              Hear the
              <br />
              <span className="relative">
                <span
                  style={{
                    background: "linear-gradient(90deg, #10b981, #14b8a6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  className="font-medium italic normal-case tracking-wide"
                >
                  Unreported
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-emerald-400/50 to-transparent"
                />
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-base md:text-[1.05rem] text-slate-500 leading-relaxed font-medium max-w-md"
            >
              Pythia listens to every checkout conversation and surfaces missed
              revenue, staff friction, and customer dissatisfaction —{" "}
              <strong className="text-slate-800 font-semibold">
                before it hits your P&amp;L.
              </strong>
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5"
            >
              {[
                { icon: <Zap className="w-3.5 h-3.5" />, value: "$4.2K", label: "/ store / mo" },
                { icon: <TrendingUp className="w-3.5 h-3.5" />, value: "92%", label: "upsell adoption" },
                { icon: <Activity className="w-3.5 h-3.5" />, value: "98%", label: "accuracy" },
              ].map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-[12px] font-bold text-slate-700 shadow-sm"
                >
                  <span className="text-emerald-500">{s.icon}</span>
                  <span className="font-black text-slate-900">{s.value}</span>
                  <span className="text-slate-400 font-medium">{s.label}</span>
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-3"
            >
              <a href="https://calendly.com/pythia/15-minute-demo" target="_blank" rel="noreferrer">
                <Button
                  id="hero-cta-trial"
                  className="group h-12 px-7 text-[15px] font-bold bg-slate-950 text-white hover:bg-emerald-500 rounded-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-slate-900/15 whitespace-nowrap"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
              <a href={`#${Sections.DemoAssets}`}>
                <Button
                  id="hero-cta-demo"
                  className="group h-12 px-6 text-[15px] font-bold bg-white text-slate-800 border border-slate-200 hover:border-emerald-400 rounded-xl flex items-center gap-2.5 transition-all shadow-sm whitespace-nowrap"
                >
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <Play className="w-2.5 h-2.5 fill-slate-700 group-hover:fill-emerald-600 transition-colors translate-x-px" />
                  </span>
                  Watch Demo
                </Button>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="text-[12px] text-slate-400 font-medium"
            >
              No card required · Setup in under 5 minutes · Cancel anytime
            </motion.p>
          </div>

          {/* ── RIGHT COLUMN: Product showcase ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY, transformPerspective: 1400 }}
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); mouseX.set(0); mouseY.set(0); }}
          >
            {/* Glow */}
            <div className="absolute -inset-4 bg-emerald-400/8 blur-3xl rounded-3xl -z-10" />

            {/* Browser chrome card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_64px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.04)] overflow-hidden">

              {/* Browser top bar */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-200/70">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="mx-auto max-w-[200px] bg-white border border-slate-200 rounded-md px-2.5 py-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="text-[10px] text-slate-400 font-mono truncate">
                      app.pythiascorecard.com
                    </span>
                  </div>
                </div>
              </div>

              {/* ══ SLIDING CONTENT + IMAGE ══
                  The entire block (content header + image) slides as one unit */}
              <div className="overflow-hidden relative">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.div
                    key={current}
                    custom={dir}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.18 },
                    }}
                  >
                    {/* ── Content header strip (slides with image) ── */}
                    <div className="px-5 py-4 border-b border-slate-100 bg-white">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${slides[current].badgeColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${slides[current].dotColor}`} />
                            {slides[current].badge}
                          </span>
                          <h3 className="text-[15px] font-bold text-slate-900 leading-snug">
                            {slides[current].headline}
                          </h3>
                          <p className="text-[12px] text-slate-500 leading-snug max-w-xs">
                            {slides[current].desc}
                          </p>
                        </div>
                        {/* Stat */}
                        <div className="shrink-0 text-right">
                          <div className="flex items-center justify-end gap-1 text-emerald-600 mb-0.5">
                            {slides[current].stat.icon}
                            <span className="text-lg font-black text-slate-900">
                              {slides[current].stat.value}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {slides[current].stat.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── Screenshot image ── */}
                    <div className="relative aspect-[16/9] bg-slate-100">
                      <Image
                        src={slides[current].src}
                        alt={slides[current].headline}
                        fill
                        className="object-cover"
                        priority={current === 0}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Progress bar — sits outside AnimatePresence so it doesn't slide */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-200/50 z-10">
                  <motion.div
                    key={`prog-${current}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: paused ? 0 : 4.5, ease: "linear" }}
                    style={{ originX: 0 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Floating insight card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                opacity: { delay: 1.3, duration: 0.6 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
              }}
              className="absolute -bottom-6 -left-6 z-30 hidden xl:block"
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-4 w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Real-time Insight
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-slate-800 leading-snug">
                  "Missed upsell on premium add-on — 3rd time this shift."
                </p>
                <div className="mt-2.5 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[72%] bg-emerald-400 rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: [0, 7, 0], opacity: 1 }}
              transition={{
                opacity: { delay: 1.5, duration: 0.6 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
              }}
              className="absolute -top-6 -right-5 z-30 hidden xl:block"
            >
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl p-4 w-[196px]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    Urgent Alert
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-white leading-snug">
                  High frustration detected · Pump #4
                </p>
                <p className="text-[10px] text-slate-500 mt-1.5">12:44 PM · Store #12</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* ══ SLIDER NAV — centred row below the entire two-column grid ══ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          {/* Dot indicators */}
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}: ${s.badge}`}
                className="flex items-center gap-2 group"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-slate-900"
                      : "w-2 h-2 bg-slate-300 group-hover:bg-slate-400"
                  }`}
                />
                <span
                  className={`hidden sm:block text-[10px] font-bold uppercase tracking-widest transition-colors ${
                    i === current ? "text-slate-700" : "text-slate-300 group-hover:text-slate-500"
                  }`}
                >
                  {s.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="h-8 px-4 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <span className="text-[11px] text-slate-400 font-medium tabular-nums">
              {current + 1} / {slides.length}
            </span>
            <button
              onClick={next}
              aria-label="Next slide"
              className="h-8 px-4 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all active:scale-95"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
