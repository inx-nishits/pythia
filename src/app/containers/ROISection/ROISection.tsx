import { MotionH2, MotionDiv } from "@/app/component/MotionWrapper";
import { TrendingUp, Users, DollarSign, Wallet } from "lucide-react";

const stats = [
  {
    label: "Potential Revenue Recovered",
    value: "$4,200",
    detail: "per store / month",
    icon: <DollarSign className="w-5 h-5 text-brand-teal" />,
    trend: "+24% Efficiency",
    trendDir: "up"
  },
  {
    label: "Staff Turnover Reduction",
    value: "18%",
    detail: "Average decrease in 6 months",
    icon: <Users className="w-5 h-5 text-blue-500" />,
    trend: "-12% Hiring costs",
    trendDir: "down"
  },
  {
    label: "Upsell Script Adoption",
    value: "92%",
    detail: "from 45% baseline",
    icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
    trend: "+47% Performance",
    trendDir: "up"
  },
  {
    label: "Customer Friction Score",
    value: "9.4/10",
    detail: "Post-Pythia average",
    icon: <Wallet className="w-5 h-5 text-rose-400" />,
    trend: "+3.2pts Improvement",
    trendDir: "up"
  }
];

function ROISection() {
  return (
    <section className="py-16 sm:py-20 lg:py-[120px] xl:py-[180px] px-4 sm:px-6 bg-[#0F172A] relative overflow-hidden min-w-0 w-full">
      {/* Abstract Grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1400px] mx-auto relative z-10 w-full min-w-0">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start">
          <div className="flex-1 space-y-6">
            <MotionH2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="!text-white text-[40px] lg:text-[60px] font-extrabold tracking-tighter leading-[1]"
            >
              The impact is <br/> 
              <span className="text-brand-teal italic">quantifiable.</span>
            </MotionH2>
            <p className="text-slate-200 text-lg lg:text-xl font-medium leading-relaxed max-w-lg">
              Every checkout interaction carries a monetary value. These example metrics show how Pythia can turn those moments into a data-driven ROI engine for your retail operations.
            </p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-[28px] hover:bg-white/[0.08] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {stat.icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trendDir === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-teal/10 text-brand-teal'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-[32px] font-extrabold !text-white tracking-tighter">{stat.value}</h3>
                  <p className="text-sm font-bold text-slate-100">{stat.label}</p>
                  <p className="text-[11px] text-slate-300 font-medium uppercase tracking-widest leading-loose">{stat.detail}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ROISection;
