interface HowItWorksItemProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBackground: string;
  title: string;
  description: string;
  stepNumber: number;
}

function HowItWorksItem({
  icon,
  title,
  description,
  iconColor,
  iconBackground,
  stepNumber,
}: HowItWorksItemProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[800px] bg-white border border-brand-gray-border rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center p-6 lg:p-8 lg:w-[240px] bg-brand-gray-light border-b lg:border-b-0 lg:border-r border-brand-gray-border relative">
        <div className="absolute top-4 left-4 text-gray-300 font-bold text-4xl leading-none font-sans hidden lg:block">0{stepNumber}</div>
        <div className="flex items-center gap-4 lg:flex-col lg:gap-6 z-10 w-full lg:w-auto mt-0 lg:mt-6">
          <div className={`p-4 rounded-xl ${iconBackground} ${iconColor} flex items-center justify-center shadow-sm border border-brand-gray-border`}>
            {icon}
          </div>
          <h3 className="text-brand-navy text-[24px] lg:text-[28px] font-bold tracking-tight">{title}</h3>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-10 flex items-center">
        <p className="text-[16px] lg:text-[18px] text-gray-600 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}

export default HowItWorksItem;
