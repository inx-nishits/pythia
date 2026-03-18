"use client";

import Image from "next/image";
import Link from "next/link";

const siteLinks = [
  {
    title: "Pythia",
    links: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Contact Us',
        href: '/contact',
      },
      {
        name: 'Solutions',
        href: '/solutions/in-store-analytics',
      },
      {
        name: 'Resources',
        href: '/resources',
      },
      {
        name: 'Articles',
        href: '/articles',
      },
      {
        name: 'FAQ',
        href: '/faq',
      },
      {
        name: 'About',
        href: '/about',
      },
    ]
  },
  {
    title: "Policies",
    links: [
      {
        name: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        name: 'Terms & Conditions',
        href: '/terms-of-use',
      },
    ]
  }
]

function Footer() {
  return (
    <footer className="py-12 sm:py-16 lg:py-[72px] xl:py-[88px] px-4 sm:px-6 bg-[#f9fafb] border-t border-slate-200 text-slate-600 overflow-hidden relative min-w-0 w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-brand-teal/[0.06] rounded-full blur-[110px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full min-w-0">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-28 w-full justify-between items-start min-w-0">
          <div className="flex flex-col gap-5 w-full lg:max-w-[360px] min-w-0">
            <Link href={'/'} className="group">
              <Image 
                src={'/pythiaLogo.png'} 
                alt="Pythia Intelligence" 
                width={145} 
                height={50} 
                className="group-hover:opacity-80 transition-opacity" 
              />
            </Link>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              The in-store audio-intel device and dashboard for modern retail chains. Trusted by 100+ locations.
            </p>
            <div className="flex gap-4">
               {/* Placeholders for social if needed, but keeping text-only for now to avoid content change */}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 sm:gap-x-14 lg:gap-x-[72px] xl:gap-x-[110px] gap-y-10">
            {siteLinks.map((group, index) => (
              <div key={index} className="flex flex-col min-w-[120px] sm:min-w-[140px]">
                <p className="text-slate-900 text-[13px] font-semibold mb-4 uppercase tracking-[0.22em]">
                  {group.title}
                </p>
                <ul className="flex flex-col gap-3 text-[14px] font-medium">
                  {group.links.map((innerLink, i) => (
                    <li key={i}>
                      <Link 
                        href={innerLink?.href}
                        className="hover:text-brand-teal transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-brand-teal transition-colors" />
                        {innerLink?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.24em]">
              System Status: Operational
            </p>
          </div>
          
          <small className="text-slate-500 text-[12px] font-medium uppercase tracking-[0.24em] text-center md:text-right">
            ©2025 Pythia Scorecard. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
