"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sections } from "@/app/sections";
import Button from "@/app/component/Button";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    subline: "Every sigh, complaint, or missed sale is a clue. Pythia captures and analyzes checkout interactions to give you always-on recommendations on what to fix, before it costs you.",
    pillars: ["Always-on insights", "Retain top talent", "Recover revenue"],
    image: {
      src: "https://www.pythiascorecard.com/desktop-meet-pythia-store.webp",
      alt: "Pythia dashboard, always-on retail insights at checkout",
    },
  },
  {
    subline: "See what’s really happening at the counter, so you can coach, reward, and fix before it’s too late.",
    pillars: ["Always-on insights", "Retain top talent", "Recover revenue"],
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop",
      alt: "Retail checkout and store operations",
    },
  },
  {
    subline: "Turn checkout conversations into a daily playbook. No more guessing, no more missed signals.",
    pillars: ["Always-on insights", "Retain top talent", "Recover revenue"],
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      alt: "Analytics and insights dashboard",
    },
  },
];

const SLIDE_DURATION_MS = 5500;

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <section
      id={Sections.HeroSection}
      className="relative pt-[72px] sm:pt-[96px] lg:pt-[88px] pb-[56px] lg:pb-[72px] px-3 sm:px-4 lg:px-6 overflow-hidden min-w-0 w-full"
    >
      <div className="max-w-[1400px] mx-auto w-full min-w-0">


        {/* Desktop: side-by-side | Mobile: stacked with image high */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center lg:min-h-0 min-w-0">
          {/* Left: copy + CTAs (on desktop) | On mobile: headline then image then copy */}
          <div className="flex flex-col order-2 lg:order-1 text-center lg:text-left min-w-0">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-[28px] min-[400px]:text-[32px] sm:text-[48px] lg:text-[56px] xl:text-[64px] leading-[1.05] font-extrabold text-[#0F172A] tracking-tight text-balance mb-4 lg:mb-5 break-words"
            >
              Get the insights{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-coral italic">your stores don’t report.</span>
            </motion.h1>

            {/* On mobile: show image slider here (above subline) so it's above fold */}
            <div className="lg:hidden order-first mb-6 -mx-2">
              <HeroImageSlider activeSlide={activeSlide} />
            </div>

            {/* Slider: subline + pillars (fixed height so nav below never overlaps) */}
            <div className="flex flex-col items-center lg:items-start w-full">
              <div className="relative w-full min-h-[140px] sm:min-h-[128px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center lg:items-start justify-center"
                  >
                    <p className="text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed text-slate-600 max-w-[540px] lg:max-w-none tracking-tight font-medium mb-4">
                      {HERO_SLIDES[activeSlide].subline}
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                      {HERO_SLIDES[activeSlide].pillars.map((label, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Navigation: dots + arrows + counter (own row, never overlapped) */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 pt-4 border-t border-slate-200/60 w-full justify-center lg:justify-start min-w-0" aria-label="Hero slide navigation">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white text-slate-600 hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setActiveSlide(i)}
                        className={`rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 ${
                          i === activeSlide
                            ? "w-8 h-3 bg-brand-teal"
                            : "w-3 h-3 bg-slate-300 hover:bg-slate-400 border-2 border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white text-slate-600 hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5 flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-sm font-bold text-slate-600 tabular-nums min-w-[3ch]">
                  {activeSlide + 1} / {HERO_SLIDES.length}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mt-6 flex-wrap"
            >
              <a href="https://calendly.com/pythia/15-minute-demo" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <Button className="w-full h-12 sm:h-14 px-6 lg:px-8 py-4 text-[15px] lg:text-[16px] font-semibold bg-brand-teal text-brand-navy hover:bg-brand-teal-hover rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center whitespace-nowrap cursor-pointer">
                  Book a 15-Minute Demo
                </Button>
              </a>
              <a href={`#${Sections.DemoAssets}`} className="group w-full sm:w-auto">
                <Button className="w-full h-12 sm:h-14 px-6 lg:px-8 py-4 text-[15px] lg:text-[16px] font-semibold transition-all duration-200 flex items-center justify-center gap-3 rounded-2xl whitespace-nowrap bg-slate-100 text-slate-700 border border-slate-200/60 hover:bg-brand-teal/10 hover:border-brand-teal/30 hover:text-[#0F172A] cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-teal group-hover:border-brand-teal group-hover:shadow-md transition-colors">
                    <Play className="w-3.5 h-3.5 text-brand-teal ml-0.5 fill-brand-teal group-hover:text-white group-hover:fill-white transition-colors" />
                  </div>
                  Watch a 60-Second Demo
                </Button>
              </a>
              <a href={`#${Sections.Contact}`} className="w-full sm:w-auto">
                <Button className="w-full h-12 sm:h-14 px-6 lg:px-8 py-4 text-[15px] lg:text-[16px] font-semibold bg-[#0F172A] text-white hover:bg-slate-900 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center whitespace-nowrap cursor-pointer">
                  See it in action
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right: main image slider (desktop only - above the fold beside copy) */}
          <div className="hidden lg:block order-2 relative min-w-0">
            <HeroImageSlider activeSlide={activeSlide} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImageSlider({ activeSlide }: { activeSlide: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative group min-w-0 w-full"
    >
      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-brand-teal/5 to-blue-500/5 rounded-[24px] lg:rounded-[40px] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />
      <div className="relative rounded-[20px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-slate-200/80 shadow-[0_32px_64px_rgba(15,23,42,0.12)] aspect-[16/10] lg:aspect-[4/3] bg-slate-200 w-full min-w-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 bg-slate-200"
          >
            <Image
              src={HERO_SLIDES[activeSlide].image.src}
              alt={HERO_SLIDES[activeSlide].image.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeSlide === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* Progress bar at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/30 overflow-hidden">
          <motion.div
            className="h-full bg-brand-teal"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeSlide + 1) / HERO_SLIDES.length) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;
