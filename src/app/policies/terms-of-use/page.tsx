"use client";

import Link from 'next/link';
import { motion } from "framer-motion";
import { Scale, ArrowLeft } from "lucide-react";

export default function TermsOfUse() {
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
                <Scale className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Legal</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight"
              >
                Terms of <br />
                <span className="text-slate-400 italic">Use.</span>
              </motion.h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Effective Date: July 2, 2025</p>
            </div>

            <div className="prose prose-slate prose-lg max-w-none text-slate-500 font-medium leading-relaxed space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">1. Acceptance of the Terms</h2>
                <p>These terms of use are entered into by and between you and Pythia Store LLC (&quot;Pythia Store,&quot; &quot;Pythia Scorecard,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). The following terms and conditions govern your access to and use of http://app.pythiastore.ai, including any content, functionality, and services offered on or through the Website.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">2. Changes to Terms</h2>
                <p>We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter. Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">3. Intellectual Property Rights</h2>
                <p>The Website and its entire contents, features, and functionality (including, but not limited to, all information, software, text, displays, images, video and audio, and the design, selection, and arrangement thereof), are owned by Pythia Store, its licensors, or other providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">4. Prohibited Uses</h2>
                <p>You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website in any way that violates any applicable federal, state, local, or international law or regulation. Additionally, you agree not to use any robot, spider, or other automatic device to access the Website for any purpose.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">5. Disclaimer of Warranties</h2>
                <p>YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">6. Limitation on Liability</h2>
                <p>TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL PYTHIA STORE, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE.</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">7. Governing Law</h2>
                <p>All matters relating to the Website and these Terms of Use shall be governed by and construed in accordance with the internal laws of the State of Idaho without giving effect to any choice or conflict of law provision or rule.</p>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8 p-8 rounded-[40px] bg-slate-50 border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Contents</h3>
              <ul className="space-y-4">
                {["Acceptance", "Changes", "Intellectual Property", "Prohibited Uses", "Warranties", "Liability", "Governing Law"].map((item, i) => (
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
