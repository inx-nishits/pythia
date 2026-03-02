import Button from "@/app/component/Button";
import Image from "next/image";
import "./heroSection.css";
import AiIcon from "@/app/assets/ai.svg";
import UserSettingsIcon from "@/app/assets/user-settings.svg";
import MailIcon from "@/app/assets/send-mail.svg";
import { Sections } from "@/app/sections";

function HeroSection() {
  return (
    <section
      id={Sections.HeroSection}
      className="flex desktop:flex-row mobile:flex-col desktop:justify-center desktop:gap-[160px] mobile:items-center desktop:pt-[116px] mobile:pt-[32px] desktop:pb-[256px] mobile:pb-[80px] mobile:gap-[50px] px-[20px]"
    >
      <div className="flex flex-col desktop:w-[486px] mobile:w-full mobile:items-center desktop:items-start">
        <h1 className="desktop:text-[48px] desktop:leading-[64px] desktop:mb-[20px] desktop:text-left font-bold text-purple-60 mobile:text-[32px] mobile:leading-[40px] mobile:text-center mobile:mb-[16px]">
          Get the insights your stores don’t report.
        </h1>
        <p className="desktop:text-[20px] desktop:leading-[32px] desktop:text-left desktop:mb-[46px] mobile:leading-[26px] mobile:text-[16px] text-pythia-black mobile:text-center mobile:mb-[38px]">
          Every sigh, complaint, or missed sale is a clue. Pythia captures and
          analyzes checkout interactions to give you real-time recommendations
          on what to fix, before it costs you.
        </p>
        <a href={`#${Sections.Contact}`}>
          <Button className="desktop:w-fit mobile:w-[240px]">
            See it in action
          </Button>
        </a>
      </div>

      <div className="hero-section-image-container relative shrink-0">
        <Image
          src="/hero-cropped.webp"
          fetchPriority="high"
          alt=""
          width={545}
          height={545}
          className="absolute top-0 left-0 w-full h-full object-cover object-[75%] rounded-[20px]"
        />

        <div className="flex flex-col absolute hero-section-features-container desktop:gap-[4px] mobile:gap-[2px]">
          <div className="flex bg-white hero-section-feature shadow-hero-feature w-fit">
            <span className="flex items-center py-[2px] px-[4px] gap-[4px] bg-grey-2 text-grey-80 rounded-[6px] desktop:text-[13px] desktop:leading-[13px] font-medium mobile:text-[7px] mobile:text-[7px]">
              <AiIcon color="#A6ACA5" /> AI analyzing
            </span>
          </div>
          <div className="flex bg-white hero-section-feature shadow-hero-feature w-fit">
            <span className="flex items-center py-[2px] px-[4px] gap-[4px] bg-orange-2 text-orange-80 rounded-[6px] desktop:text-[13px] desktop:leading-[13px] font-medium mobile:text-[7px] mobile:text-[7px]">
              <UserSettingsIcon color="#E0AC4C" /> Pending admin review
            </span>
          </div>
          <div className="flex bg-white hero-section-feature shadow-hero-feature w-fit">
            <span className="flex items-center py-[2px] px-[4px] gap-[4px] bg-blue-2 text-blue-80 rounded-[6px] desktop:text-[13px] desktop:leading-[13px] font-medium mobile:text-[7px] mobile:text-[7px]">
              <MailIcon color="#70A1CA" /> Sent to manager
            </span>
          </div>
        </div>

        <div className="hero-section-wave-container absolute bg-white flex items-center px-[20px] shadow-hero-wave">
          <Image
            src="/wave.png"
            alt=""
            width={353}
            height={85}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
