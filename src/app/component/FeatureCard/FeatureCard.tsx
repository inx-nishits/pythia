interface FeatureCardProps {
  icon: React.ReactNode;
  title: React.ReactNode;
}

function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="w-full lg:w-[288px] h-full flex flex-col items-center p-8 rounded-[24px] gap-8 border border-brand-gray-border shadow-[0_4px_30px_rgba(0,0,0,0.03)] bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
      <div className="w-[80px] h-[80px] bg-brand-gray-light rounded-full flex items-center justify-center text-brand-navy shadow-sm border border-brand-gray-border">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center tracking-tight leading-snug text-brand-navy">{title}</h3>
    </div>
  );
}

export default FeatureCard;
