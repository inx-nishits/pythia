"use client";

import Header from "../containers/Header";
import Footer from "../containers/Footer";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Button from "../component/Button";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { buildThankYouUrl, getDemoSourceFromThankYouPath } from "../utils/demoSource";

const SOURCE_LABELS: Record<string, string> = {
  homepage: "Homepage",
  chatbot: "Chatbot",
  product: "Product Intelligence",
};

export default function ThankYouContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);

  const hasChecked = useRef(false);
  const source = getDemoSourceFromThankYouPath(pathname);
  const sourceLabel = source ? SOURCE_LABELS[source] ?? source : null;

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    if (typeof window !== 'undefined') {
      const fromDemo = sessionStorage.getItem("from_demo_booking");
      if (!fromDemo) {
        router.replace("/");
      } else {
        setIsAllowed(true);
        if (!source && fromDemo !== "true") {
          router.replace(buildThankYouUrl(fromDemo));
        }
        // Clear the flag so refreshing the page will also redirect
        sessionStorage.removeItem("from_demo_booking");
      }
    }
  }, [router, source]);

  useEffect(() => {
    if (!isAllowed) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isAllowed]);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown, router]);

  if (!isAllowed) {
    return null;
  }

  return (
    <div className="flex flex-col min-w-0 w-full max-w-[100vw] overflow-x-hidden min-h-screen bg-brand-navy">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-4 overflow-hidden relative">
        {/* Background ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 space-y-10"
          >
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-2 relative mx-auto">
              {/* Ripple effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-brand-teal rounded-full"
              />
              <CheckCircle2 className="w-14 h-14 text-brand-teal relative z-10" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl font-extrabold !text-white tracking-tight">
                You&apos;re All Set!
              </h1>
              <p className="text-slate-300 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed font-medium text-center">
                Your demo has been successfully scheduled. We&apos;ve sent a calendar invitation and confirmation details to your email address.
              </p>
              {sourceLabel ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/25 bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-brand-teal">
                  Source: {sourceLabel}
                </div>
              ) : null}
            </div>

            <div className="pt-6 flex flex-col items-center space-y-4">
              <Link href="/">
                <Button className="px-10 py-4 bg-brand-teal text-brand-navy hover:bg-brand-teal-hover rounded-full font-bold text-lg shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] cursor-pointer">
                  Return to Home
                </Button>
              </Link>
              <p className="text-slate-400 text-sm animate-pulse">
                Redirecting to home in {countdown}s...
              </p>
            </div>

            <p className="text-slate-500 text-sm">
              Didn&apos;t get the email? Check your spam folder or <Link href="/contact" className="text-brand-teal hover:underline">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
