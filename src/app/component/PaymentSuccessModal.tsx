"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentSuccessModal({ isOpen, onClose }: PaymentSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center px-4 sm:px-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-xl bg-white rounded-[32px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.2)] overflow-hidden z-10"
          >
            {/* Top decorative gradient */}
            <div className="h-2 w-full bg-gradient-to-r from-brand-teal via-cyan-400 to-brand-teal" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 sm:p-12 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mb-6"
              >
                <span className="text-4xl">🎉</span>
              </motion.div>

              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4">
                Payment Successful!
              </h2>
              
              <div className="text-slate-500 text-base leading-relaxed space-y-4 mb-8">
                <p>
                  Welcome to Pythia! We are setting up your Organization workspace right now.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-base md:text-lg text-left">
                  <p className="font-bold text-[#0F172A] mb-2 text-lg md:text-xl">Next Step:</p>
                  <p className="text-slate-600 leading-relaxed">
                    Check your email inbox (and spam folder, just in case). We've just sent an email with your temporary password and a link to log in.
                  </p>
                </div>
              </div>

              <Link
                href="https://dev.d1epsbs0ekh6x3.amplifyapp.com/login/owner"
                className="flex items-center justify-center w-full rounded-2xl font-bold text-lg py-4 bg-brand-navy text-white hover:bg-slate-800 shadow-xl transition-all duration-300"
              >
                Go to Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
