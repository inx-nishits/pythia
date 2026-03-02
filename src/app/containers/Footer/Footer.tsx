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
    ]
  },
  {
    title: "Policies",
    links: [
      {
        name: 'Privacy Policy',
        href: '/policies/privacy-policy',
      },
      {
        name: 'Terms Of Use',
        href: '/policies/terms-of-use',
      },
    ]
  }
]

function Footer() {
  return (
    <footer className="py-[16px] pt-[28px] px-[40px] bg-purple-60 text-white flex flex-col items-center justify-between gap-[18px]">
      <div className="flex items-start gap-auto w-full justify-between max-w-[1280px] mx-[auto] gap-[40px]">
        <Link href={'/'}>
          <Image src={'/pythiaLogoW.png'} alt="pythiaLogo" width={165} height={55} />
        </Link>
        <div className="flex flex-row gap-[50px] mobile:gap-[20px]">
          {siteLinks.map((group, index) => (
            <div key={index}>
              <p className="text-white desktop:text-[18px] mobile:text-[15px] font-bold mb-[12px]">
                {group.title}
              </p>
              <ul className="text-sm">
                {group.links.map((innerLink, i) => (
                  <li className="mb-[8px] hover:underline desktop:text-[14px] mobile:text-[12px] nowrap whitespace-nowrap" key={i} >
                    <Link href={innerLink?.href} target="_blank">
                      {innerLink?.name}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
          ))}
        </div>
        {/* {link} */}
      </div>
      <small className="text-grey-2 text-[12px] self-start opacity-50 max-w-[1280px] mx-[auto] w-full">
        ©2025 Copyright. All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;
