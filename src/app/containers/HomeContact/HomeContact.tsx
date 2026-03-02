import Image from "next/image";
import "./HomeContact.css";
import { Sections } from "@/app/sections";
import PythiaForm from "../PythiaForm/PythiaForm";

function HomeContact() {
  return (
    <section className="home-contact-padding flex desktop:flex-row mobile:flex-col-reverse items-center justify-around desktop:gap-[126px] mobile:gap-[40px] bg-grey-5 overflow-hidden">
      <div
        id={Sections.Contact}
        className="scroll-mt-[168px] flex flex-col desktop:w-[326px] mobile:w-full shrink-[1]"
      >
        <h2 className="text-purple-60 text-[48px] font-bold leading-[54px]">
          Fix what your store reports never show.
        </h2>
        <p className="text-pythia-black text-[16px] leading-[28px] mt-[20px]">
          <span className="font-semibold">Book a free demo </span>and see how
          Pythia helps you catch what’s slipping — before it turns into bad
          reviews, missed targets, or team turnover.
        </p>
        <PythiaForm
          hiddenFields={{ message: false }}
          submitText="Book a demo"
          submitClassName="w-[205px] mt-[27px]"
          formClassName="flex flex-col gap-[8px] mt-[27px] items-center"
          requestedDemo={true}
        />
      </div>

      <div className="home-contact-right-container relative bg-purple-60 shrink-0 desktop:rounded-[18px] mobile:rounded-[10px] desktop:ml-[0px] mobile:ml-[106px]">
        <div className="overflow-hidden absolute top-0 left-0 w-full h-full">
          <Image
            src="/form-image.png"
            alt=""
            width="880"
            height="565"
            className="home-contact-inner-image absolute object-cover object-left desktop:top-[70px] desktop:left-[0px] mobile:top-[44px] mobile:left-[0px]"
          />
        </div>
        <Image
          src="/hero-cropped.webp"
          alt=""
          width="252"
          height="252"
          className="home-contact-left-image absolute desktop:rounded-[20px] mobile:rounded-[10px] object-cover border-[1px] border-white"
        />
      </div>
    </section>
  );
}

export default HomeContact;
