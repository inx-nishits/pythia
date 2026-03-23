"use client";

import Button from "@/app/component/Button";
import { Sections } from "@/app/sections";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, children, isActive, onClick }: NavItemProps) => {
  return (
    <li className="px-2 xl:px-4 shrink-0">
      <Link
        href={href}
        onClick={onClick}
        className={`text-[13px] xl:text-[14px] font-bold tracking-tight whitespace-nowrap border-b-2 transition-colors ${
          isActive
            ? "text-brand-navy border-brand-teal"
            : "text-slate-500 border-transparent hover:text-brand-teal hover:border-brand-teal/60"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const NEAR_TOP_PX = 100;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>("");

  useEffect(() => {
    let scrollEndTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      setScrolled(y > 20);

      if (mobileOpen) {
        setHeaderHidden(false);
      } else if (y <= NEAR_TOP_PX) {
        setHeaderHidden(false);
      } else if (delta > 0) {
        setHeaderHidden(true);
      } else if (delta < 0) {
        setHeaderHidden(false);
      }

      lastScrollY.current = y;

      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        lastScrollY.current = window.scrollY;
        if (window.scrollY <= NEAR_TOP_PX) setHeaderHidden(false);
      }, 100);
    };

    const onScrollEnd = () => {
      lastScrollY.current = window.scrollY;
      if (window.scrollY <= NEAR_TOP_PX) setHeaderHidden(false);
    };

    lastScrollY.current = window.scrollY;
    if (window.scrollY <= NEAR_TOP_PX) setHeaderHidden(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    if (typeof window !== "undefined" && "onscrollend" in window) {
      window.addEventListener("scrollend", onScrollEnd);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollEndTimer);
      if (typeof window !== "undefined" && "onscrollend" in window) {
        window.removeEventListener("scrollend", onScrollEnd);
      }
    };
  }, [mobileOpen]);

  // Set active nav based on current route for top-level pages
  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/resources")) setActiveItem("resources");
    else if (pathname.startsWith("/articles")) setActiveItem("articles");
    else if (pathname.startsWith("/about")) setActiveItem("about");
    else if (pathname.startsWith("/faq")) setActiveItem("faq");
    else if (pathname.startsWith("/contact")) setActiveItem("contact");
    else {
      // On home and other root-level routes, default to first section
      setActiveItem("why");
    }
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mobileOpen) {
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
      };
    }

    return;
  }, [mobileOpen]);

  return (
    <>
      {/* Spacer so content doesn't jump when header is fixed */}
      <div className="h-12 sm:h-14 lg:h-[72px] shrink-0" aria-hidden="true" />
      <header
        style={{ transform: headerHidden ? "translateY(-100%)" : "translateY(0)" }}
        className={`fixed top-0 left-0 right-0 w-full z-[100] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          mobileOpen
            ? "bg-white border-b border-slate-200 shadow-sm"
            : scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-sm"
            : "bg-white/70 backdrop-blur-xl border-b border-transparent"
        }`}
      >
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 w-full min-w-0">
        <div className="flex items-center justify-between py-2 lg:py-3 gap-2 sm:gap-4 min-w-0">
          <Link href="/" className="shrink-0 flex items-center min-w-0">
            <Image
              src="/pythiaLogo.png"
              alt="Pythia Intelligence"
              width={130}
              height={40}
              className="transition-opacity hover:opacity-80 w-auto h-8 sm:h-9 lg:h-10 object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block min-w-0 shrink">
            <ul className="flex items-center flex-wrap gap-0 lg:gap-1 xl:gap-2">
              <NavItem
                href={`/#${Sections.WhyItMatters}`}
                isActive={activeItem === "why" && pathname === "/"}
                onClick={() => setActiveItem("why")}
              >
                Why It Matters
              </NavItem>
              <NavItem
                href={`/#${Sections.MeetPythiaStore}`}
                isActive={activeItem === "device" && pathname === "/"}
                onClick={() => setActiveItem("device")}
              >
                Device
              </NavItem>
              <NavItem
                href={`/#${Sections.HowItWorks}`}
                isActive={activeItem === "how" && pathname === "/"}
                onClick={() => setActiveItem("how")}
              >
                How it works
              </NavItem>
              <NavItem
                href={`/#${Sections.WhatYouGet}`}
                isActive={activeItem === "intelligence" && pathname === "/"}
                onClick={() => setActiveItem("intelligence")}
              >
                Intelligence
              </NavItem>
              <NavItem
                href={`/#${Sections.Industries}`}
                isActive={activeItem === "industries" && pathname === "/"}
                onClick={() => setActiveItem("industries")}
              >
                Industries
              </NavItem>
              <NavItem
                href="/resources"
                isActive={activeItem === "resources" && pathname.startsWith("/resources")}
                onClick={() => setActiveItem("resources")}
              >
                Resources
              </NavItem>
              <NavItem
                href="/about"
                isActive={activeItem === "about" && pathname.startsWith("/about")}
                onClick={() => setActiveItem("about")}
              >
                About Us
              </NavItem>
              <NavItem
                href="/faq"
                isActive={activeItem === "faq" && pathname.startsWith("/faq")}
                onClick={() => setActiveItem("faq")}
              >
                FAQ
              </NavItem>
              <NavItem
                href="/contact"
                isActive={activeItem === "contact" && pathname.startsWith("/contact")}
                onClick={() => setActiveItem("contact")}
              >
                Contact Us
              </NavItem>
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="https://app.pythiascorecard.com" className="hidden sm:block shrink-0">
              <Button className="bg-transparent border border-slate-200 text-brand-navy hover:bg-slate-50 px-3 sm:px-4 py-2 rounded-full text-xs lg:text-sm font-semibold whitespace-nowrap">
                Login
              </Button>
            </Link>
            <a href={`/#${Sections.Contact}`} className="hidden sm:block shrink-0">
              <Button className="px-3 sm:px-4 lg:px-6 py-2.5 bg-brand-teal text-brand-navy hover:bg-brand-teal-hover rounded-full font-semibold text-xs lg:text-sm shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-0.5 whitespace-nowrap">
                Book a Demo
              </Button>
            </a>
            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label="Toggle navigation"
              className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white/80 hover:bg-slate-50 transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X className="w-4 h-4 text-slate-700" />
              ) : (
                <Menu className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu (slide-in from right) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[110] bg-white lg:hidden"
          >
            <div className="ml-auto flex flex-col min-h-screen h-full w-full px-6 pt-5 pb-8 overflow-y-auto bg-white">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  aria-label="Close navigation"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="w-4 h-4 text-slate-700" />
                </button>
              </div>

              <div className="flex-1 mt-2 min-h-0 overflow-y-auto no-scrollbar">
              <nav>
                <ul className="flex flex-col gap-5 text-left">
                <li>
                  <a
                    href={`/#${Sections.WhyItMatters}`}
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "why" && pathname === "/"
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("why");
                      setMobileOpen(false);
                    }}
                  >
                    Why It Matters
                  </a>
                </li>
                <li>
                  <a
                    href={`/#${Sections.MeetPythiaStore}`}
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "device" && pathname === "/"
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("device");
                      setMobileOpen(false);
                    }}
                  >
                    Device
                  </a>
                </li>
                <li>
                  <a
                    href={`/#${Sections.HowItWorks}`}
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "how" && pathname === "/"
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("how");
                      setMobileOpen(false);
                    }}
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href={`/#${Sections.WhatYouGet}`}
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "intelligence" && pathname === "/"
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("intelligence");
                      setMobileOpen(false);
                    }}
                  >
                    Intelligence
                  </a>
                </li>
                <li>
                  <a
                    href={`/#${Sections.Industries}`}
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "industries" && pathname === "/"
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("industries");
                      setMobileOpen(false);
                    }}
                  >
                    Industries
                  </a>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "resources" && pathname.startsWith("/resources")
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("resources");
                      setMobileOpen(false);
                    }}
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "about" && pathname.startsWith("/about")
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("about");
                      setMobileOpen(false);
                    }}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "faq" && pathname.startsWith("/faq")
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("faq");
                      setMobileOpen(false);
                    }}
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className={`block text-[18px] font-semibold transition-colors ${
                      activeItem === "contact" && pathname.startsWith("/contact")
                        ? "text-brand-navy"
                        : "text-slate-800"
                    }`}
                    onClick={() => {
                      setActiveItem("contact");
                      setMobileOpen(false);
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
                </ul>
              </nav>
            </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://app.pythiascorecard.com"
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full bg-transparent border border-slate-200 text-brand-navy hover:bg-slate-50 px-4 py-2.5 rounded-full text-sm font-semibold">
                    Login
                  </Button>
                </a>
                <a
                  href={`/#${Sections.Contact}`}
                  className="flex-1"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full px-4 py-3 bg-brand-teal text-brand-navy hover:bg-brand-teal-hover rounded-full font-semibold text-sm shadow-md hover:shadow-lg">
                    Book a Demo
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}

export default Header;
