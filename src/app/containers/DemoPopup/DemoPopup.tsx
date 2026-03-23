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
            className="relative w-full max-w-[900px] bg-white rounded-[32px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.3)] flex flex-col md:flex-row min-h-[500px]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 md:bg-slate-100 md:hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Visual */}
            <div className="relative w-full md:w-[48%] h-[300px] md:h-auto overflow-hidden bg-slate-50">
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
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
              <div className="mb-8">
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
