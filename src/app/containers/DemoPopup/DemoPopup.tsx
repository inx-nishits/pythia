"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PythiaForm from "../PythiaForm/PythiaForm";
import Image from "next/image";

export default function DemoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already seen/closed it in this session to prevent annoyance
    const dismissed = sessionStorage.getItem("demo_popup_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("demo_popup_dismissed", "true");
  };

  if (!hasShown && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[900px] bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.3)] flex flex-col md:flex-row min-h-[400px] max-h-[90dvh] sm:max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[50] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:bg-white hover:scale-105 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </button>

            {/* Left Side: Visual */}
            <div className="hidden md:block relative w-full md:w-[48%] h-[120px] sm:h-[240px] md:h-auto overflow-hidden bg-slate-50 flex-shrink-0">
              <Image
                src="/popup-visual.png"
                alt="Retail checkout intelligence"
                fill
                className="object-cover object-left md:object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent md:hidden" />
            </div>

            {/* Right Side: Content & Form */}
            <div className="flex-1 p-5 sm:p-8 md:p-10 flex flex-col justify-center overflow-y-auto pb-6">
              <div className="mb-6">
                <h3 className="text-[28px] sm:text-[32px] font-extrabold text-[#0F172A] mb-2 tracking-tight leading-tight">
                  Schedule Your Demo
                </h3>
                <p className="text-slate-500 text-[15px] sm:text-[16px] font-medium leading-relaxed">
                  Join 100+ locations using Pythia Intelligence.
                </p>
              </div>

              <div className="flex-1">
                <PythiaForm
                  hiddenFields={{ message: true }}
                  submitText="Book My Demo"
                  submitClassName="w-full mt-2 py-5 text-[18px] font-extrabold shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  formClassName="flex flex-col gap-5 w-full"
                  requestedDemo={true}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
