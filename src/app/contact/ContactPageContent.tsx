"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import PythiaForm from "../containers/PythiaForm";

const contactInfo = [
  {
    label: "Email",
    value: "contact@pythiastore.com",
    href: "mailto:contact@pythiastore.com",
    icon: Mail,
  },
  {
    label: "Office",
    value: "123 Redbud Lane, Tulsa, OK 74104",
    href: "https://maps.google.com/?q=123+Redbud+Lane+Tulsa+OK+74104",
    icon: MapPin,
  },
];

export default function ContactPageContent() {
  return (
    <main className="relative px-4 sm:px-6 py-20 sm:py-24 lg:py-[120px] xl:py-[160px] bg-brand-navy overflow-hidden min-h-[80vh]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-[#031a3d] to-[#020617] opacity-95 pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] w-[380px] h-[380px] bg-brand-teal/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] bg-brand-coral/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-14 lg:gap-20 relative z-10">
        {/* Left: copy + contact cards */}
        <div className="flex-1 min-w-0 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal/15 border border-brand-teal/25 text-brand-teal text-[11px] font-bold uppercase tracking-widest">
              Contact us
            </span>
            <h1 className="!text-white text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] font-extrabold leading-[1.08] tracking-tight max-w-xl">
              Get in touch. We&apos;re here to help.
            </h1>
            <p className="text-slate-300 text-lg lg:text-[20px] leading-relaxed max-w-lg">
              Have a question, need a demo, or want to learn how Pythia can transform your retail operations? Drop us a line and we&apos;ll get back to you quickly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-teal/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-teal group-hover:border-brand-teal transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-teal group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[15px] font-semibold text-white truncate group-hover:text-brand-teal transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[500px] xl:w-[520px] shrink-0 relative group"
        >
          <div className="absolute -inset-3 bg-brand-teal/15 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative bg-white rounded-[24px] lg:rounded-[28px] p-6 sm:p-8 lg:p-9 shadow-[0_32px_80px_rgba(4,36,91,0.25)] border border-slate-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-teal to-brand-coral" />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-brand-teal" />
              </div>
              <h2 className="text-[22px] lg:text-[26px] font-extrabold text-brand-navy tracking-tight">
                Send a message
              </h2>
            </div>
            <p className="text-slate-500 text-[14px] lg:text-[15px] mb-8">
              Fill out the form and we&apos;ll get back to you within one business day.
            </p>
            <PythiaForm
              hiddenFields={{}}
              submitText="Send message"
              submitClassName="w-full py-4 rounded-2xl text-[16px] font-bold bg-brand-teal text-brand-navy hover:bg-brand-teal-hover shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              formClassName="flex flex-col gap-5 w-full"
              requestedDemo={false}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
