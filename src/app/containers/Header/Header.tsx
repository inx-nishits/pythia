"use client";

import Button from "@/app/component/Button";
import { Sections } from "@/app/sections";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── NAV DATA ─────────────────────────────────────────── */
const navLinks = [
  { label: "Why It Matters", href: `/#${Sections.WhyItMatters}`,    sectionId: Sections.WhyItMatters },
  { label: "Device",         href: `/#${Sections.MeetPythiaStore}`, sectionId: Sections.MeetPythiaStore },
  { label: "How It Works",   href: `/#${Sections.HowItWorks}`,      sectionId: Sections.HowItWorks },
  { label: "Intelligence",   href: `/#${Sections.WhatYouGet}`,      sectionId: Sections.WhatYouGet },
  { label: "Resources",      href: "/resources",   sectionId: null },
  { label: "About Us",       href: "/about",       sectionId: null },
  { label: "FAQ",            href: "/faq",         sectionId: null },
  { label: "Contact Us",     href: "/contact",     sectionId: null },
];

/* ── DESKTOP NAV ITEM ─────────────────────────────────── */
function NavItem({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className="relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap group"
    >
      <span
        className={`absolute inset-0 rounded-full transition-all duration-200 ${
          active ? "shadow-sm" : "bg-transparent group-hover:bg-slate-100/80"
        }`}
        style={active ? { backgroundColor: "#04245b" } : {}}
      />
      {active && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -top-0.5 right-1.5 w-1 h-1 rounded-full bg-emerald-400"
        />
      )}
      <span
        className={`relative transition-colors duration-200 ${
          active ? "text-white" : "text-slate-500 group-hover:text-slate-900"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

/* ── HEADER ───────────────────────────────────────────── */
export default function Header() {
  const [scrolled,       setScrolled]       = useState(false);
  const [hidden,         setHidden]         = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState<string | null>(null);
  const lastScrollY  = useRef(0);
  const pathname     = usePathname();

  /* ── Auto-hide on scroll down, reveal on scroll up ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (y < 80) {
        // Always visible near top
        setHidden(false);
      } else if (y > lastScrollY.current + 6) {
        // Scrolling DOWN → hide
        setHidden(true);
        setMobileOpen(false);  // close mobile menu if open
      } else if (y < lastScrollY.current - 4) {
        // Scrolling UP → reveal
        setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Scroll-spy: observe each section ── */
  useEffect(() => {
    if (pathname !== "/") { setActiveSection(null); return; }

    const sectionIds = navLinks.map(l => l.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [pathname]);

  /* ── Active state ── */
  const isActive = (link: typeof navLinks[0]) => {
    if (link.sectionId) return pathname === "/" && activeSection === link.sectionId;
    return pathname === link.href || pathname.startsWith(link.href + "/");
  };

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ════════════════════════════════════════
          HEADER BAR
      ════════════════════════════════════════ */}
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-[padding] duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5">
          <div
            className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-2.5 transition-all duration-500 ${
              scrolled
                ? "bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
                : "bg-white/40 backdrop-blur-sm border border-white/50"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/pythiaLogo.png"
                alt="Pythia Intelligence"
                width={110}
                height={32}
                className="w-auto h-8 object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {navLinks.map(link => (
                <NavItem key={link.label} href={link.href} active={isActive(link)}>
                  {link.label}
                </NavItem>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="https://app.pythiascorecard.com"
                className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100/70"
              >
                Log in
              </Link>
              <a href={`/#${Sections.Contact}`} className="hidden sm:block">
                <Button
                  style={{ backgroundColor: "#04245b" }}
                  className="text-white hover:bg-emerald-500 hover:opacity-100 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 group shadow-lg"
                >
                  Book a Demo
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>

              {/* Mobile hamburger */}
              <button
                type="button"
                id="mobile-menu-toggle"
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════
          FULLSCREEN MOBILE MENU (slides from right)
      ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-[210] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <Link href="/" onClick={() => setMobileOpen(false)}>
                  <Image
                    src="/pythiaLogo.png"
                    alt="Pythia Intelligence"
                    width={100}
                    height={30}
                    className="w-auto h-7 object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between px-4 py-4 rounded-2xl text-lg font-semibold transition-all ${
                          isActive(link)
                            ? "text-white"
                            : "text-slate-800 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                        style={isActive(link) ? { backgroundColor: "#04245b" } : {}}
                      >
                        {link.label}
                        <ChevronRight
                          className={`w-4 h-4 transition-all group-hover:translate-x-0.5 ${
                            isActive(link) ? "text-emerald-400" : "text-slate-300 group-hover:text-slate-500"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Bottom CTA */}
              <div className="px-5 py-6 border-t border-slate-100 space-y-3">
                <Link
                  href="https://app.pythiascorecard.com"
                  className="flex items-center justify-center h-12 rounded-2xl border border-slate-200 text-slate-700 text-base font-semibold hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <a
                  href={`/#${Sections.Contact}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    className="w-full h-12 rounded-2xl text-white text-base font-bold flex items-center justify-center gap-2 group shadow-lg"
                    style={{ backgroundColor: "#04245b" }}
                  >
                    Book a Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
