"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";

const siteLinks = [
  {
    title: "Platform",
    links: [
      { name: 'Home', href: '/' },
      { name: 'Solutions', href: '/solutions/in-store-analytics' },
      { name: 'Device', href: '/#meet-pythia-store' },
      { name: 'Process', href: '/#how-it-works' },
    ]
  },
  {
    title: "Company",
    links: [
      { name: 'About', href: '/about' },
      { name: 'Resources', href: '/resources' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ]
  },
  {
    title: "Legal",
    links: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Use', href: '/terms-of-use' },
    ]
  }
]

function Footer() {
  return (
    <footer className="py-24 px-6 bg-slate-950 border-t border-slate-800/50 overflow-hidden text-white">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 mb-20">
          <div className="space-y-10">
            <Link href={'/'} className="inline-block">
              <div className="bg-white px-4 py-2 rounded-xl inline-flex items-center justify-center">
                <Image 
                  src={'/pythiaLogo.png'} 
                  alt="Pythia Intelligence" 
                  width={130} 
                  height={40} 
                  className="w-auto h-8" 
                />
              </div>
            </Link>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-sm">
              The in-store audio-intel device and dashboard for modern retail chains.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                <Twitter size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                <Linkedin size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                <Github size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {siteLinks.map((group, index) => (
              <div key={index} className="space-y-6">
                <p className="text-xs font-black text-white uppercase tracking-widest">
                  {group.title}
                </p>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href}
                        className="text-base text-slate-400 hover:text-emerald-400 font-medium transition-colors flex items-center gap-1 group"
                      >
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 border-t border-slate-800/50 flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status: Optimal</span>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Pythia Scorecard. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
