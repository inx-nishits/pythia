import React from "react";

export const textareaStyles =
  "w-full p-[14px] rounded-[16px] border-[1px] border-solid border-slate-200 bg-white text-[15px] placeholder:text-slate-400 text-[#0F172A] hover:border-slate-300 focus:border-brand-teal focus:ring-[4px] focus:ring-brand-teal/10 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md resize-none";

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;

  return <textarea className={`${textareaStyles} ${className}`} {...rest} />;
}

export default Textarea;
