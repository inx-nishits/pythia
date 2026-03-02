"use client";
import CheckedIcon from "@/app/assets/check.svg";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Checkbox({ checked, onChange, label, ...rest }: CheckboxProps) {
  return (
    <div className="inline-flex items-start gap-[10px]">
      <label className="flex items-start cursor-pointer relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-[18px] w-[18px] cursor-pointer transition-all appearance-none rounded-[2px] border border-purple-60 checked:bg-purple-60 checked:border-purple-60"
          {...rest}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CheckedIcon />
        </span>
      </label>
      <label
        htmlFor={rest.id}
        className="cursor-pointer text-grey-80 text-[12px] leading-[18px]"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
