"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageSquare, Send, ShieldCheck } from "lucide-react";
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
    <main className="relative py-24 lg:py-40 px-6 bg-slate-900 overflow-hidden min-h-screen flex items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
      <div className="absolute top-0 right-0 w-[50%] h-full bg-emerald-500/5 blur-[120px] -z-10" />

      <div className="max-w-[1320px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                 <ShieldCheck className="w-4 h-4 text-emerald-500" />
                 <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Support Response &lt; 24h</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95]"
              >
                Get in touch. <br />
                <span className="text-slate-400 italic">We&apos;re here to help.</span>
              </motion.h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Have a question, need a demo, or want to learn how Pythia can transform your retail operations? Drop us a line.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
               {contactInfo.map((item, i) => {
                 const Icon = item.icon;
                 return (
                  <motion.a
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                       <p className="text-base font-bold text-white tracking-tight truncate">{item.value}</p>
                    </div>
                  </motion.a>
                 );
               })}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="bg-white rounded-[48px] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-indigo-500" />
              
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Send a message</h3>
                  <p className="text-slate-500 font-medium">We usually respond within one business day.</p>
                </div>
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-slate-50 items-center justify-center text-slate-300">
                  <Send className="w-6 h-6" />
                </div>
              </div>
              
              <PythiaForm
                hiddenFields={{}}
                submitText="Send message"
                submitClassName="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] bg-emerald-500 text-slate-900 border-none mt-4"
                formClassName="flex flex-col gap-6 w-full"
                requestedDemo={false}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
