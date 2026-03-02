export const inputStyles =
  "w-full p-[10px] rounded-[6px] border-[1px] border-solid border-grey-15 bg-white text-[14px] leading-[14px] placeholder:text-grey-40 text-grey-100 hover:bg-grey-2 focus:bg-purple-2 focus:border-purple-50 focus:outline-none";

export const errorStyles = "border-red-60 bg-red-2";

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
) {
  const { className, error, ...rest } = props;

  return (
    <input
      className={`${inputStyles} ${className} ${error ? errorStyles : {}}`}
      {...rest}
    />
  );
}

export default Input;
