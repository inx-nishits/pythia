import { MotionSpan, MotionH2, MotionDiv } from "@/app/component/MotionWrapper";
import { Store, Coffee, ShoppingBasket, Shirt, Utensils } from "lucide-react";


const industries = [
  {
    name: "Convenience Store",
    icon: <Store className="w-8 h-8 text-brand-teal" />,
    description: "Real-time insights for fast-paced retail environments.",
  },
  {
    name: "Coffee Shop",
    icon: <Coffee className="w-8 h-8 text-amber-600" />,
    description: "Capture service details that impact drive-thru and counter speed.",
  },
  {
    name: "Grocery Store",
    icon: <ShoppingBasket className="w-8 h-8 text-brand-coral" />,
    description: "Understand shopper friction and staff efficiency across departments.",
  },
  {
    name: "Clothing Store",
    icon: <Shirt className="w-8 h-8 text-blue-500" />,
    description: "Track fit-room assistance and closing ratios at the register.",
  },
  {
    name: "Restaurant",
    icon: <Utensils className="w-8 h-8 text-emerald-500" />,
    description: "Monitor guest sentiment and server recommendations instantly.",
  },
];

export default function IndustriesSection() {
  return (
    <section
      id="industries"
      className="py-16 sm:py-24 lg:py-[120px] bg-slate-50 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 lg:mb-24 space-y-4">
          <MotionSpan
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-brand-teal uppercase tracking-[0.2em]"
          >
            Industries
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#0F172A] text-[32px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-tighter leading-tight"
          >
            Intelligence built for <br className="hidden sm:block" />
            <span className="text-slate-400 italic">your specific business.</span>
          </MotionH2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {industries.map((industry, index) => (
            <MotionDiv
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-[32px] bg-white border border-slate-200/60 hover:border-brand-teal/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-brand-teal/5 transition-colors">
                {industry.icon}
              </div>
              <h3 className="text-[18px] font-bold text-brand-navy mb-3">
                {industry.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {industry.description}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
