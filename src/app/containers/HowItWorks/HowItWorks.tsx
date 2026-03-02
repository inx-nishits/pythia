import HowItWorksItem from "@/app/component/HowItWorksItem";
import LeftDesktopBracketIcon from "@/app/assets/left-desktop-bracket.svg";
import RightDesktopBracketIcon from "@/app/assets/right-desktop-bracket.svg";
import SendMailIcon from "@/app/assets/send-mail.svg";
import AiIcon from "@/app/assets/ai.svg";
import UserSettingsIcon from "@/app/assets/user-settings.svg";
import { Sections } from "@/app/sections";

const howItWorksItems: {
  icon: React.ReactNode;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
}[] = [
  {
    icon: <SendMailIcon />,
    iconColor: "text-blue-40",
    iconBackground: "bg-blue-2",
    title: "Capture",
    description:
      "Pythia records all customer and staff conversations at the checkout counter, automatically and securely.",
  },
  {
    icon: <AiIcon />,
    iconColor: "text-grey-40",
    iconBackground: "bg-grey-2",
    title: "Analyze",
    description:
      "Our AI reviews each interaction to detect tone, sentiment, feedback, and patterns — in real time.",
  },
  {
    icon: <UserSettingsIcon />,
    iconColor: "text-orange-40",
    iconBackground: "bg-orange-2",
    title: "Act",
    description:
      "You get insights and recommendations to improve service, support your team, and fix problems fast.",
  },
];

function HowItWorks() {
  return (
    <section
      id={Sections.HowItWorks}
      className="overflow-hidden flex flex-col items-center justify-center w-full gap-[77px] desktop:pt-[100px] desktop:pb-[120px] desktop:px-[20px] mobile:pt-[60px] mobile:pb-[60px] mobile:px-[20px]"
    >
      <h2 className="text-purple-60 text-[48px] font-bold">How it works</h2>

      <div className="flex justify-center items-center w-full gap-[10px]">
        <LeftDesktopBracketIcon className="mobile:hidden desktop:block shrink-0" />
        <div className="flex flex-col desktop:gap-[20px] mobile:gap-[24px]">
          {howItWorksItems.map((item, index) => (
            <HowItWorksItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              iconColor={item.iconColor}
              iconBackground={item.iconBackground}
            />
          ))}
        </div>
        <RightDesktopBracketIcon className="mobile:hidden desktop:block shrink-0" />
      </div>
    </section>
  );
}

export default HowItWorks;
