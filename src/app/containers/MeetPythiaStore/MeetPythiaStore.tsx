import { Sections } from "@/app/sections";
import Image from "next/image";

function MeetPythiaStore() {
  return (
    <section
      id={Sections.MeetPythiaStore}
      className="desktop:scroll-mt-[67px] mobile:scroll-mt-[-50px] flex flex-col items-center justify-center desktop:gap-[77px] mobile:gap-[90px] desktop:pt-[70px] desktop:pb-[70px] px-[20px] mobile:pt-[232px] mobile:pb-[252px] bg-(image:--meet-pythia-store-background)"
    >
      <div className="flex flex-col gap-[20px] justify-center items-center desktop:w-[486px] mobile:w-full">
        <h2 className="text-purple-60 desktop:text-[48px] mobile:text-[36px] font-bold desktop:leading-[64px] mobile:leading-[42px] text-center">
          Meet Pythia – your ears at the counter.
        </h2>
        <p className="text-pythia-black text-[20px] leading-[32px] text-center">
          Pythia is a simple device that listens to what’s said at the counter,
          analyzes it with AI, and gives you real-time insights and
          recommendations — all in a clear dashboard. All it needs is Wi-Fi.
        </p>
      </div>
      <Image
        src="/desktop-meet-pythia-store.webp"
        alt="Meet Pythia Store"
        width={912}
        height={586}
        className="object-cover mobile:hidden desktop:block"
      />
      <Image
        src="/mobile-meet-pythia-store.png"
        alt="Meet Pythia Store"
        width={390}
        height={586}
        className="object-cover desktop:hidden mobile:block"
      />
    </section>
  );
}

export default MeetPythiaStore;
