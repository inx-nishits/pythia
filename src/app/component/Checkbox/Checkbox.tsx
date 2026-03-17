"use client";

import { Check } from "lucide-react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Checkbox({ checked, onChange, label, ...rest }: CheckboxProps) {
  return (
    <div className="inline-flex items-start gap-3 group">
      <div className="relative flex items-center justify-center mt-1 shrink-0">
        <input
          type="checkbox"
          id={rest.id}
          checked={checked}
          onChange={onChange}
          className="peer h-[18px] w-[18px] cursor-pointer transition-all appearance-none rounded-[5px] border border-slate-200 checked:bg-brand-teal checked:border-brand-teal hover:border-brand-teal/50 focus:ring-2 focus:ring-brand-teal/20 bg-white"
          {...rest}
        />
        <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none stroke-[3.5]" />
      </div>
      <label
        htmlFor={rest.id}
        className="cursor-pointer text-slate-500 text-[13px] leading-relaxed select-none group-hover:text-slate-600 transition-colors pt-0.5"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
