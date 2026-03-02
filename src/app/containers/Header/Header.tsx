import Button from "@/app/component/Button";
import { Sections } from "@/app/sections";
import Image from "next/image";
import Link from "next/link";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  sm?: boolean
}

const NavItem = ({ href, children, sm }: NavItemProps) => {
  return (
    <li className="py-[12px] wide:px-[16px] desktop:px-[8px] mobile:px-[4px]">
      <Link
        href={href}
        className={`block hover:underline text-[14px] leading-[19px] font-bold shrink-[0] wide:text-[15px] desktop:text-[14px] whitespace-nowrap ${sm ? 'mobile:text-[13px]' : 'mobile:text-[15px]'}`}
      >
        {children}
      </Link>
    </li>
  );
};

const navItems = [
  <NavItem href={`#${Sections.WhyItMatters}`} key={Sections.WhyItMatters}>
    Why It Matters
  </NavItem>,
  <NavItem href={`#${Sections.MeetPythiaStore}`} key={Sections.MeetPythiaStore}>
    Meet Pythia
  </NavItem>,
  <NavItem href={`#${Sections.WhatYouGet}`} key={Sections.WhatYouGet}>
    Features
  </NavItem>,
  <NavItem href={`#${Sections.Contact}`} key={Sections.Contact}>
    Demo
  </NavItem>,
];

function Header() {
  return (
    <header className="sticky top-0 w-full flex items-center justify-between  bg-white desktop:flex-row mobile:flex-col desktop:shadow-header z-100">
      <div className="flex items-center w-full justify-between px-[20px] py-[12px] max-w-[1280px] mx-[auto]">
        <Link
          href="/"
          aria-label="Pythia homepage"
        >
          <Image src={'/pythiaLogo.png'} alt="pythiaLogo" width={145} height={50} />
        </Link>

        <nav className="flex items-center gap-0px desktop:ml-[0] mobile:ml-auto">
          <ul className="mobile:hidden desktop:flex items-center gap-0 text-purple-60">
            <>{navItems.map((navItem) => navItem)}</>
          </ul>
          <ul className="mobile:px-[8px] desktop:px-[0px] text-purple-60" >
            <NavItem href="/contact" sm={true}>Contact</NavItem>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={`#${Sections.Contact}`}>
            <Button className="shrink-0 desktop:text-[14px] leading-[15px] rounded-[34px] whitespace-nowrap desktop:px-[16px] desktop:py-[9px]  mobile:px-[12px] mobile:py-[6px] mobile:text-[12px]">
              Request a Demo
            </Button>
          </a>
          <a href={'https://app.pythiascorecard.com'}>
            <Button className="shrink-0 desktop:text-[14px] leading-[15px] rounded-[34px] border-2 bg-white !text-purple-60 hover:!text-white focus:!text-white desktop:px-[16px] desktop:py-[9px] mobile:px-[12px] mobile:py-[6px] mobile:text-[12px]">
              Login
            </Button>
          </a>
        </div>

      </div>
      <ul className="mobile:flex desktop:hidden items-start justify-between w-full px-[20px] py-[12px] bg-grey-10 gap-x-[10px] text-purple-80">
        <>{navItems.map((navItem) => navItem)}</>
      </ul>
    </header>
  );
}

export default Header;
