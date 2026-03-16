import React from "react";

export const inputStyles =
  "w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium placeholder:text-slate-400 text-slate-900 hover:border-slate-200 focus:border-emerald-500 focus:bg-white focus:shadow-xl focus:shadow-emerald-500/5 focus:outline-none transition-all duration-300";

export const errorStyles = "border-rose-200 bg-rose-50/50 focus:border-rose-500 focus:ring-rose-500/10";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
}

function Input(props: InputProps) {
  const { className, error, icon, ...rest } = props;

  if (icon) {
    return (
      <div className="relative w-full group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors duration-300 z-10 pointer-events-none pr-3 border-r border-slate-200">
          {icon}
        </div>
        <input
          className={`${inputStyles} pl-14 ${className || ""} ${error ? errorStyles : ""}`}
          {...rest}
        />
      </div>
    );
  }

  return (
    <input
      className={`${inputStyles} ${className || ""} ${error ? errorStyles : ""}`}
      {...rest}
    />
  );
}

export default Input;
