import ConversationIcon from "@/app/assets/conversation.svg";
import ConversationMobileIcon from "@/app/assets/conversation-mobile.svg";
import CustomerServiceIcon from "@/app/assets/customer-service.svg";
import CustomerServiceMobileIcon from "@/app/assets/customer-service-mobile.svg";
import DiscountIcon from "@/app/assets/discount.svg";
import DiscountMobileIcon from "@/app/assets/discount-mobile.svg";
import Image from "next/image";
import { Sections } from "@/app/sections";

function RetailSection() {
  return (
    <section
      id={Sections.WhyItMatters}
      className="mobile:scroll-mt-[134px] desktop:scroll-mt-[67px] relative flex flex-col desktop:gap-[44px] mobile:gap-[77px] px-[20px] desktop:pt-[100] mobile:pt-[60] bg-grey-5 items-center"
    >
      <div className="flex flex-col gap-[46px] desktop:items-center mobile:items-start">
        <h2 className="desktop:w-[762px] desktop:text-[48px] desktop:leading-[64px] desktop:text-center font-bold mobile:w-full mobile:text-[36px] mobile:leading-[42px] mobile:text-left">
          <span className="text-orange-60">Your stores are leaking money.</span>{" "}
          <span className="text-purple-80">
            You just can’t hear it happening.
          </span>
        </h2>
        <p className="text-purple-80 text-[20px] leading-[32px] font-medium desktop:w-[620px] mobile:w-full desktop:text-center mobile:text-left">
          It’s not always obvious. A line gets too long. A customer walks out
          frustrated. Your best cashier is burning out. The moments that hurt
          your business most are the ones no one tells you about — until it’s
          too late.
        </p>
      </div>

      <div className="overflow-hidden relative flex flex-col items-center">
        <div className="relative desktop:w-[800px] desktop:h-[340px] mobile:w-[320px] mobile:h-[130px] flex justify-center desktop:mt-[90px] mobile:mt-[45px]">
          <div className="desktop:w-[124px] desktop:h-[124px] mobile:w-[60px] mobile:h-[60px] rounded-full bg-purple-60 absolute desktop:top-[9px] desktop:left-[104px] mobile:top-0 mobile:left-[30px] border-solid desktop:border-[9px] mobile:border-[4px] border-grey-5 z-[10] flex items-center justify-center">
            <ConversationIcon className="desktop:block mobile:hidden" />
            <ConversationMobileIcon className="desktop:hidden mobile:block" />
          </div>
          <div className="desktop:w-[124px] desktop:h-[124px] mobile:w-[60px] mobile:h-[60px] rounded-full bg-purple-60 absolute desktop:top-[9px] desktop:right-[104px] mobile:top-0 mobile:right-[30px] border-solid desktop:border-[9px] mobile:border-[4px] border-grey-5 z-[10] flex items-center justify-center">
            <CustomerServiceIcon className="desktop:block mobile:hidden" />
            <CustomerServiceMobileIcon className="desktop:hidden mobile:block" />
          </div>
          <div className="desktop:w-[180px] desktop:h-[180px] mobile:w-[90px] mobile:h-[90px] rounded-full bg-orange-60 absolute desktop:top-[-90px] mobile:top-[-45px] border-solid desktop:border-[9px] mobile:border-[4px] border-grey-5 z-[10] flex items-center justify-center">
            <DiscountIcon className="desktop:block mobile:hidden" />
            <DiscountMobileIcon className="desktop:hidden mobile:block" />
          </div>

          <div className="desktop:w-[800px] desktop:h-[800px] mobile:w-[320px] mobile:h-[320px] rounded-full absolute flex items-center justify-center border-solid border-white desktop:border-[7px] mobile:border-[4px] desktop:outline-[5px] mobile:outline-[3px] outline-purple-60 outline-solid overflow-hidden">
            <Image
              priority
              src="/hero.webp"
              alt=""
              width={896}
              height={597}
              className="desktop:block mobile:hidden top-[-240px] absolute object-cover scale-[1.2]"
            />
            <Image
              priority
              src="/hero.webp"
              alt=""
              width={437}
              height={291}
              className="desktop:hidden mobile:block top-[-100px] absolute object-cover scale-[1.2]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RetailSection;
