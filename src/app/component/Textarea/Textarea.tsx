const textareaStyles =
  "w-full p-[10px] rounded-[6px] border-[1px] border-solid border-grey-15 bg-white text-[14px] leading-[14px] placeholder:text-grey-40 text-grey-100 hover:bg-grey-2 focus:bg-purple-2 focus:border-purple-50 focus:outline-none";

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;

  return <textarea className={`${textareaStyles} ${className}`} {...rest} />;
}
export default Textarea;
