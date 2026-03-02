const defaultStyles =
  "flex justify-center items-center py-[12px] px-[16px] rounded-[6px] bg-purple-60 text-white text-[15px] font-semibold border-[2px] border-purple-60";
const hoverStyles =
  "hover:bg-purple-80 cursor-pointer hover:border-[2px] hover:border-purple-80";
const activeStyles =
  "active:bg-purple-100 active:border-purple-100 active:border-[2px]";
const focusStyles =
  "focus:border-[2px] focus:outline-none focus:bg-purple-80 focus:border-purple-40";

const disabledStyles =
  "disabled:bg-[#CFC7DE] disabled:text-grey-2 disabled:border-[#CFC7DE] disabled:cursor-not-allowed";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${defaultStyles} ${hoverStyles} ${activeStyles} ${focusStyles} ${disabledStyles} ${props.className}`}
    >
      {props.children}
    </button>
  );
}

export default Button;
