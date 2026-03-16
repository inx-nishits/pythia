"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="pt-32 lg:pt-48 pb-24 lg:pb-40 px-6">
      <div className="max-w-[1320px] mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-emerald-500 transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-[1fr_300px] gap-20">
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100"
              >
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Legal</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
              >
                Privacy <br />
                <span className="text-slate-400 italic">Policy.</span>
              </motion.h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Last modified: July 2, 2025</p>
            </div>

            <div className="prose prose-slate prose-lg max-w-none text-slate-500 font-medium leading-relaxed space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">1. Introduction</h2>
                <p>Pythia Store LLC (&ldquo;Pythia Store dba Pythia Scorecard,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website http://www.pythiascorecard.com/ and our practices for collecting, using, maintaining, protecting, and disclosing that information.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">2. Children Under the Age of 13</h2>
                <p>Our Website is not intended for children under 13 years of age. No one under age 13 may provide any information to or on the Website. We do not knowingly collect personal information from children under 13.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">3. Information We Collect</h2>
                <p>We collect several types of information from and about users of our Website, including information by which you may be personally identified, such as your name and email address (&ldquo;personal information&rdquo;); information that is about you but individually does not identify you; and/or information about your internet connection and equipment.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">4. How We Use Your Information</h2>
                <p>We use information that we collect about you or that you provide to us, including any personal information: to present our Website and its contents to you; to provide you with information, products, or services that you request from us; to fulfill any other purpose for which you provide it; and to carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">5. Disclosure of Your Information</h2>
                <p>We may disclose aggregated information about our users without restriction. We may disclose personal information that we collect or you provide as described in this privacy policy: to our subsidiaries and affiliates; to contractors, service providers, and other third parties we use to support our business; to a buyer or other successor in the event of a merger; and to fulfill the purpose for which you provide it.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">6. Your State Privacy Rights</h2>
                <p>State consumer privacy laws may provide their residents with additional rights regarding our use of their personal information. Depending on your state of residence, you may have rights such as the right to know what personal information we collect and how we use it; the right to request access to, correction of, or deletion of your personal information.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">7. Contact Information</h2>
                <p>To ask questions or comment about this privacy policy and our privacy practices, contact us at: <Link href="mailto:info@pythiascorecard.com" className="text-emerald-500 hover:underline">info@pythiascorecard.com</Link></p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8 p-8 rounded-[40px] bg-slate-50 border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Contents</h3>
              <ul className="space-y-4">
                {["Introduction", "Children's Privacy", "Data Collection", "Data Usage", "Disclosure", "State Rights", "Contact"].map((item, i) => (
                  <li key={i}>
                    <button className="text-sm font-bold text-slate-400 hover:text-emerald-500 transition-colors text-left uppercase tracking-widest">
                      {i + 1}. {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
