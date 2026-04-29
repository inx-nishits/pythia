const defaultStyles =
  "flex justify-center items-center py-[12px] px-[16px] rounded-[6px] text-[15px] font-semibold transition-all duration-200 cursor-pointer";

const primaryStyles = 
  "bg-brand-navy text-white hover:bg-brand-navy-light shadow-md hover:shadow-lg";

const disabledStyles =
  "disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // If the user passes a class that overrides bg, it will apply
  const isSecondary = props.className?.includes("bg-transparent") || props.className?.includes("border");
  const isTeal = props.className?.includes("bg-brand-teal");
  
  let additionalStyles = primaryStyles;
  if (isTeal) {
      additionalStyles = "bg-brand-teal text-brand-navy hover:bg-brand-teal-hover shadow-md hover:shadow-lg";
  } else if (isSecondary) {
      additionalStyles = "bg-transparent border border-gray-300 text-brand-navy hover:bg-gray-50 hover:border-gray-400";
  }

  return (
    <button
      {...props}
      className={`${defaultStyles} ${additionalStyles} ${disabledStyles} ${props.className || ''}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
