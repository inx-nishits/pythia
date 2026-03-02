import Link from "next/link";
import Footer from "../containers/Footer";
import PythiaForm from "../containers/PythiaForm";
import Image from "next/image";


export const metadata = {
  title: "Contact Pythia Scorecard – Request a Demo or Get Support",
  description: "Reach out to the Pythia Scorecard team to schedule a demo, ask questions about the device and dashboard, or discuss how we can help your retail operations benefit from AI-powered in-store insights.",
  keywords: [
    "contact Pythia Scorecard",
    "schedule demo retail AI",
    "Pythia support",
    "in-store analytics demo",
    "retail operations AI inquiry",
    "retail technology contact"
  ],
  openGraph: {
    title: "Contact Pythia Scorecard – Request a Demo or Get Support",
    description: "Talk to us about how Pythia can transform your in-store experience with audio-based AI insights.",
    url: `${process.env.NEXT_PUBLIC_SITE}/contact`,
    site_name: "Pythia Scorecard",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Pythia Scorecard team – demo and support"
      }
    ],
    type: "website"
  }
};


const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center gap-[8px] px-[12px] py-[12px] bg-grey-5 rounded-[6px] border-[1px] border-grey-10 border-solid">
    <span className="text-[13px] leading-[13px] text-grey-40">{label}</span>
    <p className="text-purple-100 text-[16px] font-medium leading-[16px]">
      {value}
    </p>
  </div>
);

export default function Contact() {
  return (
    <>
      <header className="flex items-center justify-between  bg-white desktop:flex-row mobile:flex-col desktop:shadow-header z-10">
        <div className="flex items-center w-full justify-between px-[20px] py-[12px] max-w-[1180px] mx-[auto]">
          <Link
            href="/"
            aria-label="Pythia homepage"
          >
            <Image src={'/pythiaLogo.png'} alt="pythiaLogo" width={135} height={45} />
          </Link>

          <p className="text-[15px] leading-[15px] font-semibold text-purple-100">
            Contact
          </p>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full bg-grey-2 desktop:gap-[56px] mobile:gap-[42px] desktop:pt-[56px] desktop:pb-[88px] mobile:pt-[46px] mobile:pb-[80px]">
        <h1 className="desktop:text-[48px] text-purple-60 desktop:leading-[54px] desktop:w-[644px] font-bold mobile:text-[36px] mobile:leading-[42px] mobile:w-[312px] text-center">
          Get in touch and see how we can help you.
        </h1>
        <PythiaForm
          hiddenFields={{}}
          submitText={"Send message"}
          submitClassName="mt-[19px] w-full"
          formClassName="flex flex-col gap-[8px] desktop:w-[326px] mobile:w-[100%] px-[20px] items-center"
          requestedDemo={false}
        />

        <div className="flex desktop:flex-row mobile:flex-col gap-[8px] items-center">
          <InfoItem label="Email" value="contact@pythiastore.com" />
          <InfoItem label="Address" value="123 Redbud Lane, Tulsa, OK 74104" />
        </div>
      </main>
      <Footer
      // link={
      //   <Link href="/" className="text-[16px] text-semibold hover:underline">
      //     Home
      //   </Link>
      // }
      />
    </>
  );
}
