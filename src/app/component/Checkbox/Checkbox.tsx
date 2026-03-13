"use client";
import CheckedIcon from "@/app/assets/check.svg";

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
          className="peer h-[18px] w-[18px] cursor-pointer transition-all appearance-none rounded-[5px] border border-slate-300 checked:bg-brand-teal checked:border-brand-teal hover:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          {...rest}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none w-3 h-3">
          <CheckedIcon />
        </span>
      </label>
      <label
        htmlFor={rest.id}
        className="cursor-pointer text-slate-500 text-[13px] leading-snug select-none group-hover:text-slate-600 transition-colors"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
