"use client";
import { Check } from "lucide-react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Checkbox({ checked, onChange, label, ...rest }: CheckboxProps) {
  return (
    <div className="inline-flex items-start gap-3 group">
      <label className="flex items-start cursor-pointer relative mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-lg border border-slate-200 bg-slate-50 checked:bg-emerald-500 checked:border-emerald-500 hover:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
          {...rest}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Check size={14} strokeWidth={4} />
        </span>
      </label>
      <label
        htmlFor={rest.id}
        className="cursor-pointer text-slate-500 text-sm font-medium leading-tight select-none group-hover:text-slate-900 transition-colors"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
