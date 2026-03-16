import React from "react";

export const textareaStyles =
  "w-full p-5 rounded-2xl border border-slate-100 bg-slate-50 text-base font-medium placeholder:text-slate-400 text-slate-900 hover:border-slate-200 focus:border-emerald-500 focus:bg-white focus:shadow-xl focus:shadow-emerald-500/5 focus:outline-none transition-all duration-300 resize-none";

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;

  return <textarea className={`${textareaStyles} ${className || ""}`} {...rest} />;
}

export default Textarea;
