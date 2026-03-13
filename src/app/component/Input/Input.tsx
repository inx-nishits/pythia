import React from "react";

export const inputStyles =
  "w-full px-[14px] py-[12px] rounded-[16px] border-[1px] border-solid border-slate-200 bg-white text-[15px] placeholder:text-slate-400 text-[#0F172A] hover:border-slate-300 focus:border-brand-teal focus:ring-[4px] focus:ring-brand-teal/10 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md";

export const errorStyles = "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-500/10";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

function Input(props: InputProps) {
  const { className, error, icon, ...rest } = props;

  if (icon) {
    return (
      <div className="relative w-full group">
        <div className="absolute left-[16px] top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-teal transition-colors duration-300">
          {icon}
        </div>
        <input
          className={`${inputStyles} pl-[46px] ${className} ${error ? errorStyles : ""}`}
          {...rest}
        />
      </div>
    );
  }

  return (
    <input
      className={`${inputStyles} ${className} ${error ? errorStyles : ""}`}
      {...rest}
    />
  );
}

export default Input;
