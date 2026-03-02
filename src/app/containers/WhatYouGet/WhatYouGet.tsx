import FeatureCard from "@/app/component/FeatureCard";
import TimeIcon from "@/app/assets/time.svg";
import InsightsIcon from "@/app/assets/insights.svg";
import AiIcon from "@/app/assets/ai.svg";
import PlugIcon from "@/app/assets/plug.svg";
import { Sections } from "@/app/sections";

const features: {
  icon: React.ReactNode;
  yellowTitle: string;
  blackTitle: string;
}[] = [
  {
    icon: <TimeIcon />,
    yellowTitle: "Real-time analysis",
    blackTitle: "of in-store customer feedback",
  },
  {
    icon: <InsightsIcon />,
    yellowTitle: "Insights",
    blackTitle: "into staff performance and behavior patterns",
  },
  {
    icon: <AiIcon width={52} height={52} />,
    yellowTitle: "AI-powered recommendations",
    blackTitle: "to improve your operations",
  },
  {
    icon: <PlugIcon />,
    yellowTitle: "Quick and easy",
    blackTitle: "plug-and-play setup – just connect to Wi-Fi",
  },
];

function WhatYouGet() {
  return (
    <section
      id={Sections.WhatYouGet}
      className="desktop:scroll-mt-[67px] mobile:scroll-mt-[134px] flex flex-col items-center justify-center w-full pt-[100px] pb-[120px] bg-purple-60 desktop:gap-[77px] mobile:gap-[56px]"
    >
      <h2 className="text-white desktop:text-[48px] mobile:text-[36px] font-bold px-[20px] text-center">
        Get the answers you’ve been missing.
      </h2>
      <ul className="flex desktop:flex-row mobile:flex-col desktop:gap-[18px] mobile:gap-[8px] flex-wrap px-[20px] justify-center items-stretch">
        {features.map((feature, index) => (
          <li key={index} className="flex">
            <FeatureCard
              icon={feature.icon}
              title={
                <>
                  <span className="text-orange-60">{feature.yellowTitle}</span>{" "}
                  <span className="text-pythia-black">
                    {feature.blackTitle}
                  </span>
                </>
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default WhatYouGet;
