interface FeatureCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="desktop:w-[288px] mobile:w-full mobile:max-w-[390px] h-full flex flex-col items-center py-[40px] px-[24px] rounded-[20px] gap-[40px] border-[2px] border-purple-20 shadow-feature-card bg-(image:--feature-card-background)">
      <div className="w-[100px] h-[100px] bg-purple-60 rounded-[100%] flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="text-[24px] font-bold text-center">{title}</h3>
    </div>
  );
}

export default FeatureCard;
