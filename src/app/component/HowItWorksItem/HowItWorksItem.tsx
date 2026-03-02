interface HowItWorksItemProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
}

function HowItWorksItem({
  icon,
  title,
  description,
  iconColor,
  iconBackground,
}: HowItWorksItemProps) {
  return (
    <div className="flex desktop:flex-row mobile:flex-col desktop:gap-[6px] mobile:gap-[4px]">
      <div className="flex shadow-work-item desktop:flex-row items-center desktop:gap-[10px] desktop:justify-center desktop:w-[230px] desktop:h-[72px] desktop:rounded-tl-[12px] desktop:rounded-tr-[0px] desktop:rounded-br-[0px] desktop:rounded-bl-[12px] mobile:gap-[4px] mobile:justify-center mobile:w-[324px] mobile:h-[82px] mobile:flex-col mobile:rounded-tl-[12px] mobile:rounded-tr-[12px] mobile:rounded-br-[0px] mobile:rounded-bl-[0px]">
        <div
          className={`desktop:py-[2px] desktop:px-[4px] desktop:rounded-[6px] mobile:px-[5px] mobile:py-[3px] mobile:rounded-[8px] ${iconBackground} ${iconColor} flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="text-purple-60 text-[24px] font-bold">{title}</h3>
      </div>

      <div className="py-[12px] px-[20px] rounded-br-[12px] desktop:rounded-tl-[0px] desktop:rounded-bl-[0px] desktop:rounded-tr-[12px] shadow-work-item desktop:w-[490px] mobile:w-[324px] mobile:rounded-tl-[0px] mobile:rounded-bl-[12px] mobile:rounded-tr-[0px]">
        <p className="desktop:text-[18px] text-purple-60 leading-[24px] desktop:text-left mobile:text-[18px] mobile:text-center">
          {description}
        </p>
      </div>
    </div>
  );
}

export default HowItWorksItem;
